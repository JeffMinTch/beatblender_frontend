import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss']
})
export class PlaylistCardComponent implements OnInit {

  @Input() title: string;
  @Input() creator: string;
  @Input() image1: string;
  @Input() image2: string;
  @Input() image3: string;
  @Input() image4: string;
  @Input() align: 'left' | 'right' = 'left';


  constructor() { }

  ngOnInit(): void {
  }

}
