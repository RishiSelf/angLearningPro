/**
 * @Method :     Counselors Controller
 * @Purpose:     Controller for Counselors login
 */

as.controller('LoginController', function($rootScope, $scope, $state, $stateParams, Counselors, localStorageService, $timeout, $interval, $sce, Main, ipCookie) {

    $scope.responseError = false;
    $rootScope.noHeader = true;
    $rootScope.noFooter = true;
    $rootScope.footerShow = false;
    $scope.showUserBankId = false;
    $scope.login_PopUp = false;
    $scope.isCounselorMatch = false;
    
    $scope.conditionArray = ['CANCEL1', 'CANCEL2', 'User canceled'];
    localStorageService.set('user_type', $stateParams.userType);
    $(document).ready(function() {
        var screenHeight = window.innerHeight;
        $('.counselor-page .bankId-middle-frame').css('height', screenHeight);
    });
    $(window).resize(function() {
        var screenHeight = window.innerHeight;
        $('.counselor-page .bankId-middle-frame').css('height', screenHeight);
    }); 

    // === Select type of login i.e login from same device or other( from smart phone) ===

    $scope.selectUserType = function(type) {
        if(type == 'true') {
            $scope.showUserBankId = true;
        } else {
            $scope.showUserBankId = false;
            $scope.login_error = false;
        }
    }

    $scope.loginForm = function(isValid) {
        
        $scope.responseError = false;
        if($scope.showUserBankId != false) {
            $scope.login_error = true;
        }
        if(isValid) {
            if($scope.showUserBankId == true) {                                         
                $scope.loginForm_other();
            } else {               
                $scope.loginForm_same();  
            }
        } else {
            if($scope.showUserBankId == false) {
                $scope.loginForm_same();  
            }
        }       
    }

    $scope.loginForm_other = function() {

        var _data = {};
        _data.authType = 'other';
        _data.pnr = $scope.userBankId; 

        Counselors.loginForm(_data).success(function (response) { 

            if(response.data.sessionId) {
                $scope.login_PopUp = true;
                $scope.otherDes = true;
                $('#loginPopUp').css('min-height', '0px');

                $timeout(function () {
                    $scope.otherDes = false;
                }, 5000);

                $scope.sessionId = response.data.sessionId;
                var _data = {};
                _data.userType = $stateParams.userType;
                _data.sessionid = response.data.sessionId;  

                $scope.interval = $interval(function() {
                    $scope.login_otherDevice(_data)
                }, 5000); 

            } else {
                $scope.loginForm_other();
            }
        }).error(function (error) {
            // Main.popupCommonFunction('apiError');
        });
    }

    $scope.login_otherDevice = function(_data) {        
        Counselors.otherDeviceResponse(_data).success(function (response) {
            
            localStorageService.set('sessionid', $scope.sessionId);
            localStorageService.set('authType', 'other');
            localStorageService.set('authData', JSON.stringify(response.data));
            localStorageService.set('auth_token', JSON.stringify(response.data)); 

            if(response.status == 'success') {

                $scope.checkSomeOtherCondition(response);

            } else if($scope.isInArray(response.message.code, $scope.conditionArray)) {

                $interval.cancel($scope.interval);
                $scope.login_PopUp = false;
                $scope.responseError = true;
                $scope.message = $sce.trustAsHtml('Inloggningen misslyckades. Var god f&ouml;rs&ouml;k igen.');                

            } else if(response.message.code != 'NOTLOGGEDIN') {

                $scope.checkSomeOtherCondition(response);    
            }
        }).error(function (error) {
            // Main.popupCommonFunction('apiError');
        });
    }



    $scope.loginForm_same = function() {

        var _data = {};
        _data.authType = 'same'; 

        Counselors.loginForm(_data).success(function (response) {
            if(response.status == 'success') {

                if(response.data.sessionId) {

                    $scope.login_PopUp = false;
                    $scope.sessionId = response.data.sessionId;

                    $scope.interval = $interval(function() {
                        $scope.login_sameDevice()
                    }, 5000);

                    location.href = response.data.redirectUrl;
                } else {

                    $scope.loginForm_same();
                }
            }                        
        }).error(function (error) {

            $interval.cancel($scope.interval);
            // Main.popupCommonFunction('apiError');
        });
    } 

    $scope.login_sameDevice = function() {

        var _data = {};
         _data.userType = $stateParams.userType;
        _data.sessionid = $scope.sessionId;
        Counselors.sameDeviceResponse(_data).success(function (response) {

            localStorageService.set('sessionid', $scope.sessionId);
            localStorageService.set('authData', JSON.stringify(response.data));
            localStorageService.set('authType', 'same');
            localStorageService.set('auth_token', JSON.stringify(response.data)); 

            if(response.status == 'success') {                            
                
                $scope.checkSomeOtherCondition(response);
            }
            else if($scope.isInArray(response.message.code, $scope.conditionArray)) {

                $interval.cancel($scope.interval);
                $scope.login_PopUp = false;
                $scope.message = $sce.trustAsHtml('Inloggningen misslyckades. Var god f&ouml;rs&ouml;k igen.');
                $scope.responseError = true;

            } else if(response.message.code != 'NOTLOGGEDIN') {

                $scope.checkSomeOtherCondition(response);                      
            }
        }).error(function (error) {
            $interval.cancel($scope.interval);
            // Main.popupCommonFunction('apiError');
        });
    }


    $scope.checkSomeOtherCondition = function(response) {

        $interval.cancel($scope.interval);
        $scope.login_PopUp = false;

        if(response.data.code == 'ageError') {
            Main.popupCommonFunction('ageVerificationError');
            $state.go('anon')
            return false;
        }

        if(response.data.code == '401') {
            $scope.responseError = true;
            $scope.message = response.data.message;
            return false;
        }

        if($stateParams.userType == 'Counselor') {
            $scope.responseError = false;
            localStorageService.set('userType', 'C');
            $timeout(function (){
                $scope.isAuthenticated(response.data, 'counselor');
            },100); 
        } else {
            $scope.responseError = false;
            localStorageService.set('userType', 'P');
            $timeout(function (){
                $scope.isAuthenticated(response.data, 'patient');
            },100)
        }      
    }

    $scope.isAuthenticated = function(data, type) {
        if(type == 'patient') {

            if(data.is_beta == 'false') {
                $state.go('anon.comingsoon');
                return false;
            }
            if(data.is_active == 0 || data.is_active == '') {
                $scope.responseError = true;
                $scope.message = $sce.trustAsHtml('Ditt konto &auml;r inaktivt. Var god kontakta kundtj&auml;nst.');;
                return false;
            }
            $scope.counselorMatching(data);
                       
        } else {
            if(data.is_beta == 'false') {
                $state.go('anon.comingsoon');
                return false;
            }
            if(data.is_active == 0 || data.is_active == '') {
                $scope.responseError = true;
                $scope.message = $sce.trustAsHtml('Ditt konto &auml;r inaktivt. Var god kontakta kundtj&auml;nst.');
                return false;
            }
            if(data.is_term == 0 || data.is_term == '') {
                localStorageService.set('isRegistrationProcess', 'true');
                localStorageService.set('counselor_registered', 'false');
                $state.go('anon.counselor-register');
                return false;
            } else {
                localStorageService.set('counselor_registered', 'true');
                $state.go('counselor.landing_page',{id:angular.fromJson(localStorageService.get('auth_token')).user_id});
            }
        }
    }

    $scope.counselorMatching = function(data) {
        Main.getCounselor(angular.fromJson(localStorageService.get('authData')).user_id).success(function (response) {            
            if(response.status == 'success') {
                $scope.isCounselorMatch = true;                
            } else {
                $scope.isCounselorMatch = false;
            } 
            $scope.patientLoginProcess(data);                                   
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }   

    $scope.patientLoginProcess = function(data) {

        if(data.is_term == 0 || data.is_term == '') {
            localStorageService.set('isRegistrationProcess', 'true');
            localStorageService.set('user_registered', 'false');
            $state.go('anon.patient-register');
            return false;
        } else if(!$scope.isCounselorMatch) {
            localStorageService.set('isRegistrationProcess', 'true');
            localStorageService.set('user_registered', 'false');
            $state.go('anon.counselor-matching');
            return false;
        } else if(data.is_question_info_save == 0 || data.is_question_info_save == '') {
            localStorageService.set('isRegistrationProcess', 'true');
            localStorageService.set('user_registered', 'false');
            $state.go('anon.questionnaire');
            return false;            
        } else {
            localStorageService.set('user_registered', 'true');
            $state.go('patient.message',{id:angular.fromJson(localStorageService.get('authData')).user_id});            
            return false;
        }
    }   
   
    $scope.popupCancel_btn = function() {
        $interval.cancel($scope.interval);
        $scope.login_PopUp = false;        
    }

    $scope.isInArray = function(value, array) {
        return array.indexOf(value) > -1;
    }
})