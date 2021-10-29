import React, { useContext } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { ListItem, Avatar, Text } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { LogOut } from "../app/auth";
import { AuthContext } from "../app/provider";

export const SettingsScreen = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useContext(AuthContext);

  const deleteUser = async () => {
    const api = "http://192.168.2.98:63848/api/ApplicationUser/login";
    const response = await axios.delete(api);
    if (response.data.isSuccess) {
      LogOut();
      dispatch({ type: "SIGN_OUT" });
    }
  };
  const LogOutUser = () => {
    LogOut();
    dispatch({ type: "SIGN_OUT" });
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={Style.main}>
        <Text h3>Ayarlar</Text>
        <ListItem bottomDivider containerStyle={Style.list}>
          <Avatar
            rounded
            size="medium"
            source={{ uri: state.image }}
          />
          <ListItem.Content>
            <ListItem.Title>{`${state.name}  ${state.surName}`}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem
          containerStyle={Style.list}
          onPress={() => navigation.navigate("Update")}
        >
          <MaterialCommunityIcons name="update" size={20} color="black" />
          <ListItem.Content>
            <ListItem.Title>Hesabı Güncelle</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem containerStyle={Style.list} onPress={() => LogOutUser()}>
          <MaterialCommunityIcons name="logout" size={20} color="black" />
          <ListItem.Content>
            <ListItem.Title>Çıkış Yap</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem containerStyle={Style.list} onPress={() => deleteUser()}>
          <MaterialCommunityIcons name="delete" size={20} color="black" />
          <ListItem.Content>
            <ListItem.Title style={{ color: "red" }}>Hesabı Sil</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem containerStyle={Style.list}>
          <ListItem.Content style={{ alignItems: "center" }}>
            <ListItem.Subtitle>From</ListItem.Subtitle>
            <ListItem.Title>Fixedbugs</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    </ScrollView>
  );
};

const Style = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  list: {
    width: "100%",
  },
});
