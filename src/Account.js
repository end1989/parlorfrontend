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
import { WebBrowser } from "expo";
import Meteor, { createContainer, Accounts } from "react-native-meteor";
import HomePage from "./HomePage";

const SERVER_URL = "ws://localhost:3000/websocket";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: Meteor.userId(),
            firstname: "",
            lastname: "",
            email: "",
            greeting: "",
            phone: "",
            hashtag: "",
            city: "",
            completed: false
        };

        // this.handleSubmit.bind(this);
    }
    componentWillMount() {
        console.log(Meteor.userId());
    }
    handleSubmit = () => {
        console.log(this.state);
        Meteor.call("stylist.add", this.state, (err, res) => {
            console.log(this.state);
            console.log("Add funtion", err, res);
        });
        this.setState({ completed: true });
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                >
                    <View style={styles.getStartedContainer}>
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
                            onChangeText={text => this.setState({ city: text })}
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
        paddingTop: 30
    },
    welcomeContainer: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: "contain",
        marginTop: 3,
        marginLeft: -10
    },
    getStartedContainer: {
        alignItems: "center",
        marginHorizontal: 50
    },
    getStartedText: {
        paddingTop: 0,
        fontSize: 40,
        color: "pink",
        lineHeight: 24,
        textAlign: "center"
    }
});