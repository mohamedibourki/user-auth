// Group imports
const express = require("express");
const dotenv = require('dotenv');
const bcrypt = require('bcrypt')

// Configuration
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware Setup
app.use(express.json());

// Route Definitions
let users = [];
const saltRounds = 12;

app.post('/', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    const user = {
        name: req.body.name,
        password: hashedPassword,
    };
    users.push(user);
    res.status(201).send();
});

app.post('/login', async (req, res) => {
    const user = users.find((user) => {
        return user.name == req.body.name
    })
    if (user == null) {
        return res.status(400).send("Cannot Find User")
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send("Success")
        } else {
            res.send("Not Allowed")
        }
    } catch {
        res.status(500).send()
    }
})

app.get('/', (req, res) => {
    res.json(users);
});

// Error Handling
app.use((err, res) => {
    console.error(err);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});