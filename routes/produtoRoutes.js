const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');
const mongoose = require('mongoose');

// POST - Criar novo produto
router.post('/', async (req, res) => {
  const { nome, descricao, cor, peso, tipo, preco } = req.body;

  if (!nome || !descricao || !cor || !peso || !tipo || !preco) {
    return res.status(422).json({ erro: 'Preencha todos os campos obrigatórios!' });
  }

  const produto = {
    nome, descricao, cor, peso, tipo, preco
  };

  try {
    await Produto.create(produto);
    res.status(201).json({ mensagem: 'Produto cadastrado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// GET - Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).json(produtos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// GET - Buscar por ID ou nome
router.get('/:filtro', async (req, res) => {
  const filtro = req.params.filtro;

  try {
    let produto;

    // Verifica se é um ObjectId válido
    if (mongoose.Types.ObjectId.isValid(filtro)) {
      produto = await Produto.findById(filtro);
    } 

    // Se não achou por ID, tenta pelo nome
    if (!produto) {
      produto = await Produto.findOne({ nome: filtro });
    }

    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    res.status(200).json(produto);

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// PUT - Atualizar produto
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const dados = req.body;

  try {
    const resultado = await Produto.updateOne({ _id: id }, dados);

    if (resultado.matchedCount === 0) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    res.status(200).json({ mensagem: 'Produto atualizado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// DELETE - Excluir produto
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const produto = await Produto.findOne({ _id: id });

    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    await Produto.deleteOne({ _id: id });
    res.status(200).json({ mensagem: 'Produto deletado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
