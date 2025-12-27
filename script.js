var player;
var videos = [];
var currentVideoIndex = 0;
var loopCheckbox;
var loopPlaylistCheckbox;

import { fetchButtonData } from "./utils/scaffold.js";
/*
document.getElementById("test2").addEventListener("click", ()=>{
  fetchButtonData().then(data=>{
    data.forEach(item=>{
      const [url, start, end, desc] = item.split(",");
      createNewButton(desc);

      document.getElementById(desc).addEventListener("click", () => {
        if (url && start && end) {
          const id = url.split("v=")[1];
          videos.push({ id, start: parseInt(start), end: parseInt(end) });
          onYouTubeIframeAPIReady();
        }
        
      });
      /*
      if (url && start && end) {
        const id = url.split("v=")[1];
        videos.push({ id, start: parseInt(start), end: parseInt(end), desc });
      }*//*
    });
  });
});*/

fetchButtonData().then(data=>{
    data.forEach(item=>{
      const [url, start, end, desc] = item.split(",");
      createNewButton(desc);

      document.getElementById(desc).addEventListener("click", () => {
        if (url && start && end) {
          const id = url.split("v=")[1];
          videos.push({ id, start: parseInt(start), end: parseInt(end) });
          onYouTubeIframeAPIReady();
        }
        
      });
    });
  });

function createNewButton(buttonName) {
    // 1. Get the container element where the new button will go
    const container = document.getElementById("dynamic-button-container");

    // 2. Create the new <button> element in memory
    const newButton = document.createElement("button");

    // 4. Set the text and attributes for the new button
    //newButton.innerText = `Dynamic Button #${buttonsCreated} (Count was ${count})`;
    //newButton.className = 'button'; // Useful for later CSS styling

    newButton.innerText = buttonName;
    newButton.id = buttonName;
    // OPTIONAL: Give the new button a unique action
    newButton.onclick = function() {
        //alert(`You clicked Button #${buttonsCreated}!`);
    };


    // 5. Add a line break for spacing, then add the new button to the container
    //container.appendChild(document.createElement("br"));
    container.appendChild(newButton);

    
}


function goToSleep() {
  setTimeout(function() {
    player.destroy();
  }, 30*60*1000); // Sleep after 30 minutes
}

//8-6-2025
const audio = document.getElementById('rainAudio');

let playing = false;

function togglePlay() {
    if (playing) {
        audio.pause();
        
    } else {
        audio.play();
    }
    playing = !playing;
}
//END 8-6-2025

//1-6-2025
let wakeLock = null;

document.getElementById("lockScreen").addEventListener('click', () => {
  if (!wakeLock) {
    requestWakeLock();
  }
});

async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Wake Lock is active!');
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
}

const blackoutButton = document.getElementById("nightOut");
const blackScreen = document.getElementById("blackScreen");

    blackoutButton.addEventListener("click", () => {
      blackScreen.style.display = "block";
      blackScreen.classList.add("exitHint");
    });

    // Click anywhere on black screen to exit
    blackScreen.addEventListener("click", () => {
      blackScreen.style.display = "none";
      blackScreen.classList.remove("exitHint");
    });
//END 1-6-2025

document.getElementById("skipButton").addEventListener("click", () => {
    log("Skip button clicked");
    loadNextVideo(); // Call the function to load the next video
  });

// Helper function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

// // Fetch video data from the text file
// fetch('video_data.txt') // Ensure this file is hosted in the same directory
//     .then(response => response.text())
//     .then(data => {
//         // Parse the text file line by line
//         data.split('\n').forEach(line => {
//             const [url, start, end] = line.split(',');  // Updated line
//             if (url && start && end) {
//                 const id = url.split('v=')[1]; // Extract the video ID from the URL
//                 videos.push({ id, start: parseInt(start), end: parseInt(end) });
//             }
//         });

//         // Initialize the YouTube Player after loading the videos
//         if (videos.length > 0) {
//             onYouTubeIframeAPIReady();
//         }
//     });

loopCheckbox = document.getElementById("loopCheckbox");
loopPlaylistCheckbox = document.getElementById("loopPlaylistCheckbox");

document.getElementById("playButton").addEventListener("click", () => {
  const videoData = document.getElementById("videoData").value;

  // Parse the text field data
  videoData.split("\n").forEach((line) => {
    let [url, start = "0", end = "99999"] = line.split(",");
    if (url && start && end) {
      const id = url.split("v=")[1].split("&")[0];//remove time stamps and playlist id stuff
      videos.push({ id, start: parseInt(start), end: parseInt(end) });
    }
  });

  // Initialize the YouTube Player after loading the videos
  if (videos.length > 0) {
    shuffleArray(videos);
    onYouTubeIframeAPIReady();
  }
});

