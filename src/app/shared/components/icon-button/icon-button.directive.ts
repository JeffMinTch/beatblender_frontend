import { SizeRatio } from './../../models/types/size.type';
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIconButton]'
})
export class IconButtonDirective {

  @Input() iconSize: SizeRatio;
  // @Input() color: string;


  constructor(private el: ElementRef, private renderer: Renderer2) { }
  
  ngOnInit(): void {
    // this.renderer.addClass(this.el.nativeElement, `icon-button-${this.type as string}`)
    this.renderer.addClass(this.el.nativeElement, `icon-button-size-${this.iconSize as string}`);
    // this.renderer.setStyle(this.el.nativeElement, 'border-color', this.backgroundColor);
  }
}
