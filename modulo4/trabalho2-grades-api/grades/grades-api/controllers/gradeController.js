import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const Grade = db.grade;

const create = async (req, res) => {
  const body = req.body;
  try {
    Grade.insertMany(body);
    res.send({ message: 'Grade inserido com sucesso' });
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;
  let data = '';

  //condicao para o filtro no findAll
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    if (!name) {
      data = await Grade.find();
    } else {
      data = await Grade.find(condition);
    }
    res.send(data);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grade.findById(id);

    if (!data) {
      res.send('Nao encontrado. Grade:' + id);
    } else {
      res.status(200).send({ data });
      logger.info(`GET /grade - ${id}`);
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const bodyArray = Object.keys(body);

  try {
    if (bodyArray == '') {
      console.log('body', body);
      return res.status(400).send({
        message: 'Dados para atualizacao vazio',
      });
    } else {
      console.log('body', body);
      const data = await Grade.findOneAndUpdate(
        { _id: id },
        body,
        {
          new: true,
          runValidators: true,
        },
        (err) => {
          if (err) {
            console.log('erro: ', err);
          }
        }
      );
      return res.send(data);
    }
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grade.findByIdAndDelete(id);
    if (!data) {
      res.send('Nao encontrado. Grade:' + id);
    } else {
      res.status(200).send({ data });
      logger.info(`DELETE /grade - ${id}`);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    const data = await Grade.deleteMany();
    res.status(200).send({ data });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
