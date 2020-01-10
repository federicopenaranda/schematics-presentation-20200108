var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config');

var process = require('process');

const { exec } = require("child_process");
const pathSchematics = '../../schematics/fede/src/collection.json';


router.get('/', (req, res, next) => {
    var con = mysql.createConnection(config.database_config);

    con.connect(async (err) => {
        if (err) throw err;

        // console.log(process.cwd());
        process.chdir('../../front/peliculas');
        // console.log(process.cwd());

        let command = '';

        // MODULES -->
        let res1 = await new Promise((resolve, reject) => {
            let sql = `SELECT DISTINCT table_comment AS modules
                        FROM INFORMATION_SCHEMA.TABLES
                        WHERE table_schema='fede2';`;

            con.query(sql, async (err, result) => {
                if (err) throw err;

                for (let j = 0; j < result.length; j++) {
                    command = `ng g ${pathSchematics}:custom-module --name ${result[j].modules}`;

                    try {
                        await executeCommand(command);
                    } catch (executeError) {
                        reject(executeError);
                    }
                }

                resolve(result);
            });
        });


        // TABLES -->
        let res2 = await new Promise((resolve, reject) => {
            let sql2 = `SELECT table_name AS tabla, table_comment AS modulo
                        FROM information_schema.tables
                        WHERE table_schema = 'fede2';`;

            con.query(sql2, async (err2, result2) => {
                if (err2) throw err2;

                let fields = '';

                for (let i = 0; i < result2.length; i++) {
                    fields = await fieldsToPipes(result2[i].tabla);

                    // Generate Models
                    command = `ng g ${pathSchematics}:custom-model --name=${result2[i].tabla} --module=${result2[i].modulo} --fields=${fields}`;

                    try {
                        await executeCommand(command);
                    } catch (executeError) {
                        reject(executeError);
                    }

                    // Generate Services
                    command = `ng g ${pathSchematics}:custom-service --name=${result2[i].tabla} --module=${result2[i].modulo}`;

                    try {
                        await executeCommand(command);
                    } catch (executeError) {
                        reject(executeError);
                    }
                    
                    // Generate List Component
                    command = `ng g ${pathSchematics}:custom-component-lista --name=${result2[i].tabla}-lista --module=${result2[i].modulo} --tabla=${result2[i].tabla} --fields=${fields}`;

                    try {
                        await executeCommand(command);
                    } catch (executeError) {
                        reject(executeError);
                    }


                    // Generate Edit Component
                    command = `ng g ${pathSchematics}:custom-component-edit --name=${result2[i].tabla}-edit --module=${result2[i].modulo} --tabla=${result2[i].tabla} --fields=${fields}`;

                    try {
                        await executeCommand(command);
                    } catch (executeError) {
                        reject(executeError);
                    }
                }

                resolve(result2);
            });
        });

        con.end();
        return res.send(res2);

    });

});



function executeCommand(command) {
    return new Promise((resolve, reject) => {
        try {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return reject(error.message);
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return reject(stderr);
                }
                console.log(`stdout: ${stdout}`);
                resolve(stdout);
            });
        } catch (execError) {
            console.log('execError');
            console.log(execError);
            reject(execError);
        }
    });
}


function fieldsToPipes(tabla) {
    return new Promise((resolve, reject) => {
        var con = mysql.createConnection(config.database_config);

        con.connect((err) => {
            if (err) throw err;

            let sql = `SELECT COLUMN_NAME AS name, DATA_TYPE AS type
                        FROM INFORMATION_SCHEMA.COLUMNS
                        WHERE TABLE_SCHEMA = 'fede2' AND TABLE_NAME = '${tabla}';`;

            con.query(sql, function (err, result) {
                con.end();
                if (err) throw err;

                let fields = '';

                for (let i = 0; i < result.length; i++) {
                    switch (result[i].type) {
                        case 'int': result[i].type = 'number'; break;
                        case 'varchar': result[i].type = 'string'; break;
                        case 'text': result[i].type = 'string'; break;
                        case 'date': result[i].type = 'string'; break;
                    }

                    fields += result[i].name + ',' + result[i].type + '+';
                }

                fields = fields.slice(0, -1);

                return resolve(fields);
            });
        });
    });
}


module.exports = router;