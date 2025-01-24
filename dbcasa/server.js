const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sql-dev-gentle',
    database: 'casa',
});

// Verifica la conexión con la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Endpoint para registrar un usuario
app.post('/registro', (req, res) => {
    const { rut, nombre, apellido_paterno, apellido_materno, correo, pass, tipousuario_id_tipo, nomadmin } = req.body;

    // Validar que los datos requeridos estén presentes
    if (!rut || !nombre || !apellido_paterno || !correo || !pass || !tipousuario_id_tipo) {
        return res.status(400).json({ 
            message: 'Faltan datos obligatorios para registrar el usuario.',
            receivedData: req.body
        });
    }

    // Consulta SQL para insertar el usuario
    const query = `
        INSERT INTO usuario (rut, nombre, apellido_paterno, apellido_materno, correo, pass, tipousuario_id_tipo, nomadmin) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query, 
        [rut, nombre, apellido_paterno, apellido_materno, correo, pass, tipousuario_id_tipo, nomadmin], 
        (err, result) => {
            if (err) {
                console.error('Error al registrar el usuario:', err);
                return res.status(500).json({
                    message: 'Error al registrar el usuario.',
                    error: err.message
                });
            }
            
            res.status(200).json({ 
                message: 'Usuario registrado con éxito.',
                userId: result.insertId // Devuelve el ID auto incremental generado
            });
        }
    );
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

//Endpoint para ver devolver datos de tipousuario
app.get('/tipousuario', (req, res) => {
    const query = 'SELECT id_tipo, nomtusuario FROM tipousuario';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener tipos de usuario:', err);
            return res.status(500).send('Error al obtener tipos de usuario');
        }
        res.status(200).json(results); // Devuelve los datos como JSON
    });
});

//Endpoint de login
app.post('/login', (req, res) => {
    const { correo, pass } = req.body;
  
    const query = 'SELECT * FROM usuario WHERE correo = ? AND pass = ?';
  
    db.query(query, [correo, pass], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error en el servidor' });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
      }
  
      const user = results[0]; // Obtén el primer resultado
      res.status(200).json({ user }); // Devuelve el usuario al cliente
    });
  });
  
