import { Component, OnInit } from '@angular/core';
import { OpeningContentFields } from 'src/app/models/opening/openingContentFields';
import { ContentfulService } from 'src/app/core/services/contentful/contentful.service';
import { Entry } from 'contentful';

@Component({
  selector: 'app-opening',
  templateUrl: './opening.component.html',
  styleUrls: ['./opening.component.scss']
})
export class OpeningComponent implements OnInit {

  private openingContent: OpeningContentFields;

  constructor(private contentfulService: ContentfulService) { }

  ngOnInit() {
    this.contentfulService.getOpeningPageContent().then((openingPageContent: Entry<OpeningContentFields>[]) => {
      this.openingContent = openingPageContent[0].fields;
      console.log('Mein OpeningContent: ', this.openingContent);
    });
  }

}
