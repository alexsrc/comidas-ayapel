import React from 'react';
import {
    FlatList,
    Text,
    View,
    TouchableHighlight,
    Image,
    TouchableOpacity
} from 'react-native';
import styles from './styles';
import {serviceApiGet, serviceApiResponse} from "../../ServiciosMaestros/request";
import {api} from "../../ServiciosMaestros/apis";
import {SearchBar} from "react-native-elements";
import MenuImage from "../../components/MenuImage/MenuImage";

let inter;

export default class RecipesListScreen extends React.Component {
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
                    //onClear={() => params.handleSearch('')}
                    placeholder="Buscar"
                    value={params.value}
                />
            )
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            value: "",
            id: 0,
            nextPage: null
        };
    }

    componentDidMount() {
        const {navigation} = this.props;
        navigation.setParams({
            handleSearch: this.handleSearch,
            value: ""
        });
        this.productRequest(navigation.getParam('id'),"aceite",false)
    }

    _scrollInfiniteRequest = (id, value) => {
        this.productRequest(id, value,true);
    }

    productRequest = (id, value = "", text = false) => {
        clearInterval(inter)
        let nextPage = parseInt(this.state.nextPage) + 1;
        let url = api.products + id;
        if (nextPage && text) {
            url = url + "?page=" + nextPage;
        }
        console.log(url)
        serviceApiResponse({id, filter: value}, url, "POST")
            .then((response) => {
                if (response.status) {
                    let data = []
                    data = this.state.products;
                    if (nextPage && text) {
                        response.data.data.map((dat) => {
                            data.push(dat);
                        })
                    } else {
                        data = response.data.data
                    }
                    this.setState({
                        products: data,
                        value,
                        id,
                        nextPage: response.data.current_page
                    });
                } else {
                    this.setState({
                        products: [],
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
            this.productRequest(this.state.id, text, false)
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

    onPressRecipe(item) {

    }

    renderRecipes = ({item}) => (
        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item.key)}>
            <View style={styles.categoriesItemContainer}>
                <Image style={styles.categoriesPhoto} source={{uri: item.photo_url}}/>
                <View style={styles.letter}>
                    <Text style={styles.categoriesName}>{item.name}</Text>
                    <View style={styles.groupText}>
                        <Text style={styles.text}>{"Disponible"}</Text>
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
                    numColumns={1}
                    data={this.state.products}
                    renderItem={this.renderRecipes}
                    keyExtractor={item => `${item.key}`}
                    onEndReached={() => this._scrollInfiniteRequest(this.state.id, this.state.value)}
                    initialNumToRender={10}
                    onEndReachedThreshold={1}
                />
                <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' style={styles.contener}
                                    onPress={() => console.log("hola")}>
                    <View style={styles.btnFlotante}>
                        <Image style={styles.btnImage} source={require('../../../assets/icons/shoppingcar.png')}/>
                    </View>
                </TouchableHighlight>

            </View>
        );
    }
}
