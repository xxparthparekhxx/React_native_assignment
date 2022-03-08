import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import Input, { inputType } from "../components/input"
import { connect } from 'react-redux'
import { createUser, loginUser } from '../redux/actions/User'
function SigninScreen(props: never) {
    const [Details, setDetails] = useState({
        "password": "",
        "username": "",
        "valid_details": true,
        "error_reason": ""
    })

    function handleChange(Data: string, etype: inputType): void {

        switch (etype) {

            case inputType.usename:
                setDetails({ ...Details, username: Data })
                break;


            case inputType.password:
                setDetails({ ...Details, password: Data })
                break;
            default:
                break;
        }
    }

    function validator(etype: inputType) {
        switch (etype) {

            default:
                break;
        }
    }
    function CheckCredsValidity(arr) {

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].username === Details.username && arr[i].password === Details.password) {
                return true;
            }
        }
        return false;


    }
    return (

        <View style={styles.Center}>
            <View style={styles.card}>

                <Text> Signin </Text>

                {[
                    Input({ valid: Details.valid_details, type: inputType.usename, value: Details.username, error_reason: Details.error_reason, handleChange: handleChange, placeholder: "username", validator: validator }),
                    Input({ valid: Details.valid_details, type: inputType.password, value: Details.password, error_reason: "", handleChange: handleChange, placeholder: "password", validator: validator, isPassword: true })
                ]}
                <Button title='Login' onPress={() => {
                    if (CheckCredsValidity(props.AppUsers)) {

                        props.login(Details.username, Details.username)
                        props.navigation.navigate("Home")

                    } else {
                        Details.error_reason = "Invalid Username Or Password"
                    }
                }} />

            </View>

        </View>

    )
}
const styles = StyleSheet.create({
    padded: {
        padding: 12,
    },
    input: {

        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 1,
        padding: 10,
    },
    Center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "grey"
    },

    card: {
        width: '80%',
        marginTop: 12,
        padding: 12,
        borderRadius: 8,
        color: "#666",
        backgroundColor: "#eaeaea"
    }
});

const mapStatetoProps = (state: { User: { Users: any } }) => {
    console.log(state);
    return { AppUsers: state.User.Users };

}
const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: { username: string; password: string } }) => any) => {
    return {
        login: (username, password) => { dispatch(loginUser({ username, password })); }
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(SigninScreen);

