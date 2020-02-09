import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'src/app/core/services/contentful/contentful.service';
import { JobFields } from 'src/app/models/job/jobFields';
import { Entry } from 'contentful';

@Component({
  selector: 'app-mycareer',
  templateUrl: './mycareer.component.html',
  styleUrls: ['./mycareer.component.scss']
})
export class MycareerComponent implements OnInit {

  private fulltimeJobEntries: JobFields[];
  private sideJobEntries: JobFields[];

  constructor(private contentfulService: ContentfulService) { }

  ngOnInit() {
    this.contentfulService.getJobPageContent().then((jobEntries: Entry<JobFields>[]) => {
      this.resolveJobs(jobEntries);
    }).then(error => {
      console.log('Contentful-API: Es wurden keinen Jobeinträge gefunden: ', error);
    });
  }

  resolveJobs(jobEntries: Entry<JobFields>[]) {
    jobEntries.forEach((jobEntry: Entry<JobFields>) => {
      if (jobEntry.fields.sideJob) {
        this.sideJobEntries.push(jobEntry.fields);
      } else {
        this.fulltimeJobEntries.push(jobEntry.fields);
      }
    });
  };
}
