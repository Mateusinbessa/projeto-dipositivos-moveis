import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import useReceitas from "../hooks/receitas";

export default function ReceitaScreen() {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedReceitaId, setSelectedReceitaId] = useState(null); // Novo estado para controlar o ID da receita em edição

  const [receitas, setReceitas] = useState([]);

  const { saveReceita, updateReceita, getAllReceitas } = useReceitas(); // Supondo que o hook tenha a função updateReceita

  useEffect(() => {
    getAllReceitas().then((data) => setReceitas(data ? data : []));
  }, []);

  const handleSaveReceita = () => {
    if (selectedReceitaId) {
      updateReceita(selectedReceitaId, date, amount, description).then(() => {
        getAllReceitas().then((data) => setReceitas(data ? data : []));
        clearForm();
      });
    } else {
      saveReceita(date, amount, description).then(() => {
        getAllReceitas().then((data) => setReceitas(data ? data : []));
        clearForm();
      });
    }
  };

  const clearForm = () => {
    setDate("");
    setAmount("");
    setDescription("");
    setSelectedReceitaId(null); // Limpar o ID da receita em edição
  };

  const handleEditReceita = (receita) => {
    console.log(receita);
    setDate(receita.date);
    setAmount(String(receita.amount));
    setDescription(receita.description);
    setSelectedReceitaId(receita.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Receitas</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextInput
          placeholder="Data"
          value={date}
          onChangeText={setDate}
          style={styles.input}
        />
        <TextInput
          placeholder="Valor"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Button
            title={selectedReceitaId ? "Atualizar Receita" : "Salvar Receita"}
            onPress={handleSaveReceita}
            color="#FFCA29"
          />
        </View>
      </ScrollView>

      <View style={styles.separator} />

      <Text style={styles.title}>Listagem de Receitas</Text>

      <FlatList
        data={receitas}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEditReceita(item)}>
            <View style={styles.receitaItem}>
              <Text style={styles.receitaText}>Data: {item.date}</Text>
              <Text style={styles.receitaText}>Valor: {item.amount}</Text>
              <Text style={styles.receitaText}>
                Descrição: {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#462B9D",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFCA29",
    marginVertical: 10,
    textAlign: "center",
  },
  scrollContent: {
    alignItems: "center",
    paddingVertical: 10,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderColor: "#FFCA29",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    borderRadius: 5,
  },
  separator: {
    width: "100%",
    height: 2,
    backgroundColor: "#FFCA29",
    marginVertical: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  receitaItem: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  receitaText: {
    color: "#333333",
    fontSize: 16,
  },
});
