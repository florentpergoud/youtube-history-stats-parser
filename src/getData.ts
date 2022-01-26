import { JSDOM } from 'jsdom';

export const getData = async (): Promise<
  Array<{
    url: string;
    title: string;
    channel: {
      name: string;
      url: string;
    };
    watchDates: Array<Date>;
  }>
> => {
  const dom = await JSDOM.fromFile('build/assets/watch-history.html');
  const { document } = dom.window;
  const viewingHistory: Array<{
    url: string;
    title: string;
    channel: {
      name: string;
      url: string;
    };
    watchDates: Array<Date>;
  }> = [];

  document.body.firstChild.childNodes.forEach((cardNode: HTMLDivElement) => {
    if (!cardNode.hasChildNodes()) {
      return;
    }
    const textContainerDiv = cardNode.firstChild as HTMLDivElement;
    if (!textContainerDiv.hasChildNodes()) {
      return;
    }

    const linkContainer = textContainerDiv.childNodes[1] as HTMLDivElement;
    if (!linkContainer.hasChildNodes()) {
      return;
    }
    const linkContainerChildNodes: Array<ChildNode> = [];
    linkContainer.childNodes.forEach((childNode) => {
      if (childNode.textContent) {
        linkContainerChildNodes.push(childNode);
      }
    });

    if (linkContainerChildNodes.length !== 4) return;

    const link = linkContainerChildNodes[1] as HTMLAnchorElement;
    const channel = linkContainerChildNodes[2] as HTMLAnchorElement;
    const date = linkContainerChildNodes[3] as HTMLElement;

    if (!link.hasChildNodes() || !channel.hasChildNodes()) {
      return;
    }

    const title = link.textContent;
    const href = link.href;
    const channelName = channel.textContent;
    const channelUrl = channel.href;
    const watchDate = new Date(date.textContent);

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
  });

  return viewingHistory;
};
