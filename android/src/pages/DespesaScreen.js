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
import useDespesas from "../hooks/despesas";

export default function DespesaScreen() {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDespesaId, setSelectedDespesaId] = useState(null);

  const [despesas, setDespesas] = useState([]);

  const { saveDespesa, updateDespesa, getAllDespesas } = useDespesas();

  useEffect(() => {
    getAllDespesas().then((data) => setDespesas(data ? data : []));
  }, []);

  const handleSaveDespesa = () => {
    if (selectedDespesaId) {
      updateDespesa(selectedDespesaId, date, amount, description).then(() => {
        getAllDespesas().then((data) => setDespesas(data ? data : []));
        clearForm();
      });
    } else {
      saveDespesa(date, amount, description).then(() => {
        getAllDespesas().then((data) => setDespesas(data ? data : []));
        clearForm();
      });
    }
  };

  const clearForm = () => {
    setDate("");
    setAmount("");
    setDescription("");
    setSelectedDespesaId(null);
  };

  const handleEditDespesa = (despesa) => {
    setDate(despesa.date);
    setAmount(String(despesa.amount));
    setDescription(despesa.description);
    setSelectedDespesaId(despesa.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Despesas</Text>
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
            title={selectedDespesaId ? "Atualizar Despesa" : "Salvar Despesa"}
            onPress={handleSaveDespesa}
            color="#FFCA29"
          />
        </View>
      </ScrollView>

      <View style={styles.separator} />

      <Text style={styles.title}>Listagem de Despesas</Text>

      <FlatList
        data={despesas}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEditDespesa(item)}>
            <View style={styles.despesaItem}>
              <Text style={styles.despesaText}>Data: {item.date}</Text>
              <Text style={styles.despesaText}>Valor: {item.amount}</Text>
              <Text style={styles.despesaText}>
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
  despesaItem: {
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
  despesaText: {
    color: "#333333",
    fontSize: 16,
  },
});
