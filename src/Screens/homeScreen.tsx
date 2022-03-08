import React, { useState } from 'react'
import Input, { inputType } from '../components/input';
import { Button, View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { logOutUser, loginUser, updateUser } from '../redux/actions/User';
import SignupScreen from './SignupScreen';
var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var hasNumber = /[0-9]/g;
var hasCapital = /[A-Z]/g;
var hasLowerCase = /[a-z]/g;
function UnAuthHomeScreen(props: any) {
    console.log(props);
    const renderItem = ({ item }: any) => {
        console.log("This is the item we get", item);
        return <TouchableOpacity onPress={() => {
            setCurrentEditing({ ...CurrentEditing, isEditing: true, username: item.username, email: item.email, password: item.password })
        }} style={styles.item}>
            <Text> username {item.username} </Text>
            <Text> email {item.email} </Text>
            <Text> password {item.password} </Text>
        </TouchableOpacity>

    }

    const [CurrentEditing, setCurrentEditing] = useState({
        "isEditing": false,
        username: "",
        password: "",
        email: "",
        newemail: "",
        newpassword: "",
        newusername: "",
        newpassword_error: "",
        newusername_error: "",
        newemail_error: ""
    });
    function handleChange(Data: string, etype: inputType): void {

        switch (etype) {

            case inputType.usename:
                setCurrentEditing({ ...CurrentEditing, newusername: Data })
                break;
            case inputType.email:
                setCurrentEditing({ ...CurrentEditing, newemail: Data })
                break;
            case inputType.password:
                setCurrentEditing({ ...CurrentEditing, newpassword: Data })
                break;
            default:
                break;
        }
    }

    function validator(etype: inputType) {

        switch (etype) {

            case inputType.usename:


                if (CurrentEditing.newusername.length < 6)
                    setCurrentEditing({ ...CurrentEditing, newusername_error: "Username Should be bigger then 6" })
                else
                    setCurrentEditing({ ...CurrentEditing, newusername_error: "" })
                break;


            case inputType.email:
                if (CurrentEditing.newemail.toLowerCase().trim().match(mailformat) !== null) {
                    setCurrentEditing({
                        ...CurrentEditing,
                        newemail_error: ""
                    })
                }
                else {
                    setCurrentEditing({
                        ...CurrentEditing,
                        newemail_error: "Invalid Email Provided"
                    })
                }


                break;
            case inputType.password:
                if (CurrentEditing.newpassword.length < 6) {
                    setCurrentEditing({
                        ...CurrentEditing,

                        newpassword_error: "Password should be atleast 6 characters"
                    })
                } else if (CurrentEditing.newpassword.match(hasNumber) === null) {
                    setCurrentEditing({
                        ...CurrentEditing,

                        newpassword_error: "Password should contain a Number"
                    })
                } else if (CurrentEditing.newpassword.match(hasCapital) === null) {
                    setCurrentEditing({
                        ...CurrentEditing,

                        newpassword_error: "Password should contain Capital Letter"
                    })
                }
                else if (CurrentEditing.newpassword.match(hasLowerCase) === null) {
                    setCurrentEditing({
                        ...CurrentEditing,

                        newpassword_error: "Password should contain a Lowercase letter"
                    })
                }
                else {
                    setCurrentEditing({
                        ...CurrentEditing,

                        newpassword_error: ""
                    })
                }


                break;
            default:
                break;
        }
    }
    function UserAlreadyExists(arr: string | any[]) {

        for (let i = 0; i < arr.length; i++) {

            if (CurrentEditing.newusername == arr[i].username) {
                return true;
            }
        }
        return false;

    }

    return (
        <View style={styles.Center}>

            {

                props.isUser ?

                    CurrentEditing.isEditing ?


                        <View style={styles.card}>

                            {
                                [

                                    Input({ valid: CurrentEditing.newusername_error.length == 0, type: inputType.usename, value: CurrentEditing.newusername, placeholder: "username", handleChange, validator, error_reason: CurrentEditing.newusername_error }),
                                    Input({ valid: CurrentEditing.newemail_error.length == 0, type: inputType.email, value: CurrentEditing.newemail, placeholder: "email", handleChange, validator, error_reason: CurrentEditing.newemail_error }),
                                    Input({ valid: CurrentEditing.newpassword_error.length == 0, type: inputType.password, value: CurrentEditing.newpassword, placeholder: "password", handleChange, validator, error_reason: CurrentEditing.newpassword_error, isPassword: true })
                                ]
                            }
                            <Button onPress={() => {
                                setCurrentEditing({
                                    ...CurrentEditing,
                                    newusername_error:
                                        CurrentEditing.username.length < 6 ?
                                            "Enter a Username Greater then 6" :
                                            UserAlreadyExists(props.AppUsers) ? "Username has been Taken" : "",
                                    newemail_error: CurrentEditing.newemail.toLowerCase().trim().match(mailformat) !== null ? "" : "Invalid Email",
                                    newpassword_error:
                                        CurrentEditing.newpassword.length > 6 ?
                                            !(CurrentEditing.newpassword.match(hasNumber) === null) ?
                                                !(CurrentEditing.newpassword.match(hasCapital) === null) ?
                                                    !(CurrentEditing.newpassword.match(hasLowerCase) === null) ?
                                                        ''
                                                        : "password should contain a lower case letter"
                                                    : "password should contain a capital letter"
                                                : "password should contain a number"
                                            : "Passwrod needs to be 6 characters"
                                })
                                if (CurrentEditing.newpassword_error == "" && CurrentEditing.newemail_error == "" && CurrentEditing.newusername_error == "" && CurrentEditing.newusername !== "" && (!UserAlreadyExists(props.AppUsers))) {
                                    console.log(CurrentEditing);
                                    props.update(CurrentEditing.newusername, CurrentEditing.newemail, CurrentEditing.newpassword, { username: CurrentEditing.username, email: CurrentEditing.email, password: CurrentEditing.password });
                                    setCurrentEditing({
                                        "isEditing": false,
                                        username: "",
                                        password: "",
                                        email: "",
                                        newemail: "",
                                        newpassword: "",
                                        newusername: "",
                                        newpassword_error: "",
                                        newusername_error: "",
                                        newemail_error: ""
                                    })

                                }
                            }} title='Update'> </Button>
                            <View style={{ marginTop: 10 }}><Button onPress={() => {
                                setCurrentEditing({ ...CurrentEditing, isEditing: false })
                            }} title='Back' > </Button></View>

                        </View>

                        : <View>
                            <Button onPress={() => { props.logout(); }} title='Logout'></Button>
                            <FlatList
                                data={props.AppUsers}
                                renderItem={renderItem}
                            />
                        </View>

                    : <View style={styles.card}>
                        <Text style={styles.padded_xl}>Login To a Existing account</Text>
                        <Button accessibilityLabel='Sign in' title='Sign in' onPress={() => props.navigation.navigate("Signin")} />
                        <Text style={styles.padded_xl}>Create a New Account</Text>
                        <Button accessibilityLabel='Sign up' title='Sign up' onPress={() => props.navigation.navigate("Signup")} />
                        <View style={styles.padded_s}></View>
                    </View>
            }


        </View >
    )
}
const styles = StyleSheet.create({
    padded_xl: {
        padding: 24,
    },

    padded_s: {
        padding: 12
    },
    item: {

        color: "#666",
        backgroundColor: "#eaeaea",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    Center: { flex: 1, alignItems: 'center', justifyContent: "center" },
    card: {

        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        width: '80%',
        color: "#666",
        backgroundColor: "#eaeaea"
    }
});
const mapStatetoProps = (state: { User: { Users: any; CurrentUser: any; }; }) => {
    console.log(state);
    return { AppUsers: state.User.Users, isUser: state.User.CurrentUser };

}
const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: { username: string; password: string } }) => any) => {
    return {
        login: (username: any, password: any) => { dispatch(loginUser({ username, password })); },
        logout: () => { dispatch(logOutUser()); },
        update: (username: any, email: any, password: any, olduser: any) => { dispatch(updateUser({ username, email, password, olduser })) }
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(UnAuthHomeScreen)