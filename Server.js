const dirname = '../UnityRenderingStream/'
const WebIndex = '/WebApp/client/public/receiver/'

const http=require('http');
const fs=require("fs");
const path=require("path");
const directoryPath = path.join(dirname, 'Record');
let videos;
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    videos = files;
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
      console.log(file);
    });
});

const express = require('express');
const cors = require('cors');
const { isUndefined } = require('util');
const app = express();
app.use(express.static('website'));
app.use(express.json());
app.use(cors());
app.use("/video", express.static(__dirname + "/Record"));
app.get('/', (req, res) => {
  console.log(videos);
  res.send(videos);
});
// app.post("/upload", (req,res){
  
// });

app.listen(3000, () => {
  console.log('Our express server is up on port 3000');
});

// const WebSocket = require('ws')
// const wss = new WebSocket.Server({ port: 8080 },()=>{
//     console.log('server started')
// })
// wss.on('connection', function connection(ws) {
//    ws.on('message', (data) => {
//       console.log('data received \n %o',data)
//       ws.send(data);
//    })
// })
// wss.on('listening',()=>{
//    console.log('listening on 8080')
// })