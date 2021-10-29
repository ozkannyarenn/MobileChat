import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SearchBar, ListItem, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
export const SearchScreen = () => {
  const navigation = useNavigation();
  const [search, updateSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const httpRequest = async () => {
      const api =
        "http://192.168.2.98:63848/api/ApplicationUser/ApplicationSearch";
      try {
        const response = await axios.post(api, { searchText: search });
        if (response.data.isSuccess) {
          //console.log(response.data);
          setUsers(response.data.applicationUsersList);
          //console.log(users);
        } else {
          console.log("something went wrong");
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (search != "") {
      httpRequest();
    }
  }, [search]);

  return (
    <View style={Style.main}>
      <SearchBar 
        lightTheme={true}
        placeholder="Type Here..."
        onChangeText={(value) => updateSearch(value)}
        value={search}
      />
      <View>
        {users.map((user, i) => {
          return (
            <ListItem
              bottomDivider
              key={i}
              onPress={() => navigation.navigate("Chat", { id: user.id })}
            >
              <Avatar rounded size="medium" source={{ uri: user.image }} />
              <ListItem.Content>
                <ListItem.Title>{user.userName}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  main: {
    marginTop:55,
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
