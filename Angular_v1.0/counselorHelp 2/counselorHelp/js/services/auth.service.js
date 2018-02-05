as.factory('Auth', function($http, localStorageService, AccessLevels) {
    return {
        authorize: function(access) {
            if (access === AccessLevels.patient || access === AccessLevels.counselor) {
                return this.isAuthenticated();
            } else {
                return true;
            }   
        },
        isAuthenticated: function() {
            return localStorageService.get('auth_token');
        }
    };
})
.factory('AuthInterceptor', function($q, $injector, localStorageService) {
    var LocalService = $injector.get('localStorageService');
    return {
        request: function(config) {
            var token;
            if (LocalService.get('auth_token')) {
                token = angular.fromJson(LocalService.get('auth_token')).accessToken;
            }
            if(LocalService.get('userType')) {
                loginUserType = LocalService.get('userType');
            }
            if (token) {   
                config.headers.Authorization = 'Bearer ' + token;
                config.headers.accessType = loginUserType;
            }
            return config;
        },
        responseError: function(response) {
            if (response.status === 401 || response.status === 403) {
                if( LocalService.get("userType") ) {
                    loginUserType = (LocalService.get("userType")=="C")?"Counselor":"User";
                    $injector.get('$state').transitionTo('anon.login',{userType: loginUserType}, { reload: true, inherit: false, notify: true });
                } else {
                    $injector.get('$state').transitionTo('anon', { reload: true, inherit: false, notify: true });
                }
                localStorageService.remove("auth_token");
                localStorageService.remove("authData");
                localStorageService.remove("sessionid");
                localStorageService.remove("authType");
                localStorageService.remove("userType");
                localStorageService.remove("user_type");
                localStorageService.remove('user_registered');
                localStorageService.remove('counselor_registered');
                localStorageService.remove('prevState');
                localStorageService.remove('userMatching');
                localStorageService.remove('counselorId');  
                localStorageService.remove('counselorMatching'); 
                localStorageService.remove('isRegistrationProcess'); 
                localStorageService.remove('isCounselorMatchingState'); 
            }
            return $q.reject(response);
        }
    };
})
.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});