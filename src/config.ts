export const config = {
  webApi: {
    baseUrl: 'http://localhost:9090/api/web',
    audioPath: {
      public: {
        root: '/public/audio',
        samplesHome: '/samples-home',
        tracksHome: '/tracks-home',
        findByString: '/find-by-string',
        searchSingleAudio: '/search-single-audio',
        searchMusicByInput: '/searchMusicByInput',
        filterSamples: '/filter-samples',
        filterTracks: '/filter-tracks',
        
      },
      protected: {
        root: '/protected/audio',
        uploadSamples: '/upload-samples',
      }
    },
    userPath: {
      public: {
        root: '/public/user'
      },
      protected: {
        root: '/protected/user',
        userData: '/user-data'
        
      }
    },
    licensePath: {
      public: {
        root: '/public/license'
      },
      protected: {
        root: '/protected/license',
        fullLicense: {
          root: '/full-license',
          getFullLicenses: '/get-full-licenses',
          upgradeFullLicense: '/withdraw-extension-option'
        },
        basicLicense: {
          root: '/basic-license',
          getBasicLicense: '/get-basic-license',
          getAll: '/get-all',
          getAllTracks: '/get-all-tracks',
          getAllUnextendedTracks: '/get-all-unextended-tracks'
        }
      }
    },
    mediaPath: {
      public: {
        root: '/public/media',
        audio: '/audio'
      },
      protected: {
        root: '/protected/media',
        getAudioFile: '/get-audio-file',
        getBasicLicenseFile: '/get-basic-license-file',
        getFullLicenseFile: '/get-full-license-file'
      }
    }
  
},
  authRoles: {
    // sa: ['SA'], // Only Super Admin has access
    // admin: ['SA', 'Admin'], // Only SA & Admin has access
    // editor: ['SA', 'Admin', 'Editor'], // Only SA & Admin & Editor has access
    // user: ['SA', 'Admin', 'Editor', 'User'], // Only SA & Admin & Editor & User has access
    // guest: ['SA', 'Admin', 'Editor', 'User', 'Guest'] // Everyone has 
    superAdmin: ['app-super-admin', 'app-admin', 'app-mitarbeiter', 'app-user', 'app-business-user', 'offline_access', 'uma_authorization'],
    admin: ['app-admin', 'app-mitarbeiter', 'app-business-user', 'app-user', 'offline_access', 'uma_authorization'],
    mitarbeiter: ['app-mitarbeiter', 'app-user', 'app-business-user', 'offline_access', 'uma_authorization'],
    business_user: ['app-business-user', 'offline_access', 'uma_authorization'],
    user: ['app-user', 'offline_access', 'uma_authorization']
  }
}
