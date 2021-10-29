import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SearchBar, ListItem, Avatar } from "react-native-elements";
import axios from "axios";
import { AuthContext } from "../app/provider";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const deleteMessages=async (senderId,reveicerId) => {
    const api = "http://192.168.2.98:63848/api/UserMessage/allMessageDelete";
    try {
      const response = await axios.post(api, {
        senderApplicationUserId: `${senderId}`,
        receiverApplicationUserId: `${reveicerId}`,
      });
      console.log(response);
      if (response.data.isSuccess) {
        console.log(response.data.message);
      } else {
        console.log("something got wrong");
      }
    } catch (e) {
    
      console.log(e);
    }

  }
  useEffect(() => {
    const api = "http://192.168.2.98:63848/api/UserMessage/GetApplicationMessageList";
    const httpPost = async () => {
      const id = await AsyncStorage.getItem("id");
      try {
        //console.log("id: "+ state.id);
        const response = await axios.post(api, { applicationUserId: `${id}` });
        //console.log(response);
        if (response.data.isSuccess) {
          setUsers(response.data.applicationMessageList);
        } else {
          console.log("something got wrong");
        }
      } catch (e) {
        console.log(e);
      }
    };
    httpPost();
  }, [users]);
  return (
    <View style={Style.main}>
      {users.map((user, i) => {
        return (
          <ListItem
            key={i}
            bottomDivider
            onPress={() => navigation.navigate("Chat", { id: user.id })}
          >
            <Avatar rounded size="medium" source={{ uri: user.image }} />
            <ListItem.Content>
            
              <ListItem.Title>{`${user.firstName} ${user.lastName}`}</ListItem.Title>
              <ListItem.Subtitle>{user.userName}</ListItem.Subtitle>
            </ListItem.Content>
            <TouchableOpacity onPress={()=>{deleteMessages(user.id, state.id);}}>
              <Text>Sohbeti Temizle</Text>
            </TouchableOpacity>
          </ListItem>
        );
      })}
    </View>
  );
};

const Style = StyleSheet.create({
  main: {
    marginTop: 55,
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#fff",
  },
  list: {
    borderWidth: 2,
    borderColor: "#000",
    borderStyle: "solid",
    height: 500,
  },
});
