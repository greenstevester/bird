# Changelog

## Unreleased

## 0.1.0 — 2025-12-05

### Added
- `whoami` command works with both GraphQL cookies and Sweetistics API keys.
- Firefox cookie extraction (`--firefox-profile`) alongside existing Chrome/env/CLI credential paths.
- Sweetistics client `getCurrentUser` with POST→GET fallback for deployments that disallow POST.
- Colorized help banner and example block; `pnpm bird` builds then runs the CLI; no subcommand shows help.
- JSON5 config files (`~/.config/bird/config.json5`, `./.birdrc.json5`) for defaults like engine and browser profile.
- Config toggles to disable cookie sources (`allowChrome`, `allowFirefox`) and default transport now `graphql` with Firefox as preferred cookie source.
- Conversation commands: `thread` and `replies`, plus `search` and `mentions` convenience helpers.
- Sweetistics transport for all commands (tweet, reply, read, thread, replies, search) with automatic 15s timeouts and media uploads (images or single video).
- Sweetistics conversation fetch now forces fresh data (`force=true`) to bypass cache for `thread`/`replies`.
- CI workflow on push/PR (Node 22, pnpm 10, Go stable) running `pnpm test`.

### Changed
- Default option resolution now honors config files (project then global) before env/CLI overrides.
- `whoami` now prefers Sweetistics when an API key is present; otherwise uses Twitter cookies.
- Sweetistics media uploads use the Sweetistics engine only; GraphQL mode rejects mixed media.

### Fixed
- Fallback to scraping the authenticated settings page when Twitter account APIs return 404, so `whoami` still resolves the user.
- Sweetistics calls now time out after 15s to avoid hanging CLI commands when the API is slow or unresponsive.
- Sweetistics tweeting now supports media uploads (images or single video) via new CLI `--media/--alt` flags.
- Coverage raised above 70% via new cookie and conversation tests.
