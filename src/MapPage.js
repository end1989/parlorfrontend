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
        console.log("maptest", this.props.stylist[40]);

        return this.props.stylist.map(p => {
            console.log(p.userData);

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
                        style={{ width: 200, alignItems: "center" }}
                    >
                        <Text>
                            {p.user} {p.user}
                        </Text>
                        <Text>{p._id}</Text>
                        <Button
                            style={{ alignSelf: "center" }}
                            title="Open WebBrowser"
                            onPress={this.handlePressButton.bind(p.user)}
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
    handlePressButton = page => {
        WebBrowser.openBrowserAsync("https://google.com");
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
