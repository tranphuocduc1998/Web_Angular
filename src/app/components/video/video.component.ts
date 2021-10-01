import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'app-video-component',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoComponent implements OnInit {
  @Input() items?: any;
  @Input() titleStyle?: any;
  @Input() titleClass?: any;

  curentUrl: any = 'http://binhduong.htvc.vod.vnroute.com/BINHDUONG/2020/t12/15/lam-151220-tstrua-3nghiquyet115.mp4';
  curentId: number;
  idOver: number;

  constructor() {
  }

  ngOnInit() {

  }

  onClick(video) {
    this.curentUrl = video.url;
    this.curentId = video.id;
  }

  onMouseOver(id) {
    this.idOver = id;
  }


}
