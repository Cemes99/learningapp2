import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import {
  DEVICE_WIDTH,
  MARGIN_VIEW,
  PADDING_CONTENT,
  TEXTSIZE,
} from "../constant/Constant";

import { Registerhead } from "../components/Registerhead";
import { LinearGradient } from "expo-linear-gradient";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      rePassword: "",
    };
  }

  render() {
    const { email, password, rePassword } = this.state;
    return (
      <View styles={styles.container}>
        <View style={styles.head}>
          <Registerhead />
        </View>
        <View style={styles.body}>
          <View style={styles.rect}>
            <TextInput
              placeholder="Email"
              textBreakStrategy="highQuality"
              keyboardType="email-address"
              style={styles.textInput}
              onChangeText={(text) => this.setState({ email: text })}
              color="#000"
            ></TextInput>
          </View>
          <View style={styles.rect}>
            <TextInput
              placeholder="Password"
              textContentType="password"
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={(text) => this.setState({ password: text })}
              color="#000"
            ></TextInput>
          </View>
          <View style={styles.rect}>
            <TextInput
              placeholder="Re-password"
              textContentType="password"
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={(text) => this.setState({ rePassword: text })}
              color="#000"
            ></TextInput>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <LinearGradient
              colors={["#884BCB", "#7A43CB", "#713ECD"]}
              style={styles.button}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: responsiveFontSize(1.5),
                }}
              >
                CONFIRM
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  head: { marginTop: responsiveHeight(10), marginLeft: responsiveWidth(2.5) },

  body: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: responsiveHeight(20),
  },

  footerContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: responsiveHeight(10),
  },

  rect: {
    width: responsiveWidth(90),
    height: 48,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },

  textInput: {
    color: "#000",
    height: 48,
    textAlign: "left",
    width: responsiveWidth(77.2),
    height: responsiveHeight(7),
    fontSize: responsiveFontSize(2),
    paddingLeft: responsiveWidth(3),
  },

  button: {
    backgroundColor: "#743fcd",
    borderRadius: 40,
    width: responsiveWidth(30),
    height: responsiveHeight(6),
    justifyContent: "center",
    marginTop: responsiveHeight(3),
    marginLeft: responsiveWidth(2),
    alignSelf: "center",
  },
});
