const express = require('express')
const connectDB = require('./config/db');

const app = express();

const PORT = 8000;

app.get('/',(req,res)=>{
    res.send('Backend running');
});

//middleware
app.use(express.json({extended: false}));

//routes
app.use('/api/inventory',require('./routes/inventory'));
app.use('/api/shipment',require('./routes/shipment'));

//connect db
connectDB();

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT} :3`);
})