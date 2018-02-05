as.config(function ($stateProvider, $urlRouterProvider, localStorageServiceProvider, $httpProvider, stripeProvider, cfpLoadingBarProvider, $locationProvider, AccessLevels) {
    localStorageServiceProvider
            .setPrefix('myApp')
            // .setStorageType('localStorage')
            .setStorageType('sessionStorage')
            .setNotify(true, true)
    // cfpLoadingBarProvider.includeBackdrop = true;
    cfpLoadingBarProvider.includeSpinner = false;
    stripeProvider.setPublishableKey('pk_test_TXKXuVoSLpU96WLwrYZ0DbIA');
    $stateProvider
        .state('anon', {
            url: '/',
            data: {
              access: AccessLevels.anon
            },
            templateUrl: 'views/Anonymous/anon_pages/home.html',
            controller: 'homesCtrl',
            resolve: {
                security:  function($rootScope) {
                    $rootScope.isPatientPage = false;
                }
            } 
        })
        .state('anon.media', {
            url: 'media',
            templateUrl: 'views/Anonymous/anon_pages/media.html'
        })
        .state('anon.counselors', {
            url: 'counselors',
            templateUrl: 'views/Anonymous/anon_pages/counselors.html',
            controller: 'counselorsCtrl'
        })
        .state('anon.faq', {
            url: 'faq',
            templateUrl: 'views/Anonymous/anon_pages/faq.html'
        })
        .state('anon.help', {
            url: 'help',
            templateUrl: 'views/Anonymous/anon_pages/help.html'
        })
        .state('anon.library', {
            url: 'library',
            templateUrl: 'views/Anonymous/library_detail/library.html',
            controller: 'librariesCtrl'
        })
        .state('anon.library-details', {
            url: 'library-details/:catName',
            templateUrl: 'views/Anonymous/library_detail/library_details.html',
            controller: 'librariesCtrl'
        })
        .state('anon.contact', {
            url: 'contact',
            templateUrl: 'views/Anonymous/anon_pages/contact.html'
        })
        .state('anon.terms', {
            url: 'terms',
            templateUrl: 'views/Anonymous/anon_pages/terms.html'
        })
        .state('anon.jobs', {
            url: 'jobs',
            templateUrl: 'views/Anonymous/jobs_details/jobs.html',
            controller: 'jobsCtrl'
        })
        .state('anon.job-details', {
            url: 'job-details/:id',
            templateUrl: 'views/Anonymous/jobs_details/job_details.html',
            controller: 'jobsCtrl'
        })
        .state('anon.job-apply', {
            url: 'job-apply/:id',
            templateUrl: 'views/Anonymous/jobs_details/job_apply.html',
            controller: 'jobsCtrl'
        })

        .state('anon.about', {
            url: 'about',
            templateUrl: 'views/Anonymous/anon_pages/about_landing.html',
            controller: 'aboutController'
        })

        .state('anon.security', {
            url: 'security',
            templateUrl: 'views/Anonymous/anon_pages/security.html'
        })

        .state('anon.advisory-board', {
            url: 'advisory-board',
            templateUrl: 'views/Anonymous/anon_pages/advisory_board.html',
            controller: 'advisoryCtrl'
        })

        .state('anon.company', {
            url: 'company',
            templateUrl: 'views/Anonymous/anon_pages/company_page.html'
        })

        .state('anon.counselor-directory', {
            url: 'counselor-directory',
            templateUrl: 'views/Counselors/counselor_profile/counselor_directory.html',
            controller: 'CounselorsController'
        })

        .state('anon.personal-page', {
            url: 'personal-page/:id',
            templateUrl: 'views/Counselors/counselor_profile/counselor_personal_page.html',
            controller: 'CounselorsController'
        })

        .state('anon.get_started', {
            url: 'get-started',
            templateUrl: 'views/Anonymous/anon_pages/get_started_new.html',
            controller: 'UsersController'
        })
        
        .state('anon.comparison', {
            url: 'comparison',
            templateUrl: 'views/Anonymous/anon_pages/comparison_page.html',
            controller: 'UsersController'
        })
        
        .state('anon.user_register', { // Need to check again
            url: 'user_register',
            templateUrl: 'views/Anonymous/register.html',
            controller: 'UsersController'
        })

        .state('anon.account', {
            url: 'account',
            templateUrl: 'views/Anonymous/anon_pages/account_setting.html',
            controller: 'UsersController'
        })

        .state('anon.plan-price-info', {
            url: 'plan-price-info',
            templateUrl: 'views/Anonymous/price/price_page.html',
            controller: 'PricePageController'
        })

        .state('anon.plan-detail', {
            url: 'plan-detail',
            templateUrl: 'views/Anonymous/price/plan_detail.html',
            controller: 'PricePageListController'
        })

        .state('anon.login', {
            url: 'login/:userType',
            templateUrl: 'views/Main/login.html',
            controller: 'LoginController'
        })

        .state('anon.patient-register', {
            url: 'patient-register',
            templateUrl: 'views/Patients/register_process/patient_register.html',
            controller: 'PatientRegisterCtrl'
        })

        .state('anon.counselor-register', {
            url: 'counselor-register',
            templateUrl: 'views/Counselors/register_process/counselor_register.html',
            controller: 'CounselorRegisterCtrl'
        })        

        .state('anon.counselor-matching', {
            url: 'counselor-matching',
            templateUrl: 'views/Patients/register_process/counselor_matching.html',
            controller: 'CounselorsMatchingController',
            resolve: {
                specialities:  function($http, CONSTANTS, localStorageService){
                    if(angular.fromJson(localStorageService.get('authData'))) {
                        return $http.get(CONSTANTS.Base_Url + 'getSpecialitiesList');
                    }
                }
            }  
        }) 

        .state('anon.checkout', {
            url: 'checkout/:planId',
            templateUrl: 'views/Patients/register_process/checkoutBeforeLogin.html',
            controller: 'checkoutCtrl',
            resolve: {
                currentPlanData:  function($http, $stateParams, CONSTANTS, $rootScope){                  
                    var _data = {};
                    _data.planId = $stateParams.planId;
                    return $http.post(CONSTANTS.Base_Url + 'getPlans',_data);
                }, 
                cardDetail:  function(Patients, localStorageService, CONSTANTS, $http){                  
                    var _data = {};
                    _data.userId = angular.fromJson(localStorageService.get('authData')).user_id;
                    return $http.post(CONSTANTS.Base_Url + 'getPatientDetails',_data);
                }
            } 
        })
        
        .state('anon.questionnaire', {
            url: 'questionnaire',
            templateUrl: 'views/Patients/register_process/get_started.html',
            controller: 'getStartedCtrl'
        })          

        .state('anon.comingsoon', {
            url: 'comingsoon',
            templateUrl: 'views/Patients/register_process/comingsoon.html',
            controller: 'comingsoonCtrl'
        })

        .state('anon.reviews', {
            url: 'reviews',
            templateUrl: 'views/Anonymous/anon_pages/reviews.html',
            controller: 'reviewsCtrl'
        })

        .state('counselor', {
            url:'/counselor/:id',
            abstract:true ,
            views: {    
                '': { 
                    templateUrl: 'views/Counselors/auth/counselor_sidebar.html',
                    controller: 'CounselorsAuthController'
                }
            },
            data: {
                //access: AccessLevels.anon
                access: AccessLevels.counselor
            },
            resolve: {
                security:  function($q, localStorageService, $rootScope){
                    $rootScope.isPatientPage = false;
                    if(localStorageService.get("userType") && localStorageService.get("userType") == "P"){
                        return $q.reject("Not Authorized");
                    } 
                }
            }             
        })

        .state('counselor.edit_profile', {
            url: '',
            templateUrl: 'views/Counselors/auth/edit_profile.html',
            controller: 'CounselorsEditProfileCtrl'
        })

        .state('counselor.contactus', {
            url: '/contactus/',
            templateUrl: 'views/Counselors/auth/Help_center_contactus.html',
            controller: 'CounselorsContactusCtrl'
        })

        .state('counselor.faq', {
            url: '/faq/',
            templateUrl: 'views/Counselors/auth/Help_center_Faq.html',
            controller: 'CounselorsFAQCtrl'
        })

        .state('counselor.auto-generatedmsgs', {
            url: '/auto-generatedmsgs/',
            templateUrl: 'views/Counselors/auth/counselor_autogenerated_messages.html',
            controller: 'counselorAutoGeneratedMsgController'
        })
        
        .state('counselor.landing_page', {
            url: '/landing/',
            params: {
                postId: null,
            },
            templateUrl: 'views/Counselors/landing/counselor_landing_page.html',
            controller: 'counselorLandingController'
        })

        .state('counselor.administration', {
            url: '/administration/',
            templateUrl: 'views/Counselors/auth/counselor_administration.html',
            controller: 'counselorAdministrationController'
        })

        .state('counselor.message', {
            url: '/message/',
            params: {
                postId: null,
            },
            templateUrl: 'views/Counselors/auth/counselor_therapyroom.html',
            controller: 'counselorTherapyroomController'
        })

        .state('counselor.counselor_clinicalguide', {
            url: '/clinicalguide',
            templateUrl: 'views/Counselors/auth/counselor_clinical_guide.html',
            controller: 'ConselorsClinicalGuideCtrl'
        })

        .state('patient', {
            url:'/patient/:id',
            abstract:true,
            views: {    
                'with_sidebar': { 
                    templateUrl: 'views/Patients/auth/patient_sidebar.html',
                    controller: 'PatientsAuthController'
                },
                'without_sidebar': { 
                    template: '<div ui-view></div>'
                }
            },
            data: {
                //access: AccessLevels.anon
                access: AccessLevels.patient
            },
            resolve: {
                security:  function($q, localStorageService, $location, $rootScope){
                    $rootScope.isPatientPage = true;
                    if(localStorageService.get("userType") && localStorageService.get("userType") == "C"){
                        return $q.reject("Not Authorized");
                    } 
                }
            }         
        })

        .state('patient.message', {
            url: '/message',
            templateUrl: 'views/Patients/auth/patient_message.html',
            controller: 'PatientsMessageCtrl'            
        })


        .state('patient.landing', {
            url: '/landing/',
            params: {
                postId: null,
            },
            templateUrl: 'views/Patients/auth/landing.html',
            controller: 'PatientsLandingCtrl'
        })        

        .state('patient.patient_contact', {
            url: '/contactus',
            templateUrl: 'views/Patients/auth/patient_contact.html',
            controller: 'PatientsContactusCtrl'
        })

        .state('patient.patient_clinicalguide', {
            url: '/clinicalguide',
            templateUrl: 'views/Patients/auth/patient_clinical_guide.html',
            controller: 'PatientsClinicalGuideCtrl'
        })

        .state('patient.patient_faq', {
            url: '/faq',
            templateUrl: 'views/Patients/auth/patient_faq.html',
            controller: 'PatientsFaqCtrl'
        })

        .state('patient.patient_liboverview', {
            url: '/libraryoverview',
            templateUrl: 'views/Patients/auth/patient_liboverview.html',
            controller: 'PatientsLibOverviewCtrl'
        })

        .state('patient.patient-library-details', {
            url: '/library-details/:catName',
            templateUrl: 'views/Patients/auth/patient_libraryDetails.html',
            controller: 'PatientsLibraryDetailsCtrl'
        })

        .state('patient.pricepage', {
            url: '/pricepage',
            templateUrl: 'views/Patients/auth/pricepage.html',
            controller: 'pricepageCtrl'
        })

        .state('patient.administration', {
            url: '/administration',
            templateUrl: 'views/Patients/auth/administration.html',
            controller: 'PatinetsAdministrationCtrl'
        })

        .state('patient.carddetails', {
            url: '/carddetails',
            templateUrl: 'views/Patients/auth/carddetails.html',
            controller: 'PatientsCardDetailsCtrl'
        })

        .state('patient.checkout', {
            url: '/checkout/:planId',
            templateUrl: 'views/Patients/auth/checkout.html',
            controller: 'PatientsCheckoutCtrl',
            resolve: {
                currentPlanData:  function($http, $stateParams, CONSTANTS, $rootScope){                  
                    var _data = {};
                    _data.planId = $stateParams.planId;
                    return $http.post(CONSTANTS.Base_Url + 'getPlans',_data);
                }
            }  
        })

        .state('patient.add_card', {
            url: '/add-card',
            templateUrl: 'views/Patients/auth/add_card_afterlogin.html',
            controller: 'PatientsAddmoreCardCtrl'
        })

        .state('patient.subscription', {
            url: '/subscription',
            templateUrl: 'views/Patients/auth/subscription.html',
            controller: 'PatientsSubscriptionCtrl'
        })
    $urlRouterProvider.otherwise('/');
});