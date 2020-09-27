/*This is an Example of Sending Text SMS in React Native*/
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, PermissionsAndroid  } from 'react-native';
import {NativeModules} from 'react-native';
var DirectSms = NativeModules.DirectSms;
export default class App extends React.Component<Props> {
// async function to call the Java native method
  async sendDirectSms() {
    try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.SEND_SMS,
          {
            title: 'YourProject App Sms Permission',
            message:
                'YourProject App needs access to your inbox ' +
                'so you can send messages in background.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        DirectSms.sendDirectSms('05428224767', 'deneme');
      } else {
        console.log('SMS permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  render() {
    return (
        <View>
          <TouchableOpacity onPress={() => this.sendDirectSms()}>
            <Text>send SMS</Text>
          </TouchableOpacity>
        </View>
    );
  }
}
