import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Alert,
  Image,
  ScrollView,
} from "react-native";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    };
  }

  componentDidMount() {
    fetch("https://fathomless-meadow-20996.herokuapp.com/api/elevators")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      });
  }

  goToStatusScreen = (item) => {
    const { navigation } = this.props;
    navigation.navigate("Status", { item: { item } });
  };

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => this.goToStatusScreen(item)}>
        <View style={styles.item}>
          <Text>Elevator ID : {item.id}</Text>
          <Text>Elevator Status : {item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    // let { container } = styles;
    let { dataSource, isLoading } = this.state;
    if (isLoading) {
      return (
        <View
          style={{
            flex: 1,
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" animating />
        </View>
      );
    } else {
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
          <View>
            <FlatList
              style={styles.flatList}
              data={dataSource}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View>
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
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700",
  },
  flatList: {
    height: "80%",
    flexGrow: 0,
  },
});
