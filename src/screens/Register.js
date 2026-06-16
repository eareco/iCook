import { View, Text, Pressable, StyleSheet, TextInput, Image } from "react-native";
import { useState } from "react";
import { auth, db } from "../firebase/config";

function Register(props) {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [registerError, setRegisterError] = useState("");

    function onSubmit() {
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                db.collection("users").add({
                    email: email,
                    username: userName,
                    createdAt: Date.now()
                })
                .then(() => {
                    props.navigation.navigate("Login");
                })
                .catch(() => {
                    setRegisterError("Falló al guardar los datos del usuario.");
                });
            })
            .catch(() => {
                setRegisterError("Falló el registro.");
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Registro</Text>

            <Image source={require("../../assets/logo.png")} style={styles.logo}/>

            <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="Ingresá tu email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />

            <TextInput
                style={styles.input}
                placeholder="Ingresá tu usuario"
                onChangeText={(text) => setUserName(text)}
                value={userName}
            />

            <TextInput
                style={styles.input}
                placeholder="Ingresá tu contraseña"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
            />

            {
                registerError !== "" ?
                    <Text style={styles.error}>{registerError}</Text>
                :
                    null
            }

            <Pressable style={styles.boton} onPress={onSubmit}>
                <Text style={styles.textoBoton}>Registrarme</Text>
            </Pressable>

            <Pressable style={styles.boton1} onPress={() => props.navigation.navigate("Login")}>
                <Text style={styles.textoBoton1}>Ya tengo cuenta</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: "center",
        marginBottom: 20,
    },

    container: {
        flex: 1,
        backgroundColor:"#d9d9d9",
        padding: 20,
        paddingTop: 30
    },

    titulo: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor:  "#a63e4d",
        borderRadius: 6,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: "white"
    },

    boton: {
        backgroundColor: "#a63e4d",
        padding: 12,
        borderRadius: 10,
        marginTop: 10,
        alignItems: "center",
        alignSelf: "center",
        width: "30%"
    },

    boton1: {
        padding: 12,
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center"
    },

    textoBoton: {
        color: "white",
        fontSize: 18,
    },

    textoBoton1: {
        color: "#a63e4d",
        fontSize: 18
    },

    error: {
        color: "red",
        marginTop: 10
    }
});

export default Register;