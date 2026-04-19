const url = 'https://itunes.apple.com/search?term=Radiohead&entity=album&limit=50';
fetch(url).then(r=>r.json()).then(d => {
  const dict: any = {};
  d.results.forEach((r: any) => {
    dict[r.collectionName] = { id: r.collectionId, artwork: r.artworkUrl100.replace('100x100bb', '600x600bb') };
  });
  console.log(JSON.stringify(dict, null, 2));
});
