import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import Post from "../components/Post"; 

function Home(props) {

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
            <View style={styles.header}>
            <Image source={require("../../assets/logo.png")} style={styles.logo}/>
            <Text style={styles.titulo}>iCook</Text>
            </View>

            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <Post id={item.id} data={item.data} navigation={props.navigation}/>
                }
            />
        </View>

    );

}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },

    logo: {
        width: 45,
        height: 45,
        marginRight: 10,
    },

    titulo: {
        fontSize: 28,
        fontWeight: "bold",
    },  
    
    container: {
        flex: 1,
        backgroundColor:"#d9d9d9",
        padding: 20,
    },

});

export default Home;