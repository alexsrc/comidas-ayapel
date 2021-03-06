import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    groupText:{
        flex:1,
        flexDirection: 'column',
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#333333',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    description: {
        fontSize: 10,
        fontWeight: '200',
        textAlign: 'left',
        color: '#333333',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    value:{
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#333333',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
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
        marginRight:10,
        marginLeft:10
    },
    textTitle:{
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#333333',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    textInput:{
        flex:1,
        maxWidth:"100%",
        maxHeight: "30%",
        borderWidth:1,
        borderColor:"grey",
        marginTop:10,
        marginRight:10,
        marginLeft:10,
        alignItems:"flex-start",
        justifyContent:"flex-start",
        borderRadius:20,
        textAlign:'justify',
        textAlignVertical:'top',
        padding:10

    },
    conteinerButton:{
        position: 'absolute',
        bottom: '3%',
        left: '3%',
        right: '3%',
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },
    button1:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        width:'50%',
        alignItems:'center',
        textAlign:'center',
        marginRight:'2%',
        marginLeft:'2%',
        backgroundColor:'#7fffd4',
        borderRadius:20,
        borderColor: 'blue',
        height: 25,
        textAlignVertical:'center'
    },
    buttonPlus:{
        width:'25%',
        marginRight:"2%",
        marginLeft:"2%",
        justifyContent: 'center',
        alignItems:'center',
        textAlign:'center',

    },
    text:{
        width:'50%',
        justifyContent: 'center',
        alignItems:'center',
        textAlign:'center',
    },
    buttonMinus:{
        width:'25%',
        marginRight:"2%",
        marginLeft:"2%",
        justifyContent: 'center',
        alignItems:'center',
        textAlign:'center',
    },
    button2:{
        flex:1,
        justifyContent: 'center',
        width:'50%',
        alignItems:'center',
        textAlign:'center',
        marginRight:'2%',
        marginLeft:'2%',
        backgroundColor:'#7fffd4',
        borderRadius:20,
        borderColor: 'blue',
        height: 25,
        textAlignVertical:'center'
    }
});

export default styles;