document.getElementById("genshin").addEventListener("click", () => {
  fetch("genshin.txt")
    .then((response) => response.text())
    .then((data) => {
      // Parse the text file line by line
      data.split("\n").forEach((line) => {
        const [url, start, end] = line.split(",");
        if (url && start && end) {
          const id = url.split("v=")[1];
          videos.push({ id, start: parseInt(start), end: parseInt(end) });
        }
      });

      // Initialize the YouTube Player after loading the videos
      if (videos.length > 0) {
        shuffleArray(videos);
        onYouTubeIframeAPIReady();
      }
    });
});

document.getElementById("minecraft").addEventListener("click", () => {
  fetch("minecraft.txt")
    .then((response) => response.text())
    .then((data) => {
      // Parse the text file line by line
      data.split("\n").forEach((line) => {
        const [url, start, end] = line.split(",");
        if (url && start && end) {
          const id = url.split("v=")[1];
          videos.push({ id, start: parseInt(start), end: parseInt(end) });
        }
      });

      // Initialize the YouTube Player after loading the videos
      if (videos.length > 0) {
        shuffleArray(videos);
        onYouTubeIframeAPIReady();
      }
    });
});

document.getElementById("honkai").addEventListener("click", () => {
  fetch("honkai.txt")
    .then((response) => response.text())
    .then((data) => {
      // Parse the text file line by line
      data.split("\n").forEach((line) => {
        const [url, start, end] = line.split(",");
        if (url && start && end) {
          const id = url.split("v=")[1];
          videos.push({ id, start: parseInt(start), end: parseInt(end) });
        }
      });

      // Initialize the YouTube Player after loading the videos
      if (videos.length > 0) {
        shuffleArray(videos);
        onYouTubeIframeAPIReady();
      }
    });
});

document.getElementById("favorites").addEventListener("click", () => {
  fetch("favorites.txt")
    .then((response) => response.text())
    .then((data) => {
      // Parse the text file line by line
      data.split("\n").forEach((line) => {
        const [url, start, end] = line.split(",");
        if (url && start && end) {
          const id = url.split("v=")[1];
          videos.push({ id, start: parseInt(start), end: parseInt(end) });
        }
      });

      // Initialize the YouTube Player after loading the videos
      if (videos.length > 0) {
        shuffleArray(videos);
        onYouTubeIframeAPIReady();
      }
    });
});

document.getElementById("others").addEventListener("click", () => {
  fetch("others.txt")
    .then((response) => response.text())
    .then((data) => {
      // Parse the text file line by line
      data.split("\n").forEach((line) => {
        const [url, start, end] = line.split(",");
        if (url && start && end) {
          const id = url.split("v=")[1];
          videos.push({ id, start: parseInt(start), end: parseInt(end) });
        }
      });

      // Initialize the YouTube Player after loading the videos
      if (videos.length > 0) {
        shuffleArray(videos);
        onYouTubeIframeAPIReady();
      }
    });
});

document.getElementById("mixed").addEventListener("click", () => {
  fetch("honkai.txt")
    .then((response) => response.text())
    .then((data) => {
      data.split("\n").forEach((line) => {
        const [url, start, end] = line.split(",");
        if (url && start && end) {
          const id = url.split("v=")[1];
          videos.push({ id, start: parseInt(start), end: parseInt(end) });
        }
      });
    })
    .finally(() => {
      fetch("genshin.txt")
        .then((response) => response.text())
        .then((data) => {
          data.split("\n").forEach((line) => {
            const [url, start, end] = line.split(",");
            if (url && start && end) {
              const id = url.split("v=")[1];
              videos.push({ id, start: parseInt(start), end: parseInt(end) });
            }
          });
        })
        .finally(() => {
          if (videos.length > 0) {
            shuffleArray(videos);
            onYouTubeIframeAPIReady();
          }
        });
    });
});

