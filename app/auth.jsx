import AsyncStorage from "@react-native-async-storage/async-storage";


export const register = async (token, id) => { await AsyncStorage.setItem("Token", token);  await AsyncStorage.setItem("id", id)};

export const LogOut = async () =>  AsyncStorage.removeItem("Token");


export const Auth = async () => {
   try {
   const user_token = await AsyncStorage.getItem("Token");
   const id = await AsyncStorage.getItem("id");
  // console.log(id);
    return user_token;
  } catch (e) {
    console.log(e);
  }
};
