import React, { Component } from 'react';
import styles from './RewardsCircleComponentStyle';
import { View, TouchableHighlight, Text, ToastAndroid } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default class RewardsCircleComponent extends Component {

  constructor(args) {
    super(args);
    this.state = {numberOfRewardSteps: [], numberOfRewardCycles: [], numberOfRewardLevels: 3};
  }

  render() {

    return (



      <View style={styles.container}>

        {/*<TouchableOpacity style={styles.circle_1} />*/}
        {/*<TouchableOpacity style={styles.circle_2} />*/}
        {/*<TouchableOpacity style={styles.circle_3} />*/}
        {/*<TouchableOpacity style={styles.circle_} />*/}

        {/*<AnimatedCircularProgress*/}
          {/*style={styles.circle1}*/}
          {/*size={300}*/}
          {/*width={30}*/}
          {/*prefill={75}*/}
          {/*fill={75}*/}
          {/*rotation={0}*/}
          {/*arcSweepAngle={361}*/}
          {/*backgroundColor="#002A1C33"*/}
          {/*tintColor="#002A1C"/>*/}

        {/*<AnimatedCircularProgress*/}
          {/*style={styles.circle2}*/}
          {/*size={240}*/}
          {/*width={24}*/}
          {/*prefill={50}*/}
          {/*fill={50}*/}
          {/*rotation={0}*/}
          {/*arcSweepAngle={361}*/}
          {/*backgroundColor="#5DD0C233"*/}
          {/*tintColor="#5DD0C2"/>*/}


        {}


      </View>
    );
  }
}