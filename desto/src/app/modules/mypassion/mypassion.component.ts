import { Component, OnInit } from '@angular/core';
import { faStackOverflow, faGithubAlt, faXing, faLinkedinIn, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faTabletAlt} from '@fortawesome/free-solid-svg-icons';
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


  public visionIcon: IconDefinition = faTabletAlt;

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
