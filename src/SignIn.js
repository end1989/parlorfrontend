import React from "react";
import { View, Text, Dimensions, ImageBackground, Image } from "react-native";
import { Form, Item, Label, Input, Button } from "native-base";

var myBackground = require("../assets/32710104676_dd5a8282de_z.jpg");
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
                style={{ width: "100%", height: "80%" }}
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
                        <Button primary block onPress={this.login}>
                            <Text style={{ color: "white" }}>
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
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    inputStyle: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        margin: 10
    },
    input: {
        textAlign: "center",
        color: "black",
        backgroundColor: "rgba(255,255,255, 0.2)",
        borderRadius: 10
    }
};

export default SignIn;
