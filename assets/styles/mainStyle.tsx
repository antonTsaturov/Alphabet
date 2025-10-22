import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: '#ecf0f1',
    padding: 8,
  },
  buttonsContainer: {
    marginTop:1,
    flexDirection:'row',
    gap:25,
    flexWrap:'wrap',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
  },
  letterBtn: {
    height:80,
    width:80,
    //borderWidth:1,
    borderRadius:19,
    //backgroundColor:'#dfe7f5',
    paddingTop:17,
    elevation:5
  },
  text: {
    textAlign:'center',
    fontSize:40,
    fontFamily:'Arial Round', // Neucha / Cirilic Round / Arial Round
    fontWeight:400, //600, 400
    color: 'darkblue',
  },
  vowel: {
    color: 'red'
  },
  sign: {
    color: 'black'
  },
  card: {
    height:250,
    width:250,
    //borderWidth:1
  },
  closeCardIcn: {
    height:30,
    width:30,
    //alignSelf: 'flex-end',
  },
  closeCardBtn: {
    flex:1,
    flexDirection:'row-reverse',
    //width: 25,
    top: -10,
    left:10,
    position:'fixed',
    //alignSelf:'end',
    zIndex: 10,
    //padding:5
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 5,
    backgroundColor: 'white',
    maxWidth:400,
    maxHeight:300,
    borderRadius: 20,
    borderWidth:1,
    borderColor:'gray',
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  demoTextModal: {
    marginBottom:20,
    textAlign:'center',
    fontSize:25,
    fontFamily:'Neucha', // Neucha / Cyrillic Round / Arial Round
    //fontWeight:400, //600, 400
  },
  demoBtnModal: {
    height:46,
    width: 200,
    borderWidth:1,
    borderRadius:21,
    marginTop:4,
    marginBottom:6,
    alignSelf:'center',
    elevation:5,
  },
  demoTxtBtnModal: {
    textAlign:'center',
    fontSize:14,
    fontFamily:'Arial Round', // Neucha / Cyrillic Round / Arial Round
    fontWeight:400, //600, 400
    color: 'white',
    paddingTop:15,
  },
  /* HomeScreen */
  home:{
    padding: 8,
    justifyContent: 'center',
  },
  menuBtn:{
    height:46,
    width: 200,
    borderWidth:1,
    borderRadius:21,
    marginTop:4,
    marginBottom:6,
    alignSelf:'center',
    elevation:5,

  },
  menuBtnPressed:{
    top:1,
    left:1
  },
  menuBtnUnpressed: {
    top:0,
    left:0
  },
  textMenuBtn: {
    textAlign:'center',
    fontSize:20,
    fontFamily:'Arial Round', // Neucha / Cyrillic Round / Arial Round
    fontWeight:400, //600, 400
    color: 'white',
    padding:11,
  },
  /* YokassaScreen */
  purchaseText:{
    marginTop:100,
    marginBottom:50,
    textAlign:'center',
    fontSize:25,
    fontFamily:'Neucha', // Neucha / Cyrillic Round / Arial Round
    //fontWeight:400, //600, 400
  },
  price: {
    fontSize:30,
    color:'red'
  },
  subscribedText:{
    textAlign:'center',
  },
  /* AboutScreen */
  aboutText: {

  },
  /* FindLetterScreen */
  fireworkBaseStyle:{
    //marginTop:100,
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignSelf:'center',
    verticalAlign: 'center',

  },
  fireworkActive:{
    zIndex:10
  },
  fireworkInactive:{
    zIndex:-1
  }
});

export default  Styles;
