const { Pool, Client } = require('pg')
    // var Pool = require('pg-pool')
const csv = require('csv-parser');
const fs = require('fs');

var config = require('../../configScript.js')
var pool = new Pool(config['pg'])

var csvRows = []
var csvFilepath = 'validacao_amostral.csv'

const insertRow = "INSERT INTO validacao_amostral(gid, lon, lat, d_2000, d_2001, d_2002, d_2003, d_2004, d_2005, d_2006, d_2007, d_2008, d_2009, d_2010, d_2011, d_2012," +
    "d_2013, d_2014, d_2015, d_2016, d_2017, d_2018, d_2019, d_2020, classe) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25) RETURNING gid"

fs.createReadStream(csvFilepath)
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {

        csvRows.push(row)
    })
    .on('end', () => {

        (async() => {

            const client = await pool.connect()

            try {

                await client.query('BEGIN')

                console.log(insertRow)

                for (i in csvRows) {
                    var row = csvRows[i]


                    /* for initial population*/
                    var rowValues = [parseInt(row.gid), row.lon, row.lat, row.d_2000, row.d_2001, row.d_2002, row.d_2003, row.d_2004, row.d_2005, row.d_2006, row.d_2007, row.d_2008, row.d_2009, row.d_2010, row.d_2011, row.d_2012, row.d_2013, row.d_2014, row.d_2015, row.d_2016, row.d_2017, row.d_2018, row.d_2019, row.d_2020, row.classe]

                    const res = await client.query(insertRow, rowValues)

                    console.log(row.lat + ' , ' + row.lon + ' inserted.')
                        // } else  {
                        //  console.log('Duplicated register ignored.')
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
                console.log('calling end')

            }
        })().catch(e => console.error(e.stack))


        console.log('pool has drained')
    });