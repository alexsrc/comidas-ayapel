import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  categoriesItemContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 5,
    display:'table-column',
    textAlign: 'center'

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
    display: 'inline-table',
  },
  categoriesName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop: 8
  },
  categoriesInfo: {
    marginTop: 3,
    marginBottom: 5
  },
  letter:{
    width: '50%',
    height: 100,
    elevation: 3,
    display: 'inline-table',
  },
  groupText:{
    display:"table-footer-group"
  },
  text:{
    textAlign:"Left",
    paddingLeft:5,
    width:"50%",
    float:"Left"
  }
});

export default styles;
