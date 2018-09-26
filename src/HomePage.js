import React, { Component } from "react";
import { Text } from "react-native";
import { Router, Scene } from "react-native-router-flux";

import GrayScreen from "./GrayScreen";
import MapPage from "./MapPage";
import Account from "./Account";

import ModalScreen from "./SignUp";

// Simple component to render something in place of icon
const TabIcon = ({ selected, title }) => {
    return <Text style={{ color: selected ? "red" : "black" }}>{title}</Text>;
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
                        key="map"
                        component={MapPage}
                        title="Map"
                        icon={TabIcon}
                    />

                    {/* Tab and it's scenes */}
                    <Scene
                        key="account"
                        component={Account}
                        title="Update Account"
                        icon={TabIcon}
                    />

                    {/* Tab and it's scenes */}
                    <Scene
                        key="share"
                        component={GrayScreen}
                        title="Gold"
                        icon={TabIcon}
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
