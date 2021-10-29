import React from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingVertical:80,
  },
  headBackground:{
    position:'absolute',
    top:0,
    left:0,
    height:800,
    width:'100%'
  },
  logo:{
    alignItems:'center',
  },
  logoDesc:{
    textAlign:'center',
    color:'#222'
  },
  loginArea:{
    marginHorizontal:40,
    marginVertical:40,
    backgroundColor:'#fff',
    padding:20,
    borderRadius:5,
    //shadow css leri ios için geçerli elevation android için geçerli
    shadowColor:'black',
    shadowOpacity:.2,
    shadowRadius:3,
    shadowOffset:{
      width:0,
      height:2
    },
    elevation:4,
  },
  loginAreaTitle:{
      fontWeight:'bold',
      fontSize:20,
      textAlign:'center',

  },
  signUpArea:{
    alignItems:'center',

  },
  suDescription:{
    color:'#999',
  },
  suText:{
    color:'#222',
  },
  button:{
    marginTop:15,
    paddingVertical:15,
    paddingHorizontal: 10,
    borderRadius:3,
    alignItems:"center",
    color: '#f1f1f1',
    backgroundColor:'#000000'
  },
  loginFormTitle:{
    marginBottom:20,
  }
  

});