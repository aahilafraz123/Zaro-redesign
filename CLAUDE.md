# Zaro Redesign

## Tooling
- Always use Context7 MCP when generating code or setup steps that depend on a
  specific library or framework version, without needing to be asked.
- Use the shadcn MCP (`.mcp.json`) to add shadcn/ui and React Bits components.
  Once the app is scaffolded and `components.json` exists, add the React Bits registry:
  `"registries": { "@react-bits": "https://reactbits.dev/r/{name}.json" }`
- Use Playwright MCP to click through and verify UI changes; use Chrome DevTools MCP
  for console, network, and performance inspection.
- Follow the `gpt-taste` skill (`.claude/skills/gpt-taste`) for frontend design work.
