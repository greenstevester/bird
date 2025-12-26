import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it } from 'vitest';
import { formatVersionLine, resolveGitSha, resolvePackageVersion } from '../src/lib/version.js';

describe('getCliVersion', () => {
  afterEach(() => {
    delete process.env.BIRD_VERSION;
    delete process.env.BIRD_GIT_SHA;
  });

  it('reads package.json version when available', () => {
    const raw = readFileSync(fileURLToPath(new URL('../package.json', import.meta.url)), 'utf8');
    const pkg = JSON.parse(raw) as { version?: unknown };
    expect(resolvePackageVersion()).toBe(pkg.version);
  });

  it('formats injected version + sha', () => {
    process.env.BIRD_VERSION = '9.9.9';
    process.env.BIRD_GIT_SHA = 'abcdef123456';
    expect(formatVersionLine('not a url')).toBe('9.9.9 (abcdef12)');
  });

  it('adds git sha when available', () => {
    const version = resolvePackageVersion();
    const sha = resolveGitSha();
    expect(sha).toMatch(/^[0-9a-f]{8}$/);
    expect(formatVersionLine()).toBe(`${version} (${sha})`);
  });
});
