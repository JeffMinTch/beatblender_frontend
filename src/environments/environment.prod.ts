// import { config } from "config";
import { config } from './../config';


export const environment = {
  production: true,
  apiURL: config.webApi,
  keycloak: {
    // Url of the Identity Provider
    issuer: 'http://localhost:8080/auth/realms/beatblender',
    // concrete Address commes here
    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin + '/licensing/sample-market',

    // The SPA's id. 
    // The SPA is registerd with this id at the auth-serverß
    clientId: 'spa-beatblender',

    responseType: 'code',
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC.
    scope: 'openid profile email offline_access',
    // Remove the requirement of using Https to simplify the demo
    // THIS SHOULD NOT BE USED IN PRODUCTION
    // USE A CERTIFICATE FOR YOUR IDP
    // IN PRODUCTION
    requireHttps: false,
    // at_hash is not present in JWT token
    showDebugInformation: true,
    disableAtHashCheck: true
  }
};