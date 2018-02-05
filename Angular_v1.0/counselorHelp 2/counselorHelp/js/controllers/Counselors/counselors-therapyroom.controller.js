/**
 * @Method :     Counselors Controller
 * @Purpose:     Controller for Counselor therapy room
 */

as.controller('counselorTherapyroomController', function($scope, Counselors, localStorageService, $stateParams, $timeout, $filter, $state, $rootScope, Main, Upload, CONSTANTS) {

    $scope.counselorId = $stateParams.id; 
    $scope.sendBtnDisable = true; 
    $scope.showMessage = true;
    $scope.aPatientProfile = [];
    $scope.aPatientSessionMessages = [];
    $scope.ifPatientMessage = true;
    $scope.isCounselor = true;
    $scope.isDateTimePicker = false;
    $scope.aPhoneSessionCounts = [];
    $scope.terminateSession = false;
    $scope.isPlanExpired = false;
    $scope.isPhoneSessionLeft = true;
    $scope.activeParentIndex;
    $scope.activeMenu = 'text';
    $scope.updatedTime = {};
    $scope.timePicker = {
        time: ''
    };
    $scope.dtmax = new Date();

    $scope.messageNotification = function(){
        if($state.params.postId != ''){
            angular.forEach($rootScope.aCounselorAllNotifications, function(data) {               
                if($state.params.postId == data.with_respect_id && $rootScope.notificationType == data.notification_type) {
                    $scope.notification_type = data.notification_type;
                    var _data = {};
                    _data.id = data.id;
                    _data.with_respect_id = $state.params.postId;
                    _data.userId = $stateParams.id;
                    _data.notificationType = data.notification_type;
                    _data.userType = 'Counselor';
                    Counselors.showUpdatedNotification(_data, 'counselor')          
                }
            });
        }
    }
    $scope.messageNotification();    

    var _data = {};
    _data.userId = angular.fromJson(localStorageService.get('authData')).user_id;

    Counselors.getTherapyData(_data).success(function(response) {
        if(response.status == 'success') { 
            $scope.ifPatientMessage = true;
            $scope.therapyData(response);                                     
        } else {
            $scope.ifPatientMessage = false;
            $scope.noPatient = response.message;
        }        
    }).error(function (error) {
        Main.popupCommonFunction('apiError');
    })

    $scope.therapyData = function(response) {        
        $scope.aTherapyDetails = response.data;

        angular.forEach(response.data.patients, function(data, index) {
            if(data.patientId == $state.params.postId){
                $scope.selected = index;
                $scope.aTherapyDetails.patients[index].lastCounselorMessage = 'true';
                $scope.aPatientProfile = response.data.patients[index];
                $scope.aPatientSessionMessages = response.data.patients[index].sessions[0];                    
                if($scope.notification_type == 'message' || $scope.notification_type == 'payment'){
                    $scope.aPatientDetails = response.data.patients[index].questionAns;
                } else {
                    $scope.showMessage = false;
                }
            }
        });

        if(!$state.params.postId) {
            $scope.selected = 0;          
            $scope.aPatientProfile = response.data.patients[0];
            $scope.aPatientSessionMessages = $scope.aPatientProfile.sessions[0];
            $scope.aPatientDetails = response.data.patients[0].questionAns;
        }

            
        if($scope.aPatientProfile.isPlanExpire == '1'){
            $scope.isCounselor = false;
            $scope.isPlanExpired = true;
            $scope.ErrorMsg = 'Denna patients paket har g&aring;tt ut.'
        } else {
            $scope.isCounselor = true;
            $scope.isPlanExpired = false;
        }
        $scope.sendDocument();
        angular.forEach(response.data.patients, function(data) {
            if(data.sessions[0]) {
                data.sessionMessagesNew = data.sessions[0].sessionMessages[data.sessions[0].sessionMessages.length - 1];
            } else {
                data.sessionMessagesNew = '';
            }    
        });

        $scope.currentMessage();
        $scope.isPhoneSession = $scope.aPatientProfile.phoneSessionLeft;
        $scope.checkPhoneSession($scope.isPhoneSession);  
    }

    $scope.showPatientMsg = function(data, index, event) {   
        CKEDITOR.instances['counselorMessageTextarea'].setData();     
        $scope.aTherapyDetails.patients[index].lastCounselorMessage = 'true';
        $scope.aPhoneSessionCounts = [];
        $scope.aPatientDetails = data.questionAns;
        $scope.selected = index;
        $scope.aPatientProfile = data;
        $scope.aPatientSessionMessages = $scope.aPatientProfile.sessions[0];
        $scope.isPhoneSession = $scope.aPatientProfile.phoneSessionLeft;
        $scope.checkPhoneSession($scope.isPhoneSession)

        if($scope.aPatientProfile.isPlanExpire == '1'){
            $scope.isCounselor = false;
            $scope.isPlanExpired = true;
            $scope.ErrorMsg = 'Denna patients paket har g&aring;tt ut.'
        } else {
            $scope.isCounselor = true;
            $scope.isPlanExpired = false;
        }
        $scope.currentMessage();
        $scope.sendDocument();
    }

    $scope.checkPhoneSession = function(phonesessionCount){
        if(phonesessionCount == 0 && $scope.aPatientProfile.phoneSessionsAvailedEndTime == ''){
            $scope.isPhoneSessionLeft = false;
            $scope.phoneSessionErrorMsg = 'Du har ingen telefonsession inbokad';
        } else {
            $scope.isPhoneSessionLeft = true;
            for(var i=0; i<phonesessionCount; i++)  {
                $scope.aPhoneSessionCounts.push(i);
            }
        }
    }

    $scope.sendMessages = function(data, title, type) {
        if(!$scope.documentBtnDisable || !$scope.sendBtnDisable){
            var patientData = $scope.aPatientProfile; 
            var patientSessionMessages = $scope.aPatientSessionMessages;       
            var _data = {};
            _data.userType = 'Counselor';        

            if(type == 'document') {
                _data.message = data;
                _data.message_title = title;
                _data.message_type = true;
            } else {
                _data.message = $scope.counselorMessage;
                _data.message_type = false;
            }
            
            if(!patientSessionMessages) {
                _data.sender_id = $scope.counselorId;
                _data.receiver_id = patientData.patientId;
                _data.operator = 'Counselor';

            } else {   

                $scope.lastSessionData = patientSessionMessages.sessionMessages[patientSessionMessages.sessionMessages.length - 1]; 
                if($scope.lastSessionData) {
                    _data.topicId = $scope.lastSessionData.topicId;
                } else {
                    _data.topicId = patientSessionMessages.sessionMessages.topicId;
                }                

                if(patientSessionMessages.sessionMessages[0].sender_id && patientSessionMessages.sessionMessages[0].receiver_id && patientSessionMessages.sessionMessages[0].sender_id == $stateParams.id) {
                    _data.sender_id = patientSessionMessages.sessionMessages[0].sender_id;
                    _data.receiver_id = patientSessionMessages.sessionMessages[0].receiver_id;
                } else if(patientSessionMessages.sessionMessages[0].sender_id && patientSessionMessages.sessionMessages[0].receiver_id){
                    _data.sender_id = patientSessionMessages.sessionMessages[0].receiver_id;
                    _data.receiver_id = patientSessionMessages.sessionMessages[0].sender_id;
                } else {
                    _data.sender_id = $scope.counselorId;
                    _data.receiver_id = patientData.patientId;
                }

                _data.sessionThreadId = patientSessionMessages.sessionThreadId;                
            }
            $scope.sendMessageToPatient(_data);
        }                 
    }

    $scope.sendMessageToPatient = function(_data) {
        CKEDITOR.instances['counselorMessageTextarea'].setData();
        Counselors.sendMessage(_data).success(function(response) {       
            if(response.status == 'success') {                   

                if(!$scope.aPatientSessionMessages) {         

                    $scope.aPatientSessionMessages = response.data;
                    $scope.aPatientSessionMessages.sessionMessages = [];

                    $scope.sessionMessages = [];

                    $scope.aTherapyDetails.patients[$scope.selected].sessions.push({sessionThreadId: response.data.sessionThreadId, sessionMessages:$scope.sessionMessages});

                    $scope.insertInitialSessionMessages(response)
                } else {

                    $scope.insertInitialSessionMessages(response)
                }

            } else {
                $scope.documentBtnDisable = true;
                $scope.sendBtnDisable = true;
                $scope.isPlanExpired = true;
                $scope.ErrorMsg = response.message;
            }            
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        })
    }

    $scope.insertInitialSessionMessages = function (response) {

        $scope.aPatientSessionMessages.sessionMessages.push({topicId:response.data.topicId, topic:response.data.topic, message:response.data.message, created:response.data.created, sender_id:response.data.sender_id, receiver_id:response.data.receiver_id, receiverProfilePic:response.data.receiverProfilePic, senderProfilePic:response.data.senderProfilePic, message_type: response.data.message_type, message_title: response.data.message_title, file_exists: response.data.file_exists
        }); 

        $scope.aTherapyDetails.patients[$scope.selected].sessions[0].sessionMessages = $scope.aPatientSessionMessages.sessionMessages;

        $scope.aTherapyDetails.patients[$scope.selected].sessionMessagesNew = $scope.aTherapyDetails.patients[$scope.selected].sessions[0].sessionMessages[$scope.aTherapyDetails.patients[$scope.selected].sessions[0].sessionMessages.length - 1]; 

        $scope.currentMessage();       
    }

    $scope.getDocumentType = function(docUrl) {
        $scope.documentype = docUrl.split('.').pop();
        return $scope.documentype;
    }

    $scope.session = function(type) {
        if(type == 'text') {
            $scope.activeMenu = 'text';
            $scope.showMessage = true;
        } else {
            $scope.activeMenu = 'telephone';
            $scope.showMessage = false;
        }
    }
    
    $scope.openDatePicker = function($event, date) {
        $event.preventDefault();
        $event.stopPropagation();
        date.opened = true;
        $scope.activeParentIndex = -1;
    };
    
    
    $scope.timePicker = function(type, date, index){
        if(type == 'open') {
            date.opened = false;
            $scope.activeParentIndex = index;
        } else {
            $scope.activeParentIndex = index;
        }
    }

    $scope.isDateTimePicker = function($index){
        return  $scope.activeParentIndex === $index;
    }

    $scope.changeTime = function(mytime, count){
        $scope.mytime = new Date(mytime);
        $scope.updatedTime[count] = $filter('date')($scope.mytime,'HH:mm:ss');
    }

    $scope.markPhoneSessionConsumed = function(isValid, datePicker, time, $event){
        
        if(isValid) {
            var counter = 0;
            var newPhoneSessionArr = [];
            angular.forEach($scope.aPatientProfile.phoneSessionsAvailedEndTime, function(data, key) {
                newPhoneSessionArr[counter] = data;
                counter++; 
            });
            $scope.aPatientProfile.phoneSessionsAvailedEndTime = newPhoneSessionArr;

            var date = $filter('date')(datePicker.date, 'yyyy-MM-dd')
            var result = $filter('date')(time,'HH:mm:ss');
            result = date+' '+result;
            var _data = {};
            _data.endDate = result;
            _data.userId = $scope.aPatientProfile.patientId;  

            Counselors.markPhoneSessionConsumed(_data).success(function(response) {
                if(response.status == 'success'){
                    $scope.aPatientProfile.phoneSessionsAvailedEndTime.push(response.data.endtime);
                    var target = angular.element($event.target);
                    target.parents('li').remove();
                } 
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            })
        }
    }

    $scope.currentMessage = function(){

        $timeout(function() {
            var scroller = document.getElementById("currentMessageCounselor");
            scroller.scrollTop = scroller.scrollHeight;
        }, 0, false); 
    }

    $scope.counselorCkEditor = function(){
        
        $scope.counselorMessage = this.messageText;
        if($scope.isCounselor){
            if(this.messageText) {
                $scope.sendBtnDisable = false;
            } else {
                $scope.sendBtnDisable = true;
            }
        } else {
            $scope.sendBtnDisable = true;

        } 
    }

    $scope.sendDocument = function(){
        if($scope.isCounselor){
            $scope.documentBtnDisable = false;
        } else {
            $scope.documentBtnDisable = true;
        }
    }

    $scope.deleteChat = function() {
        if($scope.aPatientSessionMessages && $scope.aPatientSessionMessages.sessionMessages[0].message) {
            Main.popupCommonFunction('deleteChatConfirmation');
        } else if($scope.aPatientProfile.autogenerateMessage != '' || $scope.aPatientDetails != '') {    
            Main.popupCommonFunction('deleteChatConfirmation');
        } else {
           $scope.deleteEntireChat(); 
        }
    }

    $scope.deleteEntireChat = function() {       
        var _data = {};
        _data.userId = $scope.aPatientProfile.patientId;
        Counselors.deleteConversation(_data).success(function(response) {
            if(response.status == 'success') {
                if($scope.aPatientSessionMessages) {
                    $scope.aPatientSessionMessages.sessionMessages = []; 
                    $scope.aPatientSessionMessages.sessionMessages.push({topicId:response.data.topicId});
                }
                $scope.aPatientProfile.autogenerateMessage = '';
                $scope.aPatientDetails = '';   
                $scope.aTherapyDetails.patients[$scope.selected].questionAns = [];             
            } else {
                Main.popupCommonFunction('deleteChatFailure');
            }       
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        })
    }

    $rootScope.success = function() {
        $('#commonPopup').modal('hide');
        $("#blurDiv").removeClass("blur-effect");
        $scope.deleteEntireChat();     
    }

    $scope.printMessages = function(divName) {
        var customCss = CONSTANTS.site_Url+'css/custom-style.css';
        var printableCss = CONSTANTS.site_Url+'css/print-message-style.css'
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank');
        popupWin.document.open();
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href='+customCss+' /><link rel="stylesheet" type="text/css" href='+printableCss+' /></head><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();
    }    
});