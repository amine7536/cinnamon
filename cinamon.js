var audioPlayer = audioPlayer||{};

audioPlayer.audio = document.querySelector("audio");
audioPlayer.audio.load();

audioPlayer.formatTime = function(time){
  if(isNaN(time)){ return "--:--" }
  var hours = Math.floor(time / 3600);
  var mins  = Math.floor((time % 3600) / 60);
  var secs  = Math.floor(time % 60);
  if(secs < 10){secs = "0" + secs};
  if(hours){
    if (mins < 10) {
      mins = "0" + mins;
    };
    return hours + ":" + mins + ":" + secs;
  } else {
    return mins + ":" + secs;
  };
};

audioPlayer.play = function(){
  if(audioPlayer.audio.paused){
    document.querySelector(".audio-control-play").innerHTML = "<i class=\"fa fa-pause\"></i>";
    audioPlayer.audio.play();
  } else {
    document.querySelector(".audio-control-play").innerHTML = "<i class=\"fa fa-play\"></i>";
    audioPlayer.audio.pause();
  };
};

audioPlayer.pause = function(){audioPlayer.audio.pause()};

audioPlayer.stop = function(){
  audioPlayer.audio.pause();
  audioPlayer.audio.currentTime = 0;
  document.querySelector(".audio-control-play").innerHTML = "<i class=\"fa fa-play\"></i>";
};

audioPlayer.volume = function(vol){audioPlayer.audio.volume = vol};

audioPlayer.resume = function(){audioPlayer.audio.currentTime = 0};

audioPlayer.current = 0;

audioPlayer.onAir = function(){return audioPlayer.audio.children[audioPlayer.current].getAttribute("file-name")};

audioPlayer.next = function(){
  audioPlayer.current++;
  if(audioPlayer.current == audioPlayer.audio.children.length){audioPlayer.current = 0};
  audioPlayer.audio.src = audioPlayer.audio.children[audioPlayer.current].src;
  document.querySelector(".audio-control-play").innerHTML = "<i class=\"fa fa-pause\"></i>";
  audioPlayer.audio.play();
};

audioPlayer.prev = function(){
  audioPlayer.current--;
  if(audioPlayer.current < 0){audioPlayer.current = audioPlayer.audio.children.length - 1};
  audioPlayer.audio.src = audioPlayer.audio.children[audioPlayer.current].src;
  document.querySelector(".audio-control-play").innerHTML = "<i class=\"fa fa-pause\"></i>";
  audioPlayer.audio.play();
};

audioPlayer.init = function(){
  var warpper = document.createElement("DIV");
  warpper.classList.add("cinamon");

  var container = document.createElement("DIV");
  container.classList.add("audio-player");

  var prev = document.createElement("DIV");
  prev.classList.add("audio-control-button");
  prev.onclick = audioPlayer.prev;
  prev.innerHTML = "<i class=\"fa fa-fast-backward\"></i>";
  prev.title = "Previous";
  container.appendChild(prev);

  var play = document.createElement("DIV");
  play.classList.add("audio-control-button");
  play.classList.add("audio-control-play");
  play.onclick = audioPlayer.play;
  play.innerHTML = "<i class=\"fa fa-play\"></i>";
  play.title = "Play";
  container.appendChild(play);

  var stop = document.createElement("DIV");
  stop.classList.add("audio-control-button");
  stop.onclick = audioPlayer.stop;
  stop.innerHTML = "<i class=\"fa fa-stop\"></i>";
  stop.title = "Stop";
  container.appendChild(stop);

  var next = document.createElement("DIV");
  next.classList.add("audio-control-button");
  next.onclick = audioPlayer.next;
  next.innerHTML = "<i class=\"fa fa-fast-forward\"></i>";
  next.title = "Next";
  container.appendChild(next);

  var thumb = document.createElement("DIV");
  thumb.classList.add("audio-control-thumb");
  var img = document.createElement("IMG");
  img.classList.add("audio-control-img");
  img.src = audioPlayer.audio.children[audioPlayer.current].getAttribute("file-thumb");
  thumb.appendChild(img);
  container.appendChild(thumb);

  var display = document.createElement("DIV");
  display.classList.add("audio-control-display");
  var title = document.createElement("DIV");
  title.classList.add("audio-control-title");
  title.innerHTML = audioPlayer.audio.children[audioPlayer.current].getAttribute("file-name");
  display.appendChild(title);
  var timer = document.createElement("DIV");
  timer.classList.add("audio-control-timer");
  timer.innerHTML = audioPlayer.formatTime(audioPlayer.audio.duration);
  display.appendChild(timer);
  var progress = document.createElement("DIV");
  progress.classList.add("audio-control-progress");
  display.appendChild(progress);
  var seeker = document.createElement("DIV");
  seeker.classList.add("audio-control-seeker");
  seeker.classList.add("audio-control-hide");
  display.appendChild(seeker);

  container.appendChild(display);

  var volume = document.createElement("DIV");
  volume.classList.add("audio-control-button");
  volume.onmouseover = function(){
    document.querySelector(".audio-slider-container").classList.toggle("audio-control-hide");
  };
  volume.onclick = function(){
    if(audioPlayer.audio.muted) {
      audioPlayer.audio.muted = false;
      this.innerHTML = "<i class=\"fa fa-volume-up\"></i>";
      this.title = "Click to mute the player";
    } else {
      audioPlayer.audio.muted = true;
      this.innerHTML = "<i class=\"fa fa-volume-off\"></i>";
      this.title = "Click to unmute the player";
    };
  };
  volume.innerHTML = "<i class=\"fa fa-volume-up\"></i>";
  volume.title = "Click to mute the player";
  container.appendChild(volume);

  var sliderContainer = document.createElement("DIV");
  sliderContainer.classList.add("audio-slider-container");
  var slider = document.createElement("INPUT");
  slider.classList.add("audio-control-slider");
  slider.type = "range";
  slider.step = "any";
  slider.min = 0;
  slider.max = 1;
  slider.value = .5;
  slider.setAttribute("orient", "vertical");
  sliderContainer.appendChild(slider);
  sliderContainer.classList.toggle("audio-control-hide");
  container.appendChild(sliderContainer);

  var list = document.createElement("DIV");
  list.classList.add("audio-control-button");
  list.classList.add("audio-control-list");
  list.onclick = function(){
    document.querySelector(".audio-control-playlist").classList.toggle("audio-control-hide");
    if(this.innerHTML == "<i class=\"fa fa-bars\"></i>"){
      this.innerHTML = "<i class=\"fa fa-times\"></i>";
    } else {
      this.innerHTML = "<i class=\"fa fa-bars\"></i>";
    };
  };
  list.innerHTML = "<i class=\"fa fa-bars\"></i>";
  list.title = "Playlist";
  container.appendChild(list);

  var mini = document.createElement("DIV");
  mini.classList.add("audio-control-button");
  mini.classList.add("audio-control-minif");
  mini.onclick = function(){audioPlayer.shift()};
  mini.innerHTML = "<i class=\"fa fa-toggle-left\"></i>";
  mini.title = "Click to expand or collapse the player"
  container.appendChild(mini);

  warpper.appendChild(container);

  var playlist = document.createElement("DIV");
  playlist.classList.add("audio-control-playlist");
  for(i=0;i<audioPlayer.audio.children.length;i++){
    var song = document.createElement("DIV");
    song.classList.add("audio-control-song");
    song.setAttribute("file-src", audioPlayer.audio.children[i].src);
    song.setAttribute("file-position", i);

    song.onclick = function(){
      var list = document.querySelectorAll(".audio-control-song");
      if(audioPlayer.audio.paused||audioPlayer.current != this.getAttribute("file-position")){
        if(audioPlayer.current != this.getAttribute("file-position")){
          audioPlayer.current = this.getAttribute("file-position")
          audioPlayer.audio.src = this.getAttribute("file-src");
          for(i=0;i<list.length;i++){
            list[i].classList.remove("audio-control-selected");
          };
          this.classList.add("audio-control-selected");
        };
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      };
    };
    playlist.appendChild(song);
  };
  playlist.classList.toggle("audio-control-hide");

  warpper.appendChild(playlist);

  var tooltip = document.createElement("DIV");
  tooltip.classList.add("audio-control-tooltip");
  tooltip.classList.add("audio-control-hide");
  var tip = document.createElement("SPAN");
  tooltip.appendChild(tip);

  warpper.appendChild(tooltip);

  document.body.appendChild(warpper);

  document.querySelector(".audio-control-title").innerHTML = audioPlayer.onAir();
};

audioPlayer.init();

audioPlayer.initPlaylist = function(){
  var songs = document.querySelectorAll(".audio-control-song");
  for(i=0;i<songs.length;i++){
    songs[i].innerHTML = "<span>" + i + "</span>";
    songs[i].innerHTML += "<span>" + audioPlayer.audio.children[i].getAttribute("file-name") + "</span>";
    songs[i].innerHTML += "<span>" + audioPlayer.audio.children[i].getAttribute("file-author") + "</span>";
    songs[i].innerHTML += "<span>--:--</span>";
  };
};

