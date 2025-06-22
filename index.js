const express = require('express');
const mongoose = require('mongoose');
const produtoRoutes = require('./routes/produtoRoutes');
const app = express();

app.use(express.json());

// Rotas
app.use('/produto', produtoRoutes);

const port = process.env.PORT || 4000;

mongoose.connect(
  `mongodb+srv://Samuel:burro123@cluster0.y55j5ci.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
).then(() => {
  console.log("Conectado ao MongoDB Atlas");
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
})
.catch((err) => console.log(err));
