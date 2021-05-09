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
              value={params.data}
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

  productRequest = (id)=>{
    const { navigation } = this.props;
    serviceApiGet(api.products+id)
        .then((response) => {
          if (response.status) {
            navigation.setParams({
              handleSearch: this.handleSearch,
              data: response.data
            });
            this.setState({
              products:response.data
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
      <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.photo_url }} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>{item.title}</Text>
        </View>
      </TouchableHighlight>
  );

  render() {
    return (
        <View>
          <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={this.state.products}
              renderItem={this.renderRecipes}
              keyExtractor={item => `${item.key}`}
          />
        </View>
    );
  }
}
