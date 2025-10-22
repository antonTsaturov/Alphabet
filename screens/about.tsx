import { View, ScrollView, Text, TouchableOpacity, Linking} from 'react-native';
import { useState, useEffect} from 'react';
import RustoreReviewClient from 'react-native-rustore-review';
import Snackbar from "react-native-snackbar"
import LinearGradient from 'react-native-linear-gradient';

import Styles from '../assets/styles/mainStyle';

const AboutScreen = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  //const [pressed, setPressed] = useState(null);

  const styles = Styles;
  const btnColors = ['#4D84BF', '#7dd6df'];
  const btnBorders = '#B0C4DE';

  useEffect(() => {
    RustoreReviewClient.init();
  }, []);

  const whatIsNew = [
    {version: 'Версия 1.0.', description: 'Русский алфавит с карточками.'},
    {version: 'Версия 1.1', description: `Добавлена новая игра - \"Найди букву\"
Увеличены кнопки букв
Добавлена возможность изменять фон игры`},
    {version: 'Версия 1.2', description: `Добавлена новая игра - \"Английский алфавит\"
!Изменена иконка игры
Карточки слов теперь можно закрывать свайпом вниз`}
  ];

  const requestReviewFLow = async () => {
    try {
      const isRequested = await RustoreReviewClient.requestReviewFlow();
      if (isRequested) {
        await RustoreReviewClient.launchReviewFlow();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const launchReviewFLow = async () => {
    setLoading(true);
    try {
      await RustoreReviewClient.launchReviewFlow();
      showSnackBar("launchReviewFlow Success")
    } catch (err) {
      setError(JSON.stringify(err));
      showSnackBar("launchReviewFlow Error")
    } finally {
      setLoading(false);
    }
  };

  const handlePress = (async (url: string) => {
    const isSupported = await Linking.canOpenURL(url);
    if (isSupported) {
      await Linking.openURL(url);
    } else {
      showSnackBar("Don't know how to open URL (RuStore is probably not installed)")
    }
  });

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }


  return (
    <View style={{padding:20, flex:1}}>
			<ScrollView>
        {whatIsNew.map((data)=> (
	      <Text
          ket={data.version}
          style={{fontSize:18, paddingBottom:10}}
          >
        {'\t'}{data.version}
				{'\n'}{data.description}
        </Text>
      ))}


			</ScrollView>

      <View style={{marginBottom:20, }}>
        <TouchableOpacity
          //style={styles.menuBtn}
          onPress={requestReviewFLow}
          title="Оставить отзыв"
        >
          <LinearGradient
            colors={btnColors}
            style={[
              styles.menuBtn,
              {borderColor:btnBorders},
              // pressed && styles.menuBtnPressed,
              // !pressed && styles.menuBtnUnpressed
            ]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
          >

            <Text style={styles.textMenuBtn}>Оставить отзыв</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          //style={styles.menuBtn}
          title='Открыть в RuStore'
          onPress={() => handlePress("rustore://apps.rustore.ru/app/com.alphabet")}
        >
          <LinearGradient
            colors={btnColors}
            style={[
              styles.menuBtn,
              {borderColor:btnBorders},
              // pressed && styles.menuBtnPressed,
              // !pressed && styles.menuBtnUnpressed
            ]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
          >
            <Text style={styles.textMenuBtn}>Открыть в RuStore</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

    </View>
  );


  const showSnackBar = (text: string) => {
    Snackbar.show({
      text: text,
      duration: Snackbar.LENGTH_SHORT,
    });
  }
}

export default AboutScreen;
