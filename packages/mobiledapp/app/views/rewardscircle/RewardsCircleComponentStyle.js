import { StyleSheet } from 'react-native';

const BASE_SIZE = 300;

module.exports = StyleSheet.create({

  container:{
    width: BASE_SIZE,
    height: BASE_SIZE,
    alignItems: 'center',
  },
  circle_1:{
    top:0,
    position: 'absolute',
    width:BASE_SIZE,
    height:BASE_SIZE,
    borderRadius: BASE_SIZE/2,
    backgroundColor: '#FF8100'
  },
  circle_2:{
    top:BASE_SIZE*0.1, // The amount remaining
    left:BASE_SIZE*0.1,
    position: 'absolute',
    width:BASE_SIZE*0.8, // 80% of the base size
    height:BASE_SIZE*0.8,
    borderRadius: BASE_SIZE*0.8/2,
    backgroundColor: '#FF9D2E'
  },
  circle_3:{
    top:BASE_SIZE*0.2,
    left:BASE_SIZE*0.2,
    position: 'absolute',
    width:BASE_SIZE*0.6,
    height:BASE_SIZE*0.6, // 60% of the base size
    borderRadius: BASE_SIZE*0.6/2,
    backgroundColor: '#FFFFFF'
  },
  circle_4:{
    top:BASE_SIZE*0.4,
    left:BASE_SIZE*0.4,
    position: 'absolute',
    width:BASE_SIZE*0.2,
    height:BASE_SIZE*0.2, // 60% of the base size
    borderRadius: BASE_SIZE*0.2/2,
    backgroundColor: '#ff0000'
  },
  circle1:{
    top:0,
    position: 'absolute',
  },
  circle2:{
    top:BASE_SIZE*0.1,
    left:BASE_SIZE*0.1,
    position: 'absolute',
  },
});