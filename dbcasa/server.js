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
  
// Endpoint para registrar trabajos
app.post('/registrartrabajos', (req, res) => {
    const { nombretrabajo, desctrabajo, ubicacion, id_creador } = req.body;

    // Validar que los datos requeridos estén presentes
    if (!nombretrabajo || !desctrabajo || !ubicacion || !id_creador) {
        return res.status(400).json({
            message: 'Faltan datos obligatorios para registrar el trabajo.',
            receivedData: req.body
        });
    }

    // Consulta SQL para insertar el trabajo
    const query = `
        INSERT INTO trabajo (nombretrabajo, desctrabajo, ubicacion, id_creador) 
        VALUES (?, ?, ?, ?)
    `;

    // Valores para la consulta
    const values = [nombretrabajo, desctrabajo, ubicacion, id_creador];

    // Ejecutar la consulta
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al registrar el trabajo:', err);
            return res.status(500).json({
                message: 'Error al registrar el trabajo.',
                error: err
            });
        }

        res.status(201).json({
            message: 'Trabajo registrado con éxito.',
            trabajoId: result.insertId // Devuelve el ID del trabajo recién insertado
        });
    });
});

// Endpoint para listar todos los trabajos
app.get('/trabajos', (req, res) => {
    const query = `
        SELECT 
            t.idtrabajo, 
            t.nombretrabajo, 
            t.desctrabajo, 
            t.ubicacion, 
            t.id_creador, 
            u.nombre AS creador_nombre, 
            u.apellido_paterno AS creador_apellido
        FROM trabajo t
        JOIN usuario u ON t.id_creador = u.id_user
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los trabajos:', err);
            return res.status(500).json({
                message: 'Error al obtener los trabajos.',
                error: err.message
            });
        }

        res.status(200).json(results); // Devuelve los trabajos como un JSON
    });
});

// Endpoint para ver usuarios admins
app.get('/usuarios/tipo2', (req, res) => {
    const query = `
        SELECT id_user, nombre, apellido_paterno 
        FROM usuario 
        WHERE tipousuario_id_tipo = 2
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los usuarios tipo 2:', err);
            return res.status(500).json({
                message: 'Error al obtener los usuarios tipo 2.',
                error: err.message
            });
        }

        res.status(200).json(results); // Devuelve los usuarios tipo 2 como JSON
    });
});

// Endpoint para obtener trabajos disponibles para alumnos
app.get('/trabajos-disponibles', (req, res) => {
    const query = 'SELECT idtrabajo, nombretrabajo FROM trabajo';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener los nombres de trabajos:', err.stack);
        return res.status(500).json({ error: 'Error al obtener los trabajos disponibles.' });
      }
      res.status(200).json(results);
    });
  });

// Endpoint para registrar inicio o finalización del trabajo
app.post('/usuario-trabajo', (req, res) => {
    console.log('Datos recibidos en el servidor:', req.body); // Verifica los datos enviados
  
    const { usuarioId, trabajoId, accion } = req.body;
  
    // Validar los datos enviados
    if (!usuarioId || !trabajoId || !accion) {
      console.error('Datos incompletos:', req.body);
      return res.status(400).json({ error: 'Faltan datos obligatorios en la solicitud.' });
    }
  
    if (accion === 'iniciar') {
      const query = `
        INSERT INTO usuariotrabajo (fechainicio, fechatermino, trabajo_idtrabajo, usuario_id_user, activo)
        VALUES (CURDATE(), NULL, ?, ?, 1)
      `;
      console.log('Ejecutando consulta SQL para iniciar:', query, [trabajoId, usuarioId]);
  
      db.query(query, [trabajoId, usuarioId], (err) => {
        if (err) {
          console.error('Error al ejecutar consulta:', err.stack);
          return res.status(500).json({ error: 'Error al iniciar trabajo.', detalle: err.message });
        }
        res.status(200).json({ mensaje: 'Trabajo iniciado correctamente.' });
      });
  
    } else if (accion === 'detener') {
      const query = `
        UPDATE usuariotrabajo
        SET fechatermino = CURDATE(), activo = 0
        WHERE usuario_id_user = ? AND trabajo_idtrabajo = ? AND activo = 1
      `;
      console.log('Ejecutando consulta SQL para detener:', query, [usuarioId, trabajoId]);
  
      db.query(query, [usuarioId, trabajoId], (err) => {
        if (err) {
          console.error('Error al ejecutar consulta:', err.stack);
          return res.status(500).json({ error: 'Error al detener trabajo.', detalle: err.message });
        }
        res.status(200).json({ mensaje: 'Trabajo detenido correctamente.' });
      });
  
    } else {
      res.status(400).json({ error: 'Acción no válida. Use "iniciar" o "detener".' });
    }
  });
  
  
  
  
  
