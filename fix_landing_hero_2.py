with open('src/components/LandingHeroVisuals.jsx', 'r') as f:
    content = f.read()

# Let's just use eslint-disable-next-line
content = content.replace(
    "{items.map(({ id, title, subtitle, Tile: TileComp }) => (",
    "{/* eslint-disable-next-line no-unused-vars */}\n                    {items.map(({ id, title, subtitle, Tile: TileComp }) => ("
)

with open('src/components/LandingHeroVisuals.jsx', 'w') as f:
    f.write(content)
