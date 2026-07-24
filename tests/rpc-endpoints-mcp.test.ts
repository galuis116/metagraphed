import assert from "node:assert/strict";
import { describe, test, vi } from "vitest";
import { Ajv2020 } from "ajv/dist/2020.js";
import * as listQuery from "../workers/list-query.ts";
import {
  RPC_ENDPOINTS_ARTIFACT,
  LIST_RPC_ENDPOINTS_MCP_TOOL,
  LIST_RPC_ENDPOINTS_OUTPUT_SCHEMA,
  rpcEndpointsMcpError,
  rpcEndpointsQueryUrl,
  loadRpcEndpointsList,
} from "../src/rpc-endpoints-mcp.ts";
import type { Row } from "./row-type.ts";

type LoadCtx = Parameters<typeof loadRpcEndpointsList>[0];
type LoadDeps = Parameters<typeof loadRpcEndpointsList>[2];

import { MCP_TOOLS } from "../src/mcp-server.mjs";

const SAMPLE_BLOB = {
  generated_at: "2026-07-01T00:00:00.000Z",
  notes: "test",
  endpoints: [
    {
      id: "a",
      netuid: 0,
      kind: "subtensor-rpc",
      layer: "bittensor-base",
      provider: "opentensor",
      publication_state: "monitored",
      status: "ok",
      pool_eligible: true,
      latency_ms: 50,
      score: 0.9,
    },
    {
      id: "b",
      netuid: 0,
      kind: "subtensor-wss",
      layer: "bittensor-base",
      provider: "onfinality",
      publication_state: "pool-eligible",
      status: "degraded",
      pool_eligible: false,
      latency_ms: 400,
      score: 0.4,
    },
    {
      id: "c",
      netuid: 0,
      kind: "archive",
      layer: "bittensor-base",
      provider: "opentensor",
      publication_state: "monitored",
      status: "ok",
      pool_eligible: true,
      latency_ms: 900,
      score: 0.1,
    },
  ],
};

function readArtifact(_env: unknown, path: string) {
  if (path === RPC_ENDPOINTS_ARTIFACT) {
    return Promise.resolve({ ok: true, data: SAMPLE_BLOB });
  }
  return Promise.resolve({ ok: false, code: "artifact_not_found" });
}

