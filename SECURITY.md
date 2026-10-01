# Security Policy

## Supported versions

| Version | Supported |
|---|---|
| 2.x | ✅ |
| < 2.0 | ❌ |

## Reporting a vulnerability

Please do **not** open a public issue. Use GitHub's private reporting:
**Security** tab → **Report a vulnerability**, or email manoke@hotmail.co.za.
You will receive an acknowledgement within 7 days.

## Security design

- `contextIsolation` is enabled and `nodeIntegration` is disabled in the renderer.
- The preload script exposes a single function (`print`) through `contextBridge`.
- The renderer loads MathJax (jsDelivr) and Google Fonts over HTTPS; no other remote code is executed.
- Release executables are built by GitHub Actions from tagged source and published with SHA256 checksums.
  They are not code signed.
