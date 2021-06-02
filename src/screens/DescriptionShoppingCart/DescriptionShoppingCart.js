import React from "react";
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableHighlight,
} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import styles from './styles';
import {numberFormat} from '../../ServiciosMaestros/general';
export default class DescriptionShoppingCart extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Pedido"
        };
    };

    constructor(props) {
        super(props);
        let {navigation}=props;
        console.log("SHOPPINGCART:::",navigation.getParam("shoppingCard"))
        this.state={
            commerce:navigation.getParam("commerce"),
            products:navigation.getParam("shoppingCard")
        }
    }

    renderRecipes = ({item}) => (
        <TouchableHighlight  underlayColor='rgba(73,182,77,1,0.9)' onPress={() => console.log(item.key,item.name,item.photo_url, item.description,item.amount)}>
            <View style={styles.categoriesItemContainerList}>
                <Image style={styles.categoriesPhotoList} source={{uri: item.photo_url}}/>
                <View style={styles.letterList}>
                    <Text style={styles.categoriesNameList}>{item.name} </Text>
                    <View style={styles.groupTextList}>
                        <Text style={styles.textList}>Total: {numberFormat(item.amount)}</Text>
                        <FontAwesomeIcon icon={ faCoffee } />
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerCommerce}>
                    <Image style={styles.categoriesPhoto} source={{uri:this.state.commerce.photo_url}}/>
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
                    style={{flex:1,margin:0}}
                    vertical
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    data={this.state.products}
                    renderItem={this.renderRecipes}
                    keyExtractor={item => `${item.key}`}
                />
                <Text>
                    {"Carrito"}
                </Text>
            </View>
        )
    }
}