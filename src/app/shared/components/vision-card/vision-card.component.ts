import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vision-card',
  templateUrl: './vision-card.component.html',
  styleUrls: ['./vision-card.component.scss']
})
export class VisionCardComponent implements OnInit {

  @Input() iconName;
  @Input() title;


  constructor() { }

  ngOnInit(): void {
  }

}
