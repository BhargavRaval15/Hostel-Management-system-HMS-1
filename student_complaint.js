// const fs = require("fs");
// const cors = require('cors')
// const express = require('express');
// const bodyparser = require('body-parser');

// const app = express();
// app.use(cors());

// app.use(bodyparser.json());

// let todos = [];

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
//     // return newarray;
//     todos = newarray;
// }




// app.get('/studentcomp', (req, res) => {
//     // fs.readFile("student_complaint.json", "utf-8", (err, data) => {
//     //     if (err) throw err;
//     //     res.json(JSON.parse(data));
//     // });
//     fs.readFile("student_complaint.json", "utf-8", (err, data) => {
//         if (err) {
//             // Handle file reading error
//             console.error("Error reading file:", err);
//             return;
//         }
    
//         try {
//             res.json(JSON.parse(data));
//             // Process jsonData here
//         } catch (parseError) {
//             // Handle JSON parsing error
//             console.error("Error parsing JSON:", parseError);
//         }
//     });
    
// });


// app.get('/studentcomp/:id', (req, res) => {
//     fs.readFile("student_complaint.json", "utf-8", (err, data) => {
//         if (err) throw err;
//         res.json(JSON.parse(data));
//     });
//     const todoindex = findindex(todos, parseInt(req.params.id));

//     if (todoindex === -1) {
//         res.status(404).send();
//     }
//     else {
//         res.json(todos[todoindex]);
//     }
// });
// let cnt=1;
// app.post('/studentcomp', (req, res) => {
//     const newtodo = {
//         id:cnt++,
//         name: req.body.name,
//         rn: req.body.rn,
//         ComplaintType: req.body.ComplaintType,
//         ComplaintDetail: req.body.ComplaintDetail
//     };
//     fs.readFile("student_complaint.json", "utf-8", (err, data) => {
//         if (err) throw err;
//         const todos = JSON.parse(data);
//         todos.push(newtodo);

//         fs.writeFile("student_complaint.json", JSON.stringify(todos), (err) => {
//             if (err) throw err;
//             res.status(201).json(newtodo);
//         });
//     });
// });

// // app.put("/studentcomp/:id", (req, res) => {
// //     fs.readFile("student_complaint.json", "utf-8", (err, data) => {
// //         if (err) throw err;
// //         const todos = JSON.parse(data);

// //         const todoindex = findindex(todos, parseInt(req.params.id));

// //         if (todoindex === -1) {
// //             res.status(404).send();
// //         }
// //         else {
// //             const updatetodo = {
// //                 id: todos[todoindex].id,

// //                 name: req.body.name,
// //                 rn: req.body.rn,
// //                 ComplaintType: req.body.ComplaintType,
// //                 ComplaintDetail: req.body.ComplaintDetail
// //             }
// //         }

// //         todos[todoindex] = updatetodo;

// //         fs.writeFile("student_complaint.json", JSON.stringify(student_complaint), (err) => {
// //             if (err) throw err;
// //             res.status(201).json(updatetodo);
// //         });
// //     });
// // });
// app.put("/studentcomp/:id", (req, res) => {
//     fs.readFile("student_complaint.json", "utf-8", (err, data) => {
//         if (err) throw err;
//         const todos = JSON.parse(data);

//         const todoindex = findindex(todos, parseInt(req.params.id));

//         if (todoindex === -1) {
//             res.status(404).send();
//         } else {
//             const updatetodo = {
//                 id: todos[todoindex].id,
//                 name: req.body.name,
//                 rn: req.body.rn,
//                 ComplaintType: req.body.ComplaintType,
//                 ComplaintDetail: req.body.ComplaintDetail
//             };

//             todos[todoindex] = updatetodo;

//             fs.writeFile("student_complaint.json", JSON.stringify(todos), (err) => {
//                 if (err) throw err;
//                 res.status(201).json(updatetodo);
//             });
//         }
//     });
// });





// app.delete('/studentcomp/:id', (req, res) => {
//     fs.readFile("student_complaint.json", "utf-8", (err, data) => {
//         if (err) throw err;
//         const todos = JSON.parse(data);

//         const todoindex = findindex(todos, parseInt(req.params.id));
//         if (todoindex === -1) {
//             res.status(404).send();
//         }
//         else {
//             // todos = removeindex (todos , todoindex);
//             removeindex (todos , todoindex);
//             fs.writeFile("student_complaint.json", JSON.stringify(todos), (err) => {
//                 if (err) throw err;
//                 res.status(200).json(updatetodo);
//             });
            
