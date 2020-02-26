import { Component, OnInit } from '@angular/core';
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
    const projects: ProjectFields[] = [];

    entries.forEach(entry => {
      projects.push(entry.fields);
    });

    return projects;
  }

}
