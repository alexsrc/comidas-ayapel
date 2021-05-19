import React from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import styles from './styles';
import {serviceApiGet} from "../../ServiciosMaestros/request";
import {api} from "../../ServiciosMaestros/apis";
import {SearchBar} from "react-native-elements";
import MenuImage from "../../components/MenuImage/MenuImage";
import MenuButton from "../../components/MenuButton/MenuButton";

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
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.productRequest(navigation.getParam('id'))


  }

  productRequest = (id,value="")=>{
    const { navigation } = this.props;
    serviceApiGet(api.products+id)
        .then((response) => {
          if (response.status) {
            navigation.setParams({
                handleSearch: this.handleSearch,
                data: response.data.data,
                value
            });
            this.setState({
                products:response.data.data,
                value
            });
          }
          else{
              this.setState({
                  products:[],
                  value
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
        />
        <Image source={require('../../../assets/icons/shoppingcar.png')}/>

      </View>
    );
  }
}
