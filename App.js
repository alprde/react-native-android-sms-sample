/*This is an Example of Sending Text SMS in React Native*/
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, PermissionsAndroid  } from 'react-native';
import {NativeModules} from 'react-native';
var DirectSms = NativeModules.DirectSms;
import SmsListener from './src/lib/SmsListener'

SmsListener.addListener(message => {
    console.log("Listener");
    console.log(message);
})

async function requestReadSmsPermission() {
    try {
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_SMS,
            {
                title: "(...)",
                message: "Why you're asking for..."
            }
        );
    } catch (err) {}
}

export default class App extends React.Component<Props> {

    componentDidMount() {
        requestReadSmsPermission()
    }

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
        DirectSms.sendDirectSms('2023', 'deneme');
      } else {
        console.log('SMS permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  render() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.sendDirectSms()} style={{padding: 10, borderRadius: 5, backgroundColor: '#f0f0f0'}}>
            <Text>send SMS</Text>
          </TouchableOpacity>
        </View>
    );
  }
}
