import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'src/app/core/services/contentful/contentful.service';
import { SkillFields } from 'src/app/models/skill/skillFields';
import { Entry } from 'contentful';
import { TechnologyLayerDescription } from 'src/app/models/technologyLayerDescription/technologyLayerDescription';
import { ApexChart, ApexTitleSubtitle, ApexAxisChartSeries, ApexXAxis, ApexTheme, ApexDataLabels } from 'ng-apexcharts';
import { SkillType } from 'src/app/models/skill/skillTypes';
import { TechnologyLayerType } from 'src/app/models/technologyLayerDescription/technologyLayerType'; // used in UI Component
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-myskills',
  templateUrl: './myskills.component.html',
  styleUrls: ['./myskills.component.scss']
})
export class MyskillsComponent implements OnInit {

  private skills: SkillFields[];
  private otherSkills: SkillFields[];
  private technologyDescriptions: TechnologyLayerDescription[];

  // chart stuff
  private chartType: ApexChart;
  private chartDataLabels: ApexDataLabels;
  private chartTheme: ApexTheme;

  private techChartTitle: ApexTitleSubtitle;
  private langChartTitle: ApexTitleSubtitle;

  private frontendTechChartSeries: ApexAxisChartSeries;
  private frontendTechChartXaxis: ApexXAxis;
  private frontendLangChartSeries: ApexAxisChartSeries;
  private frontendLangChartXaxis: ApexXAxis;

  private middlewareTechChartSeries: ApexAxisChartSeries;
  private middlewareTechChartXaxis: ApexXAxis;
  private middlewareLangChartSeries: ApexAxisChartSeries;
  private middlewareLangChartXaxis: ApexXAxis;

  private backendTechChartSeries: ApexAxisChartSeries;
  private backendTechChartXaxis: ApexXAxis;
  private backendLangChartSeries: ApexAxisChartSeries;
  private backendLangChartXaxis: ApexXAxis;

  private frontendTechList: string[];
  private frontendLangList: string[];
  private middlewareTechList: string[];
  private middlewareLangList: string[];
  private backendTechList: string[];
  private backendLangList: string[];

  constructor(private contentfulService: ContentfulService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Dennis Stoklosa | Fähigkeiten');

    this.contentfulService.getSkillPageContent().then((skillEntries: Entry<SkillFields>[]) => {
      console.log('Meine Skill-Entries: ', skillEntries);
      this.skills = this.resolveInnerEntriesOfType(skillEntries);
      this.otherSkills = this.resolveOtherSkills(this.skills);
      console.log('OtherSkills: ', this.otherSkills);
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

/**
 * resolving the raw data fields as an array of Entry Collection from API Definition
 * @param entries Entry Collection with has the raw data input from Type T
 * @returns delivers the raw data structure of type T as an data array
 */
  resolveInnerEntriesOfType<T>(entries: Entry<T>[]): T[] {
    const innerEntryTypes: T[] = [];

    entries.forEach(entry => {
      innerEntryTypes.push(entry.fields);
    });

    return innerEntryTypes;
  }

/**
 * Creates firstly the basic chart theme, with chart type and color theme.
 * Creates secondly the chart titles of all visible charts.
 * Creates chart series data and xaxis labeling of every chart based on fetched data in this.skills
 */
  initializeCharts() {
    this.generateChartsBasicTheme();
    this.setChartTitles();
    this.setChartSeriesAndXaxisLabels(SkillType.frontend);
    this.setChartSeriesAndXaxisLabels(SkillType.middleware);
    this.setChartSeriesAndXaxisLabels(SkillType.backend);

    /* Angezeige Elemente in Charts auf maximal 5 Beschränken */
    this.sliceChartSeries(5);
  }

/**
 * Generates the basic chart type and color theme for every visual chart
 */
  generateChartsBasicTheme() {
    const chart: ApexChart = {
      type: 'bar'
    };

    this.chartType = chart;

    this.chartDataLabels = {
      formatter: (val, opts) => {
        return val + ' %';
      }
    }

    this.chartTheme = {
      monochrome: {
          enabled: true,
          color: environment.chartThemeColor,
          shadeTo: 'light',
          shadeIntensity: 0.65
        }
    };
  }


/**
 * Generates the title of every visual chart
 */
  setChartTitles() {
    this.techChartTitle = {
      text: 'Mein aktueller Technologie-Stack:'
    };
    this.langChartTitle = {
      text: 'Kenntnisse in Programmiersprachen:'
    };
  }

/**
 * Based on the Skill Type the data of this.skills will be resolved into the specific chart into chartseries and,
 * secondly, into the seperate xAxis Labeling
 * @param skillType The chartType of the chart, in which the result data will be stored
 */
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
          name: langToolTipDesc,
          data: langSeries
        }];

        break;
      }
      case SkillType.middleware: {

        const techSeries = this.resolveChartSeriesData(false, skillType);

        this.middlewareTechChartSeries = [{
          name: techToolTipDesc,
          data: techSeries
        }];
        const langSeries = this.resolveChartSeriesData(true, skillType);

        this.middlewareLangChartSeries = [{
          name: langToolTipDesc,
          data: langSeries
        }];

        break;
      }
      case SkillType.backend: {

        const techSeries = this.resolveChartSeriesData(false, skillType);

        this.backendTechChartSeries = [{
          name: techToolTipDesc,
          data: techSeries
        }];
        const langSeries = this.resolveChartSeriesData(true, skillType);

        this.backendLangChartSeries = [{
          name: langToolTipDesc,
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

/**
 * based on the skilltype and the filtered skills, the axis labeling will be generated by chart type
 * @param skillType as known as the chart type, to generate xaxis labeling for.
 * @param isLanguageProperty is chartType a TechStack one, or a Language Chart?
 * @param filteredSkills the filtered skills, where the axis labeling will be extracted from
 */
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
      case SkillType.middleware: {
        const xaxis: string[] = [];

        filteredSkills.forEach(skill => {
          xaxis.push(skill.title);
        });

        if (!isLanguageProperty) {
          this.middlewareTechChartXaxis = {
            categories: xaxis
          };
        } else {
          this.middlewareLangChartXaxis = {
            categories: xaxis
          };
        }
        break;
      }
      case SkillType.backend: {
        const xaxis: string[] = [];

        filteredSkills.forEach(skill => {
          xaxis.push(skill.title);
        });

        if (!isLanguageProperty) {
          this.backendTechChartXaxis = {
            categories: xaxis
          };
        } else {
          this.backendLangChartXaxis = {
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

/**
 * Based on the skill type, the chart series data will be found and stored within the on
 * skillType dependend chart type
 * @param isLanguageProperty chartSeries generation for TechStack chart or Language Chart?
 * @param skillType as known as the chartType
 */
  resolveChartSeriesData(isLanguageProperty: boolean, skillType: SkillType): number[] {

    const seriesData: number[] = [];

    const filteredSkills: SkillFields[] = this.skills.filter(skill => {
      return this.checkSkillField(skill, isLanguageProperty, skillType);
    });

    filteredSkills.sort((a, b) => b.level - a.level); // Größter Value zuerst, von links nach rechts
    console.log('filteredSkills, isLanguage: ' + isLanguageProperty + ' , für SkillType: ' + skillType, filteredSkills);

    filteredSkills.forEach(skill => {
      seriesData.push(skill.level);
    });

    // Erzeuge zugehörig auch die X-Achsen-Beschriftungen für Tech oder Lang
    this.setXaxis(skillType, isLanguageProperty, filteredSkills);

    return seriesData;
  }

/**
 * Does the current Skill match the isLanguageProperty and does the skill.type lists the current SkillType?
 * @param skill will be checked
 * @param isLanguageProperty nothing to say (TechStack or Language)
 * @param skillType the current chart Type
 */
  checkSkillField(skill: SkillFields, isLanguageProperty: boolean, skillType: SkillType): boolean {
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
    return isCorrect;
  }


  resolveOtherSkills(allSkills: SkillFields[]) {
    let filteredSkills: SkillFields[] = allSkills.filter(skill => {
      return this.detectNotListedSkill(skill);
    });

    filteredSkills = filteredSkills.sort((a, b) => b.level - a.level); // Höchster Level zurerst

    return filteredSkills;
  }


/**
 * TO DO
 */
detectNotListedSkill(skill: SkillFields): boolean {
  let isOther = false;

  skill.type.forEach(skilltype => {
            if (skilltype !== SkillType.frontend && skilltype !== SkillType.middleware && skilltype !== SkillType.backend  ) {
              isOther = true;
              return;
            }
          }
        );
  return isOther;
}

  getTechnologyLayerDescriptions(type: TechnologyLayerType): TechnologyLayerDescription {
    return this.technologyDescriptions.find(singleDescription => {
      return singleDescription.type === type;
    });
  }

  sliceChartSeries(numberOfBars?: number) {

    /* Vorerst bisherige Gesamtmenge in jeweilige Lists schreiben, bevor Charts auf die Länge beschnibbelt werden */
    this.frontendTechList = this.frontendTechChartXaxis.categories;
    this.frontendLangList = this.frontendLangChartXaxis.categories;
    this.middlewareTechList = this.middlewareTechChartXaxis.categories;
    this.middlewareLangList = this.middlewareLangChartXaxis.categories;
    this.backendTechList = this.backendTechChartXaxis.categories;
    this.backendLangList = this.backendLangChartXaxis.categories;

    /* Angezeige Elemente in Charts auf maximal 5 Beschränken */
    if (this.frontendTechChartSeries[0].data.length > numberOfBars) {
      this.frontendTechChartSeries[0].data = this.frontendTechChartSeries[0].data.slice(0, numberOfBars);
      this.frontendTechChartXaxis.categories = this.frontendTechChartXaxis.categories.slice(0, numberOfBars);
    }

    if (this.frontendLangChartSeries[0].data.length > numberOfBars) {
      this.frontendLangChartSeries[0].data = this.frontendLangChartSeries[0].data.slice(0, numberOfBars);
      this.frontendLangChartXaxis.categories = this.frontendLangChartXaxis.categories.slice(0, numberOfBars);
    }

    if (this.middlewareTechChartSeries[0].data.length > numberOfBars) {
      this.middlewareTechChartSeries[0].data = this.middlewareTechChartSeries[0].data.slice(0, numberOfBars);
      this.middlewareTechChartXaxis.categories = this.middlewareTechChartXaxis.categories.slice(0, numberOfBars);
    }

    if (this.middlewareLangChartSeries[0].data.length > numberOfBars) {
      this.middlewareLangChartSeries[0].data = this.middlewareLangChartSeries[0].data.slice(0, numberOfBars);
      this.middlewareLangChartXaxis.categories = this.middlewareLangChartXaxis.categories.slice(0, numberOfBars);
    }

    if (this.backendTechChartSeries[0].data.length > numberOfBars) {
      this.backendTechChartSeries[0].data = this.backendTechChartSeries[0].data.slice(0, numberOfBars);
      this.backendTechChartXaxis.categories = this.backendTechChartXaxis.categories.slice(0, numberOfBars);
    }

    if (this.backendLangChartSeries[0].data.length > numberOfBars) {
      this.backendLangChartSeries[0].data = this.backendLangChartSeries[0].data.slice(0, numberOfBars);
      this.backendLangChartXaxis.categories = this.backendLangChartXaxis.categories.slice(0, numberOfBars);
    }

  }
}
