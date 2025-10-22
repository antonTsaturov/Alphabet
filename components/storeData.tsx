import  AsyncStorage  from '@react-native-async-storage/async-storage';

import {genPaymentInfo} from './paymentHandler';

let response;
export const storeData = async(mode, key, value) => {

  let paymentInfo;

  if (mode == 'save') {
    try {
      if (key == 'Unconfirmed') {
        await AsyncStorage.setItem(key, value);
        console.log('storeData save key: ', key, 'with value:  ', value)
      } else {
        paymentInfo = await genPaymentInfo(value);
        let jsonedPaymentInfo = await JSON.stringify(paymentInfo);
        await AsyncStorage.setItem(key, jsonedPaymentInfo);
        console.log('storeData save key: ', key, 'with value:  ', jsonedPaymentInfo)
      }

      response = true;

    } catch (error) {
      console.log('Error in storeData(save mode):', key,  error)
      response = false;
    }
  }

  if (mode == 'remove') {
    try {
      await AsyncStorage.removeItem(key);
      console.log('storeData: data with key', key, ' was deleted!')

    } catch (error) {
      console.log('Error in storeData(remove mode): ', key, error)
    }
  }

  if (mode == 'get') {
    try {
      let paymentData = await AsyncStorage.getItem(key);
      paymentData != null ? response = paymentData : response = null;
      console.log('storeData: paymentData is', paymentData, ' key is: ', key);

    } catch (error) {
      console.log('Error in storeData(get mode): ',key, error)
    }
  }

  //console.log('storeData: response is', response);
  return response;
}
