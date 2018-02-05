var CounselorsService = angular.module('CounselorsService', []);

CounselorsService.service('Counselors', function ($rootScope, $http, $location, CONSTANTS, Upload, $state, localStorageService, $q, Main, $stateParams) {


    this.getCounselors = function () {
        return $http.get(CONSTANTS.Base_Url + 'get_counselors');
    }
    
    this.getCounselorDetailPersonal = function (id) {

        return $http.get(CONSTANTS.Base_Url + 'getCounselorDetail/'+id).success(function (response) {          
            if(response.status == 'success') {
                $rootScope.response = response;
                if(response.data.CounselorDetail.is_online === "" || response.data.CounselorDetail.is_online === "0"){
                    $rootScope.is_online = false;
                    $rootScope.online_text = "Ej Tillg&auml;nglig";
                } else {
                    $rootScope.is_online = true;
                    $rootScope.online_text = "Tillg&auml;nglig";
                }

                $rootScope.$broadcast('profile_data', response.data.User);
                $rootScope.$broadcast('counselor_data', response.data);            
            }
        }).error(function (error) {             
            Main.popupCommonFunction('apiError');
        });     
    }


    this.getCounselorPersonalProfile = function (id) {

        return $http.get(CONSTANTS.Base_Url + 'getCounselorPersonalProfileDetails/'+id);
    }

    this.editProfile = function () {
        return $http.get(CONSTANTS.Base_Url + 'editprofile');
    }

    this.saveProfilePic = function (data, userid, image_type) {
        return Upload.upload({
            url: CONSTANTS.Base_Url +'saveConselorProfilePic', data: {imageData: data,'id':userid, 'image_type':image_type }
        });
    }
    this.saveProfile = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'saveCounselorProfile',JSON.stringify( data ) );
    }
    this.loginForm = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'getbankIdAuthUrl',JSON.stringify( data ) );
    }

    this.otherDeviceResponse = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'getOtherDeviceResponse',JSON.stringify( data ) );
    }

    this.sameDeviceResponse = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'getSameDeviceResponse',JSON.stringify( data ) );
    }    
    
    this.counselorsLandingData = function (data, searchString, option) {
        if(option == 'search'){

            return $http.post(CONSTANTS.Base_Url + 'getPosts/'+searchString, JSON.stringify( data ));
        }else{
            
            return $http.post(CONSTANTS.Base_Url + 'getPosts',JSON.stringify( data ));
        }        
    }
    this.showUpdatedNotification = function (data, usertype) {
        if(usertype == 'patient'){
            angular.forEach(data, function(data) {               
                if($rootScope.patientNotificationType == data.notification_type) {
                    data.is_read = '1';
                    var _data = {};
                    _data.id = data.id;
                    _data.with_respect_id = data.with_respect_id;
                    _data.userId = $stateParams.id;
                    _data.notificationType = data.notification_type; 
                    _data.userType = 'Patient'; 
                    return $http.post(CONSTANTS.Base_Url + 'updateNotification', JSON.stringify( _data )).success(function (response){
                        if(response.status == 'success') {                    
                            $rootScope.notificationCount = response.data.notificationCount;
                        }
                    }).error(function (error) {
                        Main.popupCommonFunction('apiError');
                    });
                }
            });
        } else {
            var deffered = $q.defer();
            return $http.post(CONSTANTS.Base_Url + 'updateNotification', JSON.stringify( data )).success(function (response){
                if(response.status == 'success') {                    
                    $rootScope.notificationCount = response.data.notificationCount; 
                    deffered.resolve(response.data);
                }
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            });
            return deffered.promise; 
        }     
    }

    this.getGeneratedMessage = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'getGeneratedMessage', JSON.stringify( data ));       
    }
    this.postGeneratedMessage = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'generateCounselorMessage', JSON.stringify( data ));       
    }
    this.onlineStatus = function(online_data){
        return $http.post(CONSTANTS.Base_Url + 'updateOnlineStatus', JSON.stringify( online_data ));   
    }
    this.getNewsLetter = function (data) {
        return $http.get(CONSTANTS.Base_Url + 'getNewsLetter/'+data);
    }

    this.getTherapyData = function(data) {
        return $http.post(CONSTANTS.Base_Url + 'getTherapyData', data);
    }
    this.sendMessage = function(data) {
        return $http.post(CONSTANTS.Base_Url + 'sendMessage', data);
    }
    this.markPhoneSessionConsumed = function(data) {
        return $http.post(CONSTANTS.Base_Url + 'markPhoneSessionConsumed', data);
    }

    this.deleteConversation = function(data) {
        return $http.post(CONSTANTS.Base_Url + 'deleteMessages', data);
    }

    this.LogoutFunction = function(type) {
        var _data = {};
        _data.authType = localStorageService.get('authType');
        _data.sessionid = localStorageService.get('sessionid');
        return $http.post(CONSTANTS.Base_Url + 'logout',JSON.stringify( _data ) ).success(function (response){
            if(response.status == 'success') { 
                Main.removeLocalStorageData();            
                if(type == 'inactivity') {
                    localStorageService.set('logout',true);
                    Main.popupCommonFunction('inactivity');
                }
                $state.go('anon',{}, {reload:true});
            }
        }).error(function (error) {            
            Main.removeLocalStorageData();
            $state.go('anon',{}, {reload:true});
            // if(type == 'inactivity') {
            //     Main.popupCommonFunction('inactivity');
            // } else {
            //     Main.popupCommonFunction('apiError'); 
            // }         
        });          
    }   

});
