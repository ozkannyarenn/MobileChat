import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../app/provider";
import axios from "axios";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";

import Input from "../src/components/Input";
export const UpdateScreen = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { control, handleSubmit, errors } = useForm({
    defaultValues: {
      FirstName: state.name,
      LastName: state.surName,
    },
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  // useEffect(() => {
  //   dispatch({ type: "UPDATE_ID", id: "yirmibir" });
  //   dispatch({type:"UPDATE_TOKEN", token: "deneme2"});
  //   console.log(state);
  //   console.log(state.id);
  //   console.log(state.userToken);
  // }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      let formData = new FormData();
      formData.append("file", result.uri);
      formData.append("Id", state.id);
      const updateProfile = async () => {
        const api = "http://192.168.2.98:63848/api/ApplicationUser/UploadFileImage";
        try {
          const response = await axios.post(api, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          //console.log(response);
          if (response.data.isSuccess) {
            dispatch({ type: "UPDATE_IMAGE", image: result.uri });
          } else {
            console.log("something went wrong");
          }
        } catch (e) {
          console.log(e);
        }
      };
      updateProfile();
    }
  };
  const onSumbit = (data) => {
    const httpRequest = async () => {
      const api =
        "http://192.168.1.107:63848/api/ApplicationUser/applicationUserUpdate";
      data.Id = state.id;
      /*console.log(state);
      console.log(data);*/
      // buraya kendi bilgisayarının api adresini yaz
      try {
        const response = await axios.post(api, data);
        if (response.data.isSuccess) {
          dispatch({ type: "UPDATE_NAME", name: data.FirstName });
          dispatch({
            type: "UPDATE_SURNAME",
            surName: data.surName,
          });
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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            ></Image>
          </View>

          <TouchableOpacity style={styles.add} onPress={pickImage}>
            <Text style={{ color: "#fff" }}>Ekle</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
            USER 1
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: "#444444",
            borderBottomWidth: 1,
            padding: 10,
          }}
        ></View>
        <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Input
                autoCapitalize="none"
                placeholder="Kullanıcı Adınız"
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
                placeholder="Adınız"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="FirstName"
            rules={{ required: true }}
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Input
                autoCapitalize="none"
                placeholder="Soyadınız"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="LastName"
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
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Input
                autoCapitalize="none"
                placeholder="Şifreniz"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="Password"
            rules={{ required: true }}
            defaultValue=""
          />
          <TouchableOpacity
            style={[styles.button]}
            onPress={handleSubmit(onSumbit)}
          >
            <Text style={{ color: "#fff" }}>Bilgileri Güncelle</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  text: {
    color: "#52575D",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  profileImage: {
    width: 170,
    height: 170,
    marginTop: 10,
    borderRadius: 100,
    overflow: "hidden",
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  cContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 3,
    alignItems: "center",
    color: "#f1f1f1",
    backgroundColor: "#000000",
  },
});
