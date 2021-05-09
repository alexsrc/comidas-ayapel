import React from 'react';
import {FlatList, ScrollView, Text, View, TouchableHighlight, Image} from 'react-native';
import styles from './styles';
import {serviceApiGet} from "../../ServiciosMaestros/request";
import {api} from "../../ServiciosMaestros/apis";


export default class HomeScreen extends React.Component {



    static navigationOptions = ({navigation}) => {
        console.log("TITLE2:::", navigation.getParam('title'))
        return {
            title: navigation.getParam('title')
        };

    };

    constructor(props) {
        super(props);
        this.state={
            companies:[]
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.comerciosRequest(navigation.getParam('id'))

    }

    comerciosRequest = (id)=>{
        console.log("comerciosRequest:::")
        serviceApiGet(api.comercios+id)
            .then((response) => {
                if (response.status) {
                    console.log("RESPONSE:::",response.data)
                    this.setState({
                        companies:response.data
                    });
                }
            })
            .catch((error) => {
                console.log("error:::",error)
            })
    }

    onPressRecipe = item => {
        this.props.navigation.navigate('Recipe', {item});
    };

    renderRecipes = ({item}) => (
        <TouchableHighlight underlayColor='#DDDDDD' onPress={() => this.onPressRecipe(item)}>
            <View style={styles.container}>
                <Image style={styles.categoriesPhoto} source={{uri: item.photo_url}}/>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.category}>Productos en stock {item.id}</Text>
            </View>
        </TouchableHighlight>
    );

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.companies}
                    renderItem={this.renderRecipes}
                    keyExtractor={item => `${item.key}`}
                />
            </View>
        );
    }
}
