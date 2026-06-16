import { Text, Pressable, StyleSheet } from "react-native";
import { db } from "../firebase/config";

function DeletePost(props) {

    function eliminarPost() {
    db.collection("posts")
        .doc(props.id)
        .delete()
        .then(() => {
            props.setMisPosts(
                props.misPosts.filter((post) => post.id !== props.id)
            );
        })
        .catch(error => console.log(error));
}

    return (
        <Pressable style={styles.botonEliminar} onPress={eliminarPost}>
            <Text style={styles.textoEliminar}>Eliminar</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    botonEliminar: {
        backgroundColor: "#a63e4d",
        padding: 10,
        borderRadius: 8,
        alignSelf: "flex-end",
        marginTop: 10,
    },

    textoEliminar: {
        color: "white",
        fontWeight: "bold",
    },
});

export default DeletePost;