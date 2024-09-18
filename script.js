var player;
var videos = [];
var currentVideoIndex = 0;

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

document.getElementById("playButton").addEventListener("click", () => {
  const videoData = document.getElementById("videoData").value;

  // Parse the text field data
  videoData.split("\n").forEach((line) => {
    const [url, start, end] = line.split(",");
    if (url && start && end) {
      const id = url.split("v=")[1];
      videos.push({ id, start: parseInt(start), end: parseInt(end) });
    }
  });

  // Initialize the YouTube Player after loading the videos
  if (videos.length > 0) {
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
    log("Playlist ended");
  }
}

function log(message) {
  console.log(message);
  var debugDiv = document.getElementById("debug");
  debugDiv.innerHTML += message + "<br>";
}
