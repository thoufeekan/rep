const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://thoufeekthoufeek599:SCPKDsHrnQ8nV8E5@cluster0.ebesd7q.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const todoSchema = new mongoose.Schema({
  text: String,
  status: { type: String, default: 'ongoing' }
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.send(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
      status: req.body.status
    });
    await todo.save();
    res.send(todo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, {
      text: req.body.text,
      status: req.body.status
    }, { new: true });
    res.send(todo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
