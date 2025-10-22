import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#ecf0f1',
    padding: 8,
  },
  buttonsContainer: {
    marginTop:1,
    flexDirection:'row',
    gap:5,
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
    height:70,
    width:70,
    //borderWidth:1,
    borderRadius:19,
    backgroundColor:'#dfe7f5',
    paddingTop:17,
    elevation:5
  },
  text: {
    textAlign:'center',
    fontSize:35,
    fontFamily:'ArialRound', //Neucha, CirilicRound, ArialRound
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
  },
  closeCardBtn: {
    flex:1, 
    flexDirection:'row-reverse', 
    width: 250,
    //top: 20,
    position:'fixed',
    zIndex: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
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
  //HomeScreen
  home:{
    //flex: 1,
    //backgroundColor: '#ecf0f1',
    padding: 8,
    justifyContent: 'center',

  },
  menuBtn:{
    height:40,
    width: 200,
    borderWidth:1,
    borderRadius:9,
    marginBottom:15,
    alignSelf:'center',
    backgroundColor:'#ed365b'
  },
});

export default  Styles;