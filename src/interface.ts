export interface YoutubeVideo {
  url: string;
  title: string;
  channel: {
    name: string;
    url: string;
  };
  watchDates: string[];
}
