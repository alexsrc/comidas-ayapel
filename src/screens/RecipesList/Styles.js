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
  contener:{
    position: "absolute",
    width:50,
    height:50,
    bottom: "3%",
    right: "3%",
  },
  countShoppingCard:{
    flex:1,
    right: 0,
    top:-8,
    position: "absolute",
    fontSize: 20, /* Cambiar el tamaño de la tipografia */
    textTransform: "uppercase", /* Texto en mayusculas */
    fontWeight: "bold",
    zIndex:10000,
    color:"red"
  },
  btnFlotante: {
    position: "absolute",
    fontSize: 100, /* Cambiar el tamaño de la tipografia */
    textTransform: "uppercase", /* Texto en mayusculas */
    fontWeight: "bold", /* Fuente en negrita o bold */
    color: "blue", /* Color del texto */
    borderRadius: 50, /* Borde del boton */
    letterSpacing: 2, /* Espacio entre letras */
    backgroundColor: "yellow", /* Color de fondo */
    //radius:10,
    width:"100%",
    height:"100%",
    justifyContent:"center",
    alignItems:"center"

  },
  btnImage:{
    width:"60%",
    height:"60%",
    margin:"auto",
    justifyContent: "center"
  }
});

export default styles;
