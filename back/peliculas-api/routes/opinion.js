var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config');


router.get('/', (req, res, next) => {
    var con = mysql.createConnection(config.database_config);

    con.connect(function (err) {
        if (err) throw err;

        let sql = `SELECT * FROM fede2.opinion;`;

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

        let sql = `SELECT * FROM fede2.opinion WHERE id_opinion = ${id};`;

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

        let sql = `INSERT INTO fede2.opinion (id_opinion, fk_id_pelicula, opinion_descripcion, opinion_fecha) 
                    VALUES (NULL, '1', '${req.body.opinion_descripcion}', '${req.body.opinion_fecha}')`;

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

        let sql = `DELETE FROM fede2.opinion WHERE id_opinion = ${id};`;

        con.query(sql, function (err, result) {
            con.end();
            if (err) throw err;
            return res.send(result);
        });
    });

});


module.exports = router;