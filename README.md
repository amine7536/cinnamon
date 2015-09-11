# Cinnamon
A nice lightweight nifty HTML5 &amp; Javascript audio player that helps you pimp your web sites in a reasonable manner.

## Usage
Cinnamon audio player relies on the html <audio> tag to create a player with its features. It is easy yo setup in 3 steps: all you have to do is to copy the files in your project directory and setup the proper tags. First include the fonts in your html head then import Cinnamon's CSS file. Then create an audio tag with as many sources as you want. Don't forget to fill Cinnamon's custom attributes (see additional settings). Finally call up Cinnamon's scripts before closing your body tag. Nothing more, your player is fixed down the page.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    ...
    <!-- Insert Cinnamon audio player css and fonts here -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="cinnamon.css">
    <!-- End -->
    ...
  </head>
  <body>
  ...
    <!-- Insert your audio tag (only 1 per page) somewhere in your body -->
    <audio>
      <source file-thumb="album-01.jpg" file-name="Track 01" file-author="Author 01" src="demo1.mp3" type="audio/mpeg">
      <source file-thumb="album-02.jpg" file-name="Track 02" file-author="Author 02" src="demo2.mp3" type="audio/mpeg">
      <source file-thumb="album-03.jpg" file-name="Track 03" file-author="Author 03" src="demo3.mp3" type="audio/mpeg">
      <source file-thumb="album-04.jpg" file-name="Track 04" file-author="Author 04" src="demo4.mp3" type="audio/mpeg">
      <source file-thumb="album-05.jpg" file-name="Track 05" file-author="Author 05" src="acdc.ogg" type="audio/ogg">
      Your browser does not support the audio element.
    </audio>
    <!-- End -->
    ...
    <!-- Call up Cinnamon audio player scripts here -->
    <script src="cinnamon.js"></script>
    <!-- End -->
  ...
  </body>
</html>
```
##Additional settings

Cinnamon uses custom attributes to display each song's features. You can easily customize your player through them:

* file-thumb: the url of the album's thumbnail
* file-name: the title displayed on the player
* file-author: the author of the track

Don't let them blank. They will be used to pimp the interface on each song's change.

```html
<audio>
  <source file-thumb="album-01.jpg" file-name="Track 01" file-author="Author 01" src="demo1.mp3" type="audio/mpeg">
  ...
</audio>
```

##CSS rules

In order to function properly, Cinnamon's needs some CSS directives to be set on. Whatever is your setup for your project make sure you have the following going on.

```css
* {
  box-sizing: border-box;
}
html, body {
  width: 100%;
  margin: 0;
  padding: 0;
}
```
Tested on Chromium Browser Version 44.0.2 & Mozilla Firefox Version 40.0.3 (checkout [Midori](https://github.com/adilbenseddik/cinnamon/tree/midori)'s branch for Safari fixes)
