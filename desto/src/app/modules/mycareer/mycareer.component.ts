import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'src/app/core/services/contentful/contentful.service';
import { JobFields } from 'src/app/models/job/jobFields';
import { Entry } from 'contentful';
import { FormatService } from 'src/app/core/services/format/format.service';
import { BasicAnimations } from 'src/app/animations/basicanimations';

@Component({
  selector: 'app-mycareer',
  templateUrl: './mycareer.component.html',
  styleUrls: ['./mycareer.component.scss'],
  animations: [
    BasicAnimations.fadeSlowOnEnter
  ]
})
export class MycareerComponent implements OnInit {

  private fulltimeJobEntries: JobFields[] = [];
  private sideJobEntries: JobFields[] = [];

  private animateOnEnter = false;
  private fadeState: string;

  constructor(private contentfulService: ContentfulService, private formatService: FormatService) { }

  ngOnInit() {
    this.fadeState = 'invisible';
    this.animateOnEnter = true;

    this.contentfulService.getJobPageContent().then((jobEntries: Entry<JobFields>[]) => {
      this.resolveJobs(jobEntries);
      this.sortJobs();
    }).then(error => {
      console.log('Contentful-API: Es wurden keinen Jobeinträge gefunden: ', error);
    });
  }

  resolveJobs(jobEntries: Entry<JobFields>[]) {
    jobEntries.forEach((jobEntry: Entry<JobFields>) => {
      console.log('Aktueller Wert: ', jobEntry);
      if (jobEntry.fields.sidejob) {
        this.sideJobEntries.push(jobEntry.fields);
      } else {
        this.fulltimeJobEntries.push(jobEntry.fields);
      }
    });
  }

  sortJobs() {
    this.fulltimeJobEntries.sort((a, b) => this.sortingJobsByFromDate(a, b));
    this.sideJobEntries.sort((a, b) => this.sortingJobsByFromDate(a, b));
  }

  sortingJobsByFromDate(a: JobFields, b: JobFields) {
    const aNew = new Date(a.fromDate);
    const bNew = new Date(b.fromDate);
    return aNew > bNew ? -1 : aNew < bNew ? 1 : 0;
  }

  animateContent() {
    // console.log('Juhu! Ich bin zu sehen!');
    this.fadeState = 'seen';
  }
}
