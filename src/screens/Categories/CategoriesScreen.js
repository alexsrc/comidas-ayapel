import React from 'react';
import {
    FlatList,
    Text,
    View,
    Image,
    TouchableHighlight
} from 'react-native';
import styles from './styles';
import {getNumberOfRecipes} from '../../data/MockDataAPI';
import MenuImage from "../../components/MenuImage/MenuImage";
import {serviceApiGet} from "../../ServiciosMaestros/request";
import {api} from "../../ServiciosMaestros/apis";
import PrincipalComponent from "../Principal/PrincipalComponent";

export default class CategoriesScreen extends React.Component {


    static navigationOptions = ({navigation}) => ({
        title: 'Inicio',
        headerLeft: (
            <MenuImage
                onPress={() => {
                    navigation.openDrawer();
                }}
            />
        )
    });

    constructor(props) {
        super(props);
        this.state={
            categories: [],
        }

    }

    componentDidMount() {
        this.categoriesRequest();
    }

    categoriesRequest = () => {
        serviceApiGet(api.comercio_tipos)
            .then((response) => {
                if (response.status) {
                    this.setState({
                        categories: response.data
                    });
                }
            })
            .catch((error) => {
                console.log("ERROR:",error)
            })

    }

    onPressCategory = item => {
        const title = item.name;
        const id = item.key;
        this.props.navigation.navigate('Categories', {id, title});
    };

    renderCategory = ({item}) => (
        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressCategory(item)}>
            <View style={styles.categoriesItemContainer}>
                <Image style={styles.categoriesPhoto} source={{uri: item.photo_url}}/>
                <Text style={styles.categoriesName}>{item.name}</Text>
                <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)} {item.id > 1 ? "Comercios" : "Comercio"}</Text>
            </View>
        </TouchableHighlight>
    );

    render() {
        return (
            <View>
                <PrincipalComponent>
                    <FlatList
                        vertical
                        showsVerticalScrollIndicator={false}
                        data={this.state.categories}
                        renderItem={this.renderCategory}
                        keyExtractor={item => `${item.key}`}
                    />
                </PrincipalComponent>
            </View>
        );
    }
}