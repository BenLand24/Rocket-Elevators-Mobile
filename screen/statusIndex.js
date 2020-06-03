import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  Image,
  FlatList,
} from "react-native";

export default class ElevatorStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elevator: this.props.route.params.item,
      isLoading: true,
      dataSource: [],
    };
    console.log(this.state.elevator.item.serial_number);
  }

  active = async () => {
    fetch(
      "https://fathomless-meadow-20996.herokuapp.com/api/elevators/active/" +
        this.state.elevator.item.id,
      { method: "PUT" }
    ).then(() => {
      fetch(
        "https://fathomless-meadow-20996.herokuapp.com/api/elevators/" +
          this.state.elevator.item.id
      )
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            dataSource: responseJson,
          });
          this.state.elevator.item.status = "active";
          console.log(this.state.elevator.item.status);
          this.renderStatus();
        });
    });
  };

  inactive = async () => {
    fetch(
      "https://fathomless-meadow-20996.herokuapp.com/api/elevators/inactive/" +
        this.state.elevator.item.id,
      { method: "PUT" }
    ).then(() => {
      fetch(
        "https://fathomless-meadow-20996.herokuapp.com/api/elevators/" +
          this.state.elevator.item.id
      )
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            dataSource: responseJson,
          });
          this.state.elevator.item.status = "inactive";
          console.log(this.state.elevator.item.status);
          this.renderStatus();
        });
    });
  };
  renderStatus = () => {
    if (this.state.elevator.item.status == "inactive") {
      return (
        <TouchableOpacity
          style={styles.buttonContainerInactive}
          onPress={this.active}
        >
          <Text style={styles.buttonText}>
            STATUS: {this.state.elevator.item.status}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.buttonContainerActive}
          onPress={this.inactive}
        >
          <Text style={styles.buttonText}>
            STATUS: {this.state.elevator.item.status}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{
              width: 250,
              height: 80,
              marginBottom: 20,
            }}
            source={require("../assets/images/R2.png")}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.textList}>
            Elevator ID : {this.state.elevator.item.id}
          </Text>
          <Text style={styles.textList}>
            Serial Number : {this.state.elevator.item.serial_number}
          </Text>
        </View>
        <View>
          {this.renderStatus()}

          <TouchableOpacity style={styles.buttonContainer}>
            <Text
              style={styles.buttonText}
              onPress={() => this.props.navigation.replace("ElevatorsList")}
            >
              BACK
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text
              style={styles.buttonText}
              onPress={() => this.props.navigation.replace("Home")}
            >
              LOGOUT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "#bdc3c7",
    fontWeight: "bold",
    padding: 20,
    paddingTop: 50,
  },
  item: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  buttonContainer: {
    backgroundColor: "#0b63a0",
    paddingVertical: 15,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700",
  },
  textList: {
    fontSize: 16,
  },
  buttonPending: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700",
  },
  buttonContainerInactive: {
    backgroundColor: "red",
    paddingVertical: 15,
    marginBottom: 10,
  },
  buttonContainerActive: {
    backgroundColor: "green",
    paddingVertical: 15,
    marginBottom: 10,
  },
});
