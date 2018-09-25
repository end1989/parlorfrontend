import React from "react";
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput
} from "react-native";
import {
    FormLabel,
    FormInput,
    FormValidationMessage,
    Button
} from "react-native-elements";
import { WebBrowser, Location, Permissions } from "expo";
import Meteor, { createContainer, Accounts } from "react-native-meteor";
import HomePage from "./HomePage";

const SERVER_URL = "ws://localhost:3000/websocket";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            userId: Meteor.userId(),
            firstname: "",
            lastname: "",
            email: "",
            greeting: "",
            phone: "",
            hashtag: "",
            city: "",
            latitude: null,
            longitude: null,
            completed: false
        };

        // this.handleSubmit.bind(this);
    }
    componentWillMount() {
        console.log(Meteor.userId(), this.state.location);
        if (Platform.OS === "android" && !Constants.isDevice) {
            this.setState({
                errorMessage:
                    "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
            });
        } else {
            this._getLocationAsync();
        }
    }
    handleSubmit = () => {
        console.log(this.state);
        this.setState({ completed: true });
        Meteor.call("stylist.add", this.state, (err, res) => {
            console.log(this.state);
            console.log("Add funtion", err, res);
        });
    };
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
            this.setState({
                errorMessage: "Permission to access location was denied"
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
    };
    renderView = () => {
        console.log("lat", this.state.latitude, "long", this.state.longitude);

        if (!this.state.completed) {
            return (
                <View style={styles.container}>
                    <ScrollView
                        style={styles.container}
                        contentContainerStyle={styles.contentContainer}
                    >
                        <View style={styles.getStartedContainer}>
                            <Text style={styles.getStartedText}>Sign Up!</Text>
                            <FormLabel>First Name</FormLabel>
                            <FormInput
                                onChangeText={text =>
                                    this.setState({ firstname: text })
                                }
                            />
                            <FormLabel>Last Name</FormLabel>
                            <FormInput
                                onChangeText={text =>
                                    this.setState({ lastname: text })
                                }
                            />
                            <FormLabel>Email</FormLabel>
                            <FormInput
                                onChangeText={text =>
                                    this.setState({ email: text })
                                }
                            />
                            <FormLabel>Greeting</FormLabel>
                            <FormInput
                                onChangeText={text =>
                                    this.setState({ greeting: text })
                                }
                            />
                            <FormLabel>Phone Number</FormLabel>
                            <FormInput
                                onChangeText={text =>
                                    this.setState({ phone: text })
                                }
                            />
                            <FormLabel>Page Hashtag</FormLabel>
                            <FormInput
                                onChangeText={text =>
                                    this.setState({ hashtag: text })
                                }
                            />
                            <FormLabel>City</FormLabel>
                            <FormInput
                                onChangeText={text =>
                                    this.setState({ city: text })
                                }
                            />

                            <Button
                                buttonStyle={{ backgroundColor: "green" }}
                                raised
                                title="Submit"
                                onPress={this.handleSubmit}
                            />
                        </View>
                    </ScrollView>
                </View>
            );
        } else {
            return <HomePage style={{ flex: 1 }} />;
        }
    };
    render() {
        return <View style={{ flex: 1 }}>{this.renderView()}</View>;
    }
}

const styles = StyleSheet.create({
    prices: {
        minHeight: 90
    },
    inputStyle: {
        minHeight: 90,
        height: 40,
        borderColor: "green",
        borderWidth: 1,
        width: "100%"
    },
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    developmentModeText: {
        marginBottom: 20,
        color: "rgba(0,0,0,0.4)",
        fontSize: 14,
        lineHeight: 19,
        textAlign: "center"
    },
    contentContainer: {
        paddingTop: 0
    },
    welcomeContainer: {
        alignItems: "center",
        marginTop: 0,
        marginBottom: 20
    },

    getStartedContainer: {
        alignItems: "center"
    },
    getStartedText: {
        fontSize: 40,
        color: "pink",
        lineHeight: 24,
        textAlign: "center"
    }
});
