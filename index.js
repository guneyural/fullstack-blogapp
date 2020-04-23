const app = require('express')();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const blogRoutes = require('./routes/blog');
const path = require('path');
const DATABASE = 'mongodb+srv://sennaber:webapp123@guney-xu6om.mongodb.net/test?retryWrites=true&w=majority';
const PORT = 3002;

require('dotenv').config();
app.use(require('express').json());

mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
.then(() => console.log('Connected to database'))
.catch(() => console.log('Could not connect to database'));

app.use('/api/user', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/blog', blogRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(require('express').static('client/build'));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server started on port ${process.env.PORT}`);
});