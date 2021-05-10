import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-home-section',
  templateUrl: './home-section.component.html',
  styleUrls: ['./home-section.component.scss']
})
export class HomeSectionComponent implements OnInit {

  @Input() firstTitle: string;
  @Input() secondTitle: string;
  @Input() align: 'left' | 'right;' = 'left';

  constructor() { }

  ngOnInit(): void {

  }

}
