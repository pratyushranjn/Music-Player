document.addEventListener('DOMContentLoaded', function() {
    const songList = document.querySelector('.song-list');
    const playButton = document.getElementById('play');
    const seekBar = document.querySelector('.seekbar');
    const dot = document.querySelector('.dot');
    let currentSong = 0;
    let audio = new Audio();
    let songs = [];

    
    fetch('/music')
        .then(response => response.json())
        .then(data => {
            songs = data;
            updateSongDisplay();
        })
        .catch(err => console.error('Error fetching songs:', err));

  
    function updateSongDisplay() {
        const song = songs[currentSong];
        document.querySelector('.song-name').innerText = song.replace('.mp3', '');
        audio.src = `music/${song}`;
        audio.load();
        document.querySelector('.img').src = 'assets/cover.png'; 
    }

    // Play/Pause button
    playButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playButton.classList.replace('fa-play', 'fa-pause');
        } else {
            audio.pause();
            playButton.classList.replace('fa-pause', 'fa-play');
        }
    });

    // Next button
    document.getElementById('next').addEventListener('click', () => {
        currentSong = (currentSong + 1) % songs.length;
        updateSongDisplay();
        audio.play();
    });

    // Previous button
    document.getElementById('prev').addEventListener('click', () => {
        currentSong = (currentSong - 1 + songs.length) % songs.length;
        updateSongDisplay();
        audio.play();
    });

    // Seekbar
    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        dot.style.left = `${progress}%`; 
    });
    
    seekBar.addEventListener('click', (e) => {
        const rect = seekBar.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const width = rect.width;
        const percentage = offsetX / width;
        const newTime = percentage * audio.duration;
        audio.currentTime = newTime;
    });
});


// Theme styling
let body = document.querySelector("body");
let theme = document.querySelector("#theme");
let currentTheme = 0; 

const themes = [
    "linear-gradient(to right, #00dbde 0%, #fc00ff 100%)",
    "linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)",
    "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
     "linear-gradient(60deg, #3d3393 0%, #2b76b9 37%, #2cacd1 65%, #35eb93 100%)"
];

theme.addEventListener("click", () => {
    theme.classList.add("color"); 
    currentTheme = (currentTheme + 1) % themes.length;
    body.style.backgroundImage = themes[currentTheme];
});