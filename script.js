var player = null;
var videos = [];
var currentVideoIndex = 0;
let history = [];
let playlistContainer = document.getElementById('playlist-container');

function showPlaylist() {
  // Clear any existing content in the playlist container
  playlistContainer.innerHTML = '';

  // Create and append a title
  let title = document.createElement('h3');
  title.textContent = 'Playlist';
  playlistContainer.appendChild(title);

  // Create a list to display videos
  let list = document.createElement('ul');

  // Populate the list with video items and thumbnails
  videos.forEach((video, index) => {
      let listItem = document.createElement('li');
      listItem.style.display = 'flex';
      listItem.style.alignItems = 'center'; // Align items in a row

      // Create thumbnail image
      let thumbnail = document.createElement('img');
      thumbnail.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
      thumbnail.alt = video.title;
      thumbnail.style.width = '120px';
      thumbnail.style.marginRight = '10px';

      // Create index and title text
      let videoIndex = document.createElement('span');
      videoIndex.textContent = `[${index + 1}]`;
      videoIndex.style.fontWeight = 'bold';

      let videoTitle = document.createElement('span');
      videoTitle.textContent = video.title;
      videoTitle.style.fontSize = '16px';  // Optional: Adjust font size
      videoTitle.style.fontWeight = 'bold'

      // Append index, thumbnail, and title to list item
      listItem.appendChild(videoIndex);
      listItem.appendChild(thumbnail);
      listItem.appendChild(videoTitle);
      list.appendChild(listItem);
  });

  // Append the list to the container
  playlistContainer.appendChild(list);
}

document.getElementById("skipButton").addEventListener("click", () => {
  log("Skip button clicked");
  if (player) {
    const videoDuration = player.getDuration(); // Get the duration of the current video
    player.seekTo(videoDuration, true); // Seek to the end of the video
  }
});
function weightedShuffleArray(array) {
  // Calculate the total weight
  const totalWeight = array.reduce((sum, obj) => sum + obj.weight, 0);

  // Assign a random value scaled by the normalized weight to each object
  array.forEach(obj => {
    obj.random = Math.random() * (obj.weight / totalWeight);
  });

  // Sort the array in place based on the random values
  array.sort((a, b) => b.random - a.random);

  // Remove the random property after sorting
  array.forEach(obj => {
    delete obj.random;
  });
}

document.getElementById("shuffleButton").addEventListener("click", function() {
    weightedShuffleArray(videos); // Shuffle the videos array
    showPlaylist(); // Display the shuffled playlist
});

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

function fetchAndProcessVideos(name) {
  return new Promise((resolve, reject) => {
    // Fetch the JSON file
    fetch(`data/${name}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch data from data/${name}.json`);
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        // Process the JSON data
        data.forEach((video) => {
          const { id, start, end, status, weight, title } = video;

          // Check if the video is active (status is "active")
          if (status === "active") {
            // Check if the video ID already exists in the videos array
            const videoExists = videos.some((existingVideo) => existingVideo.id === id);

            // If the video ID does not exist in the array, add it
            if (!videoExists) {
              videos.push({ id, start, end, weight, title });
            }
          }
        });

        console.log("Active videos added to the array:", videos);

        // Resolve the promise after processing
        resolve();
      })
      .catch((error) => {
        console.error("Error processing videos:", error);
        reject(error); // Reject the promise if there's an error
      });
  });
}

document.getElementById("genshin").addEventListener("click", (event) => {
  event.target.disabled = true; // Disable the button
  // Call the fetchAndProcessVideos function with the desired JSON file
  fetchAndProcessVideos("genshin")
    .then(() => {
      // After processing the JSON data, show the playlist
      showPlaylist();
    })
    .catch((error) => {
      console.error("Error processing the genshin data:", error);
    });
});

document.getElementById("honkai").addEventListener("click", (event) => {
  event.target.disabled = true; // Disable the button
  fetchAndProcessVideos("honkai")
  .then(() => {
    // After processing the JSON data, show the playlist
    showPlaylist();
  })
  .catch((error) => {
    console.error("Error processing the honkai data:", error);
  });
});

