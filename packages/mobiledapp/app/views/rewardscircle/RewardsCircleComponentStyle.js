import { StyleSheet } from 'react-native';

const size = 300;

module.exports = StyleSheet.create({

  container: {
    width: size,
    height: size,
    alignItems: 'center',
  },
  circle_1: {
    top: 0,
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: '#FF8100'
  },
  circle_2: {
    top: size * 0.1, // The amount remaining
    left: size * 0.1,
    position: 'absolute',
    width: size * 0.8, // 80% of the base size
    height: size * 0.8,
    borderRadius: size * 0.8 / 2,
    backgroundColor: '#FF9D2E'
  },
  circle_3: {
    top: size * 0.2,
    left: size * 0.2,
    position: 'absolute',
    width: size * 0.6,
    height: size * 0.6, // 60% of the base size
    borderRadius: size * 0.6 / 2,
    backgroundColor: '#FFFFFF'
  },
  circle_4: {
    top: size * 0.4,
    left: size * 0.4,
    position: 'absolute',
    width: size * 0.2,
    height: size * 0.2, // 60% of the base size
    borderRadius: size * 0.2 / 2,
    backgroundColor: '#ff0000'
  },
  circle1: {
    top: 0,
    left: 0,
    position: 'absolute',
  },
  circle2: {
    top: size * 0.1,
    left: size * 0.1,
    position: 'absolute',
  },
  text: {
    fontSize: 14,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular'
  }
});