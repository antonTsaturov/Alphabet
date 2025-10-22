import { Text, Modal, ScrollView, StyleSheet, View, TouchableOpacity,
	Image, ImageBackground, Dimensions, Pressable, Linking } from 'react-native';
import { useState } from 'react';
//import { Audio } from 'expo-av';
import LinearGradient from 'react-native-linear-gradient';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens //
import HomeScreen from './screens/home';
import SubHomeScreen from './screens/subhome';
import AlphabetScreen from './screens/alphabet';
import AlphabetScreenEng from './screens/alphabetEng';
import FindLetter from './screens/findletter';
import YokassaScreen from './screens/purchase';
import AboutScreen from './screens/about';


import { sayWord } from "./components/sayWord";


// Custom Hooks // not used
import {useBackgroundIndex} from './hooks/useBackgroundIndex';

const linking = {
	enabled: 'auto' /* Automatically generate paths for all screens */,
	prefixes: [
		'alphabet://'
	],
};

// This cant change bachground immidiatly (effects see after refresh screen only ), so not use //
const ChangeBackground = () => {
	const [index, setIndex] = useBackgroundIndex('');
	return (
		<Pressable
			onPress={()=>{
				setIndex()
			}}
			>
			<Image
				source={require('./assets/icons/back.png')}
				style={{width:25, height:25, marginTop:10, marginBottom:10, alignSelf:'center'}}
			/>
		</Pressable>
	);
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Menu', //Menu
	screenOptions: {
		 headerLeft: () => (
			<Pressable
				style={{width:44, height:44, padding:10}}
				onPress={() => {
					sayWord('stop'),
					Linking.openURL('alphabet://home')
				}}>
				<Image
					source={require('./assets/icons/back.png')}
					style={{width:24, height:24}}
				/>
			</Pressable>
		 ),
		contentStyle: {
			backgroundColor:'white',
		},
		headerShadowVisible: false,
    //headerTransparent: true,
    headerStyle: {
      backgroundColor: '#f0f0f0',
    },
		headerTitleAlign: 'center',
    headerTitleStyle: {
			fontSize: 25,
			//fontFamily: 'Cyrillic Round',
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
        path: 'home',
      },
      options: {
        title: 'Главное меню',
				headerBackVisible: false,
				headerLeft: ()=> null,
      },
    },
    Alphabet: {
      screen: () => (<AlphabetScreen lang = 'RU'/>),
			linking: {
        path: 'playscreen',
      },
      options: {
        //title: 'Алфавит',
				headerTitle: () => (
          <Image
            source={require('./assets/logo_alf.png')}
            style={{width:160, height:24, marginTop:10, marginBottom:10, alignSelf:'center'}}
          />
				),
				// headerRight: () => (
				// 	// <ChangeBackground/>
				// ),
      },
    },
		AlphabetEng: {
			screen: () => (<AlphabetScreen lang = 'EN'/>),
			linking: {
				path: 'playscreenEng',
			},
			options: {
				headerTitle: () => (
					<Image
						source={require('./assets/alphabet_logo_eng.png')}
						style={{width:180, height:34, marginTop:10, marginBottom:10, alignSelf:'center'}}
					/>
				),
			},
		},
		FindLetter: {
			screen: FindLetter,
			options: {
				headerTitle: () => (
          <Image
            source={require('./assets/findLetterLogo.png')}
            style={{width:260, height:35, marginTop:10, marginBottom:10, alignSelf:'center'}}
          />
				),
			},
		},
		SubHome: {
			screen: SubHomeScreen,
			options: {
				title: 'Learn English',
			},
		},
    About: {
      screen: AboutScreen,
      options: {
        title: 'О приложении',
      },
    },
    // Review: {
    //   screen: ReviewScreen,
    //   options: {
    //     title: 'О приложении',
    //   },
    // },

		Purchase: {
      screen: YokassaScreen,
			linking: {
				path: 'purchase',
			},
      options: {
        title: 'Купить полную версию',
				//presentation: 'formSheet',
        // headerShown: false,
				// gestureEnabled: true,
				// cardOverlayEnabled: true,
        // sheetAllowedDetents: [0.3, 0.4],
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

const App = () => {
  return (
		<Navigation
			linking={linking}
		/>
	);
};

export default App;
