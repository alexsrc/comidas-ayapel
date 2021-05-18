import React from 'react';
import {
    FlatList,
    Text,
    View,
    TouchableHighlight,
    Image
} from 'react-native';
import styles from './styles';
import {serviceApiGet, serviceApiResponse} from "../../ServiciosMaestros/request";
import {api} from "../../ServiciosMaestros/apis";
import {SearchBar} from "react-native-elements";
import MenuImage from "../../components/MenuImage/MenuImage";


let inter;

export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerRight: (
                <MenuImage
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                />
            ),
            headerTitle: (
                <SearchBar
                    containerStyle={{
                        backgroundColor: 'transparent',
                        borderBottomColor: 'transparent',
                        borderTopColor: 'transparent',
                        flex: 1
                    }}
                    inputContainerStyle={{
                        backgroundColor: '#EDEDED'
                    }}
                    inputStyle={{
                        backgroundColor: '#EDEDED',
                        borderRadius: 10,
                        color: 'black'
                    }}
                    searchIcond
                    clearIcon
                    //lightTheme
                    round
                    onChangeText={text => params.handleSearch(text)}
                    // onClear={(text) => params.handleSearch('')}
                    placeholder="Buscar"
                    value={params.data}
                />
            )
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            companies:[],
            value:"",
            id:0,
            typingTime:0
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.comerciosRequest(navigation.getParam('id'))


    }

    comerciosRequest = (id,value="")=>{
        clearInterval(inter)
        const { navigation } = this.props;
        serviceApiResponse({id,filter:value},api.comercios,"POST")
            .then((response) => {
                if (response.status) {
                    navigation.setParams({
                        handleSearch: this.handleSearch,
                        data: response.data
                    });
                    this.setState({
                        companies:response.data,
                        id:id
                    });
                }
            })
            .catch((error) => {
                console.log("error:::",error)
            })
    }

    interval(text){
        inter = setInterval(()=>{
            this.comerciosRequest(this.state.id,text)
        },2000);
    }

    handleSearch = text => {
        console.log(text)
        clearInterval(inter)
        this.setState({
            value:text,
        },()=>{
            this.interval(text)
        })

    };

    onPressRecipe = id => {
        this.props.navigation.navigate('Search', {id});
    };

    renderRecipes = ({ item }) => (
        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
            <View style={styles.categoriesItemContainer}>
                <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />
                <View style={styles.letter}>
                    <Text >{item.name}</Text>
                    <View>
                        <Text >{"Disponible"}</Text>
                        <Text >Stock: {item.id}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );

    render() {
        return (
            <View>
                <FlatList
                    vertical
                    showsVerticalScrollIndicator={false}
                    data={this.state.companies}
                    renderItem={this.renderRecipes}
                    keyExtractor={item => `${item.key}`}
                />
            </View>
        );
    }
}
