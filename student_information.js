// const fs = require("fs");
// const express = require('express');
// const bodyparser = require('body-parser');

// const app = express();

// app.use(bodyparser.json());

// let students = [];

// function findindex(arr, id) {
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i].id === id) {
//             return i;
//         }
//         return -1;
//     }
// }

// function removeindex(arr, index) {
//     let newarray = [];
//     for (let i = 0; i < arr.length; i++) {
//         if (i !== index) {
//             newarray.push(arr[i]);
//         }

//     }
//     return newarray;
// }
// app.get('/students', (req, res) => {
//     fs.readFile("students.json", "utf-8", (err, data) => {
//         if (err) throw err;
//         res.json(JSON.parse(data));
//     });
// });
// let id = 0;
// app.get('/students/:id', (req, res) => {
//     fs.readFile("students.json", "utf-8", (err, data) => {
//         if (err) throw err;
//         res.json(JSON.parse(data));
//     });
//     const s_index = findindex(students, parseInt(req.params.id));

//     if (s_index === -1) {
//         res.status(404).send();
//     }
//     else {
//         res.json(students[s_index]);
//     }
// });

// app.post('/students', (req, res) => {
//     const newstudent = {
//         id: id++,
//         name: req.body.name,
//         rn: req.body.rn,
//         phone: req.body.phone,

//         e_c: req.body.e_c,
//         bg: req.body.bg
//     };
//     fs.readFile("students.json", "utf-8", (err, data) => {
//         if (err) throw err;
//         const students = JSON.parse(data);
//         students.push(newstudent);
//         console.log(newstudent);

//         fs.writeFile("students.json", JSON.stringify(students), (err) => {
//             if (err) throw err;
//             res.status(201).json(newstudent);
//             console.log("here")
//         });
//     });
// });




// app.put("/students/:id", (req, res) => {
//     fs.readFile("students.json", "utf-8", (err, data) => {
//         if (err) throw err;
//         const students = JSON.parse(data);

//         const s_index = findindex(students, parseInt(req.params.id));

//         if (todoindex === -1) {
//             res.status(404).send();
//         }
//         else {
//             const updatestudent = {
//                 id: students[s_index].id,
//                 // id: id++,
//                 name: req.body.name,
//                 rn: req.body.rn,
//                 phone: req.body.phone,

//                 e_c: req.body.e_c,
//                 bg: req.body.bg
//             }
//         }

//         students[s_index] = updatestudent;

//         fs.writeFile("students.json", JSON.stringify(students), (err) => {
//             if (err) throw err;
//             res.status(201).json(updatestudent);
//         });
//     });
// });




// app.delete('/students/:id', (req, res) => {
//     fs.readFile("students.json", "utf-8", (err, data) => {
//         if (err) throw err;
//         const students = JSON.parse(data);

//         const s_index = findindex(students, parseInt(req.params.id));
//         if (s_index === -1) {
//             res.status(404).send();
//         }
//         else {
//             students = removeindex(students, s_index);
//             fs.writeFile("students.json", JSON.stringify(students), (err) => {
//                 if (err) throw err;
//                 res.status(200).send();
//             });
//         }

//     });

// });

// app.use((req, res, next) => {
//     res.status(404).send();
// });

// app.listen(3002);

const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors());

app.use(bodyParser.json());

let students = [];  // Declare the students array outside the callbacks
let student_compalaint = [];

function findIndex(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return i;
        }
    }
    return -1;
}

function removeIndex(arr, index) {
    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (i !== index) {
            newArray.push(arr[i]);
        }
    }
    return newArray;
}

app.get('/students', (req, res) => {
    fs.readFile("students.json", "utf-8", (err, data) => {
        if (err) throw err;
        students = JSON.parse(data);  // Update the students array here
        res.json(students);
    });
});

app.get('/students/:id', (req, res) => {
    fs.readFile("students.json", "utf-8", (err, data) => {
        if (err) throw err;
        students = JSON.parse(data);

        const s_index = findIndex(students, parseInt(req.params.id));

        if (s_index === -1) {
            res.status(404).send();
        } else {
            res.json(students[s_index]);
        }
    });
});

app.post('/students', (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        rn: req.body.rn,
        phone: req.body.phone,
        e_c: req.body.e_c,
        bg: req.body.bg
    };

    students.push(newStudent);

    fs.writeFile("students.json", JSON.stringify(students), (err) => {
        if (err) throw err;
        res.status(201).json(newStudent);
    });
});


app.put("/students/:id", (req, res) => {
    fs.readFile("students.json", "utf-8", (err, data) => {
        if (err) throw err;
        students = JSON.parse(data);

        const s_index = findIndex(students, parseInt(req.params.id));

        if (s_index === -1) {
            res.status(404).send();
        } else {
            const updateStudent = {
                id: students[s_index].id,
                name: req.body.name,
                rn: req.body.rn,
                phone: req.body.phone,
                e_c: req.body.e_c,
                bg: req.body.bg
            };

            students[s_index] = updateStudent;

            fs.writeFile("students.json", JSON.stringify(students), (err) => {
                if (err) throw err;
                res.status(200).json(updateStudent);
            });
        }
    });
});

app.delete('/students/:id', (req, res) => {
    fs.readFile("students.json", "utf-8", (err, data) => {
        if (err) throw err;
        students = JSON.parse(data);

        const s_index = findIndex(students, parseInt(req.params.id));

        if (s_index === -1) {
            res.status(404).send();
        } else {
            students = removeIndex(students, s_index);

            fs.writeFile("students.json", JSON.stringify(students), (err) => {
                if (err) throw err;
                res.status(200).send();
            });
        }
    });
});

app.use((req, res, next) => {
    res.status(404).send();
});

app.listen(3002, () => {
    console.log('Server is running on port 3002');
});
