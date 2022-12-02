import { YoutubeVideo } from './interface';

export const formatCurrentYear = (data: Array<YoutubeVideo>) => {
  const videos = data
    .filter((video) => video.watchDates.length > 3)
    .map(({ title, channel, watchDates }) => {
      return {
        title,
        channel,
        watchCount: watchDates.length,
      };
    });

  const videosByArtist = videos.reduce((acc, video) => {
    const {
      channel: { name },
    } = video;
    if (acc[name]) {
      acc[name].watchCount += video.watchCount;
    } else {
      acc[name] = { watchCount: video.watchCount };
    }
    return acc;
  }, {});

  const topArtists = Object.keys(videosByArtist)
    .map((artistName) => {
      return {
        name: artistName,
        watchCount: videosByArtist[artistName].watchCount,
      };
    })
    .sort((a, b) => b.watchCount - a.watchCount)
    .splice(0, 5);

  const topVideos = videos
    .map(({ title, channel: { name }, watchCount }) => {
      return {
        title,
        artist: name,
        watchCount,
      };
    })
    .sort((a, b) => b.watchCount - a.watchCount)
    .slice(0, 5);

  return {
    topArtists,
    topVideos,
  };
};
