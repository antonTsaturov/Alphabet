import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import Styles from '../assets/styles/mainStyle';

import {sayWord} from "../components/sayWord";
import {mode, demoChecker} from '../components/demoChecker';
import {checkUnconfirmedPaid} from '../components/paymentHandler';


const HomeScreen = () => {
   useEffect(() => {
    checkUnconfirmedPaid();
    demoChecker();
   },[])

  const styles = Styles;
  const [pressed, setPressed] = useState({});

  const navigation = useNavigation();
	const homeButtons = [
		{ buttonId: 'Alphabet', title:'Учим алфавит', colors: ['#ed365b', '#f592a6'], brdColor: '#ab102f'},
		{ buttonId: 'FindLetter', title:'Найди букву', colors: ['#ef6325', '#f79f60'], brdColor: '#c9300f'},
    { buttonId: 'SubHome', title:'Английский язык', colors: ['#57C785', '#33F263'], brdColor: '#238b3e'},
    { buttonId: 'About', title:'О приложении', colors: ['#a0dc14', '#b6ed36'], brdColor: '#719c0e'},
		//{ buttonId: 'Purchase', title:'Полная версия', colors: ['#3b9aed', '#36b6ed'], brdColor: '#0e719c'},
	];

  const handlePress = (buttonId: string) => {
    setPressed(prev => ({
      [buttonId]: !prev[buttonId]
    }));
    if (buttonId == 'Play' || buttonId == 'Purchase' ) {
      demoChecker();
    }
  };

  return (
    <View style={ styles.home }>
    <Image
      source={require('../assets/logo_alf.png')}
      style={{width:300, height:45, marginTop:20, marginBottom:60, alignSelf:'center', borderWidth:0}}
      />
			{homeButtons.map((button) => (
	      <Pressable
					key={ button.buttonId }
          onPressIn={() => {
            handlePress(button.buttonId)
            sayWord('effect')
          }}
          onPressOut={() => {
            handlePress('none')
            setTimeout(()=>{
              navigation.navigate(button.buttonId)
            },100)
          }}
        >
          <LinearGradient
            colors={button.colors}
            style={[
              styles.menuBtn,
              {borderColor:button.brdColor},
              pressed[button.buttonId] && styles.menuBtnPressed,
              pressed['none'] && styles.menuBtnUnpressed
            ]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
          >

            <Text style={ styles.textMenuBtn }>{ button.title }</Text>
          </LinearGradient>
				</Pressable>
			))}
    </View>
  );
}

export default HomeScreen;
