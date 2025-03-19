export const environment = {
  production: true,
  isServer: true,
  // for prerender
  host: 'http://localhost:4000',
  // apiUrl: 'http://prodapi.in/v1/',
  // apiUrl: 'https://rico-backend.cshare.in/v1/', //rico
  // apiUrl: 'http://3.7.46.92:7400/v1/', //candes
  // apiUrl: 'http://sukam.api.cshare.in/v1/', //sukam
  // apiUrl: 'http://43.205.127.11:7500/v1/', //poker pundit
  apiUrl: 'https://backend.pokerpundit.in/v1/', //poker pundit new

  // apiUrl: 'http://65.0.238.142:7500/v1/', //sushma
  apiUrlForReport: 'http://65.0.238.142:7500/v2/', //sushma
  // apiUrl: 'https://13.232.52.252/v1/', //new client
  // apiUrl: 'http://65.1.74.155:7400/v1/', //rico
  ricoApiUrl: 'https://rico-backend.cshare.in/api/callLogs/', //rico

  knowlarityAPI: 'https://kpi.knowlarity.com/Basic/v1/account/call/makecall',
  knowlarityUpdateStreamURL: "https://konnect.knowlarity.com:8100/update-stream/18e59376-d373-45e5-9a0d-9c088b9a95d3/konnect",

  defaultauth: '',


  AVATAR_API:
    'https://ui-avatars.com/api/?rounded=true&bold=true&color=ffffff&format=svg',
  GAPI_URL: 'https://www.googleapis.com/gmail/v1/users',
  oauthClientId:
    '611595154983-m52llucuaht3hj4pmsajuqo2hjuncqh7.apps.googleusercontent.com',  //rico mail



  oauthLoginUrl: 'https://accounts.google.com/o/oauth2/auth',
  oauthTokenUrl: 'https://oauth2.googleapis.com/token',
  oauthCallbackUrl: 'https://rico.cshare.in/layout/gmail',
  // clienSecret: 'kS1hIIW0ezbX24lkpWjEdPyw', //test mail
  clienSecret: 'test', // rico mail


  firebaseConfig: {}

};
