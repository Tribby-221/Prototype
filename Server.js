const dirname = '../UnityRenderingStream/'
const WebIndex = '/WebApp/client/public/receiver/'

const http=require('http');
const fs=require("fs");
const path=require("path");
const directoryPath = path.join(dirname, 'Record');

const videos = [];

fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file);
        videos.push(file);
    });
});

const express = require('express');
const cors = require('cors');
const app = express();
let vidnum = 0;
app.use(express.static('website'));
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.sendFile(__dirname + WebIndex + 'index.html');
});
 
app.post('/', (req, res) => {
  const { video } = req.body;
  const { authorization } = req.headers;
  res.send({
    video,
    authorization,
  });
  vidnum = video;
});
 
app.get("/video", function (req, res) {
    console.log("app.get /video called");
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const p = path.join(dirname, 'Record/');
    const videoPath = path.join(p, videos[vidnum]);
    console.log(videoPath);
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
});
app.get("/recordedList", function (req, res) {
  res.send(videos);
});
app.listen(3000, () => {
  console.log('Our express server is up on port 3000');
});


// /* http.createServer takes a handler
//    function and returns a server instance;*/
// const server=http.createServer((req, res)=>{
//     // return res.end(req.url+req.method);
//     if(req.method==='GET' && req.url==="/"){
//         /*we will send a index.html page when
//           user visits "/" endpoint*/
//         /*index.html will have video component
//           that displays the video*/
         
//         fs.createReadStream(path.resolve("index.html")).pipe(res);
//         return;
//     }
//     //if video content is requesting
//     if(req.method==='GET' && req.url==="/Record"){
//         const filepath = path.resolve("../UnityRenderingStream/Record/2023-06-19-16-21-25-7ZQB6.mp4");
//         const stat = fs.statSync(filepath)
//         const fileSize = stat.size
//         const range = req.headers.range
//         /*when we seek the video it will put
//           range header to the request*/
//         /*if range header exists send some
//             part of video*/
//         if (range) {
//             //range format is "bytes=start-end",
//             const parts =
//                 range.replace(/bytes=/, "").split("-");
            
//             const start = parseInt(parts[0], 10)
//             /*in some cases end may not exists, if its
//                           not exists make it end of file*/
//             const end =
//                  parts[1] ?parseInt(parts[1], 10) :fileSize - 1
             
//             //chunk size is what the part of video we are sending.
//             const chunksize = (end - start) + 1
//             /*we can provide offset values as options to
//            the fs.createReadStream to read part of content*/
//             const file = fs.createReadStream(filepath, {start, end})
             
//             const head = {
//                 'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//                 'Accept-Ranges': 'bytes',
//                 'Content-Length': chunksize,
//                 'Content-Type': 'video/mp4',
//             }
//             /*we should set status code as 206 which is
//                     for partial content*/
//             // because video is continuously fetched part by part
//             res.writeHead(206, head);
//           file.pipe(res);
           
//         }else{
         
//         //if not send the video from start.
//         /* anyway html5 video player play content
//           when sufficient frames available*/
//         // It doesn't wait for the entire video to load.
         
//            const head = {
//                'Content-Length': fileSize,
//                'Content-Type': 'video/mp4',
//            }
//            res.writeHead(200, head);
//            fs.createReadStream(path).pipe(res);
//         }
//     }
//     /*if anything other than handler routes then send
//       400 status code, is for bad request*/
//     else{
//         res.writeHead(400);
//         res.end("bad request");
//     }
// })