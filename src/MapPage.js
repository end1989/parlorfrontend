import React from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import {
    Header,
    Left,
    Button,
    Icon,
    Body,
    Title,
    Right,
    Fab,
    Container,
    Content,
    Footer
} from "native-base";
import { MapView, Location, Permissions } from "expo";
import Meteor, { createContainer } from "react-native-meteor";
import { WebBrowser } from "expo";
import { Actions } from "react-native-router-flux";
import mapMarker from "../assets/salon-512.png";

class HomePage extends React.Component {
    state = {
        location: {
            latitude: 39.742043,
            longitude: -104.991531,
            user: "",
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
    };
    addStylist = () => {
        this.setState({ user: Meteor.userId() });
        Meteor.call("stylist.add", this.state.location, (err, res) => {
            console.log(this.state.location);

            console.log("Add funtion", err, res);
        });
    };
    renderStylist = () => {
        return this.props.stylist.map(p => {
            console.log(p.userData.latitude);

            return (
                <MapView.Marker
                    style={{ alignContent: "center" }}
                    coordinate={{
                        latitude: p.userData.latitude,
                        longitude: p.userData.longitude
                    }}
                    ref={ref => {
                        this.marker = ref;
                    }}
                    key={p._id}
                >
                    <Image
                        style={{ height: 30, width: 30 }}
                        source={mapMarker}
                    />
                    <MapView.Callout
                        style={{
                            width: 200,
                            alignItems: "center",
                            backgroundColor: "#c6b3c0"
                        }}
                    >
                        <Text
                            style={{
                                padding: 15,
                                fontSize: 19,
                                fontWeight: "bold"
                            }}
                        >
                            {p.userData.firstname} {p.userData.lastname}
                        </Text>
                        <Image
                            source={{ uri: p.userData.images }}
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 50,
                                borderWidth: 0.5,
                                borderColor: "black"
                            }}
                        />
                        <Text
                            style={{
                                fontWeight: "500",
                                fontSize: 12,
                                margin: 10
                            }}
                        >
                            {p.userData.greeting}
                        </Text>
                        <Button
                            style={{
                                margin: 10,
                                alignSelf: "center",
                                height: 30,
                                padding: 10,
                                backgroundColor: "#274f8e"
                            }}
                            title="Open WebBrowser"
                            onPress={() => this.handlePressButton(p)}
                        >
                            <Text
                                style={{ color: "white", textAlign: "center" }}
                            >
                                Visit My Page
                            </Text>
                        </Button>
                    </MapView.Callout>
                </MapView.Marker>
            );
        });
    };
    handlePressButton = user => {
        console.log(user.userData.hashtag);

        WebBrowser.openBrowserAsync(
            "https://theparlor.herokuapp.com/" + user.userData.hashtag
        );
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={this.state.location}
                >
                    <Header transparent>
                        <Left>
                            <Button transparent>
                                <Icon name="power" />
                            </Button>
                        </Left>
                    </Header>
                    {/* <MapView.Marker
                        coordinate={{
                            latitude: 37.78825,
                            longitude: -122.4324
                        }}
                        key={1}
                    /> */}
                    {this.renderStylist()}
                </MapView>
                {/* <Fab
                    direction="left"
                    position="bottomRight"
                    style={{ backgroundColor: "green" }}
                    onPress={this.addStylist}
                >
                    <Icon name="add" />
                </Fab>
                <Fab
                    direction="right"
                    position="bottomLeft"
                    style={{ backgroundColor: "red" }}
                >
                    <Icon name="remove" />
                </Fab> */}
            </View>
        );
    }
}

export default createContainer(params => {
    Meteor.subscribe("stylist");

    return {
        stylist: Meteor.collection("stylist").find({})
    };
}, HomePage);
