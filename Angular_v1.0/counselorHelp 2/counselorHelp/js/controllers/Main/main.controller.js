/**
 * @Method :     App Controller
 * @Purpose:     Controller
 */

angular.module('myApp.controllers', []);
as.controller('AppCtrl', function ($scope, $rootScope, $location, localStorageService, $anchorScroll,$state, $stateParams, Main, Counselors, commonFooterHeader, Patients, $interval, CONSTANTS, ipCookie) {

    $rootScope.commonFooterHeader = commonFooterHeader;
    $rootScope.copyRightDate = new Date();
    $rootScope.isUserLoggedIn = false;
    $scope.undoBtn = false;
    $scope.Post_Image_Url = CONSTANTS.Post_Image_Url;

    if(localStorageService.get('userType') == 'C' && localStorageService.get('counselor_registered') == 'true') {
        if(!$stateParams.id) {
            $rootScope.id = angular.fromJson(localStorageService.get('authData')).user_id;
            Counselors.getCounselorDetailPersonal(angular.fromJson(localStorageService.get('authData')).user_id);
        }
    }

    if(localStorageService.get('userType') == 'P' && localStorageService.get('user_registered') == 'true') {
        if(!$stateParams.id) {
            $rootScope.id = angular.fromJson(localStorageService.get('authData')).user_id;
            var _data = {};
            _data.userId = angular.fromJson(localStorageService.get('authData')).user_id;
            Patients.getPatientDetails(_data);
        }
    }    
    
    $scope.$on('profile_pic_data', function (event, data) {
        $scope.counselor_detail.profile_pic = data;
    });
    $scope.$on('profile_data', function (event, data) {
        $scope.counselor_detail = data;
    });

    $scope.$on('patient_profile_data', function (event, data) {
        $scope.patientDetail = data;
    }); 
    $scope.$on('counselor_data', function (event, data) {
        $scope.counselor_data = data;
        $rootScope.aCounselorNotifications = $scope.counselor_data.notifications.posts;
        $rootScope.aCounselorAllNotifications = $scope.counselor_data.notifications.messages;
        $rootScope.notificationCount = $scope.counselor_data.notifications.notificationCount;
    });

    $scope.showNotification = function(id, type) {

        $scope.notificationdata = $scope.counselor_data;
        if($scope.notificationdata.notifications.posts || $scope.notificationdata.notifications.messages) {
            $rootScope.aCounselorNotifications = $scope.notificationdata.notifications.posts;
            $rootScope.aCounselorAllNotifications = $scope.notificationdata.notifications.messages;
            $rootScope.notificationCount = $scope.notificationdata.notifications.notificationCount;
            if(type == 'article') {
                $state.go('counselor.landing_page', {postId:id}, {reload:true})                 
            } else {
                $rootScope.notificationType = type;
                $state.go('counselor.message', {postId:id}, {reload:true})
            }
        }
    }


    $scope.$on('patient_all_detail', function (event, data) {
        $scope.notificationData = data;
        $rootScope.aPatientNotifications = $scope.notificationData.notifications.posts;
        $rootScope.aPatientAllNotifications = $scope.notificationData.notifications.messages;
        $rootScope.notificationCount = $scope.notificationData.notifications.notificationCount;
    });


    $scope.showPatientNotification = function(id, type) {
        $scope.patientNotificationdata = $scope.notificationData;
        if($scope.patientNotificationdata.notifications.posts || $scope.patientNotificationdata.notifications.messages) {
            $rootScope.aPatientNotifications = $scope.patientNotificationdata.notifications.posts;
            $rootScope.aPatientAllNotifications = $scope.patientNotificationdata.notifications.messages;
            $rootScope.notificationCount = $scope.patientNotificationdata.notifications.notificationCount;

            if(type == 'article') {
                $state.go('patient.landing', {postId:id}, {reload:true})                 
            } else {
                if(type == 'payment') {
                    $rootScope.patientNotificationType = type;
                    $state.go('patient.subscription', {}, {reload:true})
                } else {
                    $rootScope.patientNotificationType = type;
                    $state.go('patient.message', {}, {reload:true})
                }
            }
        }
    }

    $scope.counselor_logout = function() {
        Counselors.LogoutFunction('counselor');
    }

    $scope.patient_logout = function() {
        Counselors.LogoutFunction('user');
    };

    $scope.sendMail = function(isValid,data) {
        $scope.undoBtn = true;
        if(isValid) {
            var _data = {};
            _data.email = data;
            _data.user_type = 'C';
            _data.user_id = $stateParams.id;
            Main.newsletterSignUp(_data).success(function (response) {  
                $rootScope.ifResponse = true;
                $scope.signUpMessage = response.message;
                $scope.undoBtn = false;
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            });
        } else {
            $rootScope.ifResponse = false;
            $rootScope.isTrue = true;
        }
    }
    $scope.popupClose = function(type) {
        if(type == 'close') {
            $rootScope.ifResponse = false;  
            $rootScope.Newsletter_popup = false;
            $rootScope.isTrue = false;
        } else {
            $rootScope.ifResponse = false; 
            $rootScope.isTrue = false;
            if($rootScope.email) {
                $scope.email = $rootScope.email;
            } else {
                $scope.email = '';
            }
        }        
    }

    $scope.forBetaVersion = function() {
        if(localStorageService.get('userType') == 'C' && localStorageService.get('counselor_registered') == 'true') {
            $state.go('counselor.landing_page',{id:angular.fromJson(localStorageService.get('auth_token')).user_id}, { reload: true, inherit: false, notify: true });         
        } else if(localStorageService.get('userType') == 'P' && localStorageService.get('user_registered') == 'true' && !localStorageService.get('userMatching')) {
            $state.go('patient.landing',{id:angular.fromJson(localStorageService.get('auth_token')).user_id}, { reload: true, inherit: false, notify: true });  
        } else {
            $state.go('anon.login', {userType:'User'})
        }   
    }

    $rootScope.dateFormat = function(date) {
        if(date) {
            var timestamp = date.replace(/-/g,'/');
            return new Date(timestamp).getTime();
        }
    }

    $rootScope.leaveCurrentPage = function() {
        Main.removeLocalStorageData(); 
        $state.go($rootScope.nextStateUrl);
        $('#commonPopup').modal('hide');
        $("#blurDiv").removeClass("blur-effect");
    }

    $scope.backToMatching = function() {

        if(ipCookie('cookieValue')) {
            $state.go('anon.counselor-matching', {}, {reload: true});
        } else {  
            Main.removeLocalStorageData();  
            Main.popupCommonFunction('inactivity');     
            $state.go('anon', {}, {reload: true});
        }
    }

    $scope.indentifyInactivity = function() {
        var idleTime = 0;
        $(document).ready(function () {
            //Increment the idle time counter every minute.
            if(localStorageService.get("user_registered") || localStorageService.get("counselor_registered") || localStorageService.get('counselor_registered') == 'true' || localStorageService.get('user_registered') == 'true') {
                $scope.idleInterval = $interval(timerIncrement, 60000); // 1 minute
            }

            //Zero the idle timer on mouse movement.
            $(this).mousemove(function (e) {
                idleTime = 0;
            });
            $(this).keypress(function (e) {
                idleTime = 0;
            });
        });

        function timerIncrement() {
            idleTime = idleTime + 1;
            if (idleTime > 14 ) { // 15 minutes 
                $interval.cancel($scope.idleInterval);
                Counselors.LogoutFunction('inactivity');              
                
            }
        }
    }    

    $scope.indentifyInactivity();
});