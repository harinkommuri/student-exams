import { Directive, Input, OnInit , ElementRef} from '@angular/core';

declare var YT, videoId;

@Directive({
  selector: '[embeddedVideoId]'
})

export class EmbeddedDirective implements OnInit {
  @Input() embeddedVideoId;
  
  //
  constructor(public element: ElementRef) { }

  //
  ngOnInit() {
    videoId = this.embeddedVideoId;
    let videoSrc = 'https://www.youtube.com/embed/' + videoId;
    this.element.nativeElement.src = videoSrc;
  }
}

// var player;
// function onYouTubeIframeAPIReady() {
//   console.log("Video Id");
//   player = new YT.Player('player', {
//     height: '390',
//     width: '640',
//     videoId: videoId,
//     events: {
//       'onReady': function(ev) {
//         ev.target.playVideo();
//       },
//       'onStateChange': function(ev) {
//         console.log(ev);
//       }
//     }
//   });
// }