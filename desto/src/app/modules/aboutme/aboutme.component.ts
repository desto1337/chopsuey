import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'src/app/core/services/contentful/contentful.service';
import { Entry } from 'contentful';
import { AboutMeFields } from 'src/app/models/aboutme/aboutMeFields';
import { BasicAnimations } from 'src/app/animations/basicanimations';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss'],
  animations: [
    BasicAnimations.fadeSlow
  ]
})
export class AboutmeComponent implements OnInit {

  private aboutmeContent: AboutMeFields;
  private fadeState: string;

  constructor(private contentfulService: ContentfulService) { }

  ngOnInit() {
    this.fadeState = 'invisible';

    this.contentfulService.getAboutMeContent().then(
      (items: Entry<AboutMeFields>[]) => {
        console.log('Meine Response: ', items);
        this.aboutmeContent = this.findActiveContent(items);
      }
    ).catch(error => {
      console.log('Es ist ein Fehler aufgetreten: ', error);
    });
  }

  findActiveContent(entries: Entry<AboutMeFields>[]): AboutMeFields {
    let aboutmecontent: Entry<AboutMeFields>;

    aboutmecontent = entries.find(item => item.fields.isActive);

    return aboutmecontent.fields;
  }

  animateContent() {
    console.log('Juhu! Ich bin zu sehen!');
    this.fadeState = 'seen';
  }

}
