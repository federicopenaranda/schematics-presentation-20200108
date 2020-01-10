var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config');


router.get('/', (req, res, next) => {
    var con = mysql.createConnection(config.database_config);

    con.connect(function (err) {
        if (err) throw err;

        let sql = `SELECT * FROM fede2.pelicula;`;

        con.query(sql, function (err, result) {
            con.end();
            if (err) throw err;
            return res.send(result);
        });
    });

});


router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    var con = mysql.createConnection(config.database_config);

    con.connect(function (err) {
        if (err) throw err;

        let sql = `SELECT * FROM fede2.pelicula WHERE id_pelicula = ${id};`;

        con.query(sql, function (err, result) {
            con.end();
            if (err) throw err;
            return res.send(result);
        });
    });

});


router.post('/', (req, res, next) => {
    console.log(req.body);
    var con = mysql.createConnection(config.database_config);

    con.connect(function (err) {
        if (err) throw err;

        let sql = `INSERT INTO fede2.pelicula 
                    (id_pelicula, fk_id_categoria, nombre_pelicula, rating_pelicula, fecha_estreno, pelicula_poster) 
                    VALUES (NULL, '3', '${req.body.nombre_pelicula}', '${req.body.rating_pelicula}', '${req.body.fecha_estreno}', '${req.body.pelicula_poster}');`;

        con.query(sql, function (err, result) {
            con.end();
            if (err) throw err;
            return res.send(result);
        });
    });

});


router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    var con = mysql.createConnection(config.database_config);

    con.connect(function (err) {
        if (err) throw err;

        let sql = `DELETE FROM fede2.pelicula WHERE id_pelicula = ${id};`;

        con.query(sql, function (err, result) {
            con.end();
            if (err) throw err;
            return res.send(result);
        });
    });

});


module.exports = router;