const { Contato } = require('../models');

const contatoController = {

  async list(req, res) {
    try {
      const contatos = await Contato.findAll();
      return res.json(contatos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar contatos' });
    }
  },

  // Criar um novo contato
  async create(req, res) {
    const { nome, endereco, telefone } = req.body;
    try {
      const novoContato = await Contato.create({ nome, endereco, telefone });
      return res.status(201).json(novoContato);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar contato' });
    }
  },

  // Detalhes de um contato específico
  async detail(req, res) {
    const { id } = req.params;
    try {
      const contato = await Contato.findByPk(id);
      if (!contato) {
        return res.status(404).json({ error: 'Contato não encontrado' });
      }
      return res.json(contato);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar contato' });
    }
  },

  // Atualizar um contato existente
  async update(req, res) {
    const { id } = req.params;
    const { nome, endereco, telefone } = req.body;
    try {
      const contato = await Contato.findByPk(id);
      if (!contato) {
        return res.status(404).json({ error: 'Contato não encontrado' });
      }
      await contato.update({ nome, endereco, telefone });
      return res.json(contato);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar contato' });
    }
  },

  // Excluir um contato
  async delete(req, res) {
    const { id } = req.params;
    try {
      const contato = await Contato.findByPk(id);
      if (!contato) {
        return res.status(404).json({ error: 'Contato não encontrado' });
      }
      await contato.destroy();
      return res.json({ message: 'Contato excluído com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir contato' });
    }
  }
};

module.exports = contatoController;
