import { StyleSheet, Dimensions } from 'react-native';
let ScreenHeight = Dimensions.get("window").height;
let porcentaje30= ScreenHeight*0.30;
let porcentaje50= ScreenHeight*0.50;
let porcentaje20= ScreenHeight*0.70;
const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalInto: {
        justifyContent: "center",
        alignItems: "center",
    },
    modalView:{
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        width:"90%",
        minHeight: ScreenHeight-porcentaje50,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    addressInfo:{
        width:"90%",
        height:"90%"
    },
    groupInput:{
        width:"100%",
        maxHeight:"8%",
        minHeight:"8%",
        marginTop:"15%",
        flex:1,
        marginRight:2,
        marginLeft:2,
        flexDirection:"column",
        alignContent:"center",
        alignItems:"flex-start",
    },
    input:{
        borderColor:"blue",
        borderWidth:1,
        borderRadius:20,
        minWidth:"100%",
        minHeight:"100%",
        marginTop:"auto",
        marginBottom:"auto",
        marginRight: "auto",
        paddingLeft:"5%",
        paddingRight:"5%",
    },
    containerInput:{
        width:"100%",
        height: "100%",
        alignItems:"center",
        alignContent:"center"
    },
    text:{
        textAlign:"left"
    },
    textContainer:{

        width:"100%",
        textAlign:"left"
    },
    buttonModalGroup:{
        flex:1,
        flexDirection:"row",
        marginBottom: "auto",
        marginLeft:15,
        marginRight:15,
        height:"10%"
    },
    buttonModal: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width:"50%",
        height:"70%",
        marginRight:5,
        marginLeft:5,
        justifyContent: 'center',
        alignItems:'center'
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
    },
    modalText: {
        marginTop:"5%",
        textAlign: "center"
    },
    container:{
        margin:0,
        flex:1,
        alignItems:"center",
        minHeight: ScreenHeight-porcentaje30
    },
    containerCommerce:{
        flex: 1,
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderColor: '#cccccc',
        borderWidth: 0.5,
        padding: 0,
        marginTop:0,
        marginBottom: 0,
        textAlign: 'left',
        maxWidth:"100%",
        maxHeight: "15%",
        minHeight: "15%"
    },
    categoriesPhoto: {
        minHeight: "100%",
        padding:"0%",
        shadowColor: 'blue',
        maxWidth:"32.5%",
        maxHeight: "100%",
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 3,
        flex:1,
        flexDirection: 'row',
    },
    categoriesPhotoList: {
        width: '30%',
        minHeight: 100,
        padding:"0%",
        borderRadius: 20,
        shadowColor: 'blue',
        maxWidth:"30%",
        maxHeight: "100%",
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 3,
        flex:1,
        flexDirection: 'row',
    },
    groupText:{
        flex:1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding:5,
    },
    commerceName:{
        flex:1,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'left',
        alignContent:'flex-start',
        color: '#333333',
    },
    commerceDescription:{
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#333333',
    },
    line:{
        flex:1,
        borderWidth:0.3,
        borderColor:"black",
        borderStyle:"solid",
        height:1,
        maxWidth:"100%",
        maxHeight:"0%",
        marginTop:10,
        marginRight:5,
        marginLeft:5
    },
    categoriesItemContainerList: {
        flex: 1,
        flexDirection:'row',
        marginTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 20,
        margin:10,
        padding:5,
        textAlign: 'left',
    },
    letterList:{
        width: '70%',
        maxWidth: '70%',
        elevation: 3,
        display: 'flex',
    },
    categoriesNameList: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft:10,
        marginRight:10,
        color: '#333333',
        width:"100%",

    },
    groupTextList:{
        flex:1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding:5,
    },
    textList:{
        flex:1,
        textAlign:"left",
        paddingLeft:5,
        paddingRight:5,
        width:"100%",
    },
    containerImage:{
        flex:1,
        alignContent:"flex-start",
        alignItems:"flex-start",
        textAlign:"left",
        paddingLeft:5,
        paddingRight:5,
        padding:0,
        width:"100%"

    },
    icon:{
        flex:1,
        textAlign:"left",
        fontSize: 15,
        width:20,
        height:20,
        justifyContent: "flex-end",
    },
    button:{
        flex:1,
        position:"absolute",
        bottom: '1%',
        justifyContent: 'center',
        width:'90%',
        alignItems:'center',
        textAlign:'center',
        backgroundColor:'#7fffd4',
        borderRadius:20,
        borderColor: 'blue',
        height: "5%",
        textAlignVertical:'center',
    },
    containerMap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: "90%",
        height: "70%",
    }
});
export default styles;
