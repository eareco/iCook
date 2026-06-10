import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import Post from "../components/Post"; 

function Home() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        db.collection("posts")
        .orderBy("createdAt", "desc")
        .onSnapshot((docs) => {

            let postsAux = [];

            docs.forEach((doc) => {
                postsAux.push({
                    id: doc.id,
                    data: doc.data()
                });
            });

            setPosts(postsAux);

        });

    }, []);

    return (

        <View style={styles.container}>
            <Text style={styles.titulo}>Pantalla Home</Text>

            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <Post id={item.id} data={item.data} />
                }
            />
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#d9d9d9",
        padding: 20,
    },
    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
    },
});

export default Home;