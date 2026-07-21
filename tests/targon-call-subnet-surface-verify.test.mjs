// SN4 (Targon) end-to-end verification for the call_subnet_surface MCP tool
// (metagraphed#7020, MCP execute Phase 1 follow-up #7014/#7215). Unlike
// tests/call-subnet-surface-mcp.test.mjs -- which proves the tool wiring with
// synthetic surfaces -- this file pins SN4's three issue-scoped registry
// surfaces (registry/subnets/targon.json) to the tool's contract, so a future
// edit that regresses their callability (flipping to HEAD, marking them
// auth_required, disabling their probe) is caught here.
//
// All three are public no-auth GET, single-fixed-endpoint JSON APIs -- no
// schema. Live-verified 2026-07-21:
//   - sn-4-targon-subnet-api: GET https://api.targon.com/tha/v2/inventory ->
//     200 application/json, array of rental inventory items.
//   - sn-4-targon-version-api: GET https://api.targon.com/tha/v2/version ->
//     200 application/json, {name, version, gitHash, buildDate}.
//   - sn-4-targon-miner-stats-api: GET https://stats.targon.com/api/miners ->
//     200 application/json, {data: [...]}.
// The fixtures below mirror those live responses rather than fetching them,
// keeping the test hermetic while still exercising the JSON parse-and-return
// path.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, test } from "vitest";
import { callSubnetSurface } from "../src/call-subnet-surface.mjs";
import { handleMcpRequest } from "../src/mcp-server.mjs";

const registry = JSON.parse(
  readFileSync(
    fileURLToPath(new URL("../registry/subnets/targon.json", import.meta.url)),
    "utf8",
  ),
);

function surfaceById(id) {
  return registry.surfaces.find((surface) => surface.id === id);
}

const CASES = [
  {
    id: "sn-4-targon-subnet-api",
    url: "https://api.targon.com/tha/v2/inventory",
    body: [
      {
        name: "cpu-small",
        display_name: "CPU Server - Small",
        type: "rental",
        gpu: false,
        cost_per_hour: 0.09,
        available: 8,
      },
    ],
  },
  {
    id: "sn-4-targon-version-api",
    url: "https://api.targon.com/tha/v2/version",
    body: {
      name: "Targon Hub API - (Bloody)",
      version: "v1.16.3",
      gitHash: "dcdafc4",
      buildDate: "2026-07-14T15:24:22+0000",
    },
  },
  {
    id: "sn-4-targon-miner-stats-api",
    url: "https://stats.targon.com/api/miners",
    body: {
      data: [
        {
          uid: "7",
          count: 8,
          payout: 16,
          cards: 8,
          compute_type: "TDX-VM-NVIDIA-RTX6000B",
        },
      ],
    },
  },
];

for (const { id, url, body } of CASES) {
  describe(`SN4 Targon call_subnet_surface verification: ${id} (#7020)`, () => {
    const SURFACE = surfaceById(id);

    test("the registry surface exists and is configured to be callable", () => {
      assert.ok(SURFACE, `registry surface ${id} is present`);
      assert.equal(SURFACE.kind, "subnet-api");
      assert.equal(SURFACE.auth_required, false);
      assert.equal(SURFACE.probe?.enabled, true);
      assert.equal(SURFACE.probe?.method, "GET");
      assert.equal(SURFACE.probe?.expect, "json");
      assert.equal(SURFACE.url, url);
      // Single fixed endpoint -- no machine-readable schema is expected.
      assert.equal(SURFACE.schema_url, undefined);
    });

    test("callSubnetSurface returns the real JSON body using the surface's own url + GET", async () => {
      let requestedUrl;
      let requestedMethod;
      const result = await callSubnetSurface(SURFACE, {
        isUnsafeUrl: async () => false,
        fetchImpl: async (reqUrl, init) => {
          requestedUrl = String(reqUrl);
          requestedMethod = init.method;
          return new Response(JSON.stringify(body), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
        },
      });
      assert.equal(result.ok, true);
      assert.equal(requestedUrl, SURFACE.url);
      assert.equal(requestedMethod, "GET");
      assert.equal(result.status_code, 200);
      assert.equal(result.content_type, "application/json");
      assert.equal(result.truncated, false);
      assert.deepEqual(result.body, body);
    });

    test("end-to-end through the call_subnet_surface MCP tool, resolved by surface id", async () => {
      const catalog = {
        surfaces: [{ ...SURFACE, surface_id: SURFACE.id, netuid: 4 }],
      };
      const deps = {
        readArtifact: async (_env, path) =>
          path === "/metagraph/operational-surfaces.json"
            ? { ok: true, data: catalog }
            : { ok: false, status: 404 },
      };
      const originalFetch = globalThis.fetch;
      globalThis.fetch = async (input) => {
        const reqUrl = String(input);
        if (reqUrl.startsWith("https://cloudflare-dns.com/dns-query")) {
          return new Response(JSON.stringify({ Status: 0 }), {
            headers: { "content-type": "application/dns-json" },
          });
        }
        return new Response(JSON.stringify(body), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      };
      try {
        const response = await handleMcpRequest(
          new Request("https://metagraph.sh/mcp", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              jsonrpc: "2.0",
              id: 1,
              method: "tools/call",
              params: {
                name: "call_subnet_surface",
                arguments: { surface_id: id },
              },
            }),
          }),
          {},
          deps,
        );
        const result = (await response.json()).result;
        assert.equal(result.isError, false);
        assert.equal(result.structuredContent.surface_id, id);
        assert.equal(result.structuredContent.status_code, 200);
        assert.deepEqual(result.structuredContent.body, body);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });
  });
}
