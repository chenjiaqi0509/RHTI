const url = 'https://itunes.apple.com/search?term=Radiohead+Hail+to+the+Thief&entity=album&limit=1';
fetch(url).then(r=>r.json()).then(d => {
  if (d.results.length > 0) {
    const r = d.results[0];
    console.log(JSON.stringify({ id: r.collectionId, artwork: r.artworkUrl100.replace('100x100bb', '600x600bb') }, null, 2));
  }
});
