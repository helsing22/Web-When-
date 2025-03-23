const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar a la base de datos SQLite
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
        // Crear la tabla de reservas
        db.run('CREATE TABLE reservations (id INTEGER PRIMARY KEY, count INTEGER)', (err) => {
            if (err) {
                console.error(err.message);
            } else {
                // Insertar un registro inicial
                db.run('INSERT INTO reservations (count) VALUES (0)');
            }
        });
    }
});

// Obtener el total de reservas
app.get('/reservations', (req, res) => {
    db.get('SELECT count FROM reservations WHERE id = 1', [], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ totalReservations: row.count });
        }
    });
});

// Incrementar el total de reservas
app.post('/reservations', (req, res) => {
    const { increment } = req.body;
    db.run('UPDATE reservations SET count = count + ? WHERE id = 1', [increment], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ totalReservations: this.changes });
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
