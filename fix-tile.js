const fs = require('fs');
let code = fs.readFileSync('src/components/LandingHeroVisuals.jsx', 'utf8');
code = code.replace(/\{ id: 'autoencoder', title: 'Encoder → Decoder', subtitle: 'Compress information into a tiny latent — then reconstruct it.', Tile: EncoderDecoderTile \},/, "{ id: 'autoencoder', title: 'Encoder → Decoder', subtitle: 'Compress information into a tiny latent — then reconstruct it.' },");
code = code.replace(/\{ id: 'attention', title: 'Self-Attention', subtitle: 'Each token decides which other tokens matter to it.', Tile: AttentionTile \},/, "{ id: 'attention', title: 'Self-Attention', subtitle: 'Each token decides which other tokens matter to it.' },");
code = code.replace(/\{ id: 'cnn', title: 'Convolutional Stacks', subtitle: 'Layer by layer, edges become shapes — shapes become objects.', Tile: CNNTile \},/, "{ id: 'cnn', title: 'Convolutional Stacks', subtitle: 'Layer by layer, edges become shapes — shapes become objects.' },");
code = code.replace(/\{ id: 'diffusion', title: 'Diffusion', subtitle: 'Start from noise, denoise step by step until an image appears.', Tile: DiffusionTile \},/, "{ id: 'diffusion', title: 'Diffusion', subtitle: 'Start from noise, denoise step by step until an image appears.' },");
code = code.replace(/\{items\.map\(\(\{ id, title, subtitle, Tile \}\) => \(/g, "{items.map(({ id, title, subtitle }) => (");
code = code.replace(/<div className=\"hv-tile\"><Tile \/><\/div>/g, '<div className="hv-tile"></div>');
fs.writeFileSync('src/components/LandingHeroVisuals.jsx', code);
