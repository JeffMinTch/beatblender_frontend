import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vision-card',
  templateUrl: './vision-card.component.html',
  styleUrls: ['./vision-card.component.scss']
})
export class VisionCardComponent implements OnInit {

  @Input() iconName;
  @Input() title;
  @Input() titleColor: 'primary' | 'accent' | 'body';


  constructor() { }

  ngOnInit(): void {
  }


  setTitleColor() {
    switch (this.titleColor) {
      case 'primary':
        return {
          'color': 'var(--primary-color)'
        }
      case 'accent':
        return {
          'color': 'var(--accent-color)'
        }
      case 'body':
        return {
          'color': 'var(--body-color)'
        }
    }
  }

}
