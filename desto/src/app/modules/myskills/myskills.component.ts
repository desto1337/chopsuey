import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'src/app/core/services/contentful/contentful.service';
import { SkillFields } from 'src/app/models/skill/skillFields';
import { Entry } from 'contentful';
import { TechnologyLayerDescription } from 'src/app/models/technologyLayerDescription/technologyLayerDescription';
import { ApexChart, ApexTitleSubtitle, ApexAxisChartSeries, ApexXAxis, ApexTheme } from 'ng-apexcharts';

@Component({
  selector: 'app-myskills',
  templateUrl: './myskills.component.html',
  styleUrls: ['./myskills.component.scss']
})
export class MyskillsComponent implements OnInit {

  private skills: SkillFields[];
  private technologyDescriptions: TechnologyLayerDescription[];

  // chart stuff
  private chartType: ApexChart;
  private chartTheme: ApexTheme;
  private frontendChartTitle: ApexTitleSubtitle;

  private frontendChartSeries: ApexAxisChartSeries;
  private frontendChartXaxis: ApexXAxis;

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


    /* */
    this.initializeCharts();
  }

  resolveInnerEntriesOfType<T>(entries: Entry<T>[]): T[] {
    const innerEntryTypes: T[] = [];

    entries.forEach(entry => {
      innerEntryTypes.push(entry.fields);
    });

    return innerEntryTypes;
  }

  initializeCharts() {
    this.generateChartsBasicTheme();
    this.setChartTitles();
    this.setFrontendChartSeries();
    this.setFrontendXaxis();
  }

  generateChartsBasicTheme() {
    const chart: ApexChart = {
      type: 'bar'
    };

    this.chartType = chart;

    this.chartTheme = {
      monochrome: {
          enabled: true,
          color: '#6597e7',
          shadeTo: 'light',
          shadeIntensity: 0.65
        }
    };
  }

  setChartTitles() {
    this.frontendChartTitle = {
      text: 'Frontend-Titel'
    };
  }

  setFrontendChartSeries() {
    this.frontendChartSeries = [{
      name: 'sales',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }];
  }

  setFrontendXaxis() {
    this.frontendChartXaxis = {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    };
  }
}
