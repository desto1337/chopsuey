import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'src/app/core/services/contentful/contentful.service';
import { CharacteristicFields } from 'src/app/models/characteristic/characteristicFields';
import { Entry } from 'contentful';

@Component({
  selector: 'app-mypassion',
  templateUrl: './mypassion.component.html',
  styleUrls: ['./mypassion.component.scss']
})
export class MypassionComponent implements OnInit {

  private charateristics: CharacteristicFields[];

  constructor(private contentfulService: ContentfulService) { }

  ngOnInit() {
    this.contentfulService.getCharacteristicPageContent().then((personalityContent: Entry<CharacteristicFields>[]) => {
      console.log('Meine Characteristic-Entries: ', personalityContent);
      this.charateristics = this.resolveCharacteristics(personalityContent);
    }).catch(error => {
      console.log('Contentful-API: Es wurden kein Characteric-Content gefunden: ', error);
    });
  }

  resolveCharacteristics(entries: Entry<CharacteristicFields>[]): CharacteristicFields[] {
    const characteristics: CharacteristicFields[] = [];

    entries.forEach(entry => {
      characteristics.push(entry.fields);
    });

    return characteristics;
  }

}
