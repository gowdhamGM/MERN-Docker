const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./router');
// const morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(express.json());
// app.use(morgan('development'));

app.listen(5000, () => {
    console.log("Server started at 5000");
})

app.use('/api', userRouter);

mongoose.connect("mongodb://localhost:27017/proj1",{useCreateIndex: true, 
                                                    useUnifiedTopology: true, 
                                                    useNewUrlParser: true },  () => {
    console.log("DB connected Sucessfully");
})