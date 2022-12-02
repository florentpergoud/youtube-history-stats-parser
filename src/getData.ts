import { JSDOM } from 'jsdom';
import { YoutubeVideo } from './interface';

export const getData = async (
  specifiedYear?: number,
): Promise<{
  viewingHistory: Array<YoutubeVideo>;
  mostRecentDataDate: string;
  oldestDataDate: string;
}> => {
  const dom = await JSDOM.fromFile('build/assets/watch-history.html');
  const { document } = dom.window;
  const viewingHistory: Array<{
    url: string;
    title: string;
    channel: {
      name: string;
      url: string;
    };
    watchDates: Array<string>;
  }> = [];

  let mostRecentDataDate: string;
  let oldestDataDate: string;

  const dataNodes = document.body.firstChild.childNodes;

  [...dataNodes].every((cardNode: HTMLDivElement, index: number) => {
    if (!cardNode.hasChildNodes()) {
      return true;
    }
    const textContainerDiv = cardNode.firstChild as HTMLDivElement;
    if (!textContainerDiv.hasChildNodes()) {
      return true;
    }

    const linkContainer = textContainerDiv.childNodes[1] as HTMLDivElement;
    if (!linkContainer.hasChildNodes()) {
      return true;
    }
    const linkContainerChildNodes: Array<ChildNode> = [];
    linkContainer.childNodes.forEach((childNode) => {
      if (childNode.textContent) {
        linkContainerChildNodes.push(childNode);
      }
    });

    if (linkContainerChildNodes.length !== 4) return true;

    const link = linkContainerChildNodes[1] as HTMLAnchorElement;
    const channel = linkContainerChildNodes[2] as HTMLAnchorElement;
    const date = linkContainerChildNodes[3] as HTMLElement;

    if (!link.hasChildNodes() || !channel.hasChildNodes()) {
      return true;
    }

    const title = link.textContent;
    const href = link.href;
    const channelName = channel.textContent;
    const channelUrl = channel.href;
    const watchDate = date.textContent
      .replace('\xc3\xa9', 'é')
      .replace('A»', 'û')
      .replace('Ã»', 'û')
      .normalize('NFC');

    if (specifiedYear && !watchDate.includes(specifiedYear.toString())) {
      return false;
    }

    const indexOfVideoInList = viewingHistory.findIndex(
      (video) => video.url == href,
    );

    if (indexOfVideoInList === -1) {
      viewingHistory.push({
        url: href,
        title,
        channel: {
          name: channelName,
          url: channelUrl,
        },
        watchDates: [watchDate],
      });
    } else {
      viewingHistory[indexOfVideoInList].watchDates.push(watchDate);
    }

    if (index === 0) {
      mostRecentDataDate = watchDate;
    }

    oldestDataDate = watchDate;

    return true;
  });

  return { viewingHistory, mostRecentDataDate, oldestDataDate };
};
