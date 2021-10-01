import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  public transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
@Pipe({ name: 'safeHtml' })
export class HtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  public transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
