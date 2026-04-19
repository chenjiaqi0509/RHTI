const tracks = [
  "Radiohead Creep",
  "Radiohead Fake Plastic Trees",
  "Radiohead Karma Police",
  "Radiohead Everything In Its Right Place",
  "Radiohead Pyramid Song",
  "Radiohead There There",
  "Radiohead Weird Fishes",
  "Radiohead Lotus Flower",
  "Radiohead Daydreaming"
];

async function fetchTracks() {
  for (const t of tracks) {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(t)}&entity=song&limit=1`;
    const r = await fetch(url);
    const d = await r.json();
    if (d.results.length > 0) {
      console.log(t, '\n  preview:', d.results[0].previewUrl, '\n  artwork:', d.results[0].artworkUrl100.replace('100x100bb', '600x600bb'));
    }
  }
}
fetchTracks();
