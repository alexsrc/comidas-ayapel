import React from "react";
import {View, TextInput, Text, TouchableHighlight} from "react-native";
import PrincipalComponent from "../Principal/PrincipalComponent";
import ValidationComponent from 'react-native-form-validator';
import styles from './Styles';

const messages = {
    es: {
        numbers: 'El campo "{0}" debe ser un número válido.',
        email: 'El campo "{0}" debe ser un email válido.',
        required: 'El campo "{0}" es requerido.',
        date: 'El campo "{0}" debe contener una fecha válida ({1}).',
        minlength: 'La longitud del campo "{0}" debe ser mayor de {1} caracteres',
        maxlength: 'La longitud del campo "{0}" debe ser menor de {1} caracteres.',
        equalPassword: 'Las contraseñas son diferentes',
        hasNumber: 'El campo "{0}" debe contener un número.',
        hasUpperCase: 'El campo "{0}" debe contener una letra mayúscula',
        hasLowerCase: 'El campo "{0}" debe contener minúsculas',
        hasSpecialCharacter: 'El campo "{0}" debe contener un carácter especial',
    },
};

export default class Register extends ValidationComponent {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Registro"
        };
    };

    constructor(props) {
        super(props);
        this.deviceLocale='es';
        this.messages=messages;
        this.labels={name:"Nombres",lastname:"Apellidos",cellphone: "Celular",password:"Contraseña"};
        this.state = {
            name: "",
            lastname: "",
            cellphone: "",
            password: "",
            confirmPassword: ""
        }
    }

    login() {
        this.props.navigation.navigate('Login');
    }

    onchange = (e, field) => {
        let value = e.nativeEvent.text;
        this.setState({
            [field]:value
        })
    }

    sendRegister(){
        this.validate({
            name: {minlength:3, maxlength:25, required: true},
            lastname: {minlength:3, maxlength:25, required: true},
            cellphone: {minlength:10, maxlength:10, numbers: true, required: true},
            password: {minlength:4, maxlength:12, required: true},
            confirmPassword: {equalPassword:this.state.password}
        });
        console.log("values:::",this.state)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <PrincipalComponent>
                    <View style={styles.container}>
                        <Text style={{marginBottom: "5%", fontSize: 20}}>Registro</Text>
                        <View style={{marginLeft:"3%",marginRight:"3%"}}>
                            {
                                this.isFieldInError('name') && this.getErrorsInField('name').map((errorMessage,key) =>{ if(key===0)return <Text>{errorMessage}</Text>})
                                || this.isFieldInError('lastname') && this.getErrorsInField('lastname').map((errorMessage,key) =>{ if(key===0)return <Text>{errorMessage}</Text>})
                                || this.isFieldInError('cellphone') && this.getErrorsInField('cellphone').map((errorMessage,key) =>{ if(key===0)return <Text>{errorMessage}</Text>})
                                || this.isFieldInError('password') && this.getErrorsInField('password').map((errorMessage,key) =>{ if(key===0)return <Text>{errorMessage}</Text>})
                                || this.isFieldInError('confirmPassword') && this.getErrorsInField('confirmPassword').map((errorMessage,key) =>{ if(key===0)return <Text>{errorMessage}</Text>})
                            }
                        </View>
                        <View style={styles.groupInput}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>Nombres:</Text>
                            </View>
                            <View style={styles.containerInput}>
                                <TextInput
                                    style={styles.input}
                                    onChange={(e) => this.onchange(e, "name")}
                                    ref="name"

                                />
                            </View>
                        </View>
                        <View style={styles.groupInput}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>Apellidos:</Text>
                            </View>
                            <View style={styles.containerInput}>
                                <TextInput
                                    style={styles.input}
                                    onChange={(e) => this.onchange(e, "lastname")}
                                />
                            </View>
                        </View>
                        <View style={styles.groupInput}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>Telefono:</Text>
                            </View>
                            <View style={styles.containerInput}>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    onChange={(e) => this.onchange(e, "cellphone")}
                                />
                            </View>
                        </View>
                        <View style={styles.groupInput}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>Contraseña:</Text>
                            </View>
                            <View style={styles.containerInput}>
                                <TextInput
                                    style={styles.input}
                                    secureTextEntry={true}
                                    onChange={(e) => this.onchange(e, "password")}
                                />
                            </View>
                        </View>
                        <View style={styles.groupInput}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>Confirmar Contraseña:</Text>
                            </View>
                            <View style={styles.containerInput}>
                                <TextInput
                                    style={styles.input}
                                    secureTextEntry={true}
                                    onChange={(e) => this.onchange(e, "confirmPassword")}
                                />
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: "row"}}>
                            <View style={styles.button1Group}>
                                <TouchableHighlight style={styles.button} onPress={() => this.login()}>
                                    <Text>Ingresar</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.button2Group}>
                                <TouchableHighlight style={styles.button} onPress={() => this.sendRegister()}>
                                    <Text>Registrarse</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </PrincipalComponent>
            </View>
        )
    }
}