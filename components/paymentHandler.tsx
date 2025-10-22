import { Linking, Alert } from 'react-native';

/*  Yokassa */
import { YooCheckout, ICreatePayment } from '@a2seven/yoo-checkout';
import 'react-native-get-random-values'; //Need for uuid corect working
import { v4 as uuidv4 } from 'uuid';

import {storeData} from '../components/storeData';
import {demoChecker} from '../components/demoChecker';


/* Test shop activeated. Check utility->checkUnconfirmedPaid function after change */
const checkout = new YooCheckout({ shopId: '1076271', secretKey: 'test_kapxyaWGSPmiPcU8jLWNEMjKBhy1doCPNQcUOhYKGd8' });
//const checkout = new YooCheckout({ shopId: '1047264', secretKey: 'live_Pp0H3fpBtt-Zybya_JxmmmItwYQQlc5p-JxEDRievRU' });
const idempotenceKey = uuidv4();


export const genPaymentInfo = async (payment) => {
  //console.log('genPaymentInfo recive payment date:', payment.created_at);

  try {
    let dateObj = new Date(Date.parse((payment.created_at).slice(0,-1)));

    //const subscriptionCreated = dateObj.getFullYear() + '-' + (parseInt(dateObj.getMonth()) + 1) + '-' +
    // dateObj.getDate() + 'T' + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' +
    // dateObj.getSeconds() + '.' + dateObj.getMilliseconds();

    const subscriptionValidUntil = dateObj.getFullYear() + '-' + (parseInt(dateObj.getMonth()) + 2) + '-' +
    dateObj.getDate() + 'T' + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' +
    dateObj.getSeconds() + '.' + dateObj.getMilliseconds();

    const paymentInfo = {
      id: payment.id,
      create: payment.created_at,
      valid: subscriptionValidUntil,
    };
    return paymentInfo;
    console.log('genPaymentInfo:', paymentInfo  );
  } catch (error) {
    console.log('genPaymentInfo error:', error  );
  }
}

export const newPurchase = async (itemID, value) => {
  console.log(itemID, value);

  const createPayload: ICreatePayment = {
      item: {
        itemID: itemID
      },
      amount: {
          value: value,
          currency: 'RUB'
      },
      description: itemID,
      // payment_method_data: {
      //     type: 'bank_card'
      // },
      capture: true,
      confirmation: {
          type: 'redirect',
          return_url: 'myapp://homescreen'
      }
  };

  try {
      const payment = await checkout.createPayment(createPayload, idempotenceKey);
      const url = payment.confirmation.confirmation_url;
      try {
        await Linking.openURL(url);
      } catch (error) {
        Alert.alert('Error opening browser', error.message);
      }
      paymentID = payment.id;
      //allPayments.push(payment.id)
      console.log('Browser opened. Payment ID created: ', `${paymentID}`);
      cheker(paymentID);
      await storeData('save', 'Unconfirmed', paymentID );
  } catch (error) {
      console.error(error);
  }
}

let i = 0;
let checkPayment;
const cheker = (paymentID) => {
  console.log('Checker get:', paymentID);
  try{
    checkPayment = setInterval(() => {
      getPurchaseStatus(paymentID);
      i++;
    }, 5000)
  } catch (err) {
    console.log(err);
  }
}

export const getPurchaseStatus = async (paymentId) => {
  try {
    const payment = await checkout.getPayment(paymentId);
    console.log('Status for pay', `${paymentID}`, ' : ', payment.status, i)
    if (payment.status == 'succeeded' && payment.paid == true) {
      clearInterval(checkPayment);
      paymentID = '';
      console.log('Checking stopped. Payment is OK');
      await storeData('save', 'subscriptionActive', payment);
      await storeData('remove', 'Unconfirmed');
      await demoChecker();
    }
    if (i > 3) {
      clearInterval(checkPayment);
      paymentID = '';
      console.log('Checking stopped. Current payment is fail')
      //Double check for all payments
      // for (let i = 0; i < allPayments.length; i++ ) {
      // 	let payment = await checkout.getPayment(allPayments[i]);
      // 	if (payment.status == 'succeeded' && payment.paid == true) {
      // 		console.log('Double checking stopped.', payment.id, ' is OK!' )
      // 		storeData('save',payment.id, payment.created_at)
      // 	} else {
      // 		console.log('Double checking stopped. All Payments fail' )
      // 	}
      // }
    }
  } catch (error) {
      console.error(error);
  }
}


export const checkUnconfirmedPaid = async () => {
 try {

   const checkout = new YooCheckout({ shopId: '1076271', secretKey: 'test_kapxyaWGSPmiPcU8jLWNEMjKBhy1doCPNQcUOhYKGd8' });
   //const checkout = new YooCheckout({ shopId: '1047264', secretKey: 'live_Pp0H3fpBtt-Zybya_JxmmmItwYQQlc5p-JxEDRievRU' });

   let unconfirmedID = await storeData('get', 'Unconfirmed');
   console.log(unconfirmedID);

   unconfirmedID != null ? getPurchaseStatusUncf(unconfirmedID, checkout) : console.log('checkUnconfirmedPaid: No unconfirmedID');;
 } catch (error) {
   console.log('checkUnconfirmedPaid error', error);
 }
}

const getPurchaseStatusUncf = async (unconfirmedID, checkout) => {
 try {
   const payment = await checkout.getPayment(unconfirmedID);
   console.log('Status for pay', `${unconfirmedID}`, ' : ', payment.status, i)
   if (payment.status == 'succeeded' && payment.paid == true) {
     // clearInterval(checkPayment);
     // paymentID = '';
     // console.log('Checking stopped. Payment is OK');
     await storeData('save', 'subscriptionActive', payment);
     await storeData('remove', 'Unconfirmed');
     // await checkSubscribe();
     console.log('checkUnconfirmedPaid:', unconfirmedID, ' is confirmed!');

   }
 } catch (error) {
     console.error('checkUnconfirmedPaid error', error);
 }
}
