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
        const {navigation} = props;
        this.state = {
            products: [],
            value: "",
            id: 0,
            nextPage: null,
            shoppingCard:[],
            countShoppingCard:0,
            commerce:{
                photo_url:navigation.getParam("photo_url"),
                commerceName:navigation.getParam("commerceName"),
            }
        };
    }

    componentDidMount() {
        const {navigation} = this.props;
        navigation.setParams({
            handleSearch: this.handleSearch,
            value: ""
        });
        this.productRequest(navigation.getParam('id'),"",false)
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

    addShoppingCard = (id,quantity,description)=>{
        let shoppingCard=this.state.shoppingCard;
        let countShoppingCard=this.state.countShoppingCard;
        let product=this.searchProduct(id);
        shoppingCard.push({
            id,
            quantity,
            name:(product).name,
            photo_url: (product).photo_url,
            amount:(product).amount*quantity,
            description
        })

        this.setState({
            shoppingCard,
            countShoppingCard:countShoppingCard+quantity
        });
    }

    viewShoppingCart(){
        let {shoppingCard,countShoppingCard,commerce}=this.state;
        console.log("COMMERCE::: ",commerce)
        if(countShoppingCard>0) this.props.navigation.navigate('ShoppingCart', {shoppingCard,commerce});
    }

    searchProduct=(id)=>{
        let products=this.state.products;
        return products.filter((listProduct)=>{
            if(listProduct.key===id)return listProduct;
        })[0];
    }

    onPressRecipe(id,name,photo_url,description,amount) {
        let func=()=>this.addShoppingCard;
        this.props.navigation.navigate('DescriptionProduct', {id,name,photo_url,description,amount,func});
    }

    renderRecipes = ({item}) => (
        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item.key,item.name,item.photo_url, item.description,item.amount)}>
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
            <View style={{flex:1}}>
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
                                    onPress={() => this.viewShoppingCart()}>
                    <View style={styles.btnFlotante}>
                        <Text style={styles.countShoppingCard}>
                            {this.state.countShoppingCard}
                        </Text>
                        <View style={styles.btnFlotante}>
                            <Image style={styles.btnImage} source={require('../../../assets/icons/shoppingcar.png')}/>
                        </View>
                    </View>
                </TouchableHighlight>

            </View>
        );
    }
}
