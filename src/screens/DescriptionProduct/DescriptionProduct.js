import React from "react";
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    TextInput
} from 'react-native';
import {numberFormat} from '../../ServiciosMaestros/general';
import styles from './styles';
import PrincipalComponent from "../Principal/PrincipalComponent";

export default class DescriptionProduct extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('name')
        };
    };

    constructor(props) {
        super(props);
        const {navigation} = props;
        this.state = {
            id: navigation.getParam('id'),
            name: navigation.getParam('name'),
            photo_url: navigation.getParam('photo_url'),
            description: navigation.getParam('description'),
            amountFormat: (numberFormat(navigation.getParam('amount'))),
            amount: (navigation.getParam('amount')),
            quantity: 1,
            totalAmount: (numberFormat(navigation.getParam('amount') * 1)),
            descriptionProductCard: ""
        }
    }


    plusOrMinusProduct(action) {
        let quantity = this.state.quantity;
        let amount = this.state.amount;
        let set = true;
        if (action === "minus" && quantity === 1) set = false;

        if (set) {
            action === "minus" ? quantity-- : quantity++;
            this.setState({
                quantity: quantity,
                totalAmount: numberFormat(amount * quantity)
            })
        }
    }

    addShoppingCard() {
        let funct = this.props.navigation.getParam("func")();
        funct(this.state.id, this.state.quantity, this.state.descriptionProductCard);
        this.props.navigation.goBack()
    }

    onChange = (text) => {
        this.setState({
            descriptionProductCard: text
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <PrincipalComponent>
                    <Image style={{width: "100%", height: "20%"}} source={{uri: this.state.photo_url}}/>
                    <View style={styles.groupText}>
                        <Text style={styles.title}>
                            {this.state.name}
                        </Text>
                        <Text style={styles.description}>
                            {this.state.description}
                        </Text>
                        <Text style={styles.value}>
                            {this.state.amountFormat}
                        </Text>
                        <View style={styles.line}/>

                        <Text style={styles.textTitle}>
                            {"Añadir descripción:"}
                        </Text>
                        <TextInput
                            value={this.state.descriptionProductCard}
                            onChange={(target) => this.onChange(target.nativeEvent.text)}
                            style={styles.textInput}
                            underlineColorAndroid="transparent"
                            numberOfLines={10}
                            multiline={true}
                        />
                    </View>
                    <View style={styles.conteinerButton}>
                        <View style={styles.button1}>
                            <TouchableHighlight style={styles.buttonMinus} underlayColor='rgba(73,182,77,1,0.9)'
                                                onPress={() => this.plusOrMinusProduct("minus")}>
                                <Text>-</Text>
                            </TouchableHighlight>
                            <Text style={styles.text}>
                                {this.state.quantity}
                            </Text>
                            <TouchableHighlight style={styles.buttonPlus} underlayColor='rgba(73,182,77,1,0.9)'
                                                onPress={() => this.plusOrMinusProduct("plus")}>
                                <Text>+</Text>
                            </TouchableHighlight>
                        </View>
                        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' style={styles.button2}
                                            onPress={() => this.addShoppingCard()}>
                            <Text>
                                Añadir {this.state.totalAmount}
                            </Text>
                        </TouchableHighlight>
                    </View>
                </PrincipalComponent>
            </View>
        )
    }
}