import React from "react";
import {View,TextInput,Text,TouchableHighlight} from "react-native";
import PrincipalComponent from "../Principal/PrincipalComponent";
import styles from './Styles';

export default class Register extends React.Component {
    render() {
        return (
            <View style={{flex:1}}>
                <PrincipalComponent>
                    <View style={styles.container}>
                        <Text style={{marginBottom:"5%",fontSize:20}}>Registro</Text>
                        <View style={styles.groupInput}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>Nombres:</Text>
                            </View>
                            <View style={styles.containerInput}>
                                <TextInput style={styles.input}/>
                            </View>
                        </View>
                        <View style={styles.groupInput}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>Apellidos:</Text>
                            </View>
                            <View style={styles.containerInput}>
                                <TextInput style={styles.input}/>
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
                                />
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection:"row"}}>
                            <View style={styles.button1Group}>
                                <TouchableHighlight style={styles.button} onPress={() => console.log("Ingresar")}>
                                    <Text>Ingresar</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.button2Group}>
                                <TouchableHighlight style={styles.button} onPress={() => console.log("Registrarse")}>
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