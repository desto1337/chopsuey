// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { NgcCookieConsentConfig } from 'ngx-cookieconsent';

export const environment = {
  production: false,
  contact: 'contactTROLOLOdennis-stoklosa.de',
  urlXing: 'https://www.xing.com/profile/Dennis_Stoklosa',
  urlLinkedIn: 'https://www.linkedin.com/in/dennis-stoklosa-295b4a159/',
  urlGithub: 'https://github.com/desto1337',
  urlStackoverflow: 'https://stackoverflow.com/users/10895592/dennis-stoklosa',
  chartThemeColor: '#6597e7' // blue
};

export const CONTENTFULCONFIG = {
  space: 'bb0iogj7txbo',
  accessToken: 'AnrycwjW7XHkkVYqeIyCFP8F6cab33_NXcZpzGW7Uys',

  contentTypeIds: {
    aboutMe: 'aboutMe',
    openingContent: 'openingContent',
    characteristic: 'characteristic',
    job: 'job',
    project: 'project',
    skill: 'skill',
    technologyLayerDescription: 'technologyLayerDescription'
  }
};

export const cookieConfiguration: NgcCookieConsentConfig = {
  cookie: {
    domain: 'https://dennis-stoklosa.de' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  position: 'bottom-right',
  theme: 'classic',
  palette: {
    popup: {
      background: '#000000',
      text: '#9ABAEF',
      link: '#B4D4FF'
    },
    button: {
      background: '#B4D4FF',
      text: '#000000',
      border: 'transparent'
    }
  },
  type: 'info',
  content: {
    message: 'Diese Web-Applikation verwendet Cookies. Nähere Informationen dazu und Ihren Rechten finden Sie in der auf dieser Seite ersichtlichen Datenschutzerklärung.',
    dismiss: 'Verstanden',
    deny: 'Ablehnen',
    link: 'Datenschutzerklärung',
    href: 'https://dennis-stoklosa.de/privacy',
    policy: 'Cookie Policy'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
