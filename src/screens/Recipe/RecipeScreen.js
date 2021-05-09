import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import {serviceApiGet} from "../../ServiciosMaestros/request";
import {api} from "../../ServiciosMaestros/apis";

export default class RecipeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('title')
    };

  };

  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.productRequest(navigation.getParam('id'))

  }

  productRequest = (id)=>{
    serviceApiGet(api.products+id)
        .then((response) => {
          if (response.status) {
            this.setState({
              products:response.data
            });
          }
        })
        .catch((error) => {
          console.log("error:::",error)
        })
  }

  renderRecipes = ({item}) => (
      <TouchableHighlight underlayColor='#DDDDDD' onPress={() => this.onPressRecipe(item)}>
        <View style={styles.container}>
          <Image style={styles.categoriesPhoto} source={{uri: item.photo_url}}/>
          <Text style={styles.title}>{item.name}</Text>
          {/*<Text style={styles.category}>Valor {item.id}</Text>*/}
        </View>
      </TouchableHighlight>
  );

  render() {
    return (
        <View>
          <FlatList
              data={this.state.products}
              renderItem={this.renderRecipes}
              keyExtractor={item => `${item.key}`}
          />
        </View>
    );
  }
}

/*cooking steps
<View style={styles.infoContainer}>
  <Image style={styles.infoPhoto} source={require('../../../assets/icons/info.png')} />
  <Text style={styles.infoRecipe}>Cooking Steps</Text>
</View>
<Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
*/
