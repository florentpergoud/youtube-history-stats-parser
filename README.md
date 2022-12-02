# Youtube history stats parser

A node.js parser to extract data from Youtube History HTML file.

The default console output will show you your history sorted by number of watch.
Here for example is the video I watched the most in my history data:

![image](https://user-images.githubusercontent.com/11575645/151369125-63abac4d-3e73-4544-9177-dcccc1620e22.png)

## Getting the data

To get your history data :

- Go to https://takeout.google.com/settings/takeout
- Login with the account you want the data from
- Then unselect all data source with the dedicated button
- Go to the bottom of the page and check `YouTube et YouTube Music ` then `Next step`
- Select `Export one time` then `Create an export`
- You will be informed by email when the export is ready.
- You want to look for the `Takeout/YouTube and YouTube Music/history/watch-history.html` in your export uncompressed folder

## Installation

IT requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies.
Build the typescript

```sh
yarn build
```

Place your `watch-history.html` file in `build/assets/watch-history.html`
Launch the script (this could take a while)

```sh
yarn start
```

## Customization

As you can see in the `src/interface.ts`, there is more data than the ones shown in the console by default :

```ts
export interface YoutubeVideo {
  url: string;
  title: string;
  channel: {
    name: string;
    url: string;
  };
  watchDates: string[];
}
```

You can already select only a year by using `src/filters/filterDataForYear`

## License

Apache-2.0
