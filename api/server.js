const Receitas = require("./controllers/receitasController");
const Despesas = require("./controllers/despesasController");
const { connectDB } = require("./db/db");
const http = require("http");

const startServer = async () => {
  await connectDB();

  const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    //@route GET /api/receitas
    if (req.url === "/api/receitas" && req.method === "GET") {
      Receitas.getReceitas(req, res);
    }
    //@route GET /api/receitas/:id
    else if (
      req.url.match(/\/api\/receitas\/([0-9]+)/) &&
      req.method === "GET"
    ) {
      const id = req.url.split("/")[3];
      Receitas.getReceita(req, res, id);
    }
    //@route PUT /api/receitas/:id
    else if (
      req.url.match(/\/api\/receitas\/([0-9]+)/) &&
      req.method === "PUT"
    ) {
      const id = req.url.split("/")[3];
      Receitas.updateReceita(req, res, id);
    }
    //@route DELETE /api/receitas/:id
    else if (
      req.url.match(/\/api\/receitas\/([0-9]+)/) &&
      req.method === "DELETE"
    ) {
      const id = req.url.split("/")[3];
      Receitas.deleteReceita(req, res, id);
    }
    //@route POST /api/receitas/
    else if (req.url === "/api/receitas" && req.method === "POST") {
      Receitas.createReceita(req, res);
    }
    //@route GET /api/despesas
    else if (req.url === "/api/despesas" && req.method === "GET") {
      Despesas.getDespesas(req, res);
    }
    //@route GET /api/despesas/:id
    else if (
      req.url.match(/\/api\/despesas\/([0-9]+)/) &&
      req.method === "GET"
    ) {
      const id = req.url.split("/")[3];
      Despesas.getDespesa(req, res, id);
    }
    //@route PUT /api/despesas/:id
    else if (
      req.url.match(/\/api\/despesas\/([0-9]+)/) &&
      req.method === "PUT"
    ) {
      const id = req.url.split("/")[3];
      Despesas.updateDespesa(req, res, id);
    }
    //@route DELETE /api/despesas/:id
    else if (
      req.url.match(/\/api\/despesas\/([0-9]+)/) &&
      req.method === "DELETE"
    ) {
      const id = req.url.split("/")[3];
      Despesas.deleteDespesa(req, res, id);
    }
    //@route POST /api/despesas/
    else if (req.url === "/api/despesas" && req.method === "POST") {
      Despesas.createDespesa(req, res);
    }
    //@route GET /* NOT FOUND
    else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route Not Found" }));
    }
  });

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};
startServer();
