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
      console.log('Das sind meine Items: ', res.items);
      return res.items;
    });
  }
}
