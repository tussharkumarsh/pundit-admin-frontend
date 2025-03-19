// OIDC
import { LogLevel, OidcConfigService } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';

// export const configureAuth = (oidcConfigService: OidcConfigService) => {
//   return () =>
//     oidcConfigService.withConfig(
//       {
//         stsServer: 'https://accounts.google.com',
//         // redirectUrl: environment.oauthCallbackUrl,
//         postLogoutRedirectUri: `${window.location.origin}/login`, // no funciona el redirect
//         postLoginRoute: '/',
//         forbiddenRoute: '/error', // no hay permiso para acceder a recursos (token inválido)
//         unauthorizedRoute: '/error',
//         autoUserinfo: true,
//         // clientId: environment.oauthClientId,
//         scope:
//           'openid profile email https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/contacts',
//         responseType: 'id_token token',
//         silentRenew: true, // cada 4 sec se compruba
//         silentRenewUrl: `${window.location.origin}/silent-renew.html`,
//         renewTimeBeforeTokenExpiresInSeconds: 30,
//         // logLevel: LogLevel.Debug
//       }

//       /*
//     triggerAuthorizationResultEvent: true,
//     startCheckSession: false,
//     historyCleanupOff: true,*/
//     );
// };
