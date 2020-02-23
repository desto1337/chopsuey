import { Injectable } from '@angular/core';
import { Asset } from 'contentful';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor() { }

  revealContentfulImageUrl(imageObject: Asset): string {
    let url = imageObject.fields.file.url;

    if(url.search('//') >= 0) {

      url = url.replace('//','https://');
      return url;
    } else {
     return 'https://' + url;
    };
  };
}
