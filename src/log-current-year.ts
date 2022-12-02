import { getData } from './getData';
import { logValues } from './logValues';

const currentYearData = async () => {
  try {
    const todaysDate = new Date();
    const currentYear = todaysDate.getFullYear();
    const { viewingHistory, mostRecentDataDate, oldestDataDate } =
      await getData(currentYear);

    logValues(viewingHistory);

    console.log('most recent data date', mostRecentDataDate);
    console.log('oldest data date', oldestDataDate);

    process.exit();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

currentYearData();
