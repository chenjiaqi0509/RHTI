const url = 'https://itunes.apple.com/search?term=Radiohead+Creep&entity=song&limit=1';
fetch(url).then(r=>r.json()).then(d => {
  console.log('Creep:', d.results[0].previewUrl, d.results[0].artworkUrl100);
});
