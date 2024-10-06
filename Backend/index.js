const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {
  getusuarios,
  agregarUsuario,
  verificarCredenciales,
} = require("./consultas");

app.listen(3000, console.log("SERVER ON"));
app.use(cors());
app.use(express.json());

const JWT_SECRET_KEY = "6K!U?ñxiYk7T7P7Q7pZ$Aa~Y2";

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    await verificarCredenciales(email, password);
    const token = jwt.sign({ email }, JWT_SECRET_KEY);
    const Authorization = req.header("Authorization");
    console.log(Authorization);
    res.send(token);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await getusuarios();
    res.json(usuarios);
    console.log(req.header("Authorization"));
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/usuarios", async (req, res) => {
  try {
    await agregarUsuario(req.body);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const Authorization = req.header("Authorization");
    console.log(Authorization);
    const token = Authorization.split("Bearer ")[1];
    console.log(token);
    jwt.verify(token, JWT_SECRET_KEY);
    const { email } = jwt.decode(token);
    res.send(`El usuario ${email} con el token ${Authorization}`);
  } catch (error) {
    console.log(error.message);
  }
});
