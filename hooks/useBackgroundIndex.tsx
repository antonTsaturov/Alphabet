import { useState } from 'react';
import { backgrounds } from '../components/backPics';
import { saveIndex } from '../components/utility';


saveIndex.current == undefined ? saveIndex.current = 0 : null

export const useBackgroundIndex = (prevIndex) => {
  const [index, setIndex] = useState(saveIndex.current);

  const getIndex = () => {
    setIndex((prevIndex) =>
      (prevIndex + 1) % backgrounds.length
    )
  }
  //console.log(saveIndex.current);

  saveIndex.current = index;
  return [index, getIndex];
}
