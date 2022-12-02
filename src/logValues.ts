import { YoutubeVideo } from './interface';

export const logValues = (data: Array<YoutubeVideo>) => {
  const sortedData = data.sort(
    (a, b) => a.watchDates.length - b.watchDates.length,
  );
  sortedData
    .filter((video) => video.watchDates.length > 3)
    .forEach(({ title, channel, watchDates, url }) => {
      console.log('--------------------------------------');
      console.log(`Video: ${title}`);
      console.log(`Link: ${url}`);
      console.log(`From channel: ${channel.name}`);
      console.log(`View count: ${watchDates.length}`);
    });
  console.log('Total unique video viewed', sortedData.length);
  console.log(
    'Total view count',
    sortedData.reduce((acc, curr) => acc + curr.watchDates.length, 0),
  );
};
