with open('src/components/LandingHeroVisuals.jsx', 'r') as f:
    content = f.read()

# React variables in destructuring like `{ Tile }` need to be uppercase to be used as components like `<Tile />`.
# Wait, it IS uppercase, but ESLint is throwing `no-unused-vars` because it's not configured with eslint-plugin-react correctly, or `react/jsx-uses-vars` is missing.
# Let's see how we can fix this.
# A quick fix is to alias it inside the map, or use React.createElement, or just disable the eslint rule for that line.
# Actually, the error says 'Tile' is defined but never used. Let's alias it: `items.map((item) => { const Tile = item.Tile; return ... })`
# Or `eslint-disable-next-line no-unused-vars`

content = content.replace(
    "{items.map(({ id, title, subtitle, Tile }) => (",
    "{items.map(({ id, title, subtitle, Tile: TileComp }) => ("
).replace(
    '<div className="hv-tile"><Tile /></div>',
    '<div className="hv-tile"><TileComp /></div>'
)

with open('src/components/LandingHeroVisuals.jsx', 'w') as f:
    f.write(content)
