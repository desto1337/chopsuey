import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'src/app/core/services/contentful/contentful.service';
import { SkillFields } from 'src/app/models/skill/skillFields';
import { Entry } from 'contentful';
import { TechnologyLayerDescription } from 'src/app/models/technologyLayerDescription/technologyLayerDescription';

@Component({
  selector: 'app-myskills',
  templateUrl: './myskills.component.html',
  styleUrls: ['./myskills.component.scss']
})
export class MyskillsComponent implements OnInit {

  private skills: SkillFields[];
  private technologyDescriptions: TechnologyLayerDescription[];

  constructor(private contentfulService: ContentfulService) { }

  ngOnInit() {
    this.contentfulService.getSkillPageContent().then((skillEntries: Entry<SkillFields>[]) => {
      console.log('Meine Skill-Entries: ', skillEntries);
      this.skills = this.resolveInnerEntriesOfType(skillEntries);
    }).catch(error => {
      console.log('Contentful-API: Es wurden keine Skills gefunden: ', error);
    });

    this.contentfulService.getTechnologyLayerDescriptionContent().then((techdescEntries: Entry<TechnologyLayerDescription>[]) => {
      console.log('Meine TechnologyDescription-Entries: ', techdescEntries);
      this.technologyDescriptions = this.resolveInnerEntriesOfType(techdescEntries);
    }).catch(error => {
      console.log('Contentful-API: Es wurden keine Technology-Beschreibungen gefunden: ', error);
    });
  }

  resolveInnerEntriesOfType<T>(entries: Entry<T>[]): T[] {
    const innerEntryTypes: T[] = [];

    entries.forEach(entry => {
      innerEntryTypes.push(entry.fields);
    });

    return innerEntryTypes;
  }
}
