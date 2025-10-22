import { Text, Modal, ScrollView, StyleSheet, View, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import { useState } from 'react';
import { useFonts } from "expo-font";
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
//import LinearGradient from 'react-native-linear-gradient';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens //
import HomeScreen from './screens/home'
import PlayScreen from './screens/play'

//const { width, height } = Dimensions.get('window');

const linking = {
	enabled: 'auto' /* Automatically generate paths for all screens */,
	prefixes: [
		'myapp://'
	],
};

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Menu', //Menu
	screenOptions: {
		// headerLeft: () => (
		// 	<Pressable
		// 		onPress={() => Linking.openURL('myapp://homescreen')}>
		// 		<Image
		// 			style={{ width: 40, height: 40 }}
		// 			source={require('./app/assets/back.png')}/>
		// 	</Pressable>
		// ),
		headerShadowVisible: false,
    //headerTransparent: true,
    headerStyle: {
      //backgroundColor: '#f0f0f0',
    },
		headerTitleAlign: 'center',
    headerTitleStyle: {
			fontSize: 25,
			//fontFamily: 'ArialRound',
    },
    // headerBackground: () => (
    //   <LinearGradient
    //     colors={['#dbe2ef', '#9086c9']}
    //     style={{ flex: 1, height:400}}
    //     start={{ x: 0, y: 1 }}
    //     end={{ x: 0, y: 0 }}
    //   />
    // ),
  },
  screens: {
    Menu: {
      screen: HomeScreen,
			linking: {
        path: 'homescreen',
      },
      options: {
        title: 'Главное меню',
				headerBackVisible: false,
				headerLeft: ()=> null,
      },
    },
    Play: {
      screen: PlayScreen,
			linking: {
        path: 'playscreen',
      },
      options: {
        title: 'Алфавит',
				headerTitle: () => (
          <Image
            source={require('./assets/logo_alf.png')}
            style={{width:150, height:22, marginTop:10, marginBottom:10, alignSelf:'center'}}
          />
				),
      },
    },
    // About: {
    //   screen: AboutScreen,
    //   options: {
    //     title: 'Правила',
    //   },
    // },
    // Review: {
    //   screen: ReviewScreen,
    //   options: {
    //     title: 'О приложении',
    //   },
    // },

		// Purchase: {
    //   screen: YokassaScreen,
		// 	linking: {
		// 		path: 'purchase',
		// 	},
    //   options: {
    //     title: 'Покупки',
    //   },
    // },

		// Pdf: {
    //   screen: PdfScreen,
    //   options: {
    //     title: 'Публичная оферта',
    //   },
    // },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {

  return (
		<Navigation
			linking={linking}
		/>
	)
}