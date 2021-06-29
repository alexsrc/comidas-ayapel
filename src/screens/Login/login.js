import React from "react";
import {Text, TextInput, TouchableHighlight, View} from "react-native";
import PrincipalComponent from "../Principal/PrincipalComponent";
import styles from "../Register/Styles";
import ValidationComponent from "react-native-form-validator";
import {tokenApi} from "../../ServiciosMaestros/request";
import {api} from "../../ServiciosMaestros/apis";

const messages = {
    es: {
        numbers: 'número inválido.',
        required: 'El campo "{0}" es requerido.',
    },
};

export default class Login extends ValidationComponent {

    constructor(props) {
        super(props);
        this.deviceLocale='es';
        this.messages=messages;
        this.labels={cellphone: "celular",password: "Contraseña"};
        this.state = {
            cellphone: "1234567890",
            password: "12345",
            error:false,
            messageError:""
        }
    }

    onchange = (e, field) => {
        let value = e.nativeEvent.text;
        this.setState({
            [field]:value
        })
    }

    login(){
        let validate=this.validate({
            cellphone: {numbers: true, required: true},
            password: {required: true},
        });

        if(validate){
            tokenApi(this.state.cellphone,this.state.password,this.state,api.token,"POST")
                .then((response)=>{
                    console.log("RESPONSE:::",response)
                    if (response.status) {
                        console.log("ENTRO")
                    }else{
                        this.setState({
                            error:true,
                            messageError:"Celular o contraseña invalida, por favor valida e intentalo nuevamente"
                        })
                    }
                })
                .catch((error)=>{
                    this.setState({
                        error:true,
                        messageError:"Ocurrio un error, por favor intente más tarde"
                    })
                })
        }

    }

    register() {
        this.props.navigation.navigate('Register');
    }

    render() {
        return (
            <PrincipalComponent>
                <View style={styles.container}>
                    <Text style={{marginBottom: "5%", fontSize: 20}}>Ingresar</Text>
                    <View style={{marginLeft:"3%",marginRight:"3%"}}>
                        {
                            this.isFieldInError('cellphone') && this.getErrorsInField('cellphone').map((errorMessage,key) =>{ if(key===0)return <Text>{errorMessage}</Text>})
                            || this.isFieldInError('password') && this.getErrorsInField('password').map((errorMessage,key) =>{ if(key===0)return <Text>{errorMessage}</Text>})
                        }
                    </View>
                    <View style={{marginLeft:"3%",marginRight:"3%"}}>
                        {
                            this.state.error&&<Text>{this.state.messageError}</Text>
                        }
                    </View>
                    <View style={styles.groupInput}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Celular:</Text>
                        </View>
                        <View style={styles.containerInput}>
                            <TextInput
                                style={styles.input}
                                onChange={(e) => this.onchange(e, "cellphone")}
                                ref="cellphone"
                                value={this.state.cellphone}
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
                                onChange={(e) => this.onchange(e, "password")}
                                ref="password"
                                secureTextEntry={true}
                                value={this.state.password}
                            />
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: "row"}}>
                        <View style={styles.button2Group}>
                            <TouchableHighlight style={styles.button} onPress={() => this.register()}>
                                <Text>Registrarse</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.button1Group}>
                            <TouchableHighlight style={styles.button} onPress={() => this.login()}>
                                <Text>Ingresar</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </PrincipalComponent>
        );
    }
}