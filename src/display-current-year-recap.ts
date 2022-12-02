import { formatCurrentYear } from './format-current-year';
import { getData } from './getData';
import { logYearRecap } from './logYearRecap';

const displayCurrentYearRecap = async () => {
  try {
    const todaysDate = new Date();
    const currentYear = todaysDate.getFullYear();
    const { viewingHistory } = await getData(currentYear);

    const { topArtists, topVideos } = formatCurrentYear(viewingHistory);

    logYearRecap({ topArtists, topVideos });

    process.exit();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

displayCurrentYearRecap();
