const express = require('express')
const EventEmitter = require('events');
const emitter = new EventEmitter();
const axios = require("axios");
const app = express();
var router = express.Router();
const port = 8080; // Port yang ingin digunakan
const { Primbon } = require('scrape-primbon')
const primbon = new Primbon()
const qs = require('querystring');
const cheerio = require('cheerio')
const fs = require("fs")
const http = require("http")
__path = process.cwd();

var ast = require(__path + '/server/in.js');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//igdownloderrr
app.get('/tiktok', async (req, res) => {
  const url1 = req.query.url1; // Mengambil query parameter ?url1=
  // Jika tidak ada parameter url1, kirimkan pesan error
  if (!url1) {
    return res.status(400).json({ status: 'Error', message: 'Query parameter ?url1= is required' });
  }

  try {
    const data = await ast.tiktok(url1);  // Panggil fungsi tiktok dengan benar
    const author = "Your Name"; // Atur author sesuai dengan kebutuhan

    res.json({
      status: "Success",
      code: 200,
      author: author,
      data: data
    });
  } catch (error) {
    // Tangani error dan kirimkan respons error
    res.status(500).json({
      status: "Error",
      code: 500,
      message: error.message || "Something went wrong"
    });
  }
});
//github
app.get('/github-user', async (req, res) => {
  const user = req.query.user; // Ambil parameter 'text' dari query string

  if (!user) {
    return res.status(400).json({ status: 'Error', message: 'Query parameter ?url= required' });
  }

  try {
    const url = encodeURI(`https://api.github.com/users/${user}`);
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ status: 'Error', message: data.message });
    }

    res.json({
      result: data
    });
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'Failed to fetch data from GitHub' });
  }
});
//primobon
app.get('/ceknomor', async (req, res) => {
  const nomer = req.query.nomor;

  primbon.nomer_hoki(nomer).then((data) => {
    res.json({
      result: data
    });
  })
});
app.get('/cekmimpi', async (req, res) => {
  const mimpi = req.query.mimpii;

  primbon.tafsir_mimpi(mimpi).then((data) => {
    res.json({
      result: data
    });
  });
});

//coba

//cobaaaanode


//coba

app.listen(8080, () => {
  console.log('Server running on port 3000');
});