document.getElementById("everything").addEventListener("click", () => {
  fetch("genshin.txt")
    .then((response) => response.text())
    .then((data) => {
      data.split("\n").forEach((line) => {
        const [url, start, end] = line.split(",");
        if (url && start && end) {
          const id = url.split("v=")[1];
          videos.push({ id, start: parseInt(start), end: parseInt(end) });
        }
      });
    })
    .finally(() => {
      fetch("honkai.txt")
        .then((response) => response.text())
        .then((data) => {
          data.split("\n").forEach((line) => {
            const [url, start, end] = line.split(",");
            if (url && start && end) {
              const id = url.split("v=")[1];
              videos.push({ id, start: parseInt(start), end: parseInt(end) });
            }
          });
        })
        .finally(() => {
          fetch("others.txt")
            .then((response) => response.text())
            .then((data) => {
              data.split("\n").forEach((line) => {
                const [url, start, end] = line.split(",");
                if (url && start && end) {
                  const id = url.split("v=")[1];
                  videos.push({ id, start: parseInt(start), end: parseInt(end) });
                }
              });
            })
            .finally(() => {
              if (videos.length > 0) {
                shuffleArray(videos);
                onYouTubeIframeAPIReady();
              }
            });
        });
    });
});

document.getElementById("gura").addEventListener("click", () => {
  fetch("gura.txt")
    .then((response) => response.text())
    .then((data) => {
      // Parse the text file line by line
      data.split("\n").forEach((line) => {
        const [url, start, end, name] = line.split(",");
        if (url && start && end) {
          const id = url.split("v=")[1];
          videos.push({ id, start: parseInt(start), end: parseInt(end) });
        }
      });

      // Initialize the YouTube Player after loading the videos
      if (videos.length > 0) {
        shuffleArray(videos);
        onYouTubeIframeAPIReady();
      }
    });
});

document.getElementById("test").addEventListener("click", ()=>{
  fetchWebpage().then(data=>{
    data.forEach(item=>{
      const [url, start, end, desc] = item.split(",");
      if (url && start && end) {
        const id = url.split("v=")[1];
        videos.push({ id, start: parseInt(start), end: parseInt(end), desc });
      }
    });
    if (videos.length > 0) {
      shuffleArray(videos);
      onYouTubeIframeAPIReady();
    }
  });
});

function onYouTubeIframeAPIReady() {
  log("YouTube IFrame API Ready");
  player = new YT.Player("player", {
    height: "315",
    width: "560",
    videoId: videos[currentVideoIndex].id,
    playerVars: {
      start: videos[currentVideoIndex].start,
      end: videos[currentVideoIndex].end,
      autoplay: 1,
      controls: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
      onError: onPlayerError,
    },
  });
}

function onPlayerReady(event) {
  log("Player Ready");
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  log("Player State: " + event.data);
  if (event.data == YT.PlayerState.ENDED) {
    //log("Video Ended");
    //loadNextVideo();
    if (loopCheckbox && loopCheckbox.checked) {
      log("Looping current video");
      // Restart the current video from its defined start time
        const currentVideo = videos[currentVideoIndex];
        player.seekTo(currentVideo.start, true); // Seek to the start time
        player.playVideo(); // Play the video again
      } else {
        log("Video Ended");
        loadNextVideo();
      }
  }
}

function onPlayerError(event) {
  log("Player Error: " + event.data);
}

function loadNextVideo() {
  if (player) {
    player.destroy(); // Destroy the existing player instance
    console.log("Previous player instance destroyed.");
  }
  currentVideoIndex++;
  log("Video number : " + currentVideoIndex);
  if (currentVideoIndex < videos.length) {
    var nextVideo = videos[currentVideoIndex];
    log("Next video: " + JSON.stringify(nextVideo));
    player = new YT.Player("player", {
      height: "315",
      width: "560",
      videoId: nextVideo.id,
      playerVars: {
        start: nextVideo.start,
        end: nextVideo.end,
        autoplay: 1,
        controls: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        onError: onPlayerError,
      },
    });
  } else {
    if (loopPlaylistCheckbox && loopPlaylistCheckbox.checked) {
      log("Looping playlist");
      currentVideoIndex = -1; // Reset index for new playlist
      loadNextVideo();
    }
    else {
      log("Playlist ended");
    }
  }
}

function loadPreviousVideo() {
  if (currentVideoIndex>1){
    currentVideoIndex-=2;
    loadNextVideo();
  }else{
    currentVideoIndex=-1;
    loadNextVideo();
  }
  
}

document.getElementById("previousButton").addEventListener("click", () => {
  log("Previous button clicked");
  loadPreviousVideo();
});

function log(message) {
  console.log(message);
  var debugDiv = document.getElementById("debug");
  debugDiv.innerHTML += message + "<br>";
}


async function fetchWebpage() {
  try {
    const response = await fetch('https://rentry.co/hoduy_hdytclip', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const element = doc.querySelector('.clippy');
    if (element) {
      const value = element.getAttribute('value');
      const array = value.split('\n');
      return array;
    }
  } catch (error) {
    console.error('Error fetching webpage:', error);
    return [];
  }
}