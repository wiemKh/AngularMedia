import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { setHours, setMinutes, setSeconds, addSeconds } from 'date-fns';

declare var MediaRecorder: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayAudioPlayer: boolean = false;
  displayStopAudio: boolean = false
  getAudioBlob: any
  getUrlAudio: any
  myaudiourl: any
  media: any
  displayVideoPlayer:any
  displayStopVideo:any
  video:any
  MediaRecorderobj:any
  recordedChunks:any
  stream1:any
  currettime:any
  refreshIntervalId:any
  getBlobVideo:any
  myurl:any
  title = 'AngularMedia';

  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  /* Enregistrement Audio */
  start() {
    this.displayAudioPlayer = false
    this.displayStopAudio = true
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.start();
        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });
        mediaRecorder.addEventListener("stop", (event2) => {
          if (stream)
            stream.getTracks() // get all tracks from the MediaStream
              .forEach(track => track.stop()); // stop each of them
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          this.getAudioBlob = audioBlob
          const audioUrl = URL.createObjectURL(audioBlob);
          this.getUrlAudio = audioUrl
          this.myaudiourl = this.sanitizer.bypassSecurityTrustResourceUrl(audioUrl)
          const audio = new Audio(audioUrl);


        });
        this.media = mediaRecorder
      });
  }
  /* terminer le record Audio */
  stopRecord() {
    this.media.stop();
    this.displayAudioPlayer = true;
  }

   /* Enregistrement video */
   startVideo() {
    this.displayVideoPlayer = false;
    this.displayStopVideo = true
    this.video = <HTMLVideoElement>document.getElementById('video');
    let self = this
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (stream) {
        self.MediaRecorderobj = new MediaRecorder(stream, { mimeType: "video/webm" });
        self.recordedChunks = [];
        self.MediaRecorderobj.ondataavailable =
          (event) => { self.recordedChunks.push(event.data); };
        self.MediaRecorderobj.start(100);
        // self.video.src = window.URL.createObjectURL(stream); //createObjectURL is deprecated for Google Chrome
        self.video.srcObject = stream;
        self.stream1 = stream;
        self.video.play();

        self.video.muted = false;
      });
    }
    this.currettime = setHours(setMinutes(setSeconds(new Date(), 0), 0), 0)
    this.refreshIntervalId = setInterval(function () {
      self.currettime = addSeconds(self.currettime, 1)
    }, 1000);
  }
  /* terminer le record video */
  stopVideo() {
    this.stream1.getTracks().forEach(track => { track.stop(); });
    var blob = new Blob(this.recordedChunks, { type: "video/webm" });
    this.getBlobVideo = blob
    var url = URL.createObjectURL(blob);

    this.myurl = this.sanitizer.bypassSecurityTrustResourceUrl(url)
    clearInterval(this.refreshIntervalId)
    this.currettime = 0
    let video = <HTMLVideoElement>document.getElementById('video');
    video.pause();
    this.displayVideoPlayer = true
  //  this.uploadVideo(event)
  }

}

