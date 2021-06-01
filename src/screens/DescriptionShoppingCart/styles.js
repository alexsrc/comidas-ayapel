const styles = StyleSheet.create({
    container:{
        margin:0,
        flex:1
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
    },
    categoriesPhoto: {
        width: '50%',
        height: "100%",
        padding:"0%",
        shadowColor: 'blue',
        maxWidth:"30%",
        maxHeight: "100%",
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 3,
        flex:1,
        flexDirection: 'row',
    },
    categoriesPhotoList: {
        width: '50%',
        height: 100,
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
        padding:5
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
        width: '50%',
        height: 100,
        elevation: 3,
        display: 'flex',
    },
    groupTextList:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    categoriesNameList: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333333',
    },
    textList:{
        textAlign:"left",
        paddingLeft:5,
        width:"50%"
    },
});

import { StyleSheet } from 'react-native';

export default styles;
