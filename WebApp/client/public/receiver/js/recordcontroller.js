let mainVideo = document.querySelector('.main-video video');
let title = document.querySelector('.main-video .title');
let VideoSrcs;

fetch('http://localhost:3000/')
    .then(response => { return response.json(); })
    .then(videos => { VideoSrcs = videos; 
        CreateVideolList(); 
    });


function CreateVideolList() {
    VideoSrcs.forEach(source => {
        let Vlist = document.querySelector('.video-list');
        let vidDiv = document.createElement('div');
        let video = document.createElement('video');
        let title = document.createElement('h3');
        title.className = "title"
        title.textContent = source;
        video.src = "http://localhost:3000/video/" + source;
        vidDiv.className = "vid";

        vidDiv.appendChild(video);
        vidDiv.appendChild(title);
        Vlist.appendChild(vidDiv);

    });
    mainVideo.src = "http://localhost:3000/video/" + VideoSrcs[0];
    console.log("created video list");

    setVideoSelector();
}

function setVideoSelector(){
    let listVideo = document.querySelectorAll('.video-list .vid');
    listVideo.forEach(video => {
        video.onclick = () => {
            listVideo.forEach(vid => vid.classList.remove('active'));
            video.classList.add('active');
            if (video.classList.contains('active')) {
                let src = video.children[0].getAttribute('src');
                mainVideo.src = src;
            };
        };
    });
}

// async function getVideos(){
//     let response = await fetch('http://localhost:3000/video');
//     let data = await response.json()
//     return data;
// }
// getVideos().then(data=> console.log (data));
