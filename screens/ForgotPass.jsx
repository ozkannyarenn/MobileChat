import React, {useState, useContext } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Input from "../src/components/Input";
import { Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import { styles } from "./auth.styles";
import { AuthContext } from "../app/provider";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { register, Auth } from "../app/auth";

export const ForgotScreen = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useContext(AuthContext);
  const { control, handleSubmit, errors } = useForm();
  const [secure, setSecure] = useState(true);
  const onSumbit = (data) => {
    //console.log(data);
    const httpRequest = async () => {
      
      const api = "http://192.168.2.98:63848/api/ApplicationUserEmail/changePassword"; 
      // buraya kendi bilgisayarının api adresini yaz
      try {const response = await axios.post(api, data);
        if (response.data.isSuccess) {
          
          console.log(response);

        } else {
          console.log("something went wrong");
        }
      }
      catch(e){
        console.log(e);
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
              <Text style={styles.loginAreaTitle}>Şifremi Unuttum</Text>
              <View>
                <Text style={styles.loginFormTitle}> </Text>
                <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <Input
                      autoCapitalize="none"
                      placeholder="E-posta"
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="email"
                  rules={{ required: true }}
                  defaultValue=""
                />
                
                <TouchableOpacity
                  style={[styles.button]}
                  onPress={handleSubmit(onSumbit)}
                >
                  <Text style={{ color: "#fff" }}>Yeni Şifre Gönder</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <View style={styles.signUpArea}>
            <Text style={styles.suDescription}>Hesabınız yok mu?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.suText}>Kayıt Olun</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};