document.getElementById("favorites").addEventListener("click", (event) => {
  event.target.disabled = true; // Disable the button
  fetchAndProcessVideos("favorites")
  .then(() => {
    // After processing the JSON data, show the playlist
    showPlaylist();
  })
  .catch((error) => {
    console.error("Error processing the favorites data:", error);
  });
});

document.getElementById("others").addEventListener("click", (event) => {
  event.target.disabled = true; // Disable the button
  fetchAndProcessVideos("others")
  .then(() => {
    // After processing the JSON data, show the playlist
    showPlaylist();
  })
  .catch((error) => {
    console.error("Error processing the others data:", error);
  });
});

document.getElementById("mixed").addEventListener("click", (event) => {
  event.target.disabled = true; // Disable the button
  fetchAndProcessVideos("genshin")
  fetchAndProcessVideos("honkai")
  .then(() => {
    // After processing the JSON data, show the playlist
    showPlaylist();
  })
  .catch((error) => {
    console.error("Error processing the mixed data:", error);
  });
});

document.getElementById("everything").addEventListener("click", (event) => {
  event.target.disabled = true; // Disable the button
  fetchAndProcessVideos("genshin")
  fetchAndProcessVideos("honkai")
  fetchAndProcessVideos("others")
  .then(() => {
    // After processing the JSON data, show the playlist
    showPlaylist();
  })
  .catch((error) => {
    console.error("Error processing the everything data:", error);
  });
});

document.getElementById("gura").addEventListener("click", (event) => {
  event.target.disabled = true; // Disable the button
  fetchAndProcessVideos("gura")
  .then(() => {
    // After processing the JSON data, show the playlist
    showPlaylist();
  })
  .catch((error) => {
    console.error("Error processing the gura data:", error);
  });
});

function onYouTubeIframeAPIReady(videoId = "Ladu1Innw_Y", start, end) {
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

function playBilibiliVideo(videoId) {
    // Clear the container
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = ''; // Clear any previous content

    // Create an iframe for the Bilibili video
    const iframe = document.createElement('iframe');
    iframe.src = `https://player.bilibili.com/player.html?bvid=${videoId}`;
    iframe.width = '560';
    iframe.height = '315';
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; fullscreen';

    // Append the iframe to the container
    videoContainer.appendChild(iframe);
}

function playVideos() {
  let index = 0; // Start with the first video

  function playNextVideo() {
    if (index < videos.length) {
      const video = videos[index];
      // Play the current video using the YouTube API function
      onYouTubeIframeAPIReady(video.id, video.start, video.end);
    } 
    else {
      console.log("All videos have been played.");
    }
  }

  playNextVideo(); // Start playing the first video
}

function playPreviousVideo() {
  
  if (history.length > 0) {
    if (player) {
      player.destroy(); // Destroy the existing player instance
      console.log("Previous player instance destroyed.");
    }
    // Remove the last played video from the history
    const previousVideo = history.pop();

    // Play the video using the YouTube API
    onYouTubeIframeAPIReady(previousVideo.videoId, previousVideo.start, previousVideo.end);

    console.log("Playing previous video:", previousVideo);
  } else {
    console.log("No previous videos in the history.");
  }
}

document.getElementById("Previous").addEventListener("click", playPreviousVideo);

document.getElementById("PlayVideos").addEventListener("click", playVideos);

document.getElementById('bilibili').addEventListener('click', () => {
  // Fetch the Bilibili JSON file when the button is clicked
  fetch('bilibili.json')
      .then(response => response.json())  // Parse the JSON response
      .then(data => {
          // Filter and extract video IDs where status is 'active'
          const activeVideoIds = data
              .filter(video => video.status === 'active')  // Only keep active videos
              .map(video => video.id);  // Extract the video ID

          // Log the list of active video IDs
          console.log("List of Active Video IDs:", activeVideoIds);
      })
      .catch(error => {
          console.error("Error fetching Bilibili data:", error);
      });
});

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
    onYouTubeIframeAPIReady(nextVideo.id, nextVideo.start, nextVideo.end);
  } else {
    log("Playlist ended");
  }
}

function log(message) {
  console.log(message);
  var debugDiv = document.getElementById("debug");
  debugDiv.innerHTML += message + "<br>";
}
