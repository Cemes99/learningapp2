import React, { Component } from "react";
import {
    StyleSheet, Text, View, Alert
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import { DEVICE_WIDTH, MARGIN_VIEW, PADDING_CONTENT, TEXTSIZE } from "../constant/Constant";
import register from "../api/register";
import saveToken from "../api/saveToken";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            rePassword: ''
        };
    }

    gotoMain() {
        this.props.navigation.navigate("Home")
    }

    goBack() {
        this.props.navigation.pop()
    }

    onSuccess() {
        Alert.alert(
            'Thông báo',
            'Đăng ký thành công',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    }
    
    onFail() {
        Alert.alert(
            'Thông báo',
            'Đăng ký thất bại',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    }

    onSignUp() {
        const { email, password, rePassword } = this.state;
        if (password !== rePassword) {
            this.onFail();
        } else {
            register(email, password)
                .then(res => {
                    if(res.user) {
                        global.onSignIn = res.user;
                        saveToken(res.access_token);
                        this.onSuccess();
                        this.gotoMain();
                    } else {
                        console.log(res)
                        this.onFail();
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.onFail();
                });
        }
    }

    render() {
        const { email, password, rePassword } = this.state;
        return (
            <View styles={ styles.container }>
                <View style = { styles.rect }>
                    <TextInput
                        placeholder="Email"
                        textBreakStrategy="highQuality"
                        keyboardType="email-address"
                        style={ styles.textInput }
                        onChangeText={text => this.setState({email: text})}
                        color="#000"
                    ></TextInput>
                </View>
                <View style={ styles.rect }>
                    <TextInput
                        placeholder="Password"
                        textContentType="password"
                        secureTextEntry={true}
                        style={ styles.textInput }
                        onChangeText={text => this.setState({password: text})}
                        color="#000"
                    ></TextInput>
                </View>
                <View style={ styles.rect }>
                    <TextInput
                        placeholder="Re-password"
                        textContentType="password"
                        secureTextEntry={true}
                        style={ styles.textInput }
                        onChangeText={text => this.setState({rePassword: text})}
                        color="#000"
                    ></TextInput>
                </View>

                <TouchableOpacity
                    onPress={this.onSignUp.bind(this)}
                    style={ styles.button }
                >
                    <Text style={ styles.textButton }>CONFIRM</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    rect: {
        width: DEVICE_WIDTH-40,
        height: 48,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        marginTop: MARGIN_VIEW,
        marginLeft: MARGIN_VIEW,
        marginRight: MARGIN_VIEW,
        padding: PADDING_CONTENT
    },

    textInput: {
        color: "#000",
        width: DEVICE_WIDTH-40,
        height: 48,
        fontSize: TEXTSIZE,
    },

    textButton: {
        color: "#000",
        fontSize: TEXTSIZE
    },

    button: {
        width: DEVICE_WIDTH - 40,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,1)",
        borderRadius: 15,
        backgroundColor: "#ffd11a",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
        marginTop: MARGIN_VIEW,
        marginLeft: MARGIN_VIEW,
        marginRight: MARGIN_VIEW,
        padding: PADDING_CONTENT
    }
});