audioPlayer.initPlaylist();

audioPlayer.audio.onplay = function(){
  document.querySelector(".audio-control-title").innerHTML = audioPlayer.onAir();
  document.querySelectorAll(".audio-control-song span:nth-child(4)")[audioPlayer.current].innerHTML = audioPlayer.formatTime(audioPlayer.audio.duration);
  var songs = document.querySelectorAll(".audio-control-song");
  for(i=0;i<songs.length;i++){
    songs[i].classList.remove("audio-control-selected");
  };
  songs[audioPlayer.current].classList.add("audio-control-selected");
};

audioPlayer.audio.onloadedmetadata = function(){
  document.querySelector(".audio-control-timer").innerHTML = audioPlayer.formatTime(audioPlayer.audio.duration);
  document.querySelectorAll(".audio-control-song span:nth-child(4)")[audioPlayer.current].innerHTML = audioPlayer.formatTime(audioPlayer.audio.duration);
};

audioPlayer.audio.ontimeupdate = function(){
  var progress = audioPlayer.audio.currentTime / audioPlayer.audio.duration * 100;
  document.querySelector(".audio-control-progress").style.width = progress + "%";
  document.querySelector(".audio-control-timer").innerHTML = audioPlayer.formatTime(audioPlayer.audio.currentTime) + " (" + Math.floor(progress) + "%) " + audioPlayer.formatTime(audioPlayer.audio.duration);
  document.querySelector(".audio-control-img").src = audioPlayer.audio.children[audioPlayer.current].getAttribute("file-thumb");
};

audioPlayer.audio.onended = function(){
  audioPlayer.next();
};

document.querySelector(".audio-control-display").onclick = function(e){
  var position = (e.pageX - this.offsetLeft) / this.offsetWidth;
  audioPlayer.audio.currentTime = audioPlayer.audio.duration * position;
};

document.querySelector(".audio-control-display").onmousemove = function(e){
  var position = (e.pageX - this.offsetLeft) / this.offsetWidth;
  document.querySelector(".audio-control-seeker").style.display = "flex";
  document.querySelector(".audio-control-seeker").style.width = position * 100 + "%";
  document.querySelector(".audio-control-tooltip span").innerHTML = audioPlayer.formatTime(audioPlayer.audio.duration * position);
  document.querySelector(".audio-control-tooltip").style.left = e.pageX + "px";
  document.querySelector(".audio-control-tooltip").style.display = "flex";
};

document.querySelector(".audio-control-display").onmouseout = function(){
  document.querySelector(".audio-control-seeker").style.display = "none";
  document.querySelector(".audio-control-tooltip").style.display = "none";
};

document.querySelector(".audio-control-slider").onchange = function(){
  audioPlayer.volume(this.value);
};

document.querySelector(".audio-control-slider").oninput = function(){
  audioPlayer.volume(this.value);
};

audioPlayer.mini = false;

audioPlayer.shift = function(){
  if(!audioPlayer.mini){
    document.querySelector(".audio-player").classList.add("audio-control-shift");
    document.querySelector(".audio-control-playlist").classList.add("audio-control-hide");
    document.querySelector(".audio-control-list").innerHTML = "<i class=\"fa fa-bars\"></i>";
    document.querySelector(".audio-slider-container").classList.add("audio-control-hide");
    document.querySelector(".audio-control-display").classList.add("audio-control-hide");
    var buttons = document.querySelectorAll(".audio-control-button");
    for(i=0;i<buttons.length;i++){
      buttons[i].classList.add("audio-control-hide");
    };
    document.querySelector(".audio-control-play").classList.remove("audio-control-hide");
    document.querySelector(".audio-control-play").classList.add("audio-control-mini");
    document.querySelector(".audio-control-minif").classList.remove("audio-control-hide");
    document.querySelector(".audio-control-minif").innerHTML = "<i class=\"fa fa-toggle-right\"></i>";
    audioPlayer.mini = true;
  } else {
    document.querySelector(".audio-player").classList.remove("audio-control-shift");
    document.querySelector(".audio-control-display").classList.remove("audio-control-hide");
    document.querySelector(".audio-control-play").classList.remove("audio-control-mini");
    document.querySelector(".audio-control-minif").innerHTML = "<i class=\"fa fa-toggle-left\"></i>";
    var buttons = document.querySelectorAll(".audio-control-button");
    for(i=0;i<buttons.length;i++){
      buttons[i].classList.remove("audio-control-hide");
    };
    audioPlayer.mini = false;
  };
};
