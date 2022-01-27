import { YoutubeVideo } from '../interface';

export const filterDataForYear = (data: Array<YoutubeVideo>, year: number) => {
  return data
    .map((video) => {
      const filteredVideo = {
        ...video,
      };
      filteredVideo.watchDates = video.watchDates.filter((date) => {
        return date.includes(year.toString());
      });
      return filteredVideo;
    })
    .filter((video) => video.watchDates.length > 0);
};
