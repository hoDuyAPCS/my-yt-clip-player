var player;
var videos = [];
var currentVideoIndex = 0;
let history = [];
let playlistContainer = document.getElementById('playlist-container');

document.getElementById("skipButton").addEventListener("click", () => {
  log("Skip button clicked");
  if (player) {
    const videoDuration = player.getDuration(); // Get the duration of the current video
    player.seekTo(videoDuration, true); // Seek to the end of the video
  }
});

function showPlaylist() {
  }
  
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
//             initializePlayer();
//         }
//     });

document.getElementById("playButton").addEventListener("click", () => {
  const videoData = document.getElementById("videoData").value;

  // Parse the text field data
  videoData.split("\n").forEach((line) => {
    let [url, start = "0", end = "99999"] = line.split(",");
    if (url && start && end) {
      const id = url.split("v=")[1];
      videos.push({ id, start: parseInt(start), end: parseInt(end) });
    }
  });

  // Initialize the YouTube Player after loading the videos
  if (videos.length > 0) {
    initializePlayer();
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
        initializePlayer();
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
        initializePlayer();
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
        initializePlayer();
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
        initializePlayer();
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
            initializePlayer();
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
                initializePlayer();
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
        initializePlayer();
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
      initializePlayer();
    }
  });
});

function initializePlayer(videoId = "Ladu1Innw_Y", start, end) {
  log("YouTube IFrame API Ready");
  const video = { videoId: videoId, start: start, end: end };
  console.log("Playing video:", video);
  
  player = new YT.Player("video-container", {
    height: "315",
    width: "560",
    videoId: videoId,
    playerVars: {
      start: start,
      end: end,
      autoplay: 1,
      controls: 1,
    },
    events: {
      onReady: onPlayerReady, // Triggered when the player is ready
      onStateChange: (event) => onPlayerStateChange(event, video), // Pass the video object
      onError: onPlayerError, // Triggered if an error occurs during playback
    },
  });
}


function onPlayerReady(event) {
  log("Player Ready");
  event.target.playVideo();
}

function onPlayerStateChange(event, video) {
  log("Player State: " + event.data);
  
  if (event.data == YT.PlayerState.ENDED) {
    history.push(video);
    console.log("History:", history);
    log("Video Ended");
    loadNextVideo();
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
  log("Video number: " + currentVideoIndex);
  
  if (currentVideoIndex < videos.length) {
    const nextVideo = videos[currentVideoIndex];
    log("Next video: " + JSON.stringify(nextVideo));
    initializePlayer(nextVideo.id, nextVideo.start, nextVideo.end);
  } else {
    log("Playlist ended");
  }
}

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