import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    PanResponder,
    Share,
    Alert,
    ImageBackground
} from "react-native";
import { Icon } from "react-native-elements";
const backgroundhair = require("../assets/backgroundhair.jpg");
import { Actions } from "react-native-router-flux";
const socailShare = (title, message, url) => {
    Share.share(
        {
            title: title,
            message: title + ": " + message + ": " + url,
            url: url
        },
        { dialogTitle: "Share Your Page" }
    );
};
const resizeMode = "center";
const SharePage = () => {
    return (
        <ImageBackground
            style={{
                flex: 1
            }}
            source={backgroundhair}
        >
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    It is very important to share you unique URL
                </Text>
                <Icon
                    raised
                    reverse
                    name="share"
                    type="share"
                    color="pink"
                    size={35}
                    onPress={() =>
                        socailShare("name", "description", "www.google.com")
                    }
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    welcome: {
        fontSize: 25,
        textAlign: "center",
        margin: 10,
        color: "#ffffff",
        fontWeight: "bold"
    }
});

export default SharePage;
