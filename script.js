const playPauseBtn = document.querySelector(".play-pause-btn");
const miniPlayerBtn = document.querySelector(".mini-player-btn");
const theaterBtn = document.querySelector(".theater-btn");
const fullScreenBtn = document.querySelector(".full-screen-btn");
const videoContainer = document.querySelector(".video-container");
const video = document.querySelector("video");

document.addEventListener("keydown", (e) => {
	switch (e.key.toLowerCase()) {
		case " ":
		case "k":
			togglePlay();
			break;
	}
});

// View Options
miniPlayerBtn.addEventListener("click", toggleMiniPlayerMode);
theaterBtn.addEventListener("click", toggleTheaterMode);
fullScreenBtn.addEventListener("click", toggleFullScreenMode);

function toggleMiniPlayerMode() {}

function toggleTheaterMode() {
    videoContainer.classList.toggle('theater')
}

function toggleFullScreenMode() {}

// Play/Pause options
playPauseBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);

function togglePlay() {
	video.paused ? video.play() : video.pause();
}

video.addEventListener("play", () => {
	videoContainer.classList.remove("paused");
});
video.addEventListener("pause", () => {
	videoContainer.classList.add("paused");
});
