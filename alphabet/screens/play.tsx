import { Text, Modal, ScrollView, StyleSheet, View, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import { useState } from 'react';
import { useFonts } from "expo-font";
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
//import LinearGradient from 'react-native-linear-gradient';
// import { createStaticNavigation, useNavigation } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Styles from '../assets/styles/mainStyle';
const styles = Styles;  

export default function PlayScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [card, setCard] = useState(null);
  const [voiceWord, setVoiceWord] = useState(null);

  
  useFonts({
    "Neucha": require("../assets/fonts/Neucha.ttf"),
    'ArialRound': require("../assets/fonts/arialround.otf"),
    'CirilicRound': require("../assets/fonts/cyrillicround.ttf"),
  });

  const sayWord = async (pathToFile: string) => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(pathToFile);
      await soundObject.playAsync();
    } catch (error) {
      console.log('Fail playing sound!', error);
    }
  }

  const alphabetRus = [
    {letter: 'Аа', image: require('../assets/cards/A.png'), voiceWord: require('../assets/voices/words/А.mp3'), voiceLetter: require('../assets/voices/letters/А.mp3') },
    {letter: 'Бб', image: require('../assets/cards/Б.png'), voiceWord: require('../assets/voices/words/Б.mp3'), voiceLetter: require('../assets/voices/letters/Б.mp3') },
    {letter: 'Вв', image: require('../assets/cards/В.png'), voiceWord: require('../assets/voices/words/В.mp3'), voiceLetter: require('../assets/voices/letters/В.mp3') },
    {letter: 'Гг', image: require('../assets/cards/Г.png'), voiceWord: require('../assets/voices/words/Г.mp3'), voiceLetter: require('../assets/voices/letters/Г.mp3') },
    {letter: 'Дд', image: require('../assets/cards/Д.png'), voiceWord: require('../assets/voices/words/Д.mp3'), voiceLetter: require('../assets/voices/letters/Д.mp3') },
    {letter: 'Ее', image: require('../assets/cards/Е.png'), voiceWord: require('../assets/voices/words/Е.mp3'), voiceLetter: require('../assets/voices/letters/Е.mp3') },
    {letter: 'Ёё', image: require('../assets/cards/Ё.png'), voiceWord: require('../assets/voices/words/Ё.mp3'), voiceLetter: require('../assets/voices/letters/Ё.mp3') },
    {letter: 'Жж', image: require('../assets/cards/Ж.png'), voiceWord: require('../assets/voices/words/Ж.mp3'), voiceLetter: require('../assets/voices/letters/Ж.mp3') },
    {letter: 'Зз', image: require('../assets/cards/З.png'), voiceWord: require('../assets/voices/words/З.mp3'), voiceLetter: require('../assets/voices/letters/З.mp3') },
    {letter: 'Ии', image: require('../assets/cards/И.png'), voiceWord: require('../assets/voices/words/И.mp3'), voiceLetter: require('../assets/voices/letters/И.mp3') },
    {letter: 'Йй', image: require('../assets/cards/Й.png'), voiceWord: require('../assets/voices/words/Й.mp3'), voiceLetter: require('../assets/voices/letters/Й.mp3') },
    {letter: 'Кк', image: require('../assets/cards/К.png'), voiceWord: require('../assets/voices/words/К.mp3'), voiceLetter: require('../assets/voices/letters/К.mp3') },
    {letter: 'Лл', image: require('../assets/cards/Л.png'), voiceWord: require('../assets/voices/words/Л.mp3'), voiceLetter: require('../assets/voices/letters/Л.mp3') },
    {letter: 'Мм', image: require('../assets/cards/М.png'), voiceWord: require('../assets/voices/words/М.mp3'), voiceLetter: require('../assets/voices/letters/М.mp3') },
    {letter: 'Нн', image: require('../assets/cards/Н.png'), voiceWord: require('../assets/voices/words/Н.mp3'), voiceLetter: require('../assets/voices/letters/Н.mp3') },
    {letter: 'Оо', image: require('../assets/cards/О.png'), voiceWord: require('../assets/voices/words/О.mp3'), voiceLetter: require('../assets/voices/letters/О.mp3') },
    {letter: 'Пп', image: require('../assets/cards/П.png'), voiceWord: require('../assets/voices/words/П.mp3'), voiceLetter: require('../assets/voices/letters/П.mp3') },
    {letter: 'Рр', image: require('../assets/cards/Р.png'), voiceWord: require('../assets/voices/words/Р.mp3'), voiceLetter: require('../assets/voices/letters/Р.mp3') },
    {letter: 'Сс', image: require('../assets/cards/С.png'), voiceWord: require('../assets/voices/words/С.mp3'), voiceLetter: require('../assets/voices/letters/С.mp3') },
    {letter: 'Тт', image: require('../assets/cards/Т.png'), voiceWord: require('../assets/voices/words/Т.mp3'), voiceLetter: require('../assets/voices/letters/Т.mp3') },
    {letter: 'Уу', image: require('../assets/cards/У.png'), voiceWord: require('../assets/voices/words/У.mp3'), voiceLetter: require('../assets/voices/letters/У.mp3') },
    {letter: 'Фф', image: require('../assets/cards/Ф.png'), voiceWord: require('../assets/voices/words/Ф.mp3'), voiceLetter: require('../assets/voices/letters/Ф.mp3') },
    {letter: 'Хх', image: require('../assets/cards/Х.png'), voiceWord: require('../assets/voices/words/Х.mp3'), voiceLetter: require('../assets/voices/letters/Х.mp3') },
    {letter: 'Цц', image: require('../assets/cards/Ц.png'), voiceWord: require('../assets/voices/words/Ц.mp3'), voiceLetter: require('../assets/voices/letters/Ц.mp3') },
    {letter: 'Чч', image: require('../assets/cards/Ч.png'), voiceWord: require('../assets/voices/words/Ч.mp3'), voiceLetter: require('../assets/voices/letters/Ч.mp3') },
    {letter: 'Шш', image: require('../assets/cards/Ш.png'), voiceWord: require('../assets/voices/words/Ш.mp3'), voiceLetter: require('../assets/voices/letters/Ш.mp3') },
    {letter: 'Щщ', image: require('../assets/cards/Щ.png'), voiceWord: require('../assets/voices/words/Щ.mp3'), voiceLetter: require('../assets/voices/letters/Щ.mp3') },
    {letter: 'ъ', image: require('../assets/cards/Ъ.png'), voiceWord: require('../assets/voices/words/Ъ.mp3'), voiceLetter: require('../assets/voices/letters/Ъ.mp3') },
    {letter: 'ы', image: require('../assets/cards/Ы.png'), voiceWord: require('../assets/voices/words/Ы.mp3'), voiceLetter: require('../assets/voices/letters/Ы.mp3') },
    {letter: 'ь', image: require('../assets/cards/Ь.png'), voiceWord: require('../assets/voices/words/Ь.mp3'), voiceLetter: require('../assets/voices/letters/Ь.mp3') },
    {letter: 'Ээ', image: require('../assets/cards/Э.png'), voiceWord: require('../assets/voices/words/Э.mp3'), voiceLetter: require('../assets/voices/letters/Э.mp3') },
    {letter: 'Юю', image: require('../assets/cards/Ю.png'), voiceWord: require('../assets/voices/words/Ю.mp3'), voiceLetter: require('../assets/voices/letters/Ю.mp3') },
    {letter: 'Яя', image: require('../assets/cards/Я.png'), voiceWord: require('../assets/voices/words/Я.mp3'), voiceLetter: require('../assets/voices/letters/Я.mp3') },
  ];
  
  return (
    <ImageBackground
      source={require("../assets/backgrounds/blue.png")} //blue.png, child.jpg, stars.jpg, sky.jpg
      style={styles.background}
      resizeMode="cover" // 'cover', "contain", "stretch", "repeat", "center"
    > 
      <View style={styles.container}>
        <ScrollView 
        >
          <View style={styles.buttonsContainer}>
            {alphabetRus.map((data) => (
              <TouchableOpacity
                style={{ verticalAlign:'middle'}}
                onPress={()=>{
                  setCard(data.image)
                  setVoiceWord(data.voiceWord)
                  sayWord(data.voiceLetter)
                  setModalVisible(true)              
                }}>
                      <LinearGradient
                        colors={['#ad95e1', '#e4f8f4']}
                        style={styles.letterBtn}
                        start={{ x: 1, y: 1 }}
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
          <Text
            style={{height:140}}
          ></Text>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>

              <TouchableOpacity
                style={styles.closeCardBtn}
                onPress={() => {setModalVisible(!modalVisible)}}
              >
                <Image
                  style={styles.closeCardIcn}
                  source={require('../assets/icons/close.png')}/>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={()=>{
                  sayWord(voiceWord)
                }}
              >
                <Image
                  style={styles.card}
                  source={card}/>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </ImageBackground>
  );
}