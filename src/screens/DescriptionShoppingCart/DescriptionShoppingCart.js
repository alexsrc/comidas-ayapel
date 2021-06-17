import React from "react";
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableHighlight,
} from "react-native";
import styles from './styles';
import {numberFormat} from '../../ServiciosMaestros/general';
import {Linking} from "react-native";
import PrincipalComponent from "../Principal/PrincipalComponent";

export default class DescriptionShoppingCart extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Pedido"
        };
    };

    constructor(props) {
        super(props);
        let {navigation} = props;
        let total = 0;
        navigation.getParam("shoppingCard").map((t) => {
            total += t.amount;
        })
        this.state = {
            commerce: navigation.getParam("commerce"),
            products: navigation.getParam("shoppingCard"),
            total: total
        }
    }

    sendMessageWhatsapp() {
        Linking.openURL('whatsapp://send?text=' + "hola mundo!" + '&phone=57' + 3205677440);
    }

    renderRecipes = ({item}) => (
        <View>
            <View style={styles.categoriesItemContainerList}>
                <Image style={styles.categoriesPhotoList} source={{uri: item.photo_url}}/>
                <View style={styles.letterList}>
                    <Text style={styles.categoriesNameList}>{item.name} </Text>
                    <View style={styles.groupTextList}>
                        <Text style={styles.textList}>Total: {numberFormat(item.amount)}</Text>
                        <TouchableHighlight style={styles.containerImage}
                                            onPress={() => console.log(item.id, item.name, item.photo_url, item.description, item.amount)}>
                            <Image style={styles.icon} source={require('../../../assets/icons/eye-open.png')}/>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </View>
    );

    render() {
        return (
            <PrincipalComponent>
                <View style={styles.container}>
                    <View style={styles.containerCommerce}>
                        <Image style={styles.categoriesPhoto} source={{uri: this.state.commerce.photo_url}}/>
                        <View style={styles.groupText}>
                            <Text style={styles.commerceName}>
                                {this.state.commerce.commerceName}
                            </Text>
                            <Text style={styles.commerceDescription}>
                                {"Horario de atencion: 8Am - 8Pm"}
                            </Text>
                        </View>
                    </View>
                    <FlatList
                        style={{flex: 1, margin: 0, width: "100%", marginBottom: "11%"}}
                        vertical
                        showsVerticalScrollIndicator={false}
                        numColumns={1}
                        data={this.state.products}
                        renderItem={this.renderRecipes}
                        keyExtractor={item => `${item.key}`}
                    />
                    <TouchableHighlight style={styles.button} onPress={() => this.sendMessageWhatsapp()}>
                        <Text style={{fontSize: 15}}>
                            {"Pedir"} {numberFormat(this.state.total)}
                        </Text>
                    </TouchableHighlight>
                </View>
            </PrincipalComponent>

        )
    }
}