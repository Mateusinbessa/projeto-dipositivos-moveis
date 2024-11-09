const {
  findAll,
  findById,
  create,
  update,
  remove,
} = require("../models/despesasModel");
const { getPostData, CONTENT_TYPE } = require("../helpers/helpers");

// @desc    Gets All despesas
// @route   GET /api/despesas
const getDespesas = async (req, res) => {
  try {
    const despesas = await findAll();
    res.writeHead(200, CONTENT_TYPE);
    res.end(JSON.stringify(despesas));
  } catch (error) {
    console.log(error);
  }
};

// @desc    Gets a Single despesa
// @route   GET /api/despesas/:id
const getDespesa = async (req, res, id) => {
  try {
    const despesa = await findById(id);
    if (!despesa) {
      res.writeHead(400, CONTENT_TYPE);
      res.end(JSON.stringify({ message: "Despesa Not Found!" }));
    } else {
      res.writeHead(200, CONTENT_TYPE);
      res.end(JSON.stringify(despesa));
    }
  } catch (error) {
    console.log(error);
  }
};

// @desc    Create a despesa
// @route   POST /api/despesas
const createDespesa = async (req, res) => {
  try {
    const body = await getPostData(req);
    const { date, description, amount } = body;

    const despesa = {
      date: date,
      description: description,
      amount: amount,
    };
    const newDespesa = await create(despesa);

    res.writeHead(201, CONTENT_TYPE);
    res.end(JSON.stringify(newDespesa));
  } catch (error) {
    console.log(error);
  }
};

// @desc    Update a despesa
// @route   PUT /api/despesas/:id
const updateDespesa = async (req, res, id) => {
  try {
    const despesa = await findById(id);

    if (!despesa) {
      res.writeHead(400, CONTENT_TYPE);
      res.end(JSON.stringify({ message: "Despesa Not Found!" }));
    } else {
      const body = await getPostData(req);
      const { date, description, amount } = body;

      const despesaData = {
        date: date || despesa.date,
        description: description || despesa.description,
        amount: amount || despesa.amount,
      };
      const updatedespesa = await update(id, despesaData);

      res.writeHead(200, CONTENT_TYPE);
      res.end(JSON.stringify(updatedespesa));
    }
  } catch (error) {
    console.log(error);
  }
};

// @desc    Delete a despesa
// @route   DELETE /api/despesas/:id
const deleteDespesa = async (req, res, id) => {
  try {
    const despesa = await findById(id);
    if (!despesa) {
      res.writeHead(400, CONTENT_TYPE);
      res.end(JSON.stringify({ message: "Despesa Not Found!" }));
    } else {
      await remove(id);
      res.writeHead(200, CONTENT_TYPE);
      res.end(JSON.stringify({ message: `Despesa ${id} removed!` }));
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getDespesas,
  getDespesa,
  createDespesa,
  updateDespesa,
  deleteDespesa,
};
