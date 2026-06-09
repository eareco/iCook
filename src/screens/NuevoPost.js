import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"; 
import { useState } from "react"; 
import { db, auth } from "../firebase/config"; 

function NuevoPost() {

    const [descripcionPost, setDescripcionPost] = useState(""); 

    function crearPost() {

        db.collection("posts").add({
            descripcionPost: descripcionPost, 
            email: auth.currentUser.email, 
            createdAt: Date.now(), 
            likes: []
        })
        .then(() => {
            setDescripcionPost(""); 
        })
        .catch(error => console.log(error)); 
    }

    return (

        <View style={styles.container}>

            <Text style={styles.titulo}>Nuevo post</Text>

            <TextInput
                style={styles.input}
                placeholder="Escribi tu post..."
                keyboardType="default"
                onChangeText={(text) => setDescripcionPost(text)}
                value={descripcionPost}
            />

            <Pressable style={styles.boton} onPress={crearPost}>
                <Text style={styles.textoBoton}> Publicar post</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1, 
        padding: 20, 
        backgroundColor: "white"
    }, 

    titulo: {
        fontSize: 28, 
        fontWeight: "bold", 
        marginBottom: 20, 
        textAlign: "center"
    }, 

    input: {
        borderWidth: 1, 
        borderColor: "#ccc", 
        padding: 10, 
        marginBottom: 20
    }, 

    boton: {
        backgroundColor:  "#a63e4d",
        padding: 12, 
        alignItems: "center", 
        borderRadius: 4
    }, 

    textoBoton: {
        color: "white",
        fontSize: 18,
    }
}); 

export default NuevoPost;