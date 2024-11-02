const express = require('express');
const app = express();
const morgan = require('morgan');
const { readdirSync } = require('fs');
const cors = require('cors');
// const authRouter = require('./routers/auth');
// const categoryRouter = require('./routers/category');


let port = 3000;

// midleware 
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// app.use('/api',authRouter);
// app.use('/api',categoryRouter);

// เป็นการเรียกใช้ทีละหลายเส้นทีเดียว
readdirSync('./routes').map((item)=> app.use('/api', require('./routes/' + item)));

// Router
// app.get('/api', (req,res) => {
//     res.send('hello world');
// })


app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})