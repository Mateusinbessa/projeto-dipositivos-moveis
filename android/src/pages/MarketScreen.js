import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";

export default function MarketScreen() {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);

  useEffect(() => {
    fetchTopCryptos();
  }, []);

  const fetchTopCryptos = async () => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`
      );

      const cryptosData = data?.map((crypto) => ({
        nome: crypto.name,
        preco: crypto.current_price,
        simbolo: crypto.symbol.toUpperCase(),
      }));

      setCryptos(cryptosData);
    } catch (error) {
      console.error("Erro ao buscar criptos:", error);
      setCryptos([]);
    }
  };

  const renderCrypto = ({ item, index }) => {
    const isFirst = index === 0;

    return (
      <TouchableOpacity onPress={() => setSelectedCrypto(item)}>
        <View style={[styles.tableRow, isFirst && styles.highlightedRow]}>
          <Text style={[styles.tableCell, isFirst && styles.highlightedText]}>
            {item.nome} ({item.simbolo})
          </Text>
          <Text style={[styles.tableCell, isFirst && styles.highlightedText]}>
            ${item.preco !== "N/A" ? parseFloat(item.preco).toFixed(2) : "N/A"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleCloseModal = () => {
    setSelectedCrypto(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Text style={styles.title}>Top 10 Criptomoedas (por Market Cap)</Text>

      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Criptomoeda</Text>
        <Text style={styles.tableHeaderText}>Valor USD</Text>
      </View>

      <FlatList
        data={cryptos}
        renderItem={renderCrypto}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.tableBody}
      />

      {selectedCrypto && (
        <Modal
          visible={true}
          animationType="slide"
          transparent={true}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedCrypto.nome}</Text>
              <Text style={styles.modalText}>
                Preço Atual: ${selectedCrypto.preco} (USD)
              </Text>
              {selectedCrypto?.nome === "Bitcoin" && (
                <Text style={styles.modalText}>There is no second best!</Text>
              )}
              {selectedCrypto?.nome !== "Bitcoin" && (
                <Text style={styles.modalText}>I'm just a shitcoin!</Text>
              )}
              <TouchableOpacity
                onPress={handleCloseModal}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#462B9D",
    paddingTop: StatusBar.currentHeight,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ffffff",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 10,
  },
  tableHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  tableBody: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  tableCell: {
    fontSize: 16,
    color: "#ffffff",
  },
  highlightedRow: {
    backgroundColor: "#FFD700",
    borderLeftWidth: 5,
    borderLeftColor: "#FF8C00",
  },
  highlightedText: {
    fontWeight: "bold",
    color: "#462B9D",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#462B9D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
