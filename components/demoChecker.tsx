import {storeData} from './storeData';
import {prettyDate, compareDate} from './utility';


export let mode;
export let validUntill;
export const demoChecker = async () => {

  let isPayed = await storeData('get', 'subscriptionActive');
  if (isPayed == null) {
    mode = 'demo';
    validUntill = null;
  } else {
    let isDateValid = compareDate((JSON.parse(isPayed)).valid)
    if (isDateValid >=0) {
      mode = 'fullVersion'
      validUntill = prettyDate(JSON.parse(isPayed).valid)
    } else {
      mode = 'demo';
      validUntill = null;
    }
  }

  console.log('demoChecker: activated mode:', mode);
  return mode;
}
