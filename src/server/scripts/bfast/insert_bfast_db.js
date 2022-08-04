const { Pool, Client } = require('pg')
const csv = require('csv-parser');
const fs = require('fs');

var config = require('../../configScript.js')
var pool = new Pool(config['pg'])

var csvRows = []
var csvFilepath = 'result.csv'
const insertRow = 'INSERT INTO bfast_points(lon,lat,breakpoint,th) VALUES($1,$2,$3,$4) RETURNING gid'

fs.createReadStream(csvFilepath)
    .pipe(csv({ delimiter: ';' }))
    .on('data', (row) => {
        csvRows.push(row)
    })
    .on('end', () => {

        (async () => {

            const client = await pool.connect()
            console.log("conect")
            try {
                await client.query('BEGIN')
                // await client.query('SET datestyle = dmy')

                for (i in csvRows) {
                    var row = csvRows[i]
                    console.log(row)

                    /* for initial population*/
                    var rowValues = [parseFloat(row.lon), parseFloat(row.lat), row.monitor_breakpoint, row.monitor_magnitude]
                    const res = await client.query(insertRow, rowValues)

                    console.log(row.lon + ' - ' + row.lat + ' inserted.')
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
