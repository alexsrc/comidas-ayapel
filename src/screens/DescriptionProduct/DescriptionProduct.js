import React from "react";
import {
    View,
    Text,
    Image, TouchableHighlight
} from 'react-native';
import styles from './styles';

export default class DescriptionProduct extends React.Component{
    static navigationOptions = ({ navigation }) => {
        console.log(navigation.getParam('name'))
        return {
            title: navigation.getParam('name')
        };
    };

    constructor(props) {
        super(props);
        const {navigation} = props;
        this.state = {
            name:navigation.getParam('name'),
            photo_url:navigation.getParam('photo_url'),
            description:navigation.getParam('description'),
            amountFormat:(this.numberFormat(navigation.getParam('amount'))),
            amount:(navigation.getParam('amount')),
            quantity:1,
            totalAmount:(this.numberFormat(navigation.getParam('amount')*1))
        }
    }

    numberFormat = (value) =>{
        return '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    plusOrMinusProduct(action){
        let quantity = this.state.quantity;
        let amount = this.state.amount;
        let set = true;
        if(action==="minus" && quantity===1)set=false;

        if(set){
            action==="minus"?quantity--:quantity++;
            this.setState({
                quantity: quantity,
                totalAmount: this.numberFormat(amount*quantity)
            })
        }


    }

    render(){
        return (
            <View style={{flex:1}}>
                <Image style={{width:"100%",height:"20%"}} source={{uri:this.state.photo_url}} />
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
                </View>
                <View style={styles.conteinerButton}>
                    <View style={styles.button1} >
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
                    <TouchableHighlight  underlayColor='rgba(73,182,77,1,0.9)' style={styles.button2}
                                        onPress={() => console.log("hola")}>
                        <Text>
                            Añadir {this.state.totalAmount}
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}