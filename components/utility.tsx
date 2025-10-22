import { mode } from './demoChecker';
import { alphabetRus, find } from './alphabets';


// This obj save index of the current bachground image //
export const saveIndex = [
  {current:''}
];

// Utils for Find letter game (random index generator and checker) //
export let dataRow;
export let indexLog = [];
export let errors;
export const generateSequence = () => {
  let result;
  try {
    let sequence = Math.floor(Math.random() * alphabetRus.length);
    //indexLog[indexLog.length - 1] == sequence ? sequence++ : null;
    indexLog.push(sequence);
    result = Object.values(find)[sequence].findLetter;
    dataRow = Object.values(alphabetRus)[sequence];
    //console.log(Object.values(alphabetRus)[sequence]);



  } catch (error) {
    errors = error;
    console.log('generateSequence ERROR: ', error);

  }
  return result;
}

export const checkLetter = (letter) => {
  let result;
  letter == dataRow.letter ? result = true : result = false;
  console.log('Checker: ', result );
  return result;

}

export const parseDate = (date:string) => {
  let dateParsed = Date.parse(date);
  //console.log(dateParsed);
  return dateParsed;
}

export const compareDate = (date: string) => {
  let now = Date.now();
  let validUntillTimestamp = parseDate(date);
  let result = validUntillTimestamp - now;

  console.log('compareDate:', result);
  return result;
}

export const prettyDate = (date: string) => {
  let dateObj = new Date(Date.parse(date));
  const formatedDate = dateObj.toLocaleString(
    "ru-RU",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
        // hour: "2-digit",
        // minute: "2-digit",
        // second: "2-digit",
      }
  );
  //console.log(formatedDate);
  return formatedDate;
}

let i = 0;
export const tapCounter = () => {
  if (mode == 'demo') {
    i++;
    //console.log('tapCounter: Pressed: ', i);
    return i;
  } else {
    return null;
  }
}
