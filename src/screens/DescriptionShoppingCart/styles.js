const styles = StyleSheet.create({
    container:{
        margin:10,
        flex:1
    },
    containerCommerce:{
        flex: 1,
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 20,
        padding: 5,
        textAlign: 'left',
        maxWidth:"100%",
        maxHeight: "10%",
    },
    categoriesPhoto: {
        width: '50%',
        height: 100,
        padding:"5%",
        borderRadius: 20,
        shadowColor: 'blue',
        maxWidth:"30%",
        maxHeight: "90%",

        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 3,
        flex:1,
        flexDirection: 'row',
    },
});

import { StyleSheet } from 'react-native';

export default styles;
