import React from "react";
import {View,TextInput,Text} from "react-native";
import PrincipalComponent from "../Principal/PrincipalComponent";
import styles from './Styles';

export default class Register extends React.Component {
    render() {
        return (
            <View style={{flex:1}}>
                <PrincipalComponent>
                    <View style={styles.container}>
                        <Text>Registro</Text>
                        <View style={styles.groupInput}>
                            <Text>Nombres</Text>
                            <TextInput style={styles.input}/>
                        </View>
                        <View style={styles.groupInput}>
                            <Text>Apellidos</Text>
                            <TextInput style={styles.input}/>
                        </View>
                        <View style={styles.groupInput}>
                            <Text>Telefono</Text>
                            <TextInput style={styles.input}/>
                        </View>
                    </View>
                </PrincipalComponent>
            </View>
        )
    }
}