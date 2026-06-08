import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { auth } from "../firebase/config";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    function onSubmit() {
        if (!email.includes("@")){
            setLoginError("Email mal formteado"); 
            return;
        }
        if (password.length < 6){
            setLoginError("La password debe tener una longitud mínima de 6 caracteres"); 
            return;
        }
        auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            props.navigation.navigate("HomeMenu");
        })
        .catch(() => {
            setLoginError("Credenciales incorrectas");
        });
}

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Ingresar</Text>

            <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="Ingresá tu email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />

            <TextInput
                style={styles.input}
                placeholder="Ingresá tu contraseña"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
            />

            {
                loginError !== "" ?
                    <Text style={styles.error}>{loginError}</Text>
                :
                    null
            }

            <Pressable 
                style={styles.boton}
                onPress={onSubmit}
            >
                <Text style={styles.textoBoton}>Login</Text>
            </Pressable>

            <Pressable 
                style={styles.boton}
                onPress={() => props.navigation.navigate("Register")}
            >
                <Text style={styles.textoBoton}>No tengo cuenta</Text>
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
        marginBottom: 10,
        alignItems: "center"
    },

    textoBoton: {
        color: "black"
    },

    error: {
        color: "red",
        marginBottom: 10
    }
});

export default Login;
