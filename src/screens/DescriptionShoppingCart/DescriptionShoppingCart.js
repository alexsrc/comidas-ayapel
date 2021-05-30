import React from "react";
import {
    View,
    Text,
    Image
} from "react-native";
import styles from './styles';

export default class DescriptionShoppingCart extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Pedido"
        };
    };

    constructor(props) {
        super(props);
        let {navigation}=props;
        console.log("NAVIGATION::: ",navigation)
        this.state={
            commerce:navigation.getParam("commerce")
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerCommerce}>
                    <Image style={styles.categoriesPhoto} source={{uri:this.state.commerce.photo_url}}/>
                </View>
                <Text>
                    {"Carrito"}
                </Text>
            </View>
        )
    }
}