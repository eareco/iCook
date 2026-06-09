import { View, Text, StyleSheet, Pressable } from "react-native"; 
import { db, auth } from "../firebase/config"; 
import firebase from "../firebase/config"; 

function Post(props) {

    const likes = props.data.likes ? props.data.likes : []; 
    const miEmail = auth.currentUser.email; 
    const yaLikeo = likes.includes(miEmail); 

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
            <Text style={styles.email}>{props.data.email}</Text>
            <Text>{props.data.descripcionPost}</Text>

            <Text>Likes: {likes.length}</Text>

            <Pressable 
                style={styles.boton} 
                onPress={yaLikeo ? unlike : like}
            >
                <Text style={styles.textoBoton}>
                    {yaLikeo ? "Quitar like" : "❤️"}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        backgroundColor:"#ebc9c6",
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor:  "#a63e4d",
        marginHorizontal: 10,
        width: "20%",
    }, 
    email: {
        fontWeight: "bold", 
        marginBottom: 5
    }, 
    boton: {
        padding: 12,
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 10,
    }, 
    textoBoton: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold"
    }
}); 

export default Post;