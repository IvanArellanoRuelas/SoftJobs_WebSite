const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Lula2024",
  database: "softjobs",
  allowExitOnIdle: true,
});

/* AUTH */

const verificarCredenciales = async (email, password) => {
  const consulta = "SELECT * FROM usuarios WHERE email = $1 AND password = $2";
  const values = [email, password];
  const { rowCount } = await pool.query(consulta, values);
  if (!rowCount)
    throw {
      code: 404,
      message: "No se encontró ningún usuario con estas credenciales",
    };
};

const getusuarios = async () => {
  const { rows: usuarios } = await pool.query("SELECT * FROM usuarios");
  return usuarios;
};

const agregarUsuario = async ({ email, lenguage, password, rol }) => {
  console.log(email, lenguage, password, rol);
  const values = [email, password, rol, lenguage];
  const consulta =
    "INSERT INTO usuarios (id, email, password,rol,lenguage) VALUES (DEFAULT, $1, $2, $3,$4)";

  await pool.query(consulta, values);
};

module.exports = { getusuarios, verificarCredenciales, agregarUsuario };
