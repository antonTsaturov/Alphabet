import { Text, Modal, ScrollView, StyleSheet, View, TouchableOpacity,
  Image, ImageBackground, Dimensions, Pressable } from 'react-native';
import { useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
//import  AsyncStorage  from '@react-native-async-storage/async-storage';

import { sayWord } from "../components/sayWord";
//import {tapCounter} from '../components/utility';

import { alphabetRus, alphabetEng } from '../components/alphabets';
import { backgrounds } from '../components/backPics';
import { saveIndex } from '../components/utility';


// Custom Hooks //
import {useBackgroundIndex} from '../hooks/useBackgroundIndex';
// Custom Elements //
import  ChangeBackgroundBtn from '../components/changeBackgroundButton';
import SwipeDownModal from '../components/customModal';

import Styles from '../assets/styles/mainStyle';
const styles = Styles;
const { height } = Dimensions.get('window');

const AlphabetScreen = ({lang}) => {

  let dataset;
  //const [dataset, setDataset] = useState();
  if (lang == 'RU') {
    dataset = alphabetRus;
  }
  if (lang == 'EN') {
    dataset = alphabetEng;
  }

  const [modalCard, setModalCard] = useState(false); //show or hide modal window
  //const [modalDemo, setModalDemo] = useState(false);
  const [card, setCard] = useState(null); //set image for Letter
  const [voiceWord, setVoiceWord] = useState(null);
  const [index, setIndex] = useBackgroundIndex('');
  const [error, setError] = useState();

  const navigation = useNavigation();
  return (
    <ImageBackground
      source={backgrounds[saveIndex.current]}
      style={styles.background}
      resizeMode="cover" // 'cover', "contain", "stretch", "repeat", "center"
      >
      <View style={styles.container}>
        <ScrollView
        >
          <View style={styles.buttonsContainer}>
            {dataset.map((data) => (
              <TouchableOpacity
                key={data.letter}
                style={{ verticalAlign:'middle'}}
                onPress={()=>{
                  //demoTapCounter = tapCounter();
                  //demoTapCounter != null && console.log('Demo mode. Counter:', demoTapCounter);

                  // if (demoTapCounter <= 5 || demoTapCounter == null) {
                  try {
                    setCard(data.image);
                    setVoiceWord(data.voiceWord);
                    sayWord('alphabet', data.voiceLetter);
                    setModalCard(true);
                  } catch (error) {
                    setError(error);
                  }
                  // } else {
                  //   setModalDemo(true)
                  // }
                }}>
                      <LinearGradient
                        colors={['#95BAE1', '#e4f8f4']}
                        style={styles.letterBtn}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                      >
                  <Text
                    style={[
                      styles.text,
                      data.letter.match(/[АаЕеЁёИиОоУуЭэЮюЯяы]/i) && styles.vowel,
                      data.letter.match(/[AaEeIiOoUu]/i) && styles.vowel,
                      data.letter.match(/[ьъ]/) && styles.sign,
                      ]}
                  >
                  {data.letter}
                  </Text>
                  </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          <ChangeBackgroundBtn
            onPress={() => {
              setIndex();
            }}
          />

          <Text style={{height:90}} //this add space for correct scrolling
          ></Text>
        </ScrollView>

        <SwipeDownModal
          visible={modalCard}
          onCloseModal={() => {
            setModalCard(false);
            //console.log('close action: ', modalCard);

          }}>
          <View>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeCardBtn}
                onPress={() => {
                  setModalCard(false);
                  console.log('hello');

                }}
              >
                <Image
                  style={styles.closeCardIcn}
                  source={require('../assets/icons/close.png')}/>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={()=>{
                  sayWord('alphabet', voiceWord)
                }}
              >
                <Image
                  style={styles.card}
                  source={card}/>
              </TouchableOpacity>
              </View>
            </View>
        </SwipeDownModal>

      </View>
    </ImageBackground>
  );
}

export default AlphabetScreen;
