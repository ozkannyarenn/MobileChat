import React, { useState, useContext } from "react";
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
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./auth.styles";
import { AuthContext } from "../app/provider";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { register, Auth } from "../app/auth";
import PassMeter from "react-native-passmeter";

const MAX_LEN = 15,
  MIN_LEN = 6,
  PASS_LABELS = ["Too Short", "Weak", "Normal", "Strong", "Secure"];
export const LoginScreen = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useContext(AuthContext);
  const { control, handleSubmit, errors } = useForm();
  const [secure, setSecure] = useState(true);
  
  const onSumbit = (data) => {
    console.log(data);
    const httpRequest = async () => {
      const api = "http://192.168.2.98:63848/api/ApplicationUser/login";
      // buraya kendi bilgisayarının api adresini yaz
      try {
        const response = await axios.post(api, data);
        if (response.data.isSuccess) {
          /*console.log(response);
          console.log(response.data.id);*/
          await register(response.data.token, response.data.id);
          //console.log(response.data.id);
          await dispatch({ type: "SIGN_IN", token: response.data.token });
          // console.log(state.id); //bu sanırım null gelen dimi

          dispatch({ type: "UPDATE_NAME", name: response.data.firstName });
          dispatch({ type: "UPDATE_SURNAME", surName: response.data.lastName });
          dispatch({ type: "UPDATE_ID", id: response.data.id });
          dispatch({
            type: "UPDATE_USERNAME",
            userName: response.data.userName,
          });
          dispatch({ type: "UPDATE_IMAGE", image: response.data.image });
          // console.log(state);
        } else {
          console.log("something went wrong");
        }
      } catch (e) {
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
              <Text style={styles.loginAreaTitle}>Giriş Yapın</Text>
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
                        onChangeText={(value) => onChange(value)}
                        value={value }
                      />
                    )}
                    name="Password"
                    rules={{ required: true }}
                    defaultValue=""
                  />
                  <Icon
                    name={secure ? "eye-slash" : "eye"}
                    size={20}
                    color="blue"
                    type="font-awesome"
                    onPress={() => setSecure(!secure)}
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Forgot")}
                  >
                    <Text style={styles.suText}>Şifremi Unuttum</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[styles.button]}
                  onPress={handleSubmit(onSumbit)}
                >
                  <Text style={{ color: "#fff" }}>Giriş Yap</Text>
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
