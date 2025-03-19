// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.



export const environment = {
  production: false,
  isServer: false,

  apiUrl: 'https://backend.pokerpundit.in/v1/', //poker pundit new



  apiUrlForReport: '', //sushma
  ricoApiUrl: '', //rico

  knowlarityAPI: '',

  defaultauth: '',


  AVATAR_API:
    'https://ui-avatars.com/api/?rounded=true&bold=true&color=ffffff&format=svg',


  firebaseConfig: {}
};
