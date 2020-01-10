var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config');


router.get('/', (req, res, next) => {
    var con = mysql.createConnection(config.database_config);

    con.connect(function (err) {
        if (err) throw err;

        let sql = `SELECT * FROM fede2.categoria;`;

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

        let sql = `SELECT * FROM fede2.categoria WHERE id_categoria = ${id};`;

        con.query(sql, function (err, result) {
            con.end();
            if (err) throw err;
            return res.send(result);
        });
    });

});


router.post('/', (req, res, next) => {
    var con = mysql.createConnection(config.database_config);

    con.connect(function (err) {
        if (err) throw err;

        let sql = `INSERT INTO fede2.categoria (id_categoria, categoria_nombre) VALUES (NULL, '${req.body.categoria_nombre}');`;

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

        let sql = `DELETE FROM fede2.categoria WHERE id_categoria = ${id};`;

        con.query(sql, function (err, result) {
            con.end();
            if (err) throw err;
            return res.send(result);
        });
    });

});


module.exports = router;