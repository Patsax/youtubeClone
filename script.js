const playPauseBtn = document.querySelector(".play-pause-btn");
const miniPlayerBtn = document.querySelector(".mini-player-btn");
const theaterBtn = document.querySelector(".theater-btn");
const fullScreenBtn = document.querySelector(".full-screen-btn");
const muteBtn = document.querySelector(".mute-btn");
const captionsBtn = document.querySelector(".captions-btn");
const speedBtn = document.querySelector(".speed-btn");
const currentTimeElem = document.querySelector(".current-time");
const totalTimeElem = document.querySelector(".total-time");
const volumeSlider = document.querySelector(".volume-slider");
const videoContainer = document.querySelector(".video-container");
const video = document.querySelector("video");

document.addEventListener("keydown", (e) => {
	const tagName = document.activeElement.tagName.toLowerCase();

	if (tagName === "input") return;

	switch (e.key.toLowerCase()) {
		case " ":
			if (tagName === "button") return;
		case "k":
			togglePlay();
			break;
		case "f":
			toggleFullScreenMode();
			break;
		case "t":
			toggleTheaterMode();
			break;
		case "i":
			toggleMiniPlayerMode();
			break;
		case "m":
			toggleMute();
			break;
		case "arrowleft":
		case "j":
			skip(-5);
			break;
		case "arrowright":
		case "l":
			skip(5);
			break;
		case "c":
			toggleCaptions();
			break;
	}
});

// Play Speed
speedBtn.addEventListener("click", changePlaybackSpeed);

function changePlaybackSpeed() {
	let newPlaybackRate = video.playbackRate + 0.25;
	if (newPlaybackRate > 2) newPlaybackRate = 0.25;
	video.playbackRate = newPlaybackRate;
	speedBtn.textContent = `${newPlaybackRate}x`;
}

// Captions
const captions = video.textTracks[0];
captions.mode = "hidden";

captionsBtn.addEventListener("click", toggleCaptions);

function toggleCaptions() {
	const isHidden = captions.mode === "hidden";
	captions.mode = isHidden ? "showing" : "hidden";
	videoContainer.classList.toggle("captions", isHidden);
}

// Time indications
video.addEventListener("loadeddata", () => {
	totalTimeElem.textContent = formatDuration(video.duration);
});

video.addEventListener("timeupdate", () => {
	currentTimeElem.textContent = formatDuration(video.currentTime);
});

const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
	minimumIntegerDigits: 2,
});
function formatDuration(time) {
	const seconds = Math.floor(time % 60);
	const minutes = Math.floor(time / 60) % 60;
	const hours = Math.floor(time / 3600);
	if (hours === 0) {
		return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
	} else {
		return `${hours}:${leadingZeroFormatter.format(
			minutes
		)}:${leadingZeroFormatter.format(seconds)}`;
	}
}

function skip(duration) {
	video.currentTime += duration;
}

// Volume control
muteBtn.addEventListener("click", toggleMute);
volumeSlider.addEventListener("input", (e) => {
	video.volume = e.target.value;
	video.muted = e.target.value === 0;
});

function toggleMute() {
	video.muted = !video.muted;
}

video.addEventListener("volumechange", () => {
	volumeSlider.value = video.volume;
	let volumeLevel;
	if (video.muted || video.volume === 0) {
		volumeSlider.value = 0;
		volumeLevel = "muted";
	} else if (video.volume >= 0.5) {
		volumeLevel = "high";
	} else {
		volumeLevel = "low";
	}

	videoContainer.dataset.volumeLevel = volumeLevel;
});

// View Options
miniPlayerBtn.addEventListener("click", toggleMiniPlayerMode);
theaterBtn.addEventListener("click", toggleTheaterMode);
fullScreenBtn.addEventListener("click", toggleFullScreenMode);

function toggleMiniPlayerMode() {
	if (videoContainer.classList.contains("mini-player")) {
		document.exitPictureInPicture();
	} else {
		video.requestPictureInPicture();
	}
}

function toggleTheaterMode() {
	videoContainer.classList.toggle("theater");
}

function toggleFullScreenMode() {
	if (document.fullscreenElement == null) {
		videoContainer.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
}

document.addEventListener("fullscreenchange", () => {
	videoContainer.classList.toggle("full-screen", document.fullscreenElement);
});

video.addEventListener("enterpictureinpicture", () => {
	videoContainer.classList.add("mini-player");
});

video.addEventListener("leavepictureinpicture", () => {
	videoContainer.classList.remove("mini-player");
});

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
