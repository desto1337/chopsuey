import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'src/app/core/services/contentful/contentful.service';
import { SkillFields } from 'src/app/models/skill/skillFields';
import { Entry } from 'contentful';

@Component({
  selector: 'app-myskills',
  templateUrl: './myskills.component.html',
  styleUrls: ['./myskills.component.scss']
})
export class MyskillsComponent implements OnInit {

  private skills: SkillFields[];

  constructor(private contentfulService: ContentfulService) { }

  ngOnInit() {
    this.contentfulService.getSkillPageContent().then((skillEntries: Entry<SkillFields>[]) => {
      console.log('Meine Skill-Entries: ', skillEntries);
      this.skills = this.resolveSkills(skillEntries);
    }).catch(error => {
      console.log('Contentful-API: Es wurden keine Skills gefunden: ', error);
    });
  }

  resolveSkills(entries: Entry<SkillFields>[]): SkillFields[] {
    const skills: SkillFields[] = [];

    entries.forEach(entry => {
      skills.push(entry.fields);
    });

    return skills;
  }
}
