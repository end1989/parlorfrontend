import React from "react";
import { View, Text, Dimensions, ImageBackground, Image } from "react-native";
import { Form, Item, Label, Input, Button } from "native-base";
import { Actions } from "react-native-router-flux";
import HomePage from "./HomePage";

var myBackground = require("../assets/loginBackground.jpg");
// var height = Dimensions.get("window").height;
// var width = Dimensions.get("window").width;

class SignIn extends React.Component {
    state = {
        email: "",
        password: ""
    };
    login = () => {
        var email = this.state.email;
        var password = this.state.password;

        this.props.signIn(email, password);
    };
    render() {
        return (
            // <View style={{}}>
            <ImageBackground
                source={myBackground}
                style={{
                    flex: 1
                }}
            >
                <View style={styles.inputStyle}>
                    <Form>
                        <Item floatingLabel style={{}}>
                            <Label style={{ color: "#93F9FF" }}>Email</Label>
                            <Input
                                style={styles.input}
                                autoCorrect={false}
                                onChangeText={email =>
                                    this.setState({ email: email })
                                }
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label style={{ color: "#93F9FF" }}>Password</Label>
                            <Input
                                style={styles.input}
                                secureTextEntry
                                autoCorrect={false}
                                onChangeText={password =>
                                    this.setState({ password: password })
                                }
                            />
                        </Item>
                    </Form>
                    <View style={{ marginTop: 10 }}>
                        <Button
                            primary
                            onPress={this.login}
                            style={{
                                alignSelf: "center",
                                padding: 8,
                                marginTop: 20,
                                backgroundColor: "#116f8e"
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: "bold",
                                    color: "white"
                                }}
                            >
                                Sign In/Sign Up
                            </Text>
                        </Button>
                    </View>
                </View>
            </ImageBackground>
            // </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    inputStyle: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        margin: 10,
        padding: 10
    },
    input: {
        textAlign: "center",
        color: "black",
        backgroundColor: "rgba(255,255,255, 0.3)",
        borderRadius: 10
    }
};

export default SignIn;
