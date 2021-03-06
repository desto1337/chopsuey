import { Directive, EventEmitter, Output, ElementRef, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';

@Directive({
  selector: '[appOnviewport]'
})
export class OnviewportDirective implements AfterViewInit, OnDestroy {

  @Output()
  appOnviewport: EventEmitter<void>;

  elementPos: number;
  elementHeight: number;

  scrollPos: number;
  windowHeight: number;

  subscriptionScroll: Subscription;
  subscriptionResize: Subscription;

  constructor(private element: ElementRef) {
    // console.log('Direktive aufgerufen');
    this.appOnviewport = new EventEmitter<void>();
  }

  saveDimensions() {
    this.elementPos = this.getOffsetTop(this.element.nativeElement);
    this.elementHeight = this.element.nativeElement.offsetHeight;
    this.windowHeight = window.innerHeight;

    // console.log('elementPos:', this.elementPos);
    // console.log('elementHeight:', this.elementHeight);
    // console.log('windowHeight:', this.windowHeight);
  }

  saveScrollPos() {
    // console.log('window.scrollY: ' , this.scrollPos);
    this.scrollPos = window.scrollY;
  }

  getOffsetTop(element: any) {
    let offsetTop = element.offsetTop || 0;
    if (element.offsetParent) {
      offsetTop += this.getOffsetTop(element.offsetParent);
    }
    return offsetTop;
  }
  checkVisibility() {
    if (this.isVisible()) {
      // double check dimensions (due to async loaded contents, e.g. images)
      this.saveDimensions();
      if (this.isVisible()) {
        this.unsubscribe();
        this.appOnviewport.emit();
        // console.log('appOnViewPort-Event ausgelöst');
      }
    }
  }
  isVisible() {
  /**
   *  console.log('-----------------');
   *  console.log('Element Position: ', this.elementPos + ' mit Elementhoehe: ' + this.elementHeight);
   *  console.log('D.h. Element Position zwischen ', this.elementPos + ' und ' +  (this.elementPos + this.elementHeight));
   *  console.log('Meine aktuelle Scrollposition liegt bei : ', this.scrollPos);
   *  console.log('Das heißt mein Fenster Viewport liegt zwischen ', this.scrollPos + ' und ' + (this.windowHeight + this.scrollPos));
   *  console.log('Element liegt im Viewport: ', ((this.windowHeight + this.scrollPos) > this.elementPos &&  this.scrollPos < (this.elementPos + this.elementHeight)));
   *  console.log('-----------------');
   */

    // return this.scrollPos >= this.elementPos || (this.scrollPos + this.windowHeight) >= (this.elementPos + this.elementHeight);
    // return !(this.scrollPos >= this.elementPos || (this.windowHeight + this.scrollPos) < (this.elementPos + this.elementHeight));

    // console.log('Sichtbar: ', ((this.windowHeight + this.scrollPos) > this.elementPos &&  this.scrollPos < (this.elementPos + this.elementHeight)));

    return ((this.windowHeight + this.scrollPos) > this.elementPos &&  this.scrollPos < (this.elementPos + this.elementHeight));
    }

  subscribe() {
    this.subscriptionScroll = fromEvent(window, 'scroll')
      .subscribe(() => {
        this.saveDimensions();
        this.saveScrollPos();
        this.checkVisibility();
      });
    this.subscriptionResize = fromEvent(window, 'resize')
      .subscribe(() => {
        this.saveDimensions();
        this.saveDimensions();
        this.checkVisibility();
      });
  }

  @HostListener('window:scroll', ['$event.target.id'])
  onWindowScroll() {
    this.saveDimensions();
    this.saveScrollPos();
    this.checkVisibility();
  }

  subscribeNew() {
    this.subscriptionScroll = fromEvent(window, 'scroll')
      .subscribe(() => {
        this.saveDimensions();
        this.saveScrollPos();
        this.checkVisibility();
      });
    this.subscriptionResize = fromEvent(window, 'resize')
      .subscribe(() => {
        this.saveDimensions();
        this.saveDimensions();
        this.checkVisibility();
      });
  }

  unsubscribe() {
    if (this.subscriptionScroll) {
      this.subscriptionScroll.unsubscribe();
    }
    if (this.subscriptionResize) {
      this.subscriptionResize.unsubscribe();
    }
  }

  ngAfterViewInit() {
    // this.subscribe();
    // this.subscribeNew();
  }
  ngOnDestroy() {
    // console.log('Wurde ich destroyed?');
    this.unsubscribe();
  }

}
