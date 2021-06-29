import React from "react";
import {View, Image, Dimensions} from "react-native";
let ScreenHeight = Dimensions.get("window").height;
let porcentaje33= ScreenHeight*0.33;
export default class    PrincipalComponent extends React.Component {
    render() {
        return (
            <View style={{flex:1}}>
                <Image
                    style={{minWidth:"100%",maxHeight:porcentaje33}}
                    source={require('../../../assets/comidasayapel.jpg')}
                />
                {this.props.children}
            </View>
        )
    }
}