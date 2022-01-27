import { YoutubeVideo } from './interface';

export const logValues = (data: Array<YoutubeVideo>) => {
  const sortedData = data.sort(
    (a, b) => a.watchDates.length - b.watchDates.length,
  );
  sortedData.forEach(({ title, channel, watchDates }) => {
    console.log('--------------------------------------');
    console.log(`Video ${title}`);
    console.log(`from channel ${channel.name}`);
    console.log('View count', watchDates.length);
  });
  console.log('Total unique video viewed', sortedData.length);
  console.log(
    'Total view count',
    sortedData.reduce((acc, curr) => acc + curr.watchDates.length, 0),
  );
};
