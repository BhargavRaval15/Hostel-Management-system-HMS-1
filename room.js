const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// File paths for data storage
const roomsFilePath = './data/rooms.json';
const studentsFilePath = './data/students.json';

// Helper function to read data from a file
function readDataFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data from file:', error);
        return [];
    }
}

// Helper function to write data to a file
function writeDataToFile(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log('Data written to file successfully.');
    } catch (error) {
        console.error('Error writing data to file:', error);
    }
}

// API endpoint to get all rooms
app.get('/rooms', (req, res) => {
    const rooms = readDataFromFile(roomsFilePath);
    res.json(rooms);
});

// API endpoint to add a new room
app.post('/rooms', (req, res) => {
    const rooms = readDataFromFile(roomsFilePath);
    const newRoom = req.body;
    rooms.push(newRoom);
    writeDataToFile(roomsFilePath, rooms);
    res.json({ message: 'Room added successfully', room: newRoom });
});

// API endpoint to get all students
app.get('/students', (req, res) => {
    const students = readDataFromFile(studentsFilePath);
    res.json(students);
});

// API endpoint to add a new student
app.post('/students', (req, res) => {
    const students = readDataFromFile(studentsFilePath);
    const newStudent = req.body;
    students.push(newStudent);
    writeDataToFile(studentsFilePath, students);
    res.json({ message: 'Student added successfully', student: newStudent });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
