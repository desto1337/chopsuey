import { Component, OnInit } from '@angular/core';
import { faTabletAlt, faPuzzlePiece, faCogs, faSlidersH, faUserCog, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ContentfulService } from 'src/app/core/services/contentful/contentful.service';
import { CharacteristicFields } from 'src/app/models/characteristic/characteristicFields';
import { Entry } from 'contentful';

@Component({
  selector: 'app-mypassion',
  templateUrl: './mypassion.component.html',
  styleUrls: ['./mypassion.component.scss']
})
export class MypassionComponent implements OnInit {

  public charateristics: CharacteristicFields[];


  public visionIcon: IconDefinition = faTabletAlt;
  public flexibilityIcon: IconDefinition = faSlidersH;
  public completeIcon: IconDefinition = faCogs;
  public overallIcon: IconDefinition = faPuzzlePiece;
  public otherIcon: IconDefinition = faUserCog;

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
