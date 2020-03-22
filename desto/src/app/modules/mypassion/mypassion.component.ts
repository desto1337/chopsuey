import { Component, OnInit } from '@angular/core';
import { faTabletAlt, faPuzzlePiece, faCogs, faSlidersH, faUserCog, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ContentfulService } from 'src/app/core/services/contentful/contentful.service';
import { CharacteristicFields, CharacteristicType } from 'src/app/models/characteristic/characteristicFields';
import { Entry } from 'contentful';
import { BasicAnimations } from 'src/app/animations/basicanimations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mypassion',
  templateUrl: './mypassion.component.html',
  styleUrls: ['./mypassion.component.scss'],
  animations: [
    BasicAnimations.fadeSlow
  ]
})
export class MypassionComponent implements OnInit {

  public charateristics: CharacteristicFields[];

  private fadeState: string;

  public visionIcon: IconDefinition = faTabletAlt;
  public flexibilityIcon: IconDefinition = faSlidersH;
  public completeIcon: IconDefinition = faCogs;
  public overallIcon: IconDefinition = faPuzzlePiece;
  public otherIcon: IconDefinition = faUserCog;

  constructor(private contentfulService: ContentfulService, private router: Router) { }

  ngOnInit() {
    this.fadeState = 'invisible';

    this.contentfulService.getCharacteristicPageContent().then((personalityContent: Entry<CharacteristicFields>[]) => {
      console.log('Meine Characteristic-Entries: ', personalityContent);
      this.charateristics = this.resolveCharacteristics(personalityContent);
    }).catch((reason: any) => {
      this.router.navigateByUrl('/notavailable');
    });
  }

  resolveCharacteristics(entries: Entry<CharacteristicFields>[]): CharacteristicFields[] {
    const characteristics: CharacteristicFields[] = [];

    entries.forEach(entry => {
      characteristics.push(entry.fields);
    });

    return characteristics;
  }

  formateCharacteristicType(type: CharacteristicType): string {
    switch (type) {
      case CharacteristicType.vision: {
        return 'Vision';
      }
      case CharacteristicType.completepackage: {
        return 'Gesamtpaket';
      }
      case CharacteristicType.flexibility: {
        return 'Flexibilität';
      }
      case CharacteristicType.interdisciplinary: {
        return 'Querdenker';
      }
      default: {
        return type;
      }
    }
  }

  animateContent() {
    // console.log('Juhu! Ich bin zu sehen in MyCareer, Sidejobs!');
    this.fadeState = 'seen';
  }

}
