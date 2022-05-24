// TRACKS (VUE)
new Vue({
  el: "#app",
  data() {
      return {
          audio: null,
          circleLeft: null,
          barWidth: null,
          duration: null,
          currentTime: null,
          isTimerPlaying: false,
          tracks: [
              {
                  name: "Savior ft. Baby Keem & Sam Dew",
                  artist: "Kendrick Lamar",
                  cover: "https://github.com/rafaelbarretodev/music-songs/raw/main/mp3/image1.jpeg",
                  source: "https://github.com/rafaelbarretodev/music-songs/raw/main/mp3/CD%202/2-05%20.mp3",
                  url: "https://www.youtube.com/watch?v=HTAQxUXq674",
                  favorited: false
              },
              {
                  name: "Crown",
                  artist: "Kendrick Lamar",
                  cover: "https://github.com/rafaelbarretodev/music-songs/raw/main/mp3/image2.jpeg",
                  source: "https://github.com/rafaelbarretodev/music-songs/raw/main/mp3/CD%202/2-02%20.mp3",
                  url: "https://www.youtube.com/watch?v=eL1L287YbkQ",
                  favorited: true
              },
              {
                  name: "Count Me Out",
                  artist: "Kendrick Lamar",
                  cover: "https://github.com/rafaelbarretodev/music-songs/raw/main/mp3/image3.jpeg",
                  source: "https://github.com/rafaelbarretodev/music-songs/raw/main/mp3/CD%202/2-01%20.mp3",
                  url: "https://www.youtube.com/watch?v=6nTcdw7bVdc",
                  favorited: false
              },
              {
                  name: "Mirror",
                  artist: "Kendrick Lamar",
                  cover: "https://github.com/rafaelbarretodev/music-songs/raw/main/mp3/image4.jpeg",
                  source: "https://github.com/rafaelbarretodev/music-songs/raw/main/mp3/CD%202/2-09%20.mp3",
                  url: "https://www.youtube.com/watch?v=OqR71_BYS-c",
                  favorited: false
              },
              {
                  name: "Rich Spirit",
                  artist: "Kendrick Lamar",
                  cover: "https://github.com/rafaelbarretodev/music-songs/raw/main/mp3/image5.jpeg",
                  source: "https://github.com/rafaelbarretodev/music-songs/raw/main/mp3/CD%201/1-07%20.mp3",
                  url: "https://www.youtube.com/watch?v=hl3-ZPg-JAA",
                  favorited: true
              },
              {
                  name: "We Cry Together",
                  artist: "Kendrick Lamar",
                  cover: "https://github.com/rafaelbarretodev/music-songs/raw/main/mp3/image6.jpeg",
                  source: "https://github.com/rafaelbarretodev/music-songs/raw/main/mp3/CD%201/1-08%20.mp3",
                  url: "https://www.youtube.com/watch?v=C_s9JJnqQqM",
                  favorited: false
               },
               {
                name: "U Are My High",
                artist: "DJ SNAKE",
                cover: "https://github.com/rafaelbarretodev/music-songs/raw/main/mp3/DJ%20SNAKE.jpeg",
                source: "https://github.com/rafaelbarretodev/music-songs/raw/main/mp3/snake.mp3",
                url: "https://www.youtube.com/watch?v=dbJ55eUlw3A",
                favorited: false
             }
          ],
          currentTrack: null,
          currentTrackIndex: 0,
          transitionName: null
      };
  },
  // METHOD
  methods: {
      play() {
          if (this.audio.paused) {
              this.audio.play();
              this.isTimerPlaying = true;
          } else {
              this.audio.pause();
              this.isTimerPlaying = false;
          }
      },
      // GENERATE TIME
      generateTime() {
          let width = (100 / this.audio.duration) * this.audio.currentTime;
          this.barWidth = width + "%";
          this.circleLeft = width + "%";
          let durmin = Math.floor(this.audio.duration / 60);
          let dursec = Math.floor(this.audio.duration - durmin * 60);
          let curmin = Math.floor(this.audio.currentTime / 60);
          let cursec = Math.floor(this.audio.currentTime - curmin * 60);
          if (durmin < 10) {
              durmin = "0" + durmin;
          }
          if (dursec < 10) {
              dursec = "0" + dursec;
          }
          if (curmin < 10) {
              curmin = "0" + curmin;
          }
          if (cursec < 10) {
              cursec = "0" + cursec;
          }
          this.duration = durmin + ":" + dursec;
          this.currentTime = curmin + ":" + cursec;
      },
      // UPDATE BAR
      updateBar(x) {
          let progress = this.$refs.progress;
          let maxduration = this.audio.duration;
          let position = x - progress.offsetLeft;
          let percentage = (100 * position) / progress.offsetWidth;
          if (percentage > 100) {
              percentage = 100;
          }
          if (percentage < 0) {
              percentage = 0;
          }
          this.barWidth = percentage + "%";
          this.circleLeft = percentage + "%";
          this.audio.currentTime = (maxduration * percentage) / 100;
          this.audio.play();
      },
      // CLICK PROGRESS
      clickProgress(e) {
          this.isTimerPlaying = true;
          this.audio.pause();
          this.updateBar(e.pageX);
      },
      // PREVIOUS TRACK
      prevTrack() {
          this.transitionName = "scale-in";
          this.isShowCover = false;
          if (this.currentTrackIndex > 0) {
              this.currentTrackIndex--;
          } else {
              this.currentTrackIndex = this.tracks.length - 1;
          }
          this.currentTrack = this.tracks[this.currentTrackIndex];
          this.resetPlayer();
      },
      // NEXT TRACK
      nextTrack() {
          this.transitionName = "scale-out";
          this.isShowCover = false;
          if (this.currentTrackIndex < this.tracks.length - 1) {
              this.currentTrackIndex++;
          } else {
              this.currentTrackIndex = 0;
          }
          this.currentTrack = this.tracks[this.currentTrackIndex];
          this.resetPlayer();
      },
      // RESET PLAYER
      resetPlayer() {
          this.barWidth = 0;
          this.circleLeft = 0;
          this.audio.currentTime = 0;
          this.audio.src = this.currentTrack.source;
          setTimeout(() => {
              if (this.isTimerPlaying) {
                  this.audio.play();
              } else {
                  this.audio.pause();
              }
          }, 300);
      },
      // FAVOURITE
      favorite() {
          this.tracks[this.currentTrackIndex].favorited = !this.tracks[
              this.currentTrackIndex
          ].favorited;
      }
  },
  // CREATED
  created() {
      let vm = this;
      this.currentTrack = this.tracks[0];
      this.audio = new Audio();
      this.audio.src = this.currentTrack.source;
      this.audio.ontimeupdate = function () {
          vm.generateTime();
      };
      this.audio.onloadedmetadata = function () {
          vm.generateTime();
      };
      this.audio.onended = function () {
          vm.nextTrack();
          this.isTimerPlaying = true;
      };


      for (let index = 0; index < this.tracks.length; index++) {
          const element = this.tracks[index];
          let link = document.createElement('link');
          link.rel = "prefetch";
          link.href = element.cover;
          link.as = "image"
          document.head.appendChild(link)
      }
  }
});
