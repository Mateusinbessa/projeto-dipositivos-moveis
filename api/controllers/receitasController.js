const {
  findAll,
  findById,
  create,
  update,
  remove,
} = require("../models/receitasModel");
const { getPostData, CONTENT_TYPE } = require("../helpers/helpers");

// @desc    Gets All receitas
// @route   GET /api/receitas
const getReceitas = async (req, res) => {
  try {
    const receitas = await findAll();
    res.writeHead(200, CONTENT_TYPE);
    res.end(JSON.stringify(receitas));
  } catch (error) {
    console.log(error);
  }
};

// @desc    Gets a Single Receita
// @route   GET /api/receitas/:id
const getReceita = async (req, res, id) => {
  try {
    const receita = await findById(id);
    if (!receita) {
      res.writeHead(400, CONTENT_TYPE);
      res.end(JSON.stringify({ message: "Receita Not Found!" }));
    } else {
      res.writeHead(200, CONTENT_TYPE);
      res.end(JSON.stringify(receita));
    }
  } catch (error) {
    console.log(error);
  }
};

// @desc    Create a Receita
// @route   POST /api/receitas
const createReceita = async (req, res) => {
  try {
    const body = await getPostData(req);
    const { date, description, amount } = body;

    const receita = {
      date: date,
      description: description,
      amount: amount,
    };
    const newReceita = await create(receita);

    res.writeHead(201, CONTENT_TYPE);
    res.end(JSON.stringify(newReceita));
  } catch (error) {
    console.log(error);
  }
};

// @desc    Update a Receita
// @route   PUT /api/receitas/:id
const updateReceita = async (req, res, id) => {
  try {
    const receita = await findById(id);

    if (!receita) {
      res.writeHead(400, CONTENT_TYPE);
      res.end(JSON.stringify({ message: "Receita Not Found!" }));
    } else {
      const body = await getPostData(req);
      const { date, description, amount } = body;

      const receitaData = {
        date: date || receita.date,
        description: description || receita.description,
        amount: amount || receita.amount,
      };
      const updateReceita = await update(id, receitaData);

      res.writeHead(200, CONTENT_TYPE);
      res.end(JSON.stringify(updateReceita));
    }
  } catch (error) {
    console.log(error);
  }
};

// @desc    Delete a Receita
// @route   DELETE /api/receitas/:id
const deleteReceita = async (req, res, id) => {
  try {
    const receita = await findById(id);
    if (!receita) {
      res.writeHead(400, CONTENT_TYPE);
      res.end(JSON.stringify({ message: "Receita Not Found!" }));
    } else {
      await remove(id);
      res.writeHead(200, CONTENT_TYPE);
      res.end(JSON.stringify({ message: `Receita ${id} removed!` }));
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getReceitas,
  getReceita,
  createReceita,
  updateReceita,
  deleteReceita,
};
