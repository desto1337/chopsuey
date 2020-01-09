import { Component, OnInit } from '@angular/core';
import { OpeningContent } from '../../../shared/models/opening/opening-content';

@Component({
  selector: 'app-opening',
  templateUrl: './opening.component.html',
  styleUrls: ['./opening.component.scss']
})
export class OpeningComponent implements OnInit {

  protected openingContent: OpeningContent;

  constructor() { }

  ngOnInit() {
    this.openingContent = new OpeningContent();
    console.log('Mein OpeningContent: ', this.openingContent);
  }

}
