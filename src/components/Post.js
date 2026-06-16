import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { db, auth } from "../firebase/config"; 
import firebase from "../firebase/config"; 

function Post(props) {

    const likes = props.data.likes ? props.data.likes : []; 
    const miEmail = auth.currentUser.email; 
    const yaLikeo = likes.includes(miEmail); 
    const fecha = props.data.createdAt 
    ? new Date(props.data.createdAt).toLocaleString()
    : "";

    function like() {
        db.collection("posts")
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(miEmail)
            })
            .then(() => console.log("Like agregado"))
            .catch(error => console.log(error)); 
    }

    function unlike() {
        db.collection("posts")
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(miEmail)
            })
            .then(() => console.log("Like quitado"))
            .catch(error => console.log(error)); 
    }

    return (
        <View style={styles.post}>

            <View style={styles.headerPost}>

                <Image source={require("../../assets/fotoperfil.png")} style={styles.fotoPerfil}/>

                <View>
                    <Text style={styles.email}>
                        {props.data.email}
                    </Text>

                    <Text style={styles.fecha}>
                        Posteo: {fecha}
                    </Text>
                </View>

            </View>


            <Text>{props.data.descripcionPost}</Text>

            <Text>Likes: {likes.length}</Text>

            <View style={styles.contenedorBotones}>

                <Pressable 
                    style={styles.boton} 
                    onPress={yaLikeo ? unlike : like}>
                 <Text style={styles.textoBoton}>
                {yaLikeo ? "Quitar like" : "❤️"}
                </Text>
            </Pressable>

            <Pressable
            style={styles.botonComentario}
            onPress={() =>
                props.navigation.navigate("Comentario", {
                    postId: props.id,
                    email: props.data.email,
                    descripcionPost: props.data.descripcionPost,
                    createdAt: props.data.createdAt,
                    likes: likes.length
                })
            }
        >
            <Text style={styles.textoComentario}>Comentar</Text>
        </Pressable>
            </View>
        </View> 
    );
}

const styles = StyleSheet.create({
    fecha: {
        color: "gray",
        fontSize: 12,
        marginTop: 2,
    },

    headerPost: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },

    fotoPerfil: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginRight: 10,
    },

    post: {
        backgroundColor: "#ebc9c6",
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#a63e4d",
        width: "60%",
        minHeight: 300,
        alignSelf: "center",
        justifyContent: "space-between",
    },

    email: {
        fontWeight: "bold",
        marginBottom: 8
    },

    boton: {
        alignSelf: "flex-start",
        padding: 5,
        marginTop: 10,
    },

    textoBoton: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold"
    },

    botonComentario: {
       backgroundColor: "#a63e4d",
       paddingVertical: 8,
       paddingHorizontal: 18,
       borderRadius: 10,
       marginLeft: "auto",
    },

    textoComentario: {
        color: "white",
    }
});

export default Post;