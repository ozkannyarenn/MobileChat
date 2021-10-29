import React, {useState , useContext } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";

import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import { Icon } from 'react-native-elements';
import Input from "../src/components/Input";
import { styles } from "./auth.styles";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../app/provider";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { register } from "../app/auth";

export const SignInScreen = () => {
  const navigation = useNavigation();
  const [passValue, getPassValue] = useState();
  const [secure, setSecure] = useState(true);
  const { state, dispatch } = useContext(AuthContext);
  const { control, handleSubmit, errors } = useForm();
  const [value, setPassword] = useState("");
  const [strength, setStrength] = useState({
    isActive: false,
    type: 0,
    color: "",
  });


  const  passwordStrengh = (value)=>{

    function hasNumber(myString) {
                            return /\d/.test(myString);
                          }
                          function hasUpperCase(str) {
                            return /[A-Z]/.test(str);
                          }
                          if(value.length === 0 ){
                            setStrength((prev) => ({
                              ...prev,
                              isActive: true,
                              type: 0,
                            }));
                          }
                          if (value.length < 6 && value.length > 0) {
                            setStrength((prev) => ({
                              ...prev,
                              isActive: true,
                              type: 1,
                              color: "red",
                            }));
                          }
                          if (value.length >= 6 && hasNumber(value)) {
                            setStrength((prev) => ({
                              ...prev,
                              isActive: true,
                              type: 2,
                              color: "yellow",
                            }));
                          }

                          if (
                            value.length >= 6 &&
                            hasNumber(value) &&
                            hasUpperCase(value)
                          ) {
                            setStrength((prev) => ({
                              ...prev,
                              isActive: true,
                              type: 3,
                              color: "green",
                            }));
                          }

  }


  const onSumbit = (data) => {
    console.log(data);
    const httpRequest = async () => {

      
      const api = "http://192.168.2.98:63848/api/ApplicationUser/register"
      // buraya kendi bilgisayarının api adresini yaz
      var response;
      
      try{
        //console.log(data);
        response = await axios.post(api,
          data);
        if(response.data.isSuccess){

          register(response.data.Token, response.data.Id);
          dispatch({type:"SIGN_IN", token: response.data.Token});
          dispatch({type:"UPDATE_ID", id:response.data.Id, type:"id"});
          dispatch({type:"UPDATE_USERNAME", userName:data.UserName});
          navigation.navigate("Login");

          
        }else{
              console.log("something went wrong");
        }
      }
      catch(e){
        console.log(e);
        //console.log(response);
      }
      
      
    };
    httpRequest();
  };
  return (
    <View style={styles.container}>
      <View>
        <KeyboardAvoidingView behavior={"position"}>
          <View style={styles.logo}>
            <Image source={require("../assets/images/logo.png")} />
          </View>
          <Text style={styles.logoDesc}>www.fixedbugs.net</Text>
          <ScrollView>
            <View style={styles.loginArea}>
              <Text style={styles.loginAreaTitle}>Kayıt Olun</Text>
              <View>
                <Text style={styles.loginFormTitle}> </Text>
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <Input
                      autoCapitalize="none"
                      placeholder="Ad Soyad"
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="UserName"
                  rules={{ required: true }}
                  defaultValue=""
                />

                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <Input
                      autoCapitalize="none"
                      placeholder="Mail Adresi"
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="Email"
                  rules={{ required: true }}
                  defaultValue=""
                />

<View>
                  <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <Input
                        autoCapitalize="none"
                        placeholder="Şifre"
                        secureTextEntry={secure}
                        onBlur={onBlur}
                        onChangeText={(value) => { passwordStrengh(value); return   onChange(value)}}
                        value={value}
                      />
                    )}
                    name="Password"
                    rules={{ required: true }}
                    defaultValue=""
                  />
                 { strength.type === 1 ? (<Text style={{color:"red"}} >Şifreniz Çok Zayıf! En az 6 karakterli olmalı ve numara içermeli.</Text>): strength.type === 2 ?  (<Text style={{color:"orange"}}>Şifreniz normal. Daha güçlü bir şifre için Büyük harf ekleyin</Text>): strength.type === 3 ?  (<Text style={{color:"green"}}>Şifreniz Güçlü</Text>): <Text></Text>  }
                  <Icon
                    name={secure ? "eye-slash" : "eye"}
                    size={20}
                    color="blue"
                    type="font-awesome"
                    onPress={() => setSecure(!secure)}
                  />
                  
                </View>

                
                <TouchableOpacity
                  style={[styles.button]}
                  onPress={handleSubmit(onSumbit)}
                >
                  <Text style={{ color: "#fff" }}>Kayıt Ol</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};
