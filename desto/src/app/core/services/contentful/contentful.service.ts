import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { CONTENTFULCONFIG } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  private cdaClient = createClient({
    space: CONTENTFULCONFIG.space,
    accessToken: CONTENTFULCONFIG.accessToken
  });

  constructor() { }

  getAboutMeContent(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONTENTFULCONFIG.contentTypeIds.aboutMe
    }, query))
    .then(res => {
      return res.items;
    });
  }

  getOpeningPageContent(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONTENTFULCONFIG.contentTypeIds.openingContent
    }, query))
    .then(res => {
      return res.items;
    });
  }

  getCharacteristicPageContent(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONTENTFULCONFIG.contentTypeIds.characteristic
    }, query))
    .then(res => {
      return res.items;
    });
  }

  getJobPageContent(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONTENTFULCONFIG.contentTypeIds.job
    }, query))
    .then(res => {
      return res.items;
    });
  }

  getProjectPageContent(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONTENTFULCONFIG.contentTypeIds.project
    }, query))
    .then(res => {
      return res.items;
    });
  }

  getSkillPageContent(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONTENTFULCONFIG.contentTypeIds.skill
    }, query))
    .then(res => {
      return res.items;
    });
  }
}