//         }

//     });

// });

// app.use((req, res, next) => {
//     res.status(404).send();
// });

// app.listen(3000);
// -----------------------------------------------------------------

const fs = require("fs");
const cors = require('cors')
const express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyparser.json());

let todos = [];

function findindex(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return i;
        }
    }
    return -1; // Move this line outside the loop to ensure it's executed after the loop completes
}

function removeindex(arr, index) {
    let newarray = [];
    for (let i = 0; i < arr.length; i++) {
        if (i !== index) {
            newarray.push(arr[i]);
        }
    }
    todos = newarray; // Assign the new array back to the todos array
}


app.get('/studentcomp', (req, res) => {
    fs.readFile("student_complaint.json", "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Error reading file");
        }

        try {
            res.json(JSON.parse(data));
        } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
            return res.status(500).send("Error parsing JSON");
        }
    });
});

app.get('/studentcomp/:id', (req, res) => {
    fs.readFile("student_complaint.json", "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Error reading file");
        }

        const todoindex = findindex(todos, parseInt(req.params.id));
        if (todoindex === -1) {
            return res.status(404).send("Todo not found");
        }
        res.json(todos[todoindex]);
    });
});


app.post('/studentcomp', (req, res) => {
    const newtodo = {
        id: todos.length + 1,
        name: req.body.name,
        rn: req.body.rn,
        ComplaintType: req.body.ComplaintType,
        ComplaintDetail: req.body.ComplaintDetail
    };
    fs.readFile("student_complaint.json", "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Error reading file");
        }

        const todos = JSON.parse(data);
        todos.push(newtodo);

        fs.writeFile("student_complaint.json", JSON.stringify(todos), (err) => {
            if (err) {
                console.error("Error writing file:", err);
                return res.status(500).send("Error writing file");
            }
            res.status(201).json(newtodo);
        });
    });
});

// app.put("/studentcomp/:id", (req, res) => {
//     fs.readFile("student_complaint.json", "utf-8", (err, data) => {
//         if (err) {
//             console.error("Error reading file:", err);
//             return res.status(500).send("Error reading file");
//         }

//         const todos = JSON.parse(data);
//         const todoindex = findindex(todos, parseInt(req.params.id));

//         if (todoindex === -1) {
//             return res.status(404).send("Todo not found");
//         }

//         const updatetodo = {
//             id: todos[todoindex].id,
//             name: req.body.name,
//             rn: req.body.rn,
//             ComplaintType: req.body.ComplaintType,
//             ComplaintDetail: req.body.ComplaintDetail
//         };

//         todos[todoindex] = updatetodo;

//         fs.writeFile("student_complaint.json", JSON.stringify(todos), (err) => {
//             if (err) {
//                 console.error("Error writing file:", err);
//                 return res.status(500).send("Error writing file");
//             }
//             res.status(201).json(updatetodo); // Move this line here
//         });
//     });
// });
app.put("/studentcomp/:id", (req, res) => {
    fs.readFile("student_complaint.json", "utf-8", (err, data) => {
        if (err) throw err;
        const todos = JSON.parse(data);

        const todoindex = findindex(todos, parseInt(req.params.id));

        if (todoindex === -1) {
            res.status(404).send();
        } else {
            const updatetodo = {
                id: todos[todoindex].id,
                name: req.body.name,
                rn: req.body.rn,
                ComplaintType: req.body.ComplaintType,
                ComplaintDetail: req.body.ComplaintDetail
            };

            todos[todoindex] = updatetodo;

            fs.writeFile("student_complaint.json", JSON.stringify(todos), (err) => {
                if (err) throw err;
                res.status(201).json(updatetodo);
            });
        }
    });
});

app.delete('/studentcomp/:id', (req, res) => {
    fs.readFile("student_complaint.json", "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Error reading file");
        }

        let todos = JSON.parse(data);
        const todoindex = findindex(todos, parseInt(req.params.id));

        if (todoindex === -1) {
            return res.status(404).send("Todo not found");
        }
       

         todos.splice(todoindex, 1); // Remove the item from the array

        fs.writeFile("student_complaint.json", JSON.stringify(todos), (err) => {
            if (err) {
                console.error("Error writing file:", err);
                return res.status(500).send("Error writing file");
            }
            res.status(200).send(); // Send success response
        });
    });
});


app.use((req, res, next) => {
    res.status(404).send("Not found");
});

app.listen(3000);
