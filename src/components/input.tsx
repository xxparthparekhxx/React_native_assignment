import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

export enum inputType {
    usename,
    email,
    password
};

export default function input({ valid, type, value, placeholder, handleChange, validator, error_reason, isPassword = false }: { valid: boolean; type: inputType; value: string; placeholder: string; handleChange: Function; validator: Function; error_reason: string; isPassword?: boolean }) {


    return <View style={{ padding: 12 }}>
        < TextInput

            key={placeholder}
            style={{ ...Style.input, borderColor: !(error_reason.length > 0) ? "black" : "red" }}
            onChangeText={(e) => handleChange(e, type)}
            value={value}

            onEndEditing={(e) => validator(type)}
            placeholder={placeholder}
            secureTextEntry={isPassword}
        />
        {error_reason !== "" &&
            <Text style={Style.errText}>
                {error_reason}
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