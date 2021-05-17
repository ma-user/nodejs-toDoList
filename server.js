const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sql = require('mssql');
const { response } = require('express');

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public/')));

const config = {
    user: 'todolist',
    password: 'Qwerty12',
    server: 'activities-server.database.windows.net',
    database: 'activities',
    options: {
        encrypt: true
    }
};

sql.connect(config).catch(err => debug(err));

app.get('/', (req, res) => {
    (async function query() {
        const request = new sql.Request();
        const result = await request.query('select * from activity');
        res.render('index', { activity: result.recordset });
    }());
});

app.post('/addTask', (req, res) => {
    (async function addActivity() {
        console.log(req.body);
        const request = new sql.Request();
        request.query("INSERT INTO activity VALUES('" + req.body.description + "', '" + req.body.date + "', 'Undone')", (error) => {
            if (error) {
                console.log("error: ", error);
            }
            else {
                console.log("Activity is inserted successfully");
                res.redirect('/');
            }
        });
    }());
});

app.route('/deleteTask/:id').get((req, res) => {
    (async function deleteActivity() {
        var { id } = req.params;
        const request = new sql.Request();
        await request.query("DELETE FROM activity WHERE id = " + id, (error) => {
            if (error) {
                console.log("error: ", error);
            }
            else {
                console.log("Activity is deleted successfully");
                res.redirect('/');
            }
        });
    }());
});

app.patch('/updateTask', (req,res) => {
   (async function updateStatus() {
       console.log(req.body);
        const request = new sql.Request();
        request.query("UPDATE activity SET statusOfWork = '"+req.body.statusOfWork+"' WHERE id = '"+req.body.id+"'", (error) => {
            if(error) {
                console.log("error: ", error);
            } else {
                console.log("State of Work is updated successfully");
            }
        }); 
   }());
});

app.listen(8080, () => {
    console.log('app is running on port 8080');
});























