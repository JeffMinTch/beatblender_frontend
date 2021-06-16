import { SizeRatio } from './../../models/types/size.type';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {

  @Input() svgIcon: boolean;
  @Input() iconName: string;
  @Input() iconSize: SizeRatio;
  @Input() color: string;
  // @Input() sze

  constructor() { }

  ngOnInit(): void {
  }

}
