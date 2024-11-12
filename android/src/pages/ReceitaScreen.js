import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import useReceitas from "../hooks/receitas";
import { AntDesign } from "@expo/vector-icons";

export default function ReceitaScreen() {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedReceitaId, setSelectedReceitaId] = useState(null);

  const [receitas, setReceitas] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [receitaToDelete, setReceitaToDelete] = useState(null);

  const { saveReceita, updateReceita, deleteReceita, getAllReceitas } =
    useReceitas();

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
    setSelectedReceitaId(null);
  };

  const handleEditReceita = (receita) => {
    setDate(receita.date);
    setAmount(String(receita.amount));
    setDescription(receita.description);
    setSelectedReceitaId(receita.id);
  };

  const handleDeleteReceita = (id) => {
    setReceitaToDelete(id);
    setIsModalVisible(true);
  };

  const confirmDelete = () => {
    deleteReceita(receitaToDelete).then(() => {
      getAllReceitas().then((data) => setReceitas(data ? data : []));
      setIsModalVisible(false);
    });
  };

  const cancelDelete = () => {
    setIsModalVisible(false);
    setReceitaToDelete(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {selectedReceitaId ? "Atualização" : "Cadastro"} de Receitas
      </Text>
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
          <View style={styles.receitaItem}>
            <TouchableOpacity onPress={() => handleEditReceita(item)}>
              <View>
                <Text style={styles.receitaText}>Data: {item.date}</Text>
                <Text style={styles.receitaText}>Valor: {item.amount}</Text>
                <Text style={styles.receitaText}>
                  Descrição: {item.description}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleDeleteReceita(item.id)}
              style={styles.deleteButton}
            >
              <AntDesign name="closecircle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Você tem certeza?</Text>
            <Text style={styles.modalText}>
              Deseja realmente excluir esta receita?
            </Text>
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={cancelDelete} color="#FFCA29" />
              <Button title="Excluir" onPress={confirmDelete} color="red" />
            </View>
          </View>
        </View>
      </Modal>
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
    position: "relative",
  },
  receitaText: {
    color: "#333333",
    fontSize: 16,
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "transparent",
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
