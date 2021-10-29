import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, LoginScreen, SignInScreen, ChatScreen,ForgotScreen, SettingsScreen, UpdateScreen,SearchScreen} from "../screens";
import { SafeAreaView, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 

const AuthStack = createStackNavigator();

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
      <HomeStack.Screen name="Chat" component={ChatScreen} />
    </HomeStack.Navigator>
  );
};

const SearchStack = createStackNavigator();

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} options={{headerShown:false}} />
      <SearchStack.Screen name="Chat" component={ChatScreen} />
    </SearchStack.Navigator>
  );
};

const Settingstack = createStackNavigator();

const SettingstackScreen = () => {
  return (
    <Settingstack.Navigator>
      <Settingstack.Screen name="Settings" component={SettingsScreen} options={{headerShown:false}} />
      <Settingstack.Screen name="Update" component={UpdateScreen} />
    </Settingstack.Navigator>
  );
};

const BottomNav = createBottomTabNavigator();

export const Navigation = ({ isUser }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <NavigationContainer>
        {isUser ? (
          <BottomNav.Navigator>
            <BottomNav.Screen
              name="Home"
              options={{
                tabBarIcon: () => (
                  <MaterialIcons name="home" size={24} color="black" />
                ),
              }}
              component={HomeStackScreen}
            />
            <BottomNav.Screen
              name="Search"
              options={{
                tabBarIcon: () => (
                  <MaterialIcons name="search" size={24} color="black" />
                ),
              }}
              component={SearchStackScreen}
            />
            <BottomNav.Screen name="Settings" options={{
                tabBarIcon: () => (
                  <MaterialIcons name="settings" size={24} color="black" />
                ),
              }}
              component={SettingstackScreen}
            />
          </BottomNav.Navigator>
        ) : (
          <AuthStack.Navigator>
            <AuthStack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={LoginScreen}
            />
            <AuthStack.Screen name="SignUp" component={SignInScreen} />
            <AuthStack.Screen name="Forgot" component={ForgotScreen} />
          </AuthStack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
};
