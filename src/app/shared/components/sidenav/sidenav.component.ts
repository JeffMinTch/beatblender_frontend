import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.template.html'
})
export class SidenavComponent {
  @Input('items') public menuItems: any[] = [];
  @Input('hasIconMenu') public hasIconTypeMenuItem: boolean;
  @Input('iconMenuTitle') public iconTypeMenuTitle: string;
  @Input('titleColor') public titleColor: 'primary' | 'accent';


  constructor() { }
  ngOnInit() { }

  // Only for demo purpose
  addMenuItem() {
    this.menuItems.push({
      name: 'ITEM',
      type: 'dropDown',
      tooltip: 'Item',
      icon: 'done',
      state: 'material',
      sub: [
        { name: 'SUBITEM', state: 'cards' },
        { name: 'SUBITEM', state: 'buttons' }
      ]
    });
  }

  setTitleColor() {
    switch (this.titleColor) {
      case 'primary':
        return {
          color: 'var(--primary-color)'
        }
      case 'accent':
        return {
          color: 'var(--accent-color)'
        }
      
    }

  }
}