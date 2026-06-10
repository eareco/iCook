import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";

function Profile(props) {
    const [misPosts, setMisPosts] = useState([]);
    const [username, setUsername] = useState("");

    const email = auth.currentUser.email;

    useEffect(() => {
        db.collection("users")
            .where("email", "==", email)
            .onSnapshot((docs) => {
                docs.forEach((doc) => {
                    setUsername(doc.data().username);
                });
            });

        db.collection("posts")
            .where("email", "==", email)
            .orderBy("createdAt", "desc")
            .onSnapshot((docs) => {
                let posts = [];

                docs.forEach((doc) => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });

                setMisPosts(posts);
            });
    }, []);

    function logout() {
        auth.signOut()
            .then(() => {
                props.navigation.navigate("Login");
            })
            .catch(error => console.log(error));
    }

    return (
        <View style={styles.container}>

            <Text style={styles.nombre}>{username}</Text>

            <Text style={styles.email}>
                {email}
            </Text>

            <Text style={styles.subtitulo}>
                Últimos posteos
            </Text>

            <FlatList
                data={misPosts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.post}>

                        <Text style={styles.fecha}>
                            Posteo: {new Date(item.data.createdAt).toLocaleString()}
                        </Text>

                        <Text style={styles.descripcion}>
                            {item.data.descripcionPost}
                        </Text>

                    </View>
                )}
            />

            <Pressable
                style={styles.botonCerrar}
                onPress={logout}
            >
                <Text style={styles.textoCerrar}>
                    Cerrar sesión
                </Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:"#d9d9d9",
        padding: 20,
    },

    nombre: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 20,
    },

    email: {
        color: "gray",
        fontSize: 16,
        marginBottom: 25,
    },

    subtitulo: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 15,
    },

    post: {
        borderWidth: 2,
        borderColor: "#a63e4d",
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        backgroundColor: "#ebc9c6",
    },

    fecha: {
        color: "gray",
        fontSize: 12,
        marginBottom: 8,
    },

    descripcion: {
        fontSize: 18,
    },

    botonCerrar: {
        backgroundColor: "#a63e4d",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
    },

    textoCerrar: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white"
    },

});

export default Profile;