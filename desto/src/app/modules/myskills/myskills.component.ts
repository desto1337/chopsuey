import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'src/app/core/services/contentful/contentful.service';
import { SkillFields } from 'src/app/models/skill/skillFields';
import { Entry } from 'contentful';
import { TechnologyLayerDescription } from 'src/app/models/technologyLayerDescription/technologyLayerDescription';
import { ApexChart, ApexTitleSubtitle, ApexAxisChartSeries, ApexXAxis, ApexTheme } from 'ng-apexcharts';
import { SkillType } from 'src/app/models/skill/skillTypes';

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

  private techChartTitle: ApexTitleSubtitle;
  private langChartTitle: ApexTitleSubtitle;

  private frontendTechChartSeries: ApexAxisChartSeries;
  private frontendTechChartXaxis: ApexXAxis;
  private frontendLangChartSeries: ApexAxisChartSeries;
  private frontendLangChartXaxis: ApexXAxis;

  constructor(private contentfulService: ContentfulService) { }

  ngOnInit() {
    this.contentfulService.getSkillPageContent().then((skillEntries: Entry<SkillFields>[]) => {
      console.log('Meine Skill-Entries: ', skillEntries);
      this.skills = this.resolveInnerEntriesOfType(skillEntries);
      this.initializeCharts();
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

  initializeCharts() {
    this.generateChartsBasicTheme();
    this.setChartTitles();
    this.setChartSeriesAndXaxisLabels(SkillType.frontend);
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
    this.techChartTitle = {
      text: 'Mein aktueller Technologie-Stack:'
    };
    this.langChartTitle = {
      text: 'Kenntnisse in Programmiersprachen:'
    };
  }

  setChartSeriesAndXaxisLabels(skillType: SkillType) {
    const techToolTipDesc = 'Skill-Niveau (in %)';
    const langToolTipDesc = techToolTipDesc;

    switch (skillType) {
      case SkillType.frontend: {

        // const techSeries: number[] = [30, 40, 35, 50, 49, 60, 70, 91, 125];
        const techSeries = this.resolveChartSeriesData(false, skillType);

        this.frontendTechChartSeries = [{
          name: techToolTipDesc,
          data: techSeries
        }];

        const langSeries = this.resolveChartSeriesData(true, skillType);

        this.frontendLangChartSeries = [{
          name: techToolTipDesc,
          data: langSeries
        }];

        break;
      }
      default: {
        // TO DO
        console.log('Kein bisheriges Handling des SkillTypes');
      }
    }
  }

  setXaxisOld(skillType: SkillType) {
    switch (skillType) {
      case SkillType.frontend: {

        const xaxis: number[] = [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999];

        this.frontendTechChartXaxis = {
          categories: xaxis
        };
        break;
      }
      default: {
        // TO DO
        console.log('Kein bisheriges Handling des SkillTypes');
      }
    }
  }

  setXaxis(skillType: SkillType, isLanguageProperty: boolean, filteredSkills: SkillFields[]) {

    switch (skillType) {
      case SkillType.frontend: {

        // const xaxis: number[] = [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999];

        const xaxis: string[] = [];

        filteredSkills.forEach(skill => {
          xaxis.push(skill.title);
        });

        if (!isLanguageProperty) {
          this.frontendTechChartXaxis = {
            categories: xaxis
          };
        } else {
          this.frontendLangChartXaxis = {
            categories: xaxis
          };
        }
        break;
      }
      default: {
        // TO DO
        console.log('Kein bisheriges Handling des SkillTypes');
      }
    }

  }

  resolveChartSeriesData(isLanguageProperty: boolean, skillType: SkillType): number[] {

    const seriesData: number[] = [];

    switch (skillType) {

      case SkillType.frontend: {

        const filteredSkills: SkillFields[] = this.skills.filter(skill => {

          let isCorrect = false;

          if (skill.isLanguage !== isLanguageProperty) {
            isCorrect = false;
            return isCorrect;
          }

          skill.type.forEach(skilltype => {
              if (skilltype === skillType) {
                isCorrect = true;
              }
            }
          );

          // nichts gefunden
          return isCorrect;
          });



        filteredSkills.sort((a, b) => b.level - a.level); // Größter Value zuerst, von links nach rechts
        console.log('filteredSkills (Nur Tech oder Lang): ', filteredSkills);

        filteredSkills.forEach(skill => {
          seriesData.push(skill.level);
        });

        // Erzeuge zugehörig auch die X-Achsen-Beschriftungen für Tech oder Lang
        this.setXaxis(skillType, isLanguageProperty, filteredSkills);
        break;
      }
      default: {
        // TO DO
        console.log('Kein Handling berücksichtigt');
      }
    }

    return seriesData;
  }
}
