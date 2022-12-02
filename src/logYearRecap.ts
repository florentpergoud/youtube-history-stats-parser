export const logYearRecap = ({ topArtists, topVideos }) => {
  console.log('--------------------------------------');
  console.log('Here is your Youtube music video recap off the year');
  console.log('--------------------------------------');
  console.log('Top artists');
  topArtists.forEach(({ name, watchCount }) => {
    console.log(`${name}: ${watchCount} views`);
  });
  console.log('--------------------------------------');
  console.log('Top videos');
  topVideos.forEach(({ title, artist, watchCount }) => {
    console.log(`${title} by ${artist}: ${watchCount} views`);
  });
};
