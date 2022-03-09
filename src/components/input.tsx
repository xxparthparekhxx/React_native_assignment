import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

export enum inputType {
    usename,
    email,
    password
};

//{ valid, type, value, placeholder, handleChange, validator, error_reason, isPassword = false }: { valid: boolean; type: inputType; value: string; placeholder: string; handleChange: Function; validator: Function; error_reason: string; isPassword?: boolean }
export default function input(props) {
    console.log(props);

    return <View style={{ padding: 12 }}>
        < TextInput

            key={props.placeholder}
            style={{ ...Style.input, borderColor: !(props.error_reason.length > 0) ? "black" : "red" }}
            onChangeText={(e) => props.handleChange(e, props.type)}
            value={props.value}

            onBlur={(e) => props.validator(props.type)}
            placeholder={props.placeholder}
            secureTextEntry={props.isPassword}
        />
        {props.error_reason !== "" &&
            <Text style={Style.errText}>
                {props.error_reason}
            </Text>}
    </View>
}

const Style = StyleSheet.create({
    input: {
        height: 40,

        borderWidth: 1,
        borderRadius: 1,
        padding: 10,
    },
    errText: {
        fontSize: 10,
        color: "red"
    }
})