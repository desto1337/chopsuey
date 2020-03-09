import { Component, OnInit } from '@angular/core';
import { faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ContentfulService } from 'src/app/core/services/contentful/contentful.service';
import { ProjectFields } from 'src/app/models/project/projectFields';
import { Entry } from 'contentful';
import { FormatService } from 'src/app/core/services/format/format.service';
import { Title } from '@angular/platform-browser';
import { BasicAnimations } from 'src/app/animations/basicanimations';

@Component({
  selector: 'app-myprojects',
  templateUrl: './myprojects.component.html',
  styleUrls: ['./myprojects.component.scss'],
  animations: [
    BasicAnimations.fadeSlow
  ]
})
export class MyprojectsComponent implements OnInit {

  public listitemIcon: IconDefinition = faChevronRight;

  public fadeState: string;

  private projects: ProjectFields[];

  constructor(private contentfulService: ContentfulService, private formatService: FormatService, private titleService: Title) { }

  ngOnInit() {
    this.fadeState = 'invisible';

    this.titleService.setTitle('Dennis Stoklosa | Projekte');

    this.contentfulService.getProjectPageContent().then((projectEntries: Entry<ProjectFields>[]) => {
      console.log('Meine Project-Entries: ', projectEntries);
      this.projects = this.resolveProjects(projectEntries);
      this.fadeState = 'seen';
    }).catch(error => {
      console.log('Contentful-API: Es wurden keine Projects gefunden: ', error);
    });
  }

  resolveProjects(entries: Entry<ProjectFields>[]): ProjectFields[] {
    let projects: ProjectFields[] = [];

    entries.forEach(entry => {
      projects.push(entry.fields);
    });

    projects = projects.sort((a, b) => this.sortingProjectsByDate(a, b));

    return projects;
  }

  sortingProjectsByDate(a: ProjectFields, b: ProjectFields) {
    const aNew = new Date(a.date);
    const bNew = new Date(b.date);
    return aNew > bNew ? -1 : aNew < bNew ? 1 : 0;
  }

}
