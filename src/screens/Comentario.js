import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import firebase from "../firebase/config";

function Comments(props) {

    const [comentario, setComentario] = useState("");
    const [comentarios, setComentarios] = useState([]);

    const postId = props.route.params.postId;
    const email = props.route.params.email;
    const descripcionPost = props.route.params.descripcionPost;
    const createdAt = props.route.params.createdAt;
    const likes = props.route.params.likes;

    const fecha = createdAt ? new Date(createdAt).toLocaleString() : "";

    useEffect(() => {
        db.collection("posts")
            .doc(postId)
            .onSnapshot((doc) => {
                if (doc.data().comments) {
                    setComentarios(doc.data().comments);
                } else {
                    setComentarios([]);
                }
            });
    }, []);

    function publicarComentario() {
        if (comentario === "") {
            return;
        }

        let nuevoComentario = {
            id: Date.now(),
            texto: comentario,
            usuario: auth.currentUser.email,
            createdAt: Date.now()
        };

        db.collection("posts")
            .doc(postId)
            .update({
                comments: firebase.firestore.FieldValue.arrayUnion(nuevoComentario)
            })
            .then(() => {
                setComentario("");
            })
            .catch(error => console.log(error));
    }

    return (
        <View style={styles.container}>

            <View style={styles.post}>
                <Text style={styles.email}>{email}</Text>
                <Text style={styles.fecha}>Posteo: {fecha}</Text>
                <Text style={styles.descripcion}>{descripcionPost}</Text>

                <View style={styles.likesContainer}>
                    <Text>❤️ {likes} likes</Text>
                </View>
            </View>

            <FlatList
                style={styles.lista}
                data={comentarios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                    <View style={styles.comentario}>
                        <Text style={styles.usuarioComentario}>
                            {item.usuario}
                        </Text>

                        <Text>{item.texto}</Text>

                        <Text style={styles.fechaComentario}>
                            {new Date(item.createdAt).toLocaleString()}
                        </Text>
                    </View>
                }
            />

            <TextInput
                style={styles.input}
                placeholder="Comentá aquí tu post..."
                value={comentario}
                onChangeText={(text) => setComentario(text)}
            />

            <Pressable style={styles.boton} onPress={publicarComentario}>
                <Text style={styles.textoBoton}>Publicar comentario</Text>
            </Pressable>

            <View style={styles.menu}>
                <Pressable onPress={() => props.navigation.navigate("HomeMenu")}>
                    <Text style={styles.opcion}>Home</Text>
                </Pressable>
            </View>

        </View>
    );
}

export default Comments;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#d9d9d9",
        padding: 20,
        alignItems: "center",
    },

    post: {
        backgroundColor: "#ebc9c6",
        width: "60%",
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: "#a63e4d",
    },

    email: {
        fontWeight: "bold",
        marginBottom: 5,
    },

    fecha: {
        color: "gray",
        fontSize: 12,
        marginBottom: 10,
    },

    descripcion: {
        fontSize: 16,
        marginBottom: 10,
    },

    likesContainer: {
        alignItems: "flex-end",
        marginTop: 10,
    },

    lista: {
        width: "60%",
    },

    comentario: {
        backgroundColor: "#f3d1d0",
        borderWidth: 1,
        borderColor: "#a63e4d",
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
    },

    input: {
        width: "60%",
        height: 60,
        borderWidth: 1,
        borderColor: "#a63e4d",
        backgroundColor: "white",
        padding: 10,
        marginTop: 10,
    },

    boton: {
        width: "60%",
        backgroundColor: "#a63e4d",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },

    textoBoton: {
        color: "white",
        fontWeight: "bold",
    },

    usuarioComentario: {
        color: "gray",
        fontSize: 12,
        marginBottom: 5,
    },

    fechaComentario: {
        color: "gray",
        fontSize: 11,
        marginTop: 5,
    },
    menu: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "60%",
        marginTop: 20,
    },

    opcion: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#a63e4d",
    },

});