import React from "react";
import {
  Image,
  Alert,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";

export default class App extends React.Component {
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
      this.props.navigation.navigate("ElevatorsList");
    }
    // return response.json();
    else {
      return Alert.alert("Invalid Email Address");
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View>
          <Image
            style={{ width: 250, height: 80, marginBottom: 20 }}
            source={require("../assets/images/R2.png")}
          />

          <TextInput
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            placeholder="Email Address"
            placeholderTextColor="#DADDD8"
            returnKeyType="go"
            onSubmitEditing={this.userLogin.bind(this)}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
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
    backgroundColor: "#bdc3c7",
    color: "#636e72",
    fontWeight: "600",
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
