import React from "react";
import { StyleSheet, View } from "react-native";
import SignIn from "./src/SignIn";
import Meteor, { Accounts } from "react-native-meteor";
import HomePage from "./src/HomePage";
import SignUp from "./src/SignUp";

const SERVER_URL = "ws://localhost:3000/websocket";

export default class App extends React.Component {
    state = {
        loggedIn: true,
        signUp: false
    };
    componentWillMount() {
        Meteor.connect(SERVER_URL);
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
                    Accounts.createUser({ email, password }, error => {
                        this.setState({ signUp: true });
                        this.flipLogin(true);
                        this.renderView();
                        console.log(error);
                    });
                }
            } else {
                console.log("email");
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
