import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    PanResponder,
    Share,
    Alert
} from "react-native";
import { Router, Scene } from "react-native-router-flux";
import { Icon } from "react-native-elements";

import SharePage from "./SharePage";
import MapPage from "./MapPage";
import Account from "./Account";

import ModalScreen from "./SignUp";

// Simple component to render something in place of icon
const ShareIcon = ({ focused, title }) => {
    return (
        <Icon
            size={12}
            raised
            reverse
            name="share"
            type="share"
            color={focused ? "green" : "grey"}
        >
            {title}
        </Icon>
    );
};
const MapIcon = ({ focused, title }) => {
    return (
        <Icon
            size={12}
            raised
            reverse
            name="map"
            type="map"
            color={focused ? "green" : "grey"}
        >
            {title}
        </Icon>
    );
};
const SettingsIcon = ({ focused, title }) => {
    return (
        <Icon
            size={12}
            raised
            reverse
            name="settings"
            type="settings"
            color={focused ? "green" : "grey"}
        >
            {title}
        </Icon>
    );
};

const HomePage = () => {
    return (
        <Router>
            <Scene key="root">
                {/* Tab Container */}
                <Scene
                    hideNavBar
                    key="tabbar"
                    tabs={true}
                    tabBarStyle={{ backgroundColor: "#FFFFFF" }}
                >
                    {/* Tab and it's scenes */}
                    <Scene
                        key="account"
                        component={Account}
                        title="Update Account"
                        icon={SettingsIcon}
                    />
                    <Scene
                        key="map"
                        component={MapPage}
                        title="Stylists Near You"
                        icon={MapIcon}
                        type="share"
                        initial
                    />

                    {/* Tab and it's scenes */}

                    {/* Tab and it's scenes */}
                    <Scene
                        key="share"
                        component={SharePage}
                        title="Share Your Page"
                        icon={ShareIcon}
                    />
                </Scene>

                <Scene
                    key="modal"
                    direction="vertical"
                    component={ModalScreen}
                    title="Modal"
                    hideNavBar
                />
            </Scene>
        </Router>
    );
};

export default HomePage;
