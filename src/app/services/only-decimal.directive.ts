import { Directive, OnInit, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Directive({
  selector: '[appOnlyDecimal]',
})
export class OnlyDecimalDirective implements OnInit {
  currencyChars = new RegExp('[\.,]', 'g'); // we're going to remove commas and dots

  constructor(public el: ElementRef, public renderer: Renderer2, private decimalPipe: DecimalPipe) { }

  ngOnInit() {
    this.format(this.el.nativeElement.value); // format any initial values
  }

  @HostListener('input', ["$event.target.value"]) onInput(e: string) {
    this.format(e);
  };

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    event.preventDefault();
    this.format(event.clipboardData.getData('text/plain'));
  }

  format(val: string) {
    // 1. Kiểm tra ký tự nếu không phải số thì bỏ đi
    const numberFormat = parseInt(String(val).replace(this.currencyChars, ''));
    // console.log(numberFormat); // raw number

    // 2. format số theo dạng en-Us
    const usd = this.decimalPipe.transform(numberFormat, '1.0', 'en-US');

    // 3. Thay thế lại giá tị vừa format vào giá tị đầu vào
    this.renderer.setProperty(this.el.nativeElement, 'value', usd);
  }

}
