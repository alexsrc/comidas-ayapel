import React from "react";
import {View,Image} from "react-native";
import styles from './styles';

export default class PrincipalComponent extends React.Component {
    render() {
        return (
            <View style={{flex:1}}>
                <Image
                    style={{minWidth:"100%",maxHeight:"13%"}}
                    source={require('../../../assets/comidasayapel.jpg')}
                />
                {this.props.children}
            </View>
        )
    }
}