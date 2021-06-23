import React from "react";
import {Text} from "react-native";
import PrincipalComponent from "../Principal/PrincipalComponent";

export default class Login extends React.Component {

    render() {
        return (
            <PrincipalComponent>
                <Text>
                    Login
                </Text>
            </PrincipalComponent>
        );
    }
}