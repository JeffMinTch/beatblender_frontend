import { AuthConfigService } from './config/auth-config.service';
import * as WebFont from 'webfontloader'


export function init_app(authConfigService: AuthConfigService) {
    return () => authConfigService.initAuth().then((data) => {
        console.log(data);
    });
}

export function load_font() {
    
    return () => new Promise<any>((resolve,reject) => {
        WebFont.load({
            custom: {
            families: ['Material Icons'],
          }});
        resolve(true);  
        });
        
}