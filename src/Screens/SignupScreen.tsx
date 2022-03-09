import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import Input from '../components/input'
import { inputType } from "../components/input"

import { connect } from 'react-redux'
import { createUser } from '../redux/actions/User'

var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var hasNumber = /[0-9]/g;
var hasCapital = /[A-Z]/g;
var hasLowerCase = /[a-z]/g;

function SignupScreen(props: { AppUsers: any; editingOld: number; CreateU: (arg0: string, arg1: string, arg2: string) => void; navigation: { navigate: (arg0: string) => void } }) {
    const [Details, setDetails] = useState({
        "email": "",
        "password": "",
        "username": "",
        "validEmail": true,
        "validPassword": true,
        "validusename": true,
        "usernameError": "",
        "emailError": "",
        "passwordError": ""

    })




    function handleChange(Data: string, etype: inputType): void {

        switch (etype) {

            case inputType.usename:
                setDetails({ ...Details, username: Data })
                break;
            case inputType.email:
                setDetails({ ...Details, email: Data })
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

            case inputType.usename:


                if (Details.username.length < 6)
                    setDetails({ ...Details, usernameError: "Username Should be bigger then 6", validusename: false })
                else
                    setDetails({ ...Details, usernameError: "", validusename: true })
                break;


            case inputType.email:
                if (Details.email.toLowerCase().trim().match(mailformat) !== null) {
                    setDetails({
                        ...Details,
                        validEmail: true,
                        emailError: ""
                    })
                }
                else {
                    setDetails({
                        ...Details,
                        validEmail: false,
                        emailError: "Invalid Email Provided"
                    })
                }


                break;
            case inputType.password:
                if (Details.password.length < 6) {
                    setDetails({
                        ...Details,
                        validPassword: false,
                        passwordError: "Password should be atleast 6 characters"
                    })
                } else if (Details.password.match(hasNumber) === null) {
                    setDetails({
                        ...Details,
                        validPassword: false,
                        passwordError: "Password should contain a Number"
                    })
                } else if (Details.password.match(hasCapital) === null) {
                    setDetails({
                        ...Details,
                        validPassword: false,
                        passwordError: "Password should contain Capital Letter"
                    })
                }
                else if (Details.password.match(hasLowerCase) === null) {
                    setDetails({
                        ...Details,
                        validPassword: false,
                        passwordError: "Password should contain a Lowercase letter"
                    })
                }
                else {
                    setDetails({
                        ...Details,
                        validPassword: true,
                        passwordError: ""
                    })
                }


                break;
            default:
                break;
        }
    }

    // const users = useSelector();
    // const dispatch = useDispatch();
    function UserAlreadyExists(arr: string | any[]) {

        for (let i = 0; i < arr.length; i++) {

            if (Details.username == arr[i].username) {
                return true;
            }
        }
        return false;

    }

    return (
        <View style={styles.Center}>
            <View style={styles.card}>
                <Text > Sign Up </Text>
                {
                    <>
                        <Input key={"username"} valid={Details.validusename} type={inputType.usename} value={Details.username} placeholder={"username"} handleChange={handleChange} validator={validator} error_reason={Details.usernameError} />
                        <Input key={"email"} valid={Details.validEmail} type={inputType.email} value={Details.email} placeholder={"email"} handleChange={handleChange} validator={validator} error_reason={Details.emailError} />
                        <Input key={"password"} valid={Details.validPassword} type={inputType.password} value={Details.password} placeholder={"password"} handleChange={handleChange} validator={validator} error_reason={Details.passwordError} isPassword={true} />
                    </>
                    // Input({valid: Details.validusename, type: inputType.usename, value: Details.username, placeholder: "username", handleChange, validator, error_reason: Details.usernameError }),
                    // Input({valid: Details.validEmail, type: inputType.email, value: Details.email, placeholder: "email", handleChange, validator, error_reason: Details.emailError }),
                    // Input({valid: Details.validPassword, type: inputType.password, value: Details.password, placeholder: "password", handleChange, validator, error_reason: Details.passwordError, isPassword: true })

                }

                <View style={styles.padded}>
                    <Button onPress={() => {

                        setDetails({
                            ...Details,
                            usernameError:
                                Details.username.length < 6 ?
                                    "Enter a Username Greater then 6" :
                                    UserAlreadyExists(props.AppUsers) ? "Username has been Taken" : "",
                            emailError: Details.email.toLowerCase().trim().match(mailformat) !== null ? "" : "Invalid Email",
                            passwordError:
                                Details.password.length > 6 ?
                                    !(Details.password.match(hasNumber) === null) ?
                                        !(Details.password.match(hasCapital) === null) ?
                                            !(Details.password.match(hasLowerCase) === null) ?
                                                ''
                                                : "password should contain a lower case letter"
                                            : "password should contain a capital letter"
                                        : "password should contain a number"
                                    : "Passwrod needs to be 6 characters"
                        })
                        if (Details.passwordError == "" && Details.emailError == "" && Details.usernameError == "" && Details.username !== "" && (!UserAlreadyExists(props.AppUsers) | props.editingOld)) {

                            props.CreateU(Details.username.trim(), Details.email.trim(), Details.password.trim());
                            props.navigation.navigate("Home");
                        }


                    }} title="Signup" ></Button>
                    <Text></Text>
                </View>
            </View>
        </View >
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

    return { AppUsers: state.User.Users };

}
const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: { username: string; email: string; password: string } }) => any) => {
    return {
        CreateU: (username: any, email: any, password: any) => { dispatch(createUser({ username, email, password })); }
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(SignupScreen);

