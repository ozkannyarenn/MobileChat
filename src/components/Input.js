import React, { Component } from 'react';
import {StyleSheet, View, TextInput } from 'react-native';

export default function Input(props) {

    return (
        <TextInput 
            {...props}
            placeholderTextColor="#ddd"
            style={styles.input}
        />
    );
}

const styles = StyleSheet.create({
    input:{
        height:40,
        paddingHorizontal: 5,
        borderWidth:2,
        borderRadius:4,
        borderColor:'#f1f1f1',
        color:'#999999',
        marginBottom:8,
        fontSize:14,
        fontWeight:'600',
    }
});


