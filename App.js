import React, {Component} from 'react';

import {View, Dimensions, TouchableOpacity, Text} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

console.disableYellowBox = true;

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
  onSuccess(e) {
    console.log('=========>', e.data);
    alert(e.data);
  }

  makeSlideOutTranslation(translationType, fromValue) {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * 0.05,
      },
      to: {
        [translationType]: fromValue,
      },
    };
  }

  render() {
    return (
      <View>
        <QRCodeScanner
          showMarker
          onRead={this.onSuccess.bind(this)}
          cameraStyle={{height: SCREEN_HEIGHT}}
          customMarker={
            <View style={styles.rectangleContainer}>
              <View style={styles.topOverlay}>
                <Text style={{fontSize: 30, color: 'white'}}>
                  QR CODE SCANNER
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={styles.leftAndRightOverlay} />

                <View style={styles.rectangle}>
                  <Icon
                    name="search-outline"
                    size={SCREEN_WIDTH * 0.43}
                    color={iconScanColor}
                  />
                  <Animatable.View
                    style={styles.scanBar}
                    direction="alternate-reverse"
                    iterationCount="infinite"
                    duration={1700}
                    easing="linear"
                    animation={this.makeSlideOutTranslation(
                      'translateY',
                      SCREEN_WIDTH * -0.5,
                    )}
                  />
                </View>

                <View style={styles.leftAndRightOverlay} />
              </View>

              <View style={styles.bottomOverlay} />
            </View>
          }
        />
      </View>
    );
  }
}

const overlayColor = 'rgba(0,0,0,0.5)';

const rectDimensions = SCREEN_WIDTH * 0.65;
const rectBorderWidth = SCREEN_WIDTH * 0.005;
const rectBorderColor = 'red';

const scanBarWidth = SCREEN_WIDTH * 0.46;
const scanBarHeight = SCREEN_WIDTH * 0.0025;
const scanBarColor = '#22ff00';

const iconScanColor = 'blue';

const styles = {
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25,
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor,
  },
  scanbutton: {
    width: '150',
    height: '50',
    backgroundColor: '#893478',
  },
};

export default App;
