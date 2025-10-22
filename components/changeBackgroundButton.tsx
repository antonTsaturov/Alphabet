import { Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


import Styles from '../assets/styles/mainStyle';
const styles = Styles;


export default function ChangeBackgroundBtn({ onPress }) {

  //const [index, setIndex] = useBackgroundIndex('');

  return (
    <TouchableOpacity
      onPress = {onPress}
    >
      <LinearGradient
        colors={['#3b9aed', '#36b6ed']}
        style={[styles.menuBtn, {marginTop:20}]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
      >
        <Text style={ styles.textMenuBtn }>Сменить фон</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}
