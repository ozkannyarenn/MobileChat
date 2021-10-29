import React, { useState, useEffect, useCallback, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";
import { AuthContext } from "../app/provider";

export const ChatScreen = ({ route }) => {
  const {state, dispatch} = useContext(AuthContext);
  
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    //console.log(route.params.id);
    
    const api = `http://192.168.2.98:63848/api/UserMessage/getListMessage`;
    //console.log(api);
    const httpRequest = async () => {
      try {
        //console.log(route.params.id);
        const response = await axios.post(api, {
          senderApplicationUserId: `${state.id}`,
          receiverApplicationUserId: `${route.params.id}`,
        });
        if (response.data.isSuccess) {
          //console.log(messages);
          const structuredMessages = response.data.messageList.map((val, index)=>{

            return {
              _id: val.id,
              text: val.messageText,
              createdAt: val.sendDate,
              user: {
                _id: val.messageSender,
                name: `${val.senderFirstName} ${val.senderLastName}`,
                avatar: val.senderImage
              }

            }
          })
          //console.log(structuredMessages);
          setMessages(structuredMessages);
        } else {
          console.log("something went wrong");
        }
      } catch (e) {
        console.log(e);
      }
    };
    setInterval(()=> httpRequest(), 2000);

    //console.log(messages);
  }, []);

  const onSend = useCallback((messages = []) => {
    const data = {
      senderApplicationUserId: state.id,
      messageText: messages[0].text,
      receiverApplicationUserId: route.params.id,
    };
    const api = `http://192.168.2.98:63848/api/UserMessage/chatMessage`;
   // console.log(api);
    const formRequest = async () => {
      try {
        const response = await axios.post(api, data);
        if (response.data.isSuccess) {
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
          );
          //console.log(messages[0]);
        } else {
          console.log("something went wrong");
        }
      } catch (e) {
        console.log(e);
      }
    };
    formRequest();
  }, []);

  return (
    <View style={Style.main}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: state.id,
        }}
      />
    </View>
  );
};

const Style = StyleSheet.create({
  main: {
    flex: 1,
  },
});
