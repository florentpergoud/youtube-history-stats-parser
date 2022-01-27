import { getData } from './getData';
import { logValues } from './logValues';

const displayData = async () => {
  try {
    const { viewingHistory, mostRecentDataDate, oldestDataDate } =
      await getData();

    logValues(viewingHistory);

    console.log('most recent data date', mostRecentDataDate);
    console.log('oldest data date', oldestDataDate);

    process.exit();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

displayData();
