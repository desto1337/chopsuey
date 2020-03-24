import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'src/app/core/services/contentful/contentful.service';
import { JobFields } from 'src/app/models/job/jobFields';
import { Entry } from 'contentful';
import { FormatService } from 'src/app/core/services/format/format.service';
import { BasicAnimations } from 'src/app/animations/basicanimations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mycareer',
  templateUrl: './mycareer.component.html',
  styleUrls: ['./mycareer.component.scss'],
  animations: [
    BasicAnimations.fadeSlow
  ]
})
export class MycareerComponent implements OnInit {

  private fulltimeJobEntries: JobFields[] = [];
  private sideJobEntries: JobFields[] = [];

  private animateOnEnter = false;
  private fadeState: string;
  private fadeSideJobsState: string;

  constructor(private contentfulService: ContentfulService, private formatService: FormatService, private router: Router) { }

  ngOnInit() {
    this.fadeState = 'invisible';
    this.fadeSideJobsState = 'invisible';
    this.animateOnEnter = true;

    this.contentfulService.getJobPageContent().then((jobEntries: Entry<JobFields>[]) => {
      this.resolveJobs(jobEntries);
      this.sortJobs();
      this.fadeState = 'seen';
    }).catch((reason: any) => {
      this.router.navigateByUrl('/notavailable');
    });
  }

  resolveJobs(jobEntries: Entry<JobFields>[]) {
    jobEntries.forEach((jobEntry: Entry<JobFields>) => {
      // console.log('Aktueller Wert: ', jobEntry);
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

  animateSideJobs() {
    // console.log('Juhu! Ich bin zu sehen in MyCareer, Sidejobs!');
    // console.log('Meine Nebentätigkeiten sind sichtbar!');
    this.fadeSideJobsState = 'seen';
  }
}
