const express=require("express");
const mongoose=require("mongoose");
const bodyParser = require('body-parser')
const port=3000;
const app=express();

const url=`mongodb+srv://yashdeshmane21:Hiitsykd30123@cluster0.rjnqz8a.mongodb.net/`

const connectionParams = {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to the database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    })


const handlebars = require('express3-handlebars').create()
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.use("/assets", express.static("assets"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.render('index');
})
const enquiry_details = mongoose.model('enquiry_details', {
    Name: String,
    Email: String,
    Subject:String,
    Message:String,
    
});

app.post('/', (req, res) => {

    let myData = new enquiry_details(req.body);
    console.log(myData);

    myData.save().then(() => {
        res.redirect('/');
    }).catch(() => {
        res.status(400).send("item was not saved to the database")
    });
});

app.listen(port,()=>{
    console.log("hi");
});

