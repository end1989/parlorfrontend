import React from "react";
import { View, Text, Image } from "react-native";
import {
    Header,
    Left,
    Button,
    Icon,
    Body,
    Title,
    Right,
    Fab
} from "native-base";
import { MapView } from "expo";
import Meteor, { createContainer } from "react-native-meteor";

class HomePage extends React.Component {
    state = {
        location: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
    };
    addStylist = () => {
        Meteor.call("stylist.add", this.state.location, (err, res) => {
            console.log(this.state.location);

            console.log("Add funtion", err, res);
        });
    };
    renderStylist = () => {
        return this.props.stylist.map(p => {
            return (
                <MapView.Marker
                    coordinate={{
                        latitude: p.latitude,
                        longitude: p.longitude
                    }}
                    key={p._id}
                />
            );
        });
    };
    render() {
        console.log(this.props.stylist);
        return (
            <View style={{ flex: 1, width: "100%", paddingTop: 20 }}>
                <Header>
                    <Left />
                    <Body>
                        <Title>Map</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name="power" />
                        </Button>
                    </Right>
                </Header>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                >
                    {/* <MapView.Marker
                        coordinate={{
                            latitude: 37.78825,
                            longitude: -122.4324
                        }}
                        key={1}
                    /> */}
                    {this.renderStylist()}
                </MapView>
                <Fab
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
                </Fab>
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
