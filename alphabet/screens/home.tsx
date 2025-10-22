import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from "expo-font";
import { LinearGradient } from 'expo-linear-gradient';
//import LinearGradient from 'react-native-linear-gradient';

import Styles from '../assets/styles/mainStyle';
  

const HomeScreen = () => {
  const [pressed, setPressed] = useState({});

  //const styles = Styles;
  useFonts({
    "Neucha": require("../assets/fonts/Neucha.ttf"),
    'ArialRound': require("../assets/fonts/arialround.otf"),
    'CirilicRound': require("../assets/fonts/cyrillicround.ttf"),
  });
//
  const navigation = useNavigation();
	const homeButtons = [
		{ buttonId: 'Play', title:'ИГРАТЬ', colors: ['#ed365b', '#f592a6'], brdColor: '#ab102f'},
		//{ buttonId: 'About', title:'Правила' },
		{ buttonId: 'Review', title:'О приложении', colors: ['#a0dc14', '#b6ed36'], brdColor: '#719c0e'},
		{ buttonId: 'Purchase', title:'Полная версия', colors: ['#3b9aed', '#36b6ed'], brdColor: '#0e719c'},
	];

  const handlePress = (buttonId: string) => {
    setPressed(prev => ({
      //...prev,
      [buttonId]: !prev[buttonId] // Toggle pressed state
    }));
    //console.log(`Button ${buttonId} pressed`);
    console.log(pressed)
  };
  return (
    <View style={ styles.home }>
    <Image
      source={require('../assets/logo_alf.png')}
      style={{width:300, height:44, marginTop:20, marginBottom:60, alignSelf:'center'}}
      />
			{homeButtons.map((button) => (
	      <Pressable
					key={ button.buttonId }
	        // onPress={() => {
          //   //handlePress(button.buttonId)
          // }}
          onPressIn={() => {handlePress(button.buttonId)}}
          onPressOut={() => {
            handlePress('none')
            setTimeout(()=>{
              navigation.navigate(button.buttonId)
            },500)
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
const styles = StyleSheet.create({
  home:{
    //flex: 1,
    //backgroundColor: '#ecf0f1',
    padding: 8,
    justifyContent: 'center',
  },
  menuBtn:{
    height:40,
    width: 200,
    //borderWidth:1,
    borderRadius:11,
    marginTop:4,
    marginBottom:6,
    alignSelf:'center',
    //backgroundColor:'#ed365b',
    borderBottomWidth:3,
    borderRightWidth:3,
    //borderColor:'#ab102f'

  },
  menuBtnPressed:{
    borderBottomWidth:2,
    borderRightWidth:2,
    top:1,
    left:1
  },
  menuBtnUnpressed: {
    borderBottomWidth:3,
    borderRightWidth:3,
    top:0,
    left:0
  },
  textMenuBtn: {
    textAlign:'center',
    fontSize:16,
    fontFamily:'ArialRound', //Neucha, CirilicRound, ArialRound
    fontWeight:400, //600, 400
    color: 'white',
    padding:11,
    
  },
})
export default HomeScreen;