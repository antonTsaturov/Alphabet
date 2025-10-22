import { Text, Modal, View, SafeAreaView, TouchableOpacity, Image, Pressable, Linking, Alert, Button } from 'react-native';
import { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import Styles from '../assets/styles/mainStyle';
import {storeData} from '../components/storeData';
import {prettyDate} from '../components/utility';
import {mode, validUntill, demoChecker} from '../components/demoChecker';

import {newPurchase, getPurchaseStatus } from '../components/paymentHandler';
const oferta = 'https://docs.google.com/document/d/1pjbEkOtQ3gwUwSnzVHcKr3RIs1JWiqO8aGvXlxRktWE/edit?usp=sharing'

export default function YokassaScreen() {
	const styles = Styles;
	useEffect(() => {
		checkSubscribe();
  },[])

	const [modalVisible, setModalVisible] = useState(false);
	const [modalText, setModalText] = useState('');
	const [subscribedUntill, setSubscribedUntill] = useState('');
	const [text, setText] = useState('');
	const [btnText, setBtnText] = useState('');

	let paymentID = '';

	async function checkSubscribe() {
		if (mode != 'demo') {
			//let isSub = await storeData('get', 'subscriptionActive');
			//setSubscribedUntill(prettyDate(JSON.parse(isSub).valid));
			let txt = 'Полный доступ активирован! Подписка действительна до: ' + validUntill;
			setText(txt);
			setBtnText('Оплачено')
			console.log('YokassaScreen, function checkSubscribe. App is paid untill: ', validUntill);
		} else {
			setSubscribedUntill(null)
			let txt = 'Получите полный доступ к приложению: оформите подписку на 1 месяц.';
			setText(txt);
			setBtnText('Оплатить 99 руб.')
			console.log('YokassaScreen, function checkSubscribe: App is not paid');
		}
	}

	const buttons = [
		{ title:'КУПИТЬ', colors: ['#ed365b', '#f592a6'], brdColor: '#ab102f'},
	];

	const [pressed, setPressed] = useState(null);

  return (
    <View style={{padding:20, flex:1}}>

			<Text style={styles.purchaseText}>
				 {text}
			</Text>

			<Pressable
				onPressIn={() => {
					setPressed(true)
					//sayWord(require('../assets/sound/bulkBtn.mp3'), 'quiet')
					subscribedUntill == null && newPurchase('SubscriptionAlphabet', 99)
					//storeData('remove', 'subscriptionActive')
				}}
				onPressOut={() => {
					setPressed(!pressed)
				}}
			>
				<LinearGradient
					colors={['#ed365b', '#f592a6']}
					style={[
						styles.menuBtn,
						//{borderColor:button.brdColor},
						pressed && styles.menuBtnPressed,
						!pressed && styles.menuBtnUnpressed
					]}
					start={{ x: 1, y: 0 }}
					end={{ x: 0, y: 0 }}
				>
					<Text style={ styles.textMenuBtn }>{btnText}</Text>
				</LinearGradient>
			</Pressable>

			<TouchableOpacity
				onPress={()=>{
					//checkSubscribe()
					demoChecker();
					checkSubscribe();
				}}
			>
				<Text style={{ height:30, fontSize:16, alignSelf:'center', padding:3}}>
				Проверить оплату
				</Text>
			</TouchableOpacity>

			<View style={{ flex: 1}}>
				<Text style={styles.subscribedText}>
				Нажимая кнопку оплаты Вы принимаете условия
				</Text>
				<TouchableOpacity

					onPress={()=>{
						Linking.openURL(oferta)
					}}
				>
					<Text style={[
						styles.subscribedText,
						{fontWeight:900}
					]}>Публичной оферты.</Text>
				</TouchableOpacity>
			</View>

    </View>

  )
}
