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
import { Actions, Scene, Router } from "react-native-router-flux";

const SERVER_URL = "ws://localhost:3000/websocket";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            userId: Meteor.userId(),
            firstname: "",
            lastname: "",
            email: "",
            greeting: "",
            phone: "",
            hashtag: "",
            city: "",
            images: "",
            completed: false
        };

        // this.handleSubmit.bind(this);
    }
    componentWillMount() {
        let users = Meteor.collection("stylist").find({});
        let user = users.reduce((acc, curr) => {
            if (curr["userData"]["userId"] === Meteor.userId()) {
                acc = { id: curr["_id"], ...curr["userData"] };
                return acc;
            }
            return acc;
        }, {});
        console.log(user);

        this.setState({ ...user });
    }
    handleSubmit = () => {
        Meteor.call("stylist.update", this.state, (err, res) => {
            console.log(this.state);
            console.log("Add funtion", err, res);
        });
        Actions.share({ user: this.state.city });
        // Meteor.collection("stylist").update(
        //     { _id: this.state.id },
        //     { ...this.state }
        // );
        // console.log(this.state);
        // Meteor.call("stylist.add", this.state, (err, res) => {
        //     console.log(this.state);
        //     console.log("Add funtion", err, res);
        // });
        // this.setState({ completed: true });
    };

    render() {
        console.log(this.state);
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
                        >
                            <Text style={{ textAlign: "center" }}>
                                {this.state.firstname}
                            </Text>
                        </FormInput>
                        <FormLabel>Last Name</FormLabel>
                        <FormInput
                            onChangeText={text =>
                                this.setState({ lastname: text })
                            }
                        >
                            <Text style={{ textAlign: "center" }}>
                                {this.state.lastname}
                            </Text>
                        </FormInput>
                        <FormLabel>Greeting</FormLabel>
                        <FormInput
                            inputStyle={{
                                alignItems: "flex-end",
                                height: 80
                            }}
                            multiline
                            onChangeText={text =>
                                this.setState({ greeting: text })
                            }
                        >
                            <Text
                                style={{
                                    textAlign: "center"
                                }}
                            >
                                {this.state.greeting}
                            </Text>
                        </FormInput>
                        <FormLabel>Phone Number</FormLabel>
                        <FormInput
                            onChangeText={text =>
                                this.setState({ phone: text })
                            }
                        >
                            <Text style={{ textAlign: "center" }}>
                                {this.state.phone}
                            </Text>
                        </FormInput>
                        <FormLabel>Page Hashtag</FormLabel>
                        <FormInput
                            onChangeText={text =>
                                this.setState({ hashtag: text })
                            }
                        >
                            <Text style={{ textAlign: "center" }}>
                                {this.state.hashtag}
                            </Text>
                        </FormInput>
                        <FormLabel>City</FormLabel>
                        <FormInput
                            onChangeText={text => this.setState({ city: text })}
                        >
                            <Text style={{ textAlign: "center" }}>
                                {this.state.city}
                            </Text>
                        </FormInput>
                        <FormLabel>Profile Image URL</FormLabel>
                        <FormInput
                            onChangeText={imageURL => {
                                this.setState({ images: imageURL });
                            }}
                        >
                            <Text style={{ textAlign: "center" }}>
                                {this.state.images}
                            </Text>
                        </FormInput>

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
    contentContainer: {
        alignItems: "center",
        paddingTop: 30
    },
    welcomeContainer: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20
    },
    getStartedContainer: {
        marginHorizontal: 50
    }
});
