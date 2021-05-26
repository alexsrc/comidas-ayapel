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
import {serviceApiGet} from "../../ServiciosMaestros/request";
import {api} from "../../ServiciosMaestros/apis";
import {SearchBar} from "react-native-elements";
import MenuImage from "../../components/MenuImage/MenuImage";

export default class RecipesListScreen extends React.Component {
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
        value:"",
        id:0,
        nextPage:null
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.productRequest(navigation.getParam('id'))


  }

  _scrollInfiniteRequest=(id,value)=>{
      this.productRequest(id,value);
  }

  productRequest = (id,value="")=>{
    const { navigation } = this.props;
    let nextPage=parseInt(this.state.nextPage)+1;
    console.log("ESTE ES NEXT PAGE:::",nextPage)
    let url=api.products+id;
    if(nextPage){
        url=url+"?page="+nextPage;
    }
      console.log(url)
      serviceApiGet(url)
        .then((response) => {
          if (response.status) {
              let data=[]
              data=this.state.products;
              if(nextPage){
                  response.data.data.map((dat)=>{
                      data.push(dat);
                  })
              }else{
                  data=response.data.data
              }

              console.log("FROM:::",response.data.current_page)
            navigation.setParams({
                handleSearch: this.handleSearch,
                data: data,
                value
            });
            this.setState({
                products:data,
                value,
                id,
                nextPage:response.data.current_page
            });
          }
          else{
              this.setState({
                  products:[],
                  value,
                  id,
                  nextPage:null
              });
              navigation.setParams({
                  handleSearch: this.handleSearch,
                  data: [],
                  value
              });
          }
        })
        .catch((error) => {
          console.log("error:::",error)
        })
  }

  handleSearch = text => {
    console.log(text)

  };

  onPressRecipe(item){

  }

  renderRecipes = ({ item }) => (
      <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item.key)}>
          <View style={styles.categoriesItemContainer}>
              <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />
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
          onEndReached={()=>this._scrollInfiniteRequest(this.state.id,this.state.value)}
          initialNumToRender={10}
          onEndReachedThreshold={1}
        />
            <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' style={styles.contener} onPress={() => console.log("hola")}>
                <View style={styles.btnFlotante}>
                    <Image style={styles.btnImage} source={require('../../../assets/icons/shoppingcar.png')}/>
                </View>
            </TouchableHighlight>

      </View>
    );
  }
}
