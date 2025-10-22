import { Text, Modal, ScrollView, View, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import LottieView from 'lottie-react-native';

import { sayWord, sayWordError, sayWordpathToFile} from "../components/sayWord";
//import {tapCounter} from '../components/utility';
import { generateSequence, checkLetter } from '../components/utility';

import { find, alphabetRus } from '../components/alphabets';
import { backgrounds } from '../components/backPics';
import { saveIndex, dataRow, indexLog, errors } from '../components/utility';

// Custom Hooks //
import {useBackgroundIndex} from '../hooks/useBackgroundIndex';

// Custom Elements //
import  ChangeBackgroundBtn from '../components/changeBackgroundButton';


import Styles from '../assets/styles/mainStyle';
const styles = Styles;

export default function FindLetter() {
  const [modalDemo, setModalDemo] = useState(false);
  const animationRef = useRef<LottieView>(null);
  const [index, setIndex] = useBackgroundIndex('');

  const [fireworkActive, setFireworkActive] = useState(false);

  useEffect(() =>{
    //findLetter = generateSequence();
    sayWord('new')
  },[])

  const showFirework = () => {
    animationRef.current?.play();
    setTimeout(() => {
      animationRef.current?.reset();
      setFireworkActive(false);
    }, 2900);
  };

  const feedback = (result) => {
    if (result == true) {
      setTimeout(() => {
        sayWord('success');
        showFirework();
        setFireworkActive(true)
      }, 600);

      setTimeout(() => {
        sayWord('new')
      }, 2700);

    } else {
      setTimeout(() => {
        sayWord('fail');

      }, 500);

      setTimeout(() => {
        sayWord('repeat');
      }, 1700);
    }
  }

  return (
    <ImageBackground
      source={backgrounds[saveIndex.current]}
      //source={require("../assets/backgrounds/blue.png")} //blue.png, child.jpg, stars.jpg, sky.jpg
      style={styles.background}
      resizeMode="cover" // 'cover', "contain", "stretch", "repeat", "center"
    >

    <LottieView
      ref={animationRef}
      source={require('../assets/lottie/fireworks2.json')}
      autoPlay={false}
      loop={false}
      duration={6000}
      style={[
        styles.fireworkBaseStyle,
        fireworkActive == true && styles.fireworkActive,
        fireworkActive == false && styles.fireworkInactive
      ]}
    />

      <View style={styles.container}>
        <ScrollView
        >
          <View style={styles.buttonsContainer}>
            {alphabetRus.map((data) => (
              <TouchableOpacity
                key={data.letter}
                style={{ verticalAlign:'middle'}}
                onPress={() => {

                  let result = checkLetter(data.letter);
                  feedback(result);
                  // demoTapCounter = tapCounter();
                  // demoTapCounter != null && console.log('Demo mode. Counter:', demoTapCounter);
                  //
                  // if (demoTapCounter <= 5 || demoTapCounter == null) {
                    // setCard(data.image)
                    // setVoiceWord(data.voiceWord)
                    // sayWord(data.voiceLetter)
                    // setModalCard(true)
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

          <Text
            style={{height:90}}
          >
          </Text>

        </ScrollView>

        <Modal
          key='DEMO'
          animationType="slide"
          transparent={true}
          visible={modalDemo}
          onRequestClose={() => {
            //setModalDemo(!modalDemo);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>

              <Text style={styles.demoTextModal}>
                В бесплатной версии доступно только 5 букв.
        				Для получения полного доступа к игре перейдите на страницу покупки.
        			</Text>

              <TouchableOpacity
                //style={styles.demoBtnModal}
                onPress={()=>{
                  navigation.navigate('Purchase')
                }}
              >
                <LinearGradient
                  colors={['#ed365b', '#f592a6']}
                  style={styles.demoBtnModal}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                >
                  <Text
                    style={styles.demoTxtBtnModal}>
                    На страницу покупки</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                key='CLOSE'
                //style={styles.demoBtnModal}
                onPress={()=>{
                  //setModalDemo(!modalDemo)
                }}
              >
                <LinearGradient
                  colors={['#3b9aed', '#36b6ed']}
                  style={styles.demoBtnModal}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                >
                  <Text
                    style={styles.demoTxtBtnModal}>
                    Закрыть</Text>
                </LinearGradient>
              </TouchableOpacity>


            </View>
          </View>
        </Modal>

      </View>
    </ImageBackground>
  );
}
