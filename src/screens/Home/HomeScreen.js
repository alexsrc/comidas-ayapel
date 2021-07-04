import React from 'react';
import {
    FlatList,
    Text,
    View,
    TouchableHighlight,
    Image
} from 'react-native';
import styles from './styles';
import {serviceApiResponse} from "../../ServiciosMaestros/request";
import {api} from "../../ServiciosMaestros/apis";
import {SearchBar} from "react-native-elements";
import MenuImage from "../../components/MenuImage/MenuImage";
import PrincipalComponent from "../Principal/PrincipalComponent";
import {_retrieveData} from "../../ServiciosMaestros/request";

let inter;

export default class HomeScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
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
            companies: [],
            value: "",
            id: 0,
            typingTime: 0,
            nextPage:null
        };

        let token=_retrieveData("token")
        if(!token) this.props.navigation.navigate('Login');
    }

    componentDidMount() {
        const {navigation} = this.props;
        navigation.setParams({
            handleSearch: this.handleSearch,
            value: ""
        });
        this.comerciosRequest(navigation.getParam('id'),"",false)


    }

    comerciosRequest = (id, value = "",text=false) => {
        clearInterval(inter)
        let nextPage = parseInt(this.state.nextPage) + 1;
        let url = api.comercios;
        if (nextPage && text) {
            url = url + "?page=" + nextPage;
        }
        serviceApiResponse({id, filter: value}, url, "POST")
            .then((response) => {
                if (response.status) {

                    let data = []
                    data = this.state.companies;
                    if (nextPage && text) {
                        response.data.data.map((dat) => {
                            data.push(dat);
                        })
                    } else {
                        data = response.data.data
                    }
                    this.setState({
                        companies: data,
                        value,
                        id,
                        nextPage: response.data.current_page
                    });
                } else {
                    this.setState({
                        companies: [],
                        value,
                        id,
                        nextPage: null
                    });

                }

            })
            .catch((error) => {
                console.log("error:::", error)
            })
    }

    interval(text) {
        inter = setInterval(() => {
            this.comerciosRequest(this.state.id, text, false)
        }, 250);
    }
    handleSearch = text => {
        const {navigation} = this.props;
        navigation.setParams({
            value: text
        });
        clearInterval(inter)
        this.setState({
            value: text,
        }, () => {
            this.interval(text)
        })
    };

    onPressRecipe = (id, photo_url, commerceName) => {
        this.props.navigation.navigate('RecipesList', {id, photo_url, commerceName});
    };

    renderRecipes = ({item}) => (
        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)'
                            onPress={() => this.onPressRecipe(item.key, item.photo_url, item.name)}>
            <View style={styles.categoriesItemContainer}>
                <Image style={styles.categoriesPhoto} source={{uri: item.photo_url}}/>
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

    _scrollInfiniteRequest = (id, value) => {
        this.comerciosRequest(id, value, true);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <PrincipalComponent>
                    <FlatList
                        vertical
                        showsVerticalScrollIndicator={false}
                        data={this.state.companies}
                        renderItem={this.renderRecipes}
                        keyExtractor={item => `${item.key}`}
                        onEndReached={() => this._scrollInfiniteRequest(this.state.id, this.state.value)}
                        initialNumToRender={10}
                        onEndReachedThreshold={1}
                    />
                </PrincipalComponent>
            </View>
        );
    }
}
