import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  Image,
  Alert,
  TextInput,
  View,
  Text,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { Center } from "./Center";

const Stack = createStackNavigator();

function Login({ navigation }) {
  state = {
    email: "",
  };

  userLogin = async () => {
    const email = this.state.email;

    const response = await fetch(
      "https://warm-earth-83579.herokuapp.com/api/employees",
      {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );
    if (response.status === 200) {
      navigation.navigate("Elevators");
    } else {
      return Alert.alert("Invalid Email Address");
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View>
        <Image
          style={{ width: 250, height: 80, marginBottom: 20 }}
          source={require("../assets/images/R2.png")}
        />

        <TextInput
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
          placeholder="email"
          returnKeyType="go"
          onSubmitEditing={this.userLogin.bind(this)}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          style={styles.input}
        />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={this.userLogin.bind(this)}>
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function Elevators() {
  return (
    <Center>
      <Text>Elevators Page</Text>
    </Center>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: "rgba(11, 19, 160, 0.2)",
    color: "#636e72",
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: "#0b63a0",
    paddingVertical: 15,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700",
  },
});

export const Routes = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerTitle: "Sign In",
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen name="Elevators" component={Elevators} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
