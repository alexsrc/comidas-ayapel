import React from "react";
import {
    View,
    Text,
    Image
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
            value:(this.numberFormat(1200))
        }
    }

    numberFormat = (value) =>{
        return '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
                        {this.state.value}
                    </Text>
                    <View style={styles.line}/>
                </View>
            </View>
        )
    }
}