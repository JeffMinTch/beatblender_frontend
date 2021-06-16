import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBoxShadow]'
})
export class BoxShadowDirective {

  @Input() intensity: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(e: any) {
    console.log(e);
    this.renderer.addClass(this.el.nativeElement, 'mat-box-shadow');
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(e: any) {
    console.log(e);

    this.renderer.removeClass(this.el.nativeElement, 'mat-box-shadow');
  }
  

  


}
