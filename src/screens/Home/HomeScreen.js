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
                    value={params.value}
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
        serviceApiResponse({id,filter:value},api.comercios,"POST")
            .then((response) => {
                if (response.status) {

                    this.setState({
                        companies:response.data,
                        id:id,
                        value
                    },()=>{

                    });
                }else{
                    this.setState({
                        companies:[],
                        id:id,
                        value
                    },()=>{
                    });
                }
            })
            .catch((error) => {
                console.log("error:::",error)
            })
        clearInterval(inter)

    }

    interval(text){
        const { navigation } = this.props;
        navigation.setParams({
            handleSearch: ()=>this.handleSearch(value),
            data: [],
            value
        });
        inter = setInterval(()=>{
            this.comerciosRequest(this.state.id,text)
        },2000);
    }

    handleSearch = text => {
        clearInterval(inter)
        this.setState({
            value:text,
        },()=>{
            this.interval(text)
        })
    };

    onPressRecipe = (id,photo_url,commerceName) => {
        this.props.navigation.navigate('RecipesList', {id,photo_url,commerceName});
    };

    renderRecipes = ({ item }) => (
        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item.key,item.photo_url,item.name)}>
            <View style={styles.categoriesItemContainer}>
                <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />
                <View style={styles.letter}>
                    <Text style={styles.categoriesName}>{item.name}</Text>
                    <View style={styles.groupText}>
                        <Text style={styles.text}>{"Abierto"}</Text>
                        <Text style={styles.text}>Stock: {item.id}</Text>
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
