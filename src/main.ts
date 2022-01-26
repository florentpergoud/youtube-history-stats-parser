import { getData } from './getData';

const displayData = async () => {
  try {
    const parsedData = await getData();
    const sortedData = parsedData.sort(
      (a, b) => b.watchDates.length - a.watchDates.length,
    );
    console.log('sortedData', JSON.stringify(sortedData, null, 2));
    console.log('sortedData.length', sortedData.length);
    console.log(
      'Visionning number',
      sortedData.reduce((acc, cur) => acc + cur.watchDates.length, 0),
    );
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

displayData();
