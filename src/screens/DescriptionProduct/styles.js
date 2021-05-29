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
    }
});

export default styles;
