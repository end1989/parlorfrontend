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

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: ""
        };
        // this.handleSubmit.bind(this);
    }
    handleSubmit = () => {
        console.log(this.state.firstname);
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                >
                    <View style={styles.getStartedContainer}>
                        <Text style={styles.getStartedText}>
                            Sign Up! {this.state.firstname}
                        </Text>
                        <TextInput style={styles.inputStyle} />
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
                        <FormLabel>Prices</FormLabel>
                        <FormInput
                            onChangeText={text =>
                                this.setState({ prices: text })
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
    homeScreenFilename: {
        marginVertical: 7
    },
    codeHighlightText: {
        color: "rgba(96,100,109, 0.8)"
    },
    codeHighlightContainer: {
        backgroundColor: "rgba(0,0,0,0.05)",
        borderRadius: 3,
        paddingHorizontal: 4
    },
    getStartedText: {
        paddingTop: 80,
        fontSize: 40,
        color: "pink",
        lineHeight: 24,
        textAlign: "center"
    },
    tabBarInfoContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: "black",
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3
            },
            android: {
                elevation: 20
            }
        }),
        alignItems: "center",
        backgroundColor: "#fbfbfb",
        paddingVertical: 20
    },
    tabBarInfoText: {
        fontSize: 17,
        color: "rgba(96,100,109, 1)",
        textAlign: "center"
    },
    navigationFilename: {
        marginTop: 5
    },
    helpContainer: {
        marginTop: 15,
        alignItems: "center"
    },
    helpLink: {
        paddingVertical: 15
    },
    helpLinkText: {
        fontSize: 14,
        color: "#2e78b7"
    }
});
