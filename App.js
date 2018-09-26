import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SignIn from "./src/SignIn";
import Meteor, { createContainer, Accounts } from "react-native-meteor";
import HomePage from "./src/HomePage";
import SignUp from "./src/SignUp";

//ServerURL

const SERVER_URL = "ws://localhost:3000/websocket";

// "ws://mongodb://end1989:whatever1@ds161312.mlab.com:61312/parlor/websocket";

export default class App extends React.Component {
    state = {
        loggedIn: true,
        signUp: false
    };
    componentWillMount() {
        console.log("connecting");
        Meteor.connect(SERVER_URL);
        console.log(Meteor.userId());
        if (Meteor.userId()) {
            this.flipLogin(true);
        }
    }
    flipLogin = x => {
        this.setState({ loggedIn: x });
    };
    signIn = (email, password) => {
        Meteor.loginWithPassword(email, password, (error, data) => {
            if (error) {
                if (error.reason === "User not found") {
                    console.log("there was no email");
                    Accounts.createUser({ email, password }, error => {
                        this.setState({ signUp: true });
                        this.renderView();
                        console.log(error);
                    });
                }
            } else {
                console.log("email");
                //TODO
                this.flipLogin(true);
            }
        });
        console.log(Meteor.userId());
    };
    renderView = () => {
        if (!this.state.loggedIn) {
            return <SignIn signIn={this.signIn} />;
        } else if (this.state.signUp) {
            return <SignUp />;
        } else {
            return <HomePage />;
        }
    };
    render() {
        return <View style={styles.container}>{this.renderView()}</View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
