import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:"center",
        alignItems:"center",
        width:"90%",
        margin: "5%",
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 20,
        paddingTop:"5%",
        minHeight: "auto"
    },
    groupInput:{
        width:"100%",
        maxHeight:"8%",
        flex:1,
        marginRight:2,
        marginLeft:2,
        flexDirection:"row",
        alignContent:"center",
        alignItems:"center",
    },
    input:{
        borderColor:"blue",
        borderWidth:1,
        borderRadius:20,
        width:"85%",
        height:"50%",
        marginTop:"auto",
        marginBottom:"auto",
        marginRight: "auto",
        paddingLeft:"5%",
        paddingRight:"5%",
    },
    text:{
        textAlign:"center"
    },
    textContainer:{
        width:"30%",
        textAlign:"center"
    },
    containerInput:{
        width:"70%",
        height: "100%",
        alignItems:"center",
        alignContent:"center"
    },
    button1Group:{
        backgroundColor:'green',
        borderRadius:20,
        borderColor: 'blue',
        height: 45,
        width:'30%',
        alignItems:'center',
        textAlign:'center',
        justifyContent: 'center',
        marginRight:'2%',
        marginLeft:'2%',
        marginTop: "2%"

    },
    button2Group:{
        backgroundColor:'blue',
        borderRadius:20,
        borderColor: 'blue',
        height: 45,
        width:'30%',
        alignItems:'center',
        textAlign:'center',
        justifyContent: 'center',
        marginRight:'2%',
        marginLeft:'2%',
        marginTop: "2%"
    },
})

export default styles;
