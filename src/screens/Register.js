import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
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

            <Pressable style={styles.boton} onPress={() => props.navigation.navigate("Login")}>
                <Text style={styles.textoBoton}>Ya tengo cuenta</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
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
        borderColor: "#DED46F",
        borderRadius: 6,
        marginBottom: 10,
        paddingHorizontal: 10
    },

    boton: {
        backgroundColor: "#FCF9CF",
        padding: 12,
        borderRadius: 4,
        marginTop: 10,
        alignItems: "center"
    },

    textoBoton: {
        color: "black"
    },

    error: {
        color: "red",
        marginTop: 10
    }
});

export default Register;