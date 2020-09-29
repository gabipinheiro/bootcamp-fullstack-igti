import express from 'express';
import { promises as fs } from 'fs';
const router = express.Router();

const { readFile, writeFile } = fs;

router.get('/', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));

    const gradeById = data.grades.find(
      (grade) => grade.id === parseInt(req.params.id)
    );

    res.send(gradeById);
  } catch (err) {
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // body consta: student, subject, type e value
    // deve ser acrescentado: timestamp, id e next ID
    let newBody = req.body;
    const data = JSON.parse(await readFile(global.fileName));

    let newGrade = { id: data.nextId++, ...newBody, timestamp: new Date() };
    data.grades.push(newGrade);

    await writeFile(global.fileName, JSON.stringify(data));

    res.send(newGrade);
  } catch (err) {
    console.log(err);
  }
});

router.put('/', async (req, res) => {
  try {
    // body consta id da grade a ser alterada, student, subject, type e value.
    // deve ser acrescentado: timestamp, id e next ID
    const newBody = req.body;
    const data = JSON.parse(await readFile(global.fileName));

    console.log('newBody: ', newBody);

    const index = data.grades.findIndex((a) => a.id === newBody.id);
    if (index === -1) {
      res.status(400).send({ error: 'grade não encontrada' });
    }

    console.log('index: ', index);
    data.grades[index] = newBody;
    console.log('data.grades[index]: ', data.grades[index]);

    await writeFile(global.fileName, JSON.stringify(data));

    res.send(newBody);
  } catch (err) {
    console.log(err);
  }
});

// recebe apenas o id.
router.delete('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    console.log(req.params.id);

    // verifica se grade existe
    const resultExist = data.grades.findIndex((grade) => {
      return grade.id === parseInt(req.params.id);
    });
    console.log(resultExist);

    // se não existe, retorna erro
    if (resultExist === -1) {
      res.status(400).send({ error: 'grade não encontrada' });
    } else {
      // filtra grades diferente do que se pretende excluir
      data.grades = data.grades.filter((grade) => {
        return grade.id != req.params.id;
      });

      await writeFile(global.fileName, JSON.stringify(data));
      res.status(200).send({ result: 'grade excluída com sucesso' });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/:student/:subject/degrees', async (req, res) => {
  try {
    // recebe como parametro: student e o subject,
    // retorna soma dos values

    const student = req.params.student;
    const subject = req.params.subject;

    console.log(student, subject);

    const data = JSON.parse(await readFile(global.fileName));

    let result = data.grades.filter((grade) => {
      return grade.student === student && grade.subject === subject;
    });

    console.log(result);

    let sum = 0;

    result.forEach((grade) => {
      sum += grade.value;
    });

    console.log(result);

    res.status(200);
    res.send({ total: sum });
  } catch (err) {
    console.log(err);
  }
});

router.get('/:subject/:type/media', async (req, res) => {
  try {
    // recebe como parametro subject e um type,
    // retorna a média

    const subject = req.params.subject;
    const type = req.params.type;

    console.log(subject, type);

    const data = JSON.parse(await readFile(global.fileName));

    let result = data.grades.filter((grade) => {
      return grade.subject === subject && grade.type === type;
    });

    console.log(result);

    let sum = 0;

    result.forEach((grade) => {
      sum += grade.value;
    });

    let size = result.length;

    let media = sum / size;

    console.log(media);

    res.send({ total: media });
    //res.send(result);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:subject/:type/bests', async (req, res) => {
  try {
    // recebe como parametro subject e um type,
    // retorna a média

    const subject = req.params.subject;
    const type = req.params.type;

    console.log(subject, type);

    const data = JSON.parse(await readFile(global.fileName));

    let result = data.grades.filter((grade) => {
      return grade.subject === subject && grade.type === type;
    });

    console.log(result);

    const sorted = result
      .sort((a, b) => {
        return b.value - a.value;
      })
      .slice(0, 3);

    console.log(sorted);

    //res.send({ total: media });
    res.send(sorted);
    //res.send(result);
  } catch (err) {
    console.log(err);
  }
});

export default router;
