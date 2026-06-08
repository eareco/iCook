import { View, Text, Pressable, StyleSheet } from "react-native";

function Profile(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mi Perfil</Text>

      <Pressable
        style={styles.boton}
        onPress={() => props.navigation.navigate("Login")}
      >
        <Text style={styles.textoBoton}>Desloguearse</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  boton: {
    backgroundColor: "#FCF9CF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBoton: {
    color: "black",
    fontSize: 16,
  },
});

export default Profile;