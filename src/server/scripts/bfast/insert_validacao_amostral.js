const { Pool, Client } = require('pg')
const csv = require('csv-parser');
const fs = require('fs');

var config = require('../../config')
var pool = new Pool(config['pg'])

var csvRows = []
var csvFilepath = 'validacao_amostral.csv'

const insertRow = "INSERT INTO validacao_amostral(lon, lat, d_2000, d_2001, d_2002, d_2003, d_2004, d_2005, d_2006, d_2007, d_2008, d_2009, d_2010, d_2011, d_2012," +
    + "d_2013, d_2014, d_2015, d_2016, d_2017, d_2018, d_2019, classe) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22) RETURNING gid"

fs.createReadStream(csvFilepath)
    .pipe(csv())
    .on('data', (row) => {
        csvRows.push(row)
    })
    .on('end', () => {

        (async () => {

            const client = await pool.connect()
            try {
                await client.query('BEGIN')
                // await client.query('SET datestyle = dmy')

                for (i in csvRows) {
                    var row = csvRows[i]

                    /* for initial population*/
                    var rowValues = [parseFloat(row.lon), parseFloat(row.lat), row.d_2000, row.d_2001, row.d_2002, row.d_2003, row.d_2004, row.d_2005, row.d_2006, row.d_2007, row.d_2008, row.d_2009, row.d_2010, row.d_2011, row.d_2012, row.d_2013, row.d_2014, row.d_2015, row.d_2016, row.d_2017, row.d_2018, row.classe]
                    const res = await client.query(insertRow, rowValues)

                    console.log(row.lon + ' inserted.')
                    // } else  {
                    // 	console.log('Duplicated register ignored.')
                    // }

                }

                console.log("Doing commit")
                await client.query('COMMIT')

            } catch (e) {
                console.log("Doing rollback")
                await client.query('ROLLBACK')
                throw e
            } finally {
                client.release()
            }
        })().catch(e => console.error(e.stack))

    });

function toISOFormat(dateTimeString) {

    var date1 = dateTimeString.split('/')
    var newDate = date1[2] + '-' + date1[1] + '-' + date1[0];

    // Retornamos a data formatada em um padrão compatível com ISO:
    return newDate;
}