describe("rpc-endpoints-mcp", () => {
  test("rpcEndpointsMcpError is shaped for MCP toolError handling", () => {
    const err = rpcEndpointsMcpError("invalid_params", "bad sort");
    assert.equal(err.code, "invalid_params");
    assert.equal(err.toolError, true);
  });

  test("rpcEndpointsQueryUrl validates filters, range bounds, and cursor", () => {
    const url = rpcEndpointsQueryUrl({
      netuid: 7,
      kind: "subtensor-rpc",
      layer: "bittensor-base",
      provider: "opentensor",
      publication_state: "monitored",
      status: "ok",
      pool_eligible: true,
      min_latency_ms: 10,
      max_latency_ms: 500,
      min_score: 0.1,
      max_score: 0.9,
      sort: "netuid",
      order: "desc",
      limit: 10,
      cursor: 5,
    });
    assert.equal(url.searchParams.get("netuid"), "7");
    assert.equal(url.searchParams.get("kind"), "subtensor-rpc");
    assert.equal(url.searchParams.get("layer"), "bittensor-base");
    assert.equal(url.searchParams.get("provider"), "opentensor");
    assert.equal(url.searchParams.get("publication_state"), "monitored");
    assert.equal(url.searchParams.get("status"), "ok");
    assert.equal(url.searchParams.get("pool_eligible"), "true");
    assert.equal(url.searchParams.get("min_latency_ms"), "10");
    assert.equal(url.searchParams.get("max_latency_ms"), "500");
    assert.equal(url.searchParams.get("min_score"), "0.1");
    assert.equal(url.searchParams.get("max_score"), "0.9");
    assert.equal(url.searchParams.get("sort"), "netuid");
    assert.equal(url.searchParams.get("order"), "desc");
    assert.equal(url.searchParams.get("limit"), "10");
    assert.equal(url.searchParams.get("cursor"), "5");
  });

  test("rpcEndpointsQueryUrl rejects invalid netuid", () => {
    assert.throws(
      () => rpcEndpointsQueryUrl({ netuid: -1 }),
      (err: Row) => err.code === "invalid_params",
    );
  });

  test("rpcEndpointsQueryUrl rejects a fractional netuid", () => {
    assert.throws(
      () => rpcEndpointsQueryUrl({ netuid: 1.5 }),
      (err: Row) => err.code === "invalid_params",
    );
  });

  test("rpcEndpointsQueryUrl rejects invalid kind/layer/publication_state/status", () => {
    assert.throws(
      () => rpcEndpointsQueryUrl({ kind: "bogus" }),
      (err: Row) => err.code === "invalid_params",
    );
    assert.throws(
      () => rpcEndpointsQueryUrl({ layer: "bogus" }),
      (err: Row) => err.code === "invalid_params",
    );
    assert.throws(
      () => rpcEndpointsQueryUrl({ publication_state: "bogus" }),
      (err: Row) => err.code === "invalid_params",
    );
    assert.throws(
      () => rpcEndpointsQueryUrl({ status: "bogus" }),
      (err: Row) => err.code === "invalid_params",
    );
  });

  test("rpcEndpointsQueryUrl rejects a non-boolean pool_eligible", () => {
    assert.throws(
      () => rpcEndpointsQueryUrl({ pool_eligible: "yes" }),
      (err: Row) => err.code === "invalid_params",
    );
  });

  test("rpcEndpointsQueryUrl rejects non-string provider", () => {
    assert.throws(
      () => rpcEndpointsQueryUrl({ provider: 42 }),
      (err: Row) => err.code === "invalid_params",
    );
  });

  test("rpcEndpointsQueryUrl rejects non-numeric range bounds", () => {
    assert.throws(
      () => rpcEndpointsQueryUrl({ min_latency_ms: "lots" }),
      (err: Row) => err.code === "invalid_params",
    );
    assert.throws(
      () => rpcEndpointsQueryUrl({ max_score: "lots" }),
      (err: Row) => err.code === "invalid_params",
    );
  });

  test("rpcEndpointsQueryUrl rejects invalid sort/order", () => {
    assert.throws(
      () => rpcEndpointsQueryUrl({ sort: "bogus" }),
      (err: Row) => err.code === "invalid_params",
    );
    assert.throws(
      () => rpcEndpointsQueryUrl({ sort: "netuid", order: "sideways" }),
      (err: Row) => err.code === "invalid_params",
    );
  });

  test("rpcEndpointsQueryUrl rejects empty/non-string fields", () => {
    assert.throws(
      () => rpcEndpointsQueryUrl({ fields: "   " }),
      (err: Row) => err.code === "invalid_params",
    );
    assert.throws(
      () => rpcEndpointsQueryUrl({ fields: 42 }),
      (err: Row) => err.code === "invalid_params",
    );
  });

  test("rpcEndpointsQueryUrl trims and forwards a fields projection", () => {
    const url = rpcEndpointsQueryUrl({ fields: " id,kind " });
    assert.equal(url.searchParams.get("fields"), "id,kind");
  });

  test("rpcEndpointsQueryUrl rejects a non-numeric/sub-minimum/over-maximum limit", () => {
    assert.throws(
      () => rpcEndpointsQueryUrl({ limit: "lots" }),
      (err: Row) => err.code === "invalid_params",
    );
    assert.throws(
      () => rpcEndpointsQueryUrl({ limit: 0 }),
      (err: Row) => err.code === "invalid_params",
    );
    assert.throws(
      () => rpcEndpointsQueryUrl({ limit: 500 }),
      (err: Row) => err.code === "invalid_params",
    );
  });

  test("rpcEndpointsQueryUrl rejects a negative/non-integer cursor", () => {
    assert.throws(
      () => rpcEndpointsQueryUrl({ cursor: -1 }),
      (err: Row) => err.code === "invalid_params",
    );
    assert.throws(
      () => rpcEndpointsQueryUrl({ cursor: 1.5 }),
      (err: Row) => err.code === "invalid_params",
    );
  });

  test("loadRpcEndpointsList returns filtered rows with pagination meta", async () => {
    const out = await loadRpcEndpointsList(
      { env: {}, readArtifact } as unknown as LoadCtx,
      { kind: "subtensor-wss" },
    );
    assert.equal(out.returned, 1);
    assert.equal(out.endpoints[0].id, "b");
  });

  test("loadRpcEndpointsList applies range filters", async () => {
    const out = await loadRpcEndpointsList(
      { env: {}, readArtifact } as unknown as LoadCtx,
      { min_score: 0.4 },
    );
    assert.equal(out.returned, 2);
    assert.deepEqual(
      out.endpoints.map((e) => e.id),
      ["a", "b"],
    );
  });

  test("loadRpcEndpointsList sorts and pages the collection", async () => {
    const out = await loadRpcEndpointsList(
      { env: {}, readArtifact } as unknown as LoadCtx,
      { sort: "score", order: "desc", limit: 1 },
    );
    assert.equal(out.returned, 1);
    assert.equal(out.total, 3);
    assert.equal(out.endpoints[0].id, "a");
    assert.equal(out.next_cursor, 1);
  });

  test("loadRpcEndpointsList applies the live health overlay before filtering", async () => {
    const out = await loadRpcEndpointsList(
      {
        env: {},
        readArtifact,
        readHealthKv: async () => ({
          last_run_at: "2026-07-02T00:00:00.000Z",
          endpoints: [{ id: "b", status: "ok", latency_ms: 20 }],
        }),
      } as unknown as LoadCtx,
      { status: "ok" },
    );
    // The overlay flips "b" from degraded to ok, so all 3 endpoints now match.
    assert.equal(out.returned, 3);
  });

  test("loadRpcEndpointsList skips the overlay when no readHealthKv dep is provided", async () => {
    const out = await loadRpcEndpointsList(
      { env: {}, readArtifact } as unknown as LoadCtx,
      { status: "degraded" },
    );
    assert.equal(out.returned, 1);
    assert.equal(out.endpoints[0].id, "b");
  });

  test("loadRpcEndpointsList falls back to the static snapshot when mergeRpcEndpoints returns null", async () => {
    // A live pool with no matching endpoints array makes mergeRpcEndpoints
    // bail (returns null); the static snapshot must still be served.
    const out = await loadRpcEndpointsList(
      {
        env: {},
        readArtifact,
        readHealthKv: async () => ({ last_run_at: "2026-07-02T00:00:00.000Z" }),
      } as unknown as LoadCtx,
      {},
    );
    assert.equal(out.total, 3);
  });

  test("loadRpcEndpointsList uses an injected readArtifact dep", async () => {
    const out = await loadRpcEndpointsList(
      {
        env: {},
        readArtifact: async () => ({ ok: false }),
      } as unknown as LoadCtx,
      {},
      {
        readArtifact: async () => ({
          ok: true,
          data: { endpoints: [{ id: "test" }] },
        }),
      } as unknown as LoadDeps,
    );
    assert.equal(out.endpoints[0].id, "test");
  });

  test("loadRpcEndpointsList maps artifact_not_found to not_found", async () => {
    await assert.rejects(
      () =>
        loadRpcEndpointsList(
          {
            env: {},
            readArtifact: async () => ({
              ok: false,
              code: "artifact_not_found",
            }),
          } as unknown as LoadCtx,
          {},
        ),
      (err: Row) => err.code === "not_found",
    );
  });

  test("loadRpcEndpointsList surfaces other artifact failures", async () => {
    await assert.rejects(
      () =>
        loadRpcEndpointsList(
          {
            env: {},
            readArtifact: async () => ({
              ok: false,
              code: "artifact_timeout",
            }),
          } as unknown as LoadCtx,
          {},
        ),
      (err: Row) =>
        err.code === "artifact_timeout" &&
        /rpc-endpoints\.json/.test(err.message),
    );
  });

  test("loadRpcEndpointsList rejects invalid list-query params from REST parity", async () => {
    await assert.rejects(
      () =>
        loadRpcEndpointsList({ env: {}, readArtifact } as unknown as LoadCtx, {
          fields: "not_a_column",
        }),
      (err: Row) => err.code === "invalid_params",
    );
  });

  test("loadRpcEndpointsList is schema-stable when the artifact has no endpoints array", async () => {
    const out = await loadRpcEndpointsList(
      {
        env: {},
        readArtifact: async () => ({
          ok: true,
          data: { generated_at: "2026-01-01T00:00:00Z" },
        }),
      } as unknown as LoadCtx,
      {},
    );
    assert.deepEqual(out.endpoints, []);
    assert.equal(out.total, 0);
    assert.equal(out.returned, 0);
  });

  test("loadRpcEndpointsList rejects a malformed artifact payload", async () => {
    await assert.rejects(
      () =>
        loadRpcEndpointsList(
          {
            env: {},
            readArtifact: async () => ({ ok: true, data: null }),
          } as unknown as LoadCtx,
          {},
        ),
      (err: Row) => err.code === "not_found",
    );
  });

  test("loadRpcEndpointsList defaults code when the read result is bare", async () => {
    await assert.rejects(
      () =>
        loadRpcEndpointsList(
          {
            env: {},
            readArtifact: async () => ({ ok: false }),
          } as unknown as LoadCtx,
          {},
        ),
      (err: Row) => err.code === "artifact_unavailable",
    );
  });

  test("loadRpcEndpointsList falls back when pagination meta is absent", async () => {
    const spy = vi.spyOn(listQuery, "applyQueryFilters").mockReturnValue({
      data: { endpoints: [{ id: "a" }, { id: "b" }] },
      meta: {},
    });
    try {
      const out = await loadRpcEndpointsList(
        { env: {}, readArtifact } as unknown as LoadCtx,
        {},
      );
      assert.equal(out.total, 2);
      assert.equal(out.returned, 2);
      assert.equal(out.limit, 2);
      assert.equal(out.cursor, 0);
      assert.equal(out.next_cursor, null);
      assert.equal(out.sort, null);
      assert.equal(out.order, null);
    } finally {
      spy.mockRestore();
    }
  });

  test("loadRpcEndpointsList tolerates a non-array endpoints key from applyQueryFilters", async () => {
    const spy = vi
      .spyOn(listQuery, "applyQueryFilters")
      .mockReturnValue({ data: {}, meta: { pagination: {} } });
    try {
      const out = await loadRpcEndpointsList(
        { env: {}, readArtifact } as unknown as LoadCtx,
        {},
      );
      assert.deepEqual(out.endpoints, []);
    } finally {
      spy.mockRestore();
    }
  });

  test("MCP tool metadata and outputSchema compile", () => {
    assert.equal(LIST_RPC_ENDPOINTS_MCP_TOOL.name, "list_rpc_endpoints");
    assert.ok(
      new Ajv2020({ strict: false }).compile(LIST_RPC_ENDPOINTS_OUTPUT_SCHEMA),
    );
  });

  test("MCP server exports wire list_rpc_endpoints", () => {
    const tool = MCP_TOOLS.find((t: Row) => t.name === "list_rpc_endpoints");
    assert.ok(tool);
    assert.equal(tool.title, "List Bittensor RPC endpoints");
  });
});
