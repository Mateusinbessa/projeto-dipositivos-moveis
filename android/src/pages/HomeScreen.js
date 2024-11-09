import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo Centralizada */}
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      {/* Botões */}
      <View style={styles.buttonsContainer}>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Info")}
        >
          <Text style={styles.buttonText}>Informações</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Receita")}
        >
          <Text style={styles.buttonText}>Receita</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Despesa")}
        >
          <Text style={styles.buttonText}>Despesa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Resumo")}
        >
          <Text style={styles.buttonText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Market")}
        >
          <Text style={styles.buttonText}>Ver Mercado</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace("Login")}
        >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#462B9D",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginBottom: 40,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    width: "100%",
  },
  button: {
    backgroundColor: "#FFCA29",
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
    flexBasis: "45%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
