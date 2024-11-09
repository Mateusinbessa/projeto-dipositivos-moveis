import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function MarketScreen({ navigation }) {
  const [acoes, setAcoes] = useState([]);
  const [pagina, setPagina] = useState(1);
  const acoesPorPagina = 5; // 5 ações por página

  const simbolos = [
    "PETR4.SAO",
    "VALE3.SAO",
    "ITUB4.SAO",
    "BBDC4.SAO",
    "ABEV3.SAO",
    "BBAS3.SAO",
    "B3SA3.SAO",
    "RENT3.SAO",
    "GGBR4.SAO",
    "LREN3.SAO",
  ];

  useEffect(() => {
    fetchAcoes();
  }, [pagina]);

  const fetchAcoes = async () => {
    const apiKey = "TDIKAPPBZH9CP2AU";
    const acoesSelecionadas = simbolos.slice(
      (pagina - 1) * acoesPorPagina,
      pagina * acoesPorPagina
    );

    try {
      const acoesPromises = acoesSelecionadas.map(async (simbolo) => {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${simbolo}&apikey=${apiKey}`
        );
        const data = await response.json();

        const timeSeries = data["Time Series (Daily)"];
        if (timeSeries) {
          const ultimoDia = Object.keys(timeSeries)[0];
          const precoFechamento = timeSeries[ultimoDia]["4. close"];
          return {
            simbolo: simbolo,
            preco: precoFechamento,
          };
        } else {
          return {
            simbolo: simbolo,
            preco: "N/A",
          };
        }
      });

      const acoesData = await Promise.all(acoesPromises);
      setAcoes(acoesData);
    } catch (error) {
      console.error("Erro ao buscar ações:", error);
    }
  };

  const renderAcao = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.simbolo}</Text>
      <Text style={styles.tableCell}>
        R$ {item.preco !== "N/A" ? parseFloat(item.preco).toFixed(2) : "N/A"}
      </Text>
    </View>
  );

  const handleProximaPagina = () => {
    if (pagina < 2) {
      setPagina(pagina + 1);
    }
  };

  const handlePaginaAnterior = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Text style={styles.title}>Mercado Financeiro</Text>

      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Ação</Text>
        <Text style={styles.tableHeaderText}>Valor R$</Text>
      </View>

      <FlatList
        data={acoes}
        renderItem={renderAcao}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.tableBody}
      />

      <View style={styles.paginaContainer}>
        <TouchableOpacity
          onPress={handlePaginaAnterior}
          disabled={pagina === 1}
        >
          <Text style={styles.paginaBotao}>Anterior</Text>
        </TouchableOpacity>
        <Text style={styles.paginaTexto}>Página {pagina}</Text>
        <TouchableOpacity onPress={handleProximaPagina} disabled={pagina === 2}>
          <Text style={styles.paginaBotao}>Próxima</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.voltarBotao}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.voltarBotaoTexto}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: StatusBar.currentHeight,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#462B9D", // Cor da fonte do título
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
    color: "#462B9D", // Cor das colunas de cabeçalho
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
    color: "#462B9D", // Cor das células da tabela
  },
  paginaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  paginaBotao: {
    fontSize: 16,
    color: "#FFCA29", // Cor do botão de navegação
    fontWeight: "bold",
  },
  paginaTexto: {
    fontSize: 16,
  },
  voltarBotao: {
    backgroundColor: "#FFCA29",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    alignItems: "center",
  },
  voltarBotaoTexto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
