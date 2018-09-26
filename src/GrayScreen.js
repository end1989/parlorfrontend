import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Actions } from "react-native-router-flux";
import {
    FacebookShareButton,
    GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    PinterestShareButton,
    VKShareButton,
    OKShareButton,
    RedditShareButton,
    TumblrShareButton,
    LivejournalShareButton,
    MailruShareButton,
    ViberShareButton,
    WorkplaceShareButton,
    EmailShareButton
} from "react-share";
import {
    FacebookShareCount,
    GooglePlusShareCount,
    LinkedinShareCount,
    PinterestShareCount,
    VKShareCount,
    OKShareCount,
    RedditShareCount,
    TumblrShareCount
} from "react-share";
import {
    FacebookIcon,
    TwitterIcon,
    TelegramIcon,
    WhatsappIcon,
    GooglePlusIcon,
    LinkedinIcon,
    PinterestIcon,
    VKIcon,
    OKIcon,
    RedditIcon,
    TumblrIcon,
    LivejournalIcon,
    MailruIcon,
    ViberIcon,
    WorkplaceIcon,
    EmailIcon
} from "react-share";

export default class GrayScreen extends Component {
    state = {};
    render() {
        // console.log("Props pass test: ", this.props.user.city);

        return (
            <View style={styles.container}>
                <FacebookShareCount url={"https//:www.facebook.com"}>
                    {shareCount => (
                        <span className="myShareCountWrapper">
                            {shareCount}
                        </span>
                    )}
                </FacebookShareCount>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#666666"
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        color: "#ffffff"
    }
});
