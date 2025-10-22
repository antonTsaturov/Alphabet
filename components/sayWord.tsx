import SoundPlayer from "react-native-sound-player";
import { generateSequence } from './utility';
import Snackbar from "react-native-snackbar";


export let sayWordError;
export let sayWordpathToFile;
let pathPrevious;

export const sayWord = async (mode: string, file?: Object) => {
  try {
    let path;
    let volume;

    if (mode == 'repeat') {
      path = pathPrevious;
      volume = 'normal';
    }

    if (mode == 'new') {
      path == null ? path = generateSequence() : null;
      pathPrevious = path;
      volume = 'normal';
    }

    if (mode == 'success') {
      path = require('../assets/sound/success2.mp3');
      volume = 'quiet';
    }

    if (mode == 'fail') {
      path = require('../assets/sound/fail.mp3');
      volume = 'quiet';
    }

    if (mode == 'alphabet') {
      path = file;
      volume = 'quiet';
    }

    if (mode == 'effect') {
      path = require('../assets/sound/bulkBtn.mp3');
      volume = 'quiet';
    }

    if (mode != 'stop') {
      try {
        volume == 'quiet' ? SoundPlayer.setVolume(0.2) : SoundPlayer.setVolume(1);
        SoundPlayer.playAsset(path);
      } catch (err) {
        console.log(`sayWord cannot play file!!!`, err);
      }
    } else {
      SoundPlayer.stop();
    }
  } catch (err) {
    console.log('sayWord error!!:', err);
    Snackbar.show({
      text: err,
      duration: Snackbar.LENGTH_SHORT,
    });
  }
}
