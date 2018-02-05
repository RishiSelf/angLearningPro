var as = angular.module('myApp', ['ui.router', 'PagesService', 'UsersService', 'CounselorsService', 'PatientsService', 'ngSanitize', 'angularUtils.directives.dirPagination', 'LocalStorageModule', 'ngFileUpload', 'xeditable', 'angular-stripe','angular-loading-bar', 'ngAnimate', 'duScroll', 'uiCropper', 'ui.toggle', 'ui.bootstrap', 'angularMoment', 'ui.multiselect', 'ipCookie', 'ngDragDrop']);

as.run(function ($window, $rootScope, $urlRouter, $location, $state, localStorageService, Auth, $stateParams, $anchorScroll, $timeout, Main, ipCookie) {

    $rootScope.isCounselorLoggedIn = false;
    $rootScope.isPatientLoggedIn = false;
    $rootScope.noHeader = false;
    $rootScope.Newsletter_popup = false;
    $rootScope.isCounselorLoggedIn = (localStorageService.get("userType") && localStorageService.get("userType")=="C" && localStorageService.get("counselor_registered") && localStorageService.get("counselor_registered")=="true" )? true:false;

    $rootScope.isPatientLoggedIn = (localStorageService.get("userType") && localStorageService.get("userType")=="P" && localStorageService.get("user_registered") && localStorageService.get("user_registered")=="true" )? true:false;

    if(localStorageService.get('userMatching') && localStorageService.get('userMatching') == 'true') {
        $rootScope.isPatientLoggedIn = false;
    }
    
    // $rootScope.isCounselorMatchingPage = localStorageService.get('counselorMatching');
    
    $rootScope.$on("$stateChangeStart",function (event, toState, toParams, fromState, fromParams) {
        $anchorScroll();
        $('#head-nav').removeClass('in'); // Close Hemberger list on page change for small screen 
        // $rootScope.isCounselorMatchingPage = localStorageService.get('counselorMatching');

        $rootScope.isCounselorLoggedIn = (localStorageService.get("userType") && localStorageService.get("userType")=="C" && localStorageService.get("counselor_registered") && localStorageService.get("counselor_registered")=="true" )? true:false;

        $rootScope.isPatientLoggedIn = (localStorageService.get("userType") && localStorageService.get("userType")=="P" && localStorageService.get("user_registered") && localStorageService.get("user_registered")=="true" )? true:false;

        if(localStorageService.get('userMatching') && localStorageService.get('userMatching') == 'true') {
            $rootScope.isPatientLoggedIn = false;
        }

        if (toState.templateUrl == "views/pages/job_details.html" || toState.templateUrl == "views/pages/job_apply.html") {
            $rootScope.pageType = false; // To remove header and footer from Job detail page
        } else {
            $rootScope.pageType = true;
        }

        if (toState.templateUrl == "views/users/account_setting.html") {
            $("#accountPage").addClass("account-setting"); // Add class only for account page
        } else {
            $("#accountPage").removeClass("account-setting");
        }

        if (localStorageService.get('loggedInUser')) {
            $rootScope.isUserLoggedIn = true;
            $rootScope.User = loggedInUser;
            if (localStorageService.get('profile_pic_updated')) {
                $rootScope.profile_pic = localStorageService.get('profile_pic_updated');
            } else {
                $rootScope.profile_pic = loggedInUser.profile_pic;
            }
        }

        if(toState.name != "anon.login" && toState.name != "anon.counselor-matching") {
            $rootScope.noHeader = false;
        }

        if(toState.name != "anon.login") {
            $rootScope.noFooter = false;
            $rootScope.footerShow = false;
        } 

        if(toState.name != "counselor.landing_page") {
            $rootScope.Newsletter_popup = false;
        }

        if(toState.name == "patient.message") {
            // $rootScope.isPatientLoggedIn = true;
            $rootScope.therapy = true;           
        } else if(localStorageService.get("userType") == 'P'){
            // $rootScope.isPatientLoggedIn = true;
            $rootScope.therapy = false;
        }

        if(localStorageService.get('isRegistrationProcess') && localStorageService.get('isRegistrationProcess') == 'true') {
            $rootScope.isRegistrationProcess = true;            
        } else {
            $rootScope.isRegistrationProcess = false;
        }

        if(localStorageService.get('isCounselorMatchingState') && localStorageService.get('isCounselorMatchingState') == 'true') {
            $rootScope.isMatchingProcess = true;
        } else {
            $rootScope.isMatchingProcess = false; 
        } 


        if( toState.name != 'anon.counselor-register' && 
            toState.name != 'anon.patient-register' && 
            toState.name != 'anon.counselor-matching' &&
            toState.name != 'anon.questionnaire' && 
            localStorageService.get('isRegistrationProcess') && 
            localStorageService.get('isRegistrationProcess') == 'true') {
            
            if(localStorageService.get('isCounselorMatchingState') && localStorageService.get('isCounselorMatchingState') == 'true') {
                $rootScope.isRegistrationProcess = true;
            } else {
                event.preventDefault();
                $rootScope.nextStateUrl = toState.name;
                Main.popupCommonFunction('isUserRegistrationProcess'); 
            }            
        }

        if(fromState.name == 'anon.counselor-matching') {
            var now = new Date(); 
            now.setMinutes(now.getMinutes() + 5);
            ipCookie('cookieValue', 'counselor-matching', { expires: now});
        }             

        $timeout(function (){

            if (!Auth.authorize(toState.data.access)) {
                event.preventDefault();
                if( localStorageService.get("userType") ) {
                    loginUserType = (localStorageService.get("userType")=="C")?"Counselor":"User";
                    $state.transitionTo('anon.login',{userType: loginUserType}, { reload: true, inherit: false, notify: true });
                } else {
                    $state.transitionTo('anon', { reload: true, inherit: false, notify: true });
                }

                Main.removeLocalStorageData();
            }

            if((toState.name === 'anon.login') && (!!Auth.isAuthenticated())) {
                event.preventDefault();
                if(localStorageService.get("userType") && localStorageService.get("userType")=="C" && localStorageService.get("counselor_registered") && localStorageService.get("counselor_registered")=="true"){
                    $state.go('counselor.landing_page',{id:angular.fromJson(localStorageService.get('auth_token')).user_id}, { reload: true, inherit: false, notify: true });

                } else if(localStorageService.get("userType") && localStorageService.get("userType")=="P" && localStorageService.get("user_registered") && localStorageService.get("user_registered")=="true" && !localStorageService.get('userMatching')) {
                    $state.go('patient.message',{id:angular.fromJson(localStorageService.get('auth_token')).user_id}, { reload: true, inherit: false, notify: true });
                }
            }
        },300)

        if(toState.name == 'patient.pricepage' || toState.name == 'patient.administration'){
            $rootScope.patientDetail();
        }        
    });

    $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error){

        if(error === "Not Authorized") {

            $state.go(fromState.name);
            $rootScope.isCounselorLoggedIn = (localStorageService.get("userType") && localStorageService.get("userType")=="C" && localStorageService.get("counselor_registered") && localStorageService.get("counselor_registered")=="true" )? true:false;
            $rootScope.isPatientLoggedIn = (localStorageService.get("userType") && localStorageService.get("userType")=="P" && localStorageService.get("user_registered") && localStorageService.get("user_registered")=="true" )? true:false;
            if(localStorageService.get('userMatching') && localStorageService.get('userMatching') == 'true') {
                $rootScope.isPatientLoggedIn = false;
            }
        }   
    });

    // transfers sessionStorage from one tab to another
    var sessionStorage_transfer = function(event) {
        if(!event) { 
            event = window.event; 
        } // ie suq
        if(!event.newValue) {
            return; 
        }   
        // do nothing if no value to work with
        if (event.key == 'getSessionStorage') {
            // another tab asked for the sessionStorage -> send it
            localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
            // the other tab should now have it, so we're done with it.
            localStorage.removeItem('sessionStorage'); // <- could do short timeout as well.
        } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
            // another tab sent data <- get it
            var data = JSON.parse(event.newValue);
            for (var key in data) {
                var keyVal = key.substr(6);
                localStorageService.set(keyVal, JSON.parse(data[key]));
            }
            $rootScope.isCounselorLoggedIn = (localStorageService.get("userType") && localStorageService.get("userType")=="C" && localStorageService.get("counselor_registered") && localStorageService.get("counselor_registered")=="true" )? true:false;

            $rootScope.isPatientLoggedIn = (localStorageService.get("userType") && localStorageService.get("userType")=="P" && localStorageService.get("user_registered") && localStorageService.get("user_registered")=="true" )? true:false;

            if(localStorageService.get('userMatching') && localStorageService.get('userMatching') == 'true') {
                $rootScope.isPatientLoggedIn = false;
            }
        }
    };

    // listen for changes to localStorage
    if(window.addEventListener) {
        window.addEventListener("storage", sessionStorage_transfer, true);
    }

    //Ask other tabs for session storage (this is ONLY to trigger event)
    if (!sessionStorage.length) {
        localStorage.setItem('getSessionStorage', 'foobar');
        localStorage.removeItem('getSessionStorage', 'foobar');
    };
});
