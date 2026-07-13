# Changelog

All notable changes to **metagraphed-ui** (the metagraph.sh website) are
documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

The site is continuously deployed from `main` via Cloudflare Workers Builds;
versioning and this changelog are managed by `release-please` from
[Conventional Commits](https://www.conventionalcommits.org/) touching
`apps/ui/**`, independent of the backend's release cadence.

## [0.3.0](https://github.com/galuis116/metagraphed/compare/ui-v0.2.0...ui-v0.3.0) (2026-07-13)


### Features

* **ui:** add a stake-transfers summary tile to subnet economics ([#3484](https://github.com/galuis116/metagraphed/issues/3484)) ([#3826](https://github.com/galuis116/metagraphed/issues/3826)) ([ccf7011](https://github.com/galuis116/metagraphed/commit/ccf70117013ab048b86099dd5110fcc5c41711c1))
* **ui:** add a weight-setters leaderboard to the subnet validators panel ([#3875](https://github.com/galuis116/metagraphed/issues/3875)) ([da6f896](https://github.com/galuis116/metagraphed/commit/da6f896463660f612386dea08d504493ad852dec))
* **ui:** add account endpoint-announcement activity panel ([#3860](https://github.com/galuis116/metagraphed/issues/3860)) ([06ec91e](https://github.com/galuis116/metagraphed/commit/06ec91e6cd68ff7a1575b88f93559279072c86ca)), closes [#3733](https://github.com/galuis116/metagraphed/issues/3733)
* **ui:** add account hover-card variant ([#3919](https://github.com/galuis116/metagraphed/issues/3919)) ([0b73518](https://github.com/galuis116/metagraphed/commit/0b735180caea143598106a3b8ab53af4dec9ede3))
* **ui:** add account teardown activity to account detail page ([#3804](https://github.com/galuis116/metagraphed/issues/3804)) ([9ef811f](https://github.com/galuis116/metagraphed/commit/9ef811f67b8e0a7aaf6c6752c578483d8f1977bf))
* **ui:** add account weight-setting activity to account detail page ([#3818](https://github.com/galuis116/metagraphed/issues/3818)) ([700e299](https://github.com/galuis116/metagraphed/commit/700e299590b1f1902e7a635b844eb5cd5a3d60c5))
* **ui:** add alpha-price sparkline to subnet economics panel ([#3362](https://github.com/galuis116/metagraphed/issues/3362)) ([#3922](https://github.com/galuis116/metagraphed/issues/3922)) ([6933817](https://github.com/galuis116/metagraphed/commit/6933817646041cbe3644ad3e3005e44dc0088693))
* **ui:** add an aggregate weight-setting activity KPI to the subnet validators panel ([#3905](https://github.com/galuis116/metagraphed/issues/3905)) ([ff5d9b8](https://github.com/galuis116/metagraphed/commit/ff5d9b843a6d88ea2c8f0b2c5edc69d1c23ff486))
* **ui:** add author/range filters to Blocks list ([#3699](https://github.com/galuis116/metagraphed/issues/3699)) ([8eb7b8e](https://github.com/galuis116/metagraphed/commit/8eb7b8e25b5b1d17d3ea57a4e11e1f2e4401993a))
* **ui:** add block-production stats header to the blocks index page ([#3887](https://github.com/galuis116/metagraphed/issues/3887)) ([da60b0b](https://github.com/galuis116/metagraphed/commit/da60b0bc0040f0901c674880c19ac30cc154d4d0)), closes [#3488](https://github.com/galuis116/metagraphed/issues/3488)
* **ui:** add decoded chain-events view to the block detail page ([#3736](https://github.com/galuis116/metagraphed/issues/3736)) ([#3796](https://github.com/galuis116/metagraphed/issues/3796)) ([267b633](https://github.com/galuis116/metagraphed/commit/267b633baa0ae6aa950649484800f993a92a4d6d))
* **ui:** add developer settings page for webhook subscriptions ([#3494](https://github.com/galuis116/metagraphed/issues/3494)) ([#3891](https://github.com/galuis116/metagraphed/issues/3891)) ([59304b3](https://github.com/galuis116/metagraphed/commit/59304b3c45ef8ce3a8d23e38ddc5c7966d24932b))
* **ui:** add foundational DownloadCsvButton CSV export ([#3402](https://github.com/galuis116/metagraphed/issues/3402)) ([#3824](https://github.com/galuis116/metagraphed/issues/3824)) ([4f10191](https://github.com/galuis116/metagraphed/commit/4f10191e0c203d3272c9ca92788c37be395ca05f))
* **ui:** add network decentralization scorecard to status page ([#3823](https://github.com/galuis116/metagraphed/issues/3823)) ([eb57bd4](https://github.com/galuis116/metagraphed/commit/eb57bd4909f58fbd1478fe83fce851864506f7c4)), closes [#3471](https://github.com/galuis116/metagraphed/issues/3471)
* **ui:** add network-wide stake-transfers leaderboard to explorer page ([#3906](https://github.com/galuis116/metagraphed/issues/3906)) ([46a13ab](https://github.com/galuis116/metagraphed/commit/46a13abb99b1e647336b19ebfb1b32bf9e44e259)), closes [#3467](https://github.com/galuis116/metagraphed/issues/3467)
* **ui:** add per-UID emission-yield tab to the subnet profile page ([#3708](https://github.com/galuis116/metagraphed/issues/3708)) ([a7c2d6b](https://github.com/galuis116/metagraphed/commit/a7c2d6b27ced55bb0a0dd678207437b7e0e91889)), closes [#3478](https://github.com/galuis116/metagraphed/issues/3478)
* **ui:** add raw chain-events browser to explorer page ([#3841](https://github.com/galuis116/metagraphed/issues/3841)) ([3257d8c](https://github.com/galuis116/metagraphed/commit/3257d8c6b8fd2a453e4388d857dff4eeea86b987))
* **ui:** add registration/deregistration counters to the subnet masthead ([#3836](https://github.com/galuis116/metagraphed/issues/3836)) ([1892aac](https://github.com/galuis116/metagraphed/commit/1892aacead29c341324a7dd3cb6f4534fbfd67da))
* **ui:** add reward-distribution tab to the subnet concentration panel ([#3652](https://github.com/galuis116/metagraphed/issues/3652)) ([5a24e7f](https://github.com/galuis116/metagraphed/commit/5a24e7f84ebd3feeebacdec6fe08e962fa3197c8)), closes [#3477](https://github.com/galuis116/metagraphed/issues/3477)
* **ui:** add shared event-kind label and category map ([#3563](https://github.com/galuis116/metagraphed/issues/3563)) ([1e6f56d](https://github.com/galuis116/metagraphed/commit/1e6f56d77ae0f42b97222925e82068cbf839d92c)), closes [#3366](https://github.com/galuis116/metagraphed/issues/3366)
* **ui:** add typed data layer for chain decentralization endpoints ([#3609](https://github.com/galuis116/metagraphed/issues/3609)) ([4e15488](https://github.com/galuis116/metagraphed/commit/4e15488c01527983cb6255fcfa19f8a4bbc751aa))
* **ui:** add typed data layer for chain transfer-pairs ([#3476](https://github.com/galuis116/metagraphed/issues/3476)) ([#3683](https://github.com/galuis116/metagraphed/issues/3683)) ([815afdb](https://github.com/galuis116/metagraphed/commit/815afdbc62bc8a38258e6eef85e191fc0f0a442e))
* **ui:** add typed data layer for per-subnet stake-transfers ([#3666](https://github.com/galuis116/metagraphed/issues/3666)) ([d25a824](https://github.com/galuis116/metagraphed/commit/d25a8245fe4a56e83cb559c265ac80009822d0ad))
* **ui:** add typed data layer for subnet axon-removals ([#3660](https://github.com/galuis116/metagraphed/issues/3660)) ([b5c270d](https://github.com/galuis116/metagraphed/commit/b5c270d4ea759683ad676304df61137f66bdf6c0))
* **ui:** add typed data layer for subnet identity-history ([#3646](https://github.com/galuis116/metagraphed/issues/3646)) ([7127e99](https://github.com/galuis116/metagraphed/commit/7127e99edf89e131eefbfdb93d8344483f079eda))
* **ui:** add typed data layer for subnet registrations + deregistrations ([#3682](https://github.com/galuis116/metagraphed/issues/3682)) ([55c492a](https://github.com/galuis116/metagraphed/commit/55c492a245286d69cb55b13af06e79550944e6cc))
* **ui:** add typed data layer for subnet serving and prometheus ([#3675](https://github.com/galuis116/metagraphed/issues/3675)) ([5f94480](https://github.com/galuis116/metagraphed/commit/5f94480f2b56a188b33b8d57e716354de7a2e7f3))
* **ui:** add typed data layer for subnet stake-moves ([#3669](https://github.com/galuis116/metagraphed/issues/3669)) ([e3f3af7](https://github.com/galuis116/metagraphed/commit/e3f3af73cf9e1c6076585705306b756d3915ae94))
* **ui:** add typed data layer for subnet weight-setters leaderboard ([#3665](https://github.com/galuis116/metagraphed/issues/3665)) ([a0df4a0](https://github.com/galuis116/metagraphed/commit/a0df4a041fb0e1bad774d6b2dc4b380a848d17ba))
* **ui:** add typed data layer for subnet weights activity ([#3680](https://github.com/galuis116/metagraphed/issues/3680)) ([f833890](https://github.com/galuis116/metagraphed/commit/f83389060a84d2e52e3306e40965a858bc0535eb))
* **ui:** add typed data layer for the account /portfolio endpoint ([#3595](https://github.com/galuis116/metagraphed/issues/3595)) ([44f4b18](https://github.com/galuis116/metagraphed/commit/44f4b1846928050f671d7df12090bfe42b4a92c7)), closes [#3491](https://github.com/galuis116/metagraphed/issues/3491)
* **ui:** add validatorsQuery and GlobalValidator types ([#3564](https://github.com/galuis116/metagraphed/issues/3564)) ([690efb6](https://github.com/galuis116/metagraphed/commit/690efb665e51389ffead5ce0b6c8ead947d9b7e3))
* **ui:** extract shared use-refetch-interval hook (visibility-gated polling) ([#3768](https://github.com/galuis116/metagraphed/issues/3768)) ([f6869db](https://github.com/galuis116/metagraphed/commit/f6869dbd31dab18c093a521864a4bccbbfcb8d79))
* **ui:** recognize sn&lt;netuid&gt; / netuid &lt;n&gt; shorthand in the omnibox and command palette ([#3923](https://github.com/galuis116/metagraphed/issues/3923)) ([8b25fb7](https://github.com/galuis116/metagraphed/commit/8b25fb7b148d6adb08f90f8ad02775911bf61c78))
* **ui:** surface account deregistration activity ([#3879](https://github.com/galuis116/metagraphed/issues/3879)) ([8be7051](https://github.com/galuis116/metagraphed/commit/8be7051ca6da4b295333606f83e6e72ba5594ef7)), closes [#3729](https://github.com/galuis116/metagraphed/issues/3729)
* **ui:** surface axon-removal teardown activity in the subnet operational panel ([#3882](https://github.com/galuis116/metagraphed/issues/3882)) ([8f39d21](https://github.com/galuis116/metagraphed/commit/8f39d21145175202bde9380b5c9c3dc970dd264c))
* **ui:** surface subnet stake-moves (re-delegation) in the economics panel ([#3753](https://github.com/galuis116/metagraphed/issues/3753)) ([4f070b5](https://github.com/galuis116/metagraphed/commit/4f070b5e5429ec2799011e833f50dd8e24da34b4)), closes [#3485](https://github.com/galuis116/metagraphed/issues/3485)
* **ui:** URL-back Providers filters and ShareButton ([#3419](https://github.com/galuis116/metagraphed/issues/3419)) ([#3713](https://github.com/galuis116/metagraphed/issues/3713)) ([2d35287](https://github.com/galuis116/metagraphed/commit/2d352873982bf1b217dcc5e77eee1752f6f58327))
* **ui:** wire Download CSV on Extrinsics page ([#3872](https://github.com/galuis116/metagraphed/issues/3872)) ([5a8dea8](https://github.com/galuis116/metagraphed/commit/5a8dea80959cf1ba4ec2e8ae630fbb9180a4b0ca))
* **ui:** wire Download CSV on Surfaces and Endpoints pages ([#3817](https://github.com/galuis116/metagraphed/issues/3817)) ([3b09bc2](https://github.com/galuis116/metagraphed/commit/3b09bc21e411227818f7bb6024e444bccd78cbd3))
* **ui:** wire semantic search into the command palette ([#3847](https://github.com/galuis116/metagraphed/issues/3847)) ([6d40a55](https://github.com/galuis116/metagraphed/commit/6d40a55738effed2d299deadd98feba886c9d5bc))


### Bug Fixes

* **client:** commit packages/client/dist -- eliminate the deploy-time build ([#3294](https://github.com/galuis116/metagraphed/issues/3294)) ([98946ad](https://github.com/galuis116/metagraphed/commit/98946ad9a15879d08d3d608f8abc4204e96d1cba))
* **deps:** update radix-ui-primitives monorepo ([#3828](https://github.com/galuis116/metagraphed/issues/3828)) ([4d31a1e](https://github.com/galuis116/metagraphed/commit/4d31a1e6220ff9fa1a58803dca253d4c48cc8d68))
* **deps:** update react monorepo to ^19.2.7 ([#3840](https://github.com/galuis116/metagraphed/issues/3840)) ([e223fe5](https://github.com/galuis116/metagraphed/commit/e223fe586df1e16a9af8851a16cf788ba91830c4))
* **deps:** update tanstack-router monorepo ([#3843](https://github.com/galuis116/metagraphed/issues/3843)) ([65aa3a0](https://github.com/galuis116/metagraphed/commit/65aa3a045f00f0fe30f1e51e4c9ce2dc4a5761d2))
* resolve subnet Gaps tab using wrong data source ([#3604](https://github.com/galuis116/metagraphed/issues/3604)) ([8ddd743](https://github.com/galuis116/metagraphed/commit/8ddd743b3cbc27d010ee907f8fe0be285a4c0e98)), closes [#3348](https://github.com/galuis116/metagraphed/issues/3348)
* **ui:** add absolute timestamp tooltip to TimeAgo ([#3391](https://github.com/galuis116/metagraphed/issues/3391)) ([#3805](https://github.com/galuis116/metagraphed/issues/3805)) ([aaa5401](https://github.com/galuis116/metagraphed/commit/aaa540138ab547ecae705af78c21fff2fe05de52))
* **ui:** add aria-label summaries to BarMini and Donut ([#3430](https://github.com/galuis116/metagraphed/issues/3430)) ([#3848](https://github.com/galuis116/metagraphed/issues/3848)) ([094c776](https://github.com/galuis116/metagraphed/commit/094c776fe9ecb8a6479d525a64b9e7831ccab885))
* **ui:** add netuid filter dropdown on Surfaces page ([#3746](https://github.com/galuis116/metagraphed/issues/3746)) ([511f5f2](https://github.com/galuis116/metagraphed/commit/511f5f2861deb7114599301ba78e7e8039031379))
* **ui:** add visible keyboard focus ring to SelectFilter and PageSizeSelect ([#3915](https://github.com/galuis116/metagraphed/issues/3915)) ([acde989](https://github.com/galuis116/metagraphed/commit/acde989deb89b6a290d0a66bfaf4cef28a679bc9))
* **ui:** audit unexplained exhaustive-deps eslint-disables ([#3671](https://github.com/galuis116/metagraphed/issues/3671)) ([225e55f](https://github.com/galuis116/metagraphed/commit/225e55ff80fffbcd58d516a07efa7c239e694aac))
* **ui:** block reserved external link hosts ([#3521](https://github.com/galuis116/metagraphed/issues/3521)) ([6191535](https://github.com/galuis116/metagraphed/commit/619153549dc1cc940a9ed05eaafa940ee45ce404))
* **ui:** clamp command palette width off the viewport edge on mobile ([#3869](https://github.com/galuis116/metagraphed/issues/3869)) ([4b985fd](https://github.com/galuis116/metagraphed/commit/4b985fd842a4b5fa0d6e1558eb782ee32d455f7b))
* **ui:** collapse multi-line union types to satisfy prettier ([0dc8968](https://github.com/galuis116/metagraphed/commit/0dc8968233a0905f8808156797ef321aea9bcbbe))
* **ui:** collapse the NavOmnibox 'Jump to' grid to 2 columns on mobile ([#3903](https://github.com/galuis116/metagraphed/issues/3903)) ([861aeec](https://github.com/galuis116/metagraphed/commit/861aeec02f3b43767c0638312625eee81710b51c))
* **ui:** give SearchInput an accessible name ([#3593](https://github.com/galuis116/metagraphed/issues/3593)) ([223a098](https://github.com/galuis116/metagraphed/commit/223a098b3476738831e57ad372b8b74228e3ff31))
* **ui:** guard event-kind map lookups ([#3747](https://github.com/galuis116/metagraphed/issues/3747)) ([8065e69](https://github.com/galuis116/metagraphed/commit/8065e6968e62638e84dc0c6a89049fccfcd1fc2d))
* **ui:** keep scroll position when typing in a page search box ([#3744](https://github.com/galuis116/metagraphed/issues/3744)) ([cd44d81](https://github.com/galuis116/metagraphed/commit/cd44d8153ccb3a410d96ef2fd76141c76a74730c)), closes [#3691](https://github.com/galuis116/metagraphed/issues/3691)
* **ui:** point the omnibox/command-palette typeahead at the slim /search-index ([#3534](https://github.com/galuis116/metagraphed/issues/3534)) ([bd20037](https://github.com/galuis116/metagraphed/commit/bd200377c64eea274f5d7c3cb60146d5fd68df1a))
* **ui:** raise NetworkSwitcher and SettingsPopover triggers to 44px tap targets ([#3916](https://github.com/galuis116/metagraphed/issues/3916)) ([ee3e4f1](https://github.com/galuis116/metagraphed/commit/ee3e4f1e50cd81e2faa14a005343bcdb465bc5c0))
* **ui:** show daily-rollup freshness on the validators panel ([#3846](https://github.com/galuis116/metagraphed/issues/3846)) ([cb1e76c](https://github.com/galuis116/metagraphed/commit/cb1e76c6b0ec5bf2d8e8670bff9c251d28592eee)), closes [#3380](https://github.com/galuis116/metagraphed/issues/3380)
* **ui:** skeleton for account extrinsics and transfers while loading ([#3737](https://github.com/galuis116/metagraphed/issues/3737)) ([e80f914](https://github.com/galuis116/metagraphed/commit/e80f91421f08274652c0cbfe2327f4adaf5592cf))
* **ui:** stabilize TimeRange setRange and drop the exhaustive-deps disable ([#3705](https://github.com/galuis116/metagraphed/issues/3705)) ([eac68c0](https://github.com/galuis116/metagraphed/commit/eac68c0474ce595b29a5923fad692d59a4a74e76)), closes [#3460](https://github.com/galuis116/metagraphed/issues/3460)
* **ui:** surface a real error state on the account chain-events feed ([#3924](https://github.com/galuis116/metagraphed/issues/3924)) ([b24bb96](https://github.com/galuis116/metagraphed/commit/b24bb96118fb4a5b57e1085a00df061028105da4))
* **ui:** wire Download CSV into NeuronTable footer ([#3810](https://github.com/galuis116/metagraphed/issues/3810)) ([6d4237c](https://github.com/galuis116/metagraphed/commit/6d4237c5f0f21b134352d93cd8f8540fd923ae8f))
* **ui:** wire NavOmnibox combobox a11y (role, aria-controls, active-descendant) ([#3721](https://github.com/galuis116/metagraphed/issues/3721)) ([fa79be1](https://github.com/galuis116/metagraphed/commit/fa79be1a26d72b14a80d09d8411fc7d11a251532)), closes [#3456](https://github.com/galuis116/metagraphed/issues/3456)


### Documentation

* **registry:** remove retired candidate lane and stale apps/ui docs ([#3926](https://github.com/galuis116/metagraphed/issues/3926)) ([c1cdb85](https://github.com/galuis116/metagraphed/commit/c1cdb85042c3ab8e4a56c5abba8cdf4e513c7ddc))

## [0.2.0](https://github.com/JSONbored/metagraphed/compare/ui-v0.1.0...ui-v0.2.0) (2026-07-05)

### Features

- **ui:** add shared event-kind label and category map ([#3563](https://github.com/JSONbored/metagraphed/issues/3563)) ([1e6f56d](https://github.com/JSONbored/metagraphed/commit/1e6f56d77ae0f42b97222925e82068cbf839d92c)), closes [#3366](https://github.com/JSONbored/metagraphed/issues/3366)
- **ui:** add validatorsQuery and GlobalValidator types ([#3564](https://github.com/JSONbored/metagraphed/issues/3564)) ([690efb6](https://github.com/JSONbored/metagraphed/commit/690efb665e51389ffead5ce0b6c8ead947d9b7e3))

### Bug Fixes

- **client:** commit packages/client/dist -- eliminate the deploy-time build ([#3294](https://github.com/JSONbored/metagraphed/issues/3294)) ([98946ad](https://github.com/JSONbored/metagraphed/commit/98946ad9a15879d08d3d608f8abc4204e96d1cba))
- **ui:** block reserved external link hosts ([#3521](https://github.com/JSONbored/metagraphed/issues/3521)) ([6191535](https://github.com/JSONbored/metagraphed/commit/619153549dc1cc940a9ed05eaafa940ee45ce404))
- **ui:** point the omnibox/command-palette typeahead at the slim /search-index ([#3534](https://github.com/JSONbored/metagraphed/issues/3534)) ([bd20037](https://github.com/JSONbored/metagraphed/commit/bd200377c64eea274f5d7c3cb60146d5fd68df1a))

## [Unreleased]

### Added

- Public `/status` page — an overall system verdict (operational / degraded /
  partial outage) plus a recent cross-subnet incident ledger, from
  `/api/v1/health` + `/api/v1/incidents`.
- Issue templates (bug report / feature request) with a contact link routing
  data corrections to the backend repo; `CHANGELOG.md`; `FUNDING.yml`.
