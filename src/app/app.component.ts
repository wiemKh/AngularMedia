import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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

}

