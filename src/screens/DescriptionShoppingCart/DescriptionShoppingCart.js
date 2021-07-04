import React from "react";
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableHighlight,
    Modal,
    Pressable,
    TextInput
} from "react-native";
import styles from './styles';
import {numberFormat} from '../../ServiciosMaestros/general';
import {Linking} from "react-native";
import PrincipalComponent from "../Principal/PrincipalComponent";
import ValidationComponent from 'react-native-form-validator';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {mapStyle} from './mapStyle';

const messages = {
    es: {
        required: 'El campo "{0}" es requerido.',
        minlength: 'La longitud del campo "{0}" debe ser mayor de {1} caracteres',
        maxlength: 'La longitud del campo "{0}" debe ser menor de {1} caracteres.',

    },
};

export default class DescriptionShoppingCart extends ValidationComponent {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Pedido"
        };
    };

    constructor(props) {
        super(props);
        this.deviceLocale = 'es';
        this.messages = messages;
        this.labels = {address: "Dirección", addressDescription: "Dirección Adicional"};
        let {navigation} = props;
        let total = 0;
        navigation.getParam("shoppingCard").map((t) => {
            total += t.amount;
        })
        this.state = {
            commerce: navigation.getParam("commerce"),
            products: navigation.getParam("shoppingCard"),
            total: total,
            address: "",
            addressDescription: "",
            modal: true,

        }
    }

    sendMessageWhatsapp() {
        let validate = this.validate({
            address: {minlength: 8, maxlength: 40, required: true},
            addressDescription: {minlength: 8, maxlength: 40, required: true}
        });
        if (validate) {

            Linking.openURL('whatsapp://send?text=' + "hola mundo!" + '&phone=57' + 3205677440);
        }

    }


    openModal(value) {
        this.setState({
            modal: value
        })
    }

    onchange = (e, field) => {
        let value = e.nativeEvent.text;
        this.setState({
            [field]: value
        })
    }

    renderRecipes = ({item}) => (
        <View>
            <View style={styles.categoriesItemContainerList}>
                <Image style={styles.categoriesPhotoList} source={{uri: item.photo_url}}/>
                <View style={styles.letterList}>
                    <Text style={styles.categoriesNameList}>{item.name} </Text>
                    <View style={styles.groupTextList}>
                        <Text style={styles.textList}>Total: {numberFormat(item.amount)}</Text>
                        <TouchableHighlight style={styles.containerImage}
                                            onPress={() => console.log(item.id, item.name, item.photo_url, item.description, item.amount)}>
                            <Image style={styles.icon} source={require('../../../assets/icons/eye-open.png')}/>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </View>
    );

    viewError(errorMessage) {
        return (
            <View style={{marginLeft: "3%", marginRight: "3%", marginTop: "10%", marginBottom: "-2%"}}>
                <Text>{errorMessage}</Text>
            </View>
        )
    }

    errores() {
        return this.isFieldInError('address') && this.getErrorsInField('address').map((errorMessage, key) => {
                if (key === 0) return this.viewError(errorMessage)
            })
            || this.isFieldInError('addressDescription') && this.getErrorsInField('addressDescription').map((errorMessage, key) => {
                if (key === 0) return this.viewError(errorMessage)
            })
    }

    render() {
        return (
            <PrincipalComponent>
                <View style={styles.container}>
                    <View style={styles.modalInto}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modal}
                            onRequestClose={() => this.openModal(true)}
                        >
                            <View style={styles.modal}>
                                <View style={styles.modalView}>
                                    <View style={styles.addressInfo}>
                                        <Text style={styles.modalText}>Confirmar Pedido</Text>
                                        {
                                            this.errores()
                                        }
                                        <View style={{
                                            width: "100%",
                                            height: "100%",
                                            marginTop: "0%",
                                            marginBottom: "5%"
                                        }}>
                                            <View style={styles.groupInput}>
                                                <View style={styles.textContainer}>
                                                    <Text style={styles.text}>Dirección:</Text>
                                                </View>
                                                <View style={styles.containerInput}>
                                                    <TextInput
                                                        style={styles.input}
                                                        onChange={(e) => this.onchange(e, "address")}
                                                        ref="address"
                                                        value={this.state.address}
                                                    />
                                                </View>
                                            </View>
                                            <View style={[styles.groupInput, {maxHeight: "16%"}]}>
                                                <View style={styles.textContainer}>
                                                    <Text style={styles.text}>Descripción Adicional:</Text>
                                                </View>
                                                <View style={styles.containerInput}>
                                                    <TextInput
                                                        style={styles.input}
                                                        onChange={(e) => this.onchange(e, "addressDescription")}
                                                        ref="addressDescription"
                                                        value={this.state.addressDescription}
                                                        placeholder="Numero de apartamento, color de la casa, piso..."
                                                    />
                                                </View>
                                            </View>
                                            <View style={styles.containerMap}>
                                                <MapView
                                                    customMapStyle={mapStyle}
                                                    provider={PROVIDER_GOOGLE}
                                                    style={styles.mapStyle}
                                                    initialRegion={{
                                                        latitude: 8.3092846,
                                                        longitude: "-75.1670841,14z"
                                                    }}
                                                    mapType="standard"
                                                    showsUserLocation={true}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.buttonModalGroup}>
                                        <Pressable
                                            style={[styles.buttonModal, styles.buttonClose]}
                                            onPress={() => this.sendMessageWhatsapp()}
                                        >
                                            <Text style={styles.textStyle}>Confirmar</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[styles.buttonModal, styles.buttonClose]}
                                            onPress={() => this.openModal(false)}
                                        >
                                            <Text style={styles.textStyle}>Cancelar</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <View style={styles.containerCommerce}>
                        <Image style={styles.categoriesPhoto} source={{uri: this.state.commerce.photo_url}}/>
                        <View style={styles.groupText}>
                            <Text style={styles.commerceName}>
                                {this.state.commerce.commerceName}
                            </Text>
                            <Text style={styles.commerceDescription}>
                                {"Horario de atencion: 8Am - 8Pm"}
                            </Text>
                        </View>
                    </View>
                    <FlatList
                        style={{flex: 1, margin: 0, width: "100%", marginBottom: "11%"}}
                        vertical
                        showsVerticalScrollIndicator={false}
                        numColumns={1}
                        data={this.state.products}
                        renderItem={this.renderRecipes}
                        keyExtractor={item => `${item.key}`}
                    />
                    <TouchableHighlight style={styles.button} onPress={() => this.openModal(true)}>
                        <Text style={{fontSize: 15}}>
                            {"Pedir"} {numberFormat(this.state.total)}
                        </Text>
                    </TouchableHighlight>
                </View>
            </PrincipalComponent>

        )
    }
}