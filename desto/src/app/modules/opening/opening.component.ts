import { Component, OnInit, HostBinding, HostListener, Inject } from '@angular/core';
import { OpeningContentFields } from 'src/app/models/opening/openingContentFields';
import { ContentfulService } from 'src/app/core/services/contentful/contentful.service';
import { Entry } from 'contentful';
import { DOCUMENT } from '@angular/common';
import { BasicAnimations } from 'src/app/animations/basicanimations';

@Component({
  selector: 'app-opening',
  templateUrl: './opening.component.html',
  styleUrls: ['./opening.component.scss'],
  animations: [
    BasicAnimations.fade,
    BasicAnimations.flyIn1,
    BasicAnimations.flyIn2
  ]
})
export class OpeningComponent implements OnInit {

  private openingContent: OpeningContentFields;

  constructor(private contentfulService: ContentfulService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.contentfulService.getOpeningPageContent().then((openingPageContent: Entry<OpeningContentFields>[]) => {
      this.openingContent = openingPageContent[0].fields;
      console.log('Mein OpeningContent: ', this.openingContent);
    });
  }

  /**
  @HostListener('window:scroll', ['$event.target.id'])
  onWindowScroll() {
    if (this.document.body.scrollTop > 20 ||
    this.document.documentElement.scrollTop > 20) {
      console.log('Es wurde gescrollt');

      const docViewTop = this.document.body.scrollTop;
      const docViewBottom = docViewTop + this.document.body.clientHeight;

      console.log('Top: ', docViewTop);
      console.log('Bottom: ', docViewBottom);

      /**
        document.getElementById('subTitle').classList.add('red');
        document.getElementById('paragraph').classList.add('green');
       */
      /**
    }
  }
  */

  test() {
    console.log('Juhu! Ich bin zu sehen!');
  }

}
