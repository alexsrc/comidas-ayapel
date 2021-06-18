import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:"center",
        alignItems:"center",
        width:"100%",
    },
    groupInput:{
        width:"100%",
        height:"20%",
        flex:1,
        marginRight:2,
        marginLeft:2,
        borderColor: "red",
        borderWidth: 1,
        flexDirection:"row",
        alignContent:"center",
        alignItems:"center",
    },
    input:{
        borderColor:"blue",
        borderWidth:1,
        borderRadius:20,
        width:"70%"
    }
})

export default styles;
