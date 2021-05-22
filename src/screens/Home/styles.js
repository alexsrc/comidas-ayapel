import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  categoriesItemContainer: {
    flex: 1,
    flexDirection:'row',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 5,
    textAlign: 'center',

  },
  categoriesPhoto: {
    width: '50%',
    height: 100,
    padding:"5%",
    borderRadius: 20,
    shadowColor: 'blue',

    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 3,
    flex:1,
    flexDirection: 'row',
  },
  letter:{
    width: '50%',
    height: 100,
    elevation: 3,
    display: 'flex',
  },
  groupText:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  categoriesName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
  },
  categoriesInfo: {
    marginTop: 3,
    marginBottom: 5
  },
  text:{
    textAlign:"left",
    paddingLeft:5,
    width:"50%",
    //float:"left"
  },
});

export default styles;
