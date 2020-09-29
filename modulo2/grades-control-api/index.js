import express from 'express';
import { promises as fs } from 'fs';
import gradeRouter from './routes/grades.js';

// para utilizar as funções  read e write do método fs.
const { readFile, writeFile } = fs;

// criando um instancia do express e informando que será utilizado o tipo json.
const app = express();
app.use(express.json());

// grades.json será chamado pelo global.fileName
global.fileName = 'grades.json';

app.use('/grades', gradeRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    console.log('API Started!');
  } catch (err) {
    console.log(err);
  }
});
