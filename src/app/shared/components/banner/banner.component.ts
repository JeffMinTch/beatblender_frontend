import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() firstTitle: string;
  @Input() title: string;
  @Input() color: 'primary' | 'accent' | 'theme';
  @Input() align: 'left' | 'right';

  constructor() { }

  ngOnInit(): void {
  }


  setStyle() {
    switch (this.color) {
      case 'primary':
        return {
          'color': 'var(--light-theme)',
          'background': 'var(--primary-color)'
        }
      case 'accent':
        return {
          'color': 'var(--light-theme)',
          'background': 'var(--accent-color)'
        }
      case 'theme':
        return {
          'color': 'var(--body-color)',
          'background': 'var(--light-theme)'
        }
    }
  }

  addFirstTitleStyle() {
    switch (this.align) {
      case 'left':
        return {
          'padding-left': '20px'
        }
      case 'right':
        return {
          'padding-right': '20px',
          'padding-left': '20px'
        }
    }
  }

  addSecondTitleStyle() {

  }

}
