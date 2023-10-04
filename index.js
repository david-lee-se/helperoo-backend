require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5050;


app.use(express.json());
app.use(cors());

const employeesRoutes = require('./routes/employeesRoutes');

app.use('/employees', employeesRoutes)

app.listen(PORT, () => {
    console.log(`server is using port ${PORT}`)
})