import { View, Text, Pressable, StyleSheet, TextInput, Image } from "react-native";
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
                style={styles.boton1}
                onPress={() => props.navigation.navigate("Register")}
            >
                <Text style={styles.textoBoton1}>No tengo cuenta</Text>
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
        borderColor: "#a63e4d",
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
        marginBottom: 10,
        alignItems: "center",
        alignSelf: "center",
        width: "30%",
    },

    boton1: {
        padding: 12,
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center"
    },

    textoBoton: {
        color: "white",
        fontSize: "18px"
    },

    textoBoton1: {
        color: "#a63e4d",
        fontSize: "18px"
    },

    error: {
        color: "red",
        marginBottom: 10
    }
});

export default Login;
