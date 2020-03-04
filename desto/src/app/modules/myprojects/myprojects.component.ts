import { Component, OnInit } from '@angular/core';
import { faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ContentfulService } from 'src/app/core/services/contentful/contentful.service';
import { ProjectFields } from 'src/app/models/project/projectFields';
import { Entry } from 'contentful';
import { FormatService } from 'src/app/core/services/format/format.service';

@Component({
  selector: 'app-myprojects',
  templateUrl: './myprojects.component.html',
  styleUrls: ['./myprojects.component.scss']
})
export class MyprojectsComponent implements OnInit {

  public listitemIcon: IconDefinition = faChevronRight;

  private projects: ProjectFields[];

  constructor(private contentfulService: ContentfulService, private formatService: FormatService) { }

  ngOnInit() {
    this.contentfulService.getProjectPageContent().then((projectEntries: Entry<ProjectFields>[]) => {
      console.log('Meine Project-Entries: ', projectEntries);
      this.projects = this.resolveProjects(projectEntries);
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
