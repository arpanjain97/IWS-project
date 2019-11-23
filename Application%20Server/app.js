var express = require('express');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var logger = require('morgan');
var cors = require('cors')
var mongo = require('mongodb');
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors())

// Mongo Connection
var MongoClient = mongo.MongoClient;
var url = "";
let db

MongoClient.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
  console.log("Db is connected")
  db = client.db("IWS")
})

// Multer Options
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split(".")[1])
  }
})
 
var upload = multer({ storage: storage })

// Azure options
process.env.NODE_ENV="production";
const account = "iwswebsite";
const accountKey = "";

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);
const containerClient = blobServiceClient.getContainerClient("images");

async function uploadImageToBlob(filename, mimetype) {
  const imageData = fs.readFileSync(`uploads/${filename}`);
  const blockBlobClient = containerClient.getBlockBlobClient(filename);
  await blockBlobClient.upload(imageData, imageData.length);
  blockBlobClient.setHTTPHeaders({blobContentType: mimetype})
  fs.unlink(`uploads/${filename}`, () => {});
  return blockBlobClient.url;
}

// Heartbeat Endpoint
app.get('/', function (req, res) {
  res.json({ online: true })
})

// Test Endpoint
app.get('/test', function (req, res) {
  res.json({ value:'Hello World' })
})

// GET user details
app.get('/user', async function(req, res) {
  let user = null;
  const { email, password } = req.query;
  const collection = db.collection("users");
  if(email != undefined)
    user = await collection.findOne({ email });
  if(user == null)
    return res.send({ success: false, error: "Email not registered"});
  if(password == undefined || password != user.password)
    return res.send({ success: false, error: "Password is incorrect"});
  res.send({ success: true });
})

// POST user
app.post('/user', async function(req, res) {
  const { email } = req.body;
  const collection = db.collection("users");
  if(email == undefined) {
    res.send({ success: false, error: "No Email provided" });
    return;
  }
  const user = await collection.findOne({ email });
  if(user == null) {
    await collection.insertOne(req.body);
    res.send({ success: true });
  } else {
    res.send({ success: false, error: "Email is already registered" });
  }
})



// File Upload
app.post('/upload', upload.single('file'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file)
})

//POST property
app.post('/property', async (req, res) => {
  const obj = req.body;
  const collection = db.collection("properties");
  obj.image = await uploadImageToBlob(obj.image.filename, obj.image.mimetype);
  await collection.insertOne(obj);
  res.send({success: obj.image})
})

//GET Search
app.post('/search', async(req, res) => {
  const { query, bedrooms, budget } = req.body;
  if (query==undefined){
    return res.send({ success: false});
  }
  const amount_q = budget==undefined? {"$exists": true}: { "$lt": budget };
  const bedrooms_q = bedrooms==undefined? {"$exists": true}: { "$in": bedrooms };
  const collection = db.collection("properties");
  results = await collection.find({ $text : {"$search": query}, amount: amount_q, bedrooms: bedrooms_q }).project({ score: { $meta: "textScore" }}).sort( { score: { $meta: "textScore" } } );

  results.toArray(function(error, documents) {
    if (error) throw error;

    res.send({ results: documents });
  });
})

// Ranjan
const config = require('./config/keys');
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://app:eC0MlwQZTLjA2oyF@cluster0-gneft.mongodb.net/IWS?retryWrites=true&w=majority", { useNewUrlParser: true });

require('./models/Registration');
require('./models/Demand');
require('./models/Coupons');

require('./routes/dialogFlowRoutes')(app);
require('./routes/fulfillmentRoutes')(app);

module.exports = app;
