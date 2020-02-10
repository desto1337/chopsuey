import { Component, OnInit, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
  }

  closeMenu() {
    this.renderer.setElementClass(this.el.nativeElement.querySelector('.navbar-collapse'), 'show', false);
  }

}
