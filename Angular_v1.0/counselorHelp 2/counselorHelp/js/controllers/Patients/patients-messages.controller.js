/**
 * @Method :     Patients Controller
 * @Purpose:     Controller for Patient therapy room
 */

as.controller('PatientsMessageCtrl', function($scope, Counselors, $state, localStorageService, Patients, $stateParams, $timeout, $rootScope, Main, CONSTANTS) {

    if($rootScope.aPatientAllNotifications){
        Counselors.showUpdatedNotification($rootScope.aPatientAllNotifications, 'patient')
    }

    $scope.notNewMsg = false;
    $scope.disableSendBtn = true;
    $scope.selectedTopic = [];
    $scope.aTherapyDetails = [];
    $scope.aTherapySessionMessages = []
    $scope.isTopicSelected = true;
    $scope.userMessage = false;
    $scope.patientPhoneSessionCount = [];
    $scope.showCKEditor = false;
    $scope.patientId = angular.fromJson(localStorageService.get('authData')).user_id;
    
    $scope.patientStateChange();
    // --- Get Conversation Data ---
    var _data = {};
    _data.userId = $scope.patientId;
    Patients.getConversations(_data).success(function(response) {
        $scope.conversationList(response); 
        localStorageService.set('responseData', response.data);      
    }).error(function (error) {
        Main.popupCommonFunction('apiError');
    }); 

    $scope.conversationList = function(response) {

        $scope.phoneSessionData(response); 

        if(response.status == 'success') {
            $scope.showCKEditor = true;
            $scope.getSessionData(response);
            
        } else if(response.data.topics != '' || !response.data.sessions) {
            $scope.showCKEditor = true;
            $scope.notNewMsg = true;
            $scope.msgListHeight = {          
                "height" : "470px"
            }
            $scope.aTherapyDetails = response.data;
            $scope.aTherapyTopics = response.data.topics;
            $scope.patientMessageSize = response.data.patientMessageSize;
            $scope.ErrorMsg = response.message;
            $scope.userMessage = true;            
        }
    }

    $scope.phoneSessionData = function(response) {

        $scope.isPhoneSession = response.data.phoneSessionLeft;  
        $scope.phoneSessionsAvailedTime = response.data.phoneSessionsAvailedEndTime;
        $scope.isPlanExpire = response.data.isPlanExpire;

        for(var i=0; i<$scope.phoneSessionsAvailedEndTime; i++) {
            $scope.phoneSessionsAvailedTime.push(i);
        }
        for(var i=0; i<$scope.isPhoneSession; i++) {
            $scope.patientPhoneSessionCount.push(i);
        }

        if($scope.isPlanExpire == '1') {
            $scope.notNewMsg = true;
            $scope.msgListHeight = {          
                "height" : "470px"
            }
            $scope.userMessage = true;
            $scope.ErrorMsg = "Ditt paket har g&aring;tt ut. Var god uppdatera paketet f&ouml;r att forts&auml;tta skriva med din psykoterapeut.";            
        }

    }

    $scope.getSessionData = function(response) {
        $scope.patientMessageSize = response.data.patientMessageSize;
        $scope.isPatientMessageApplicable = response.data.isPatientMessageApplicable;
        $scope.aTherapyDetails = response.data;

        angular.forEach(response.data.sessions, function(data, index) {
            $scope.aTherapySessionMessages = data;
        });
        
        $scope.aTherapyTopics = response.data.topics;
        $scope.topic_id = $scope.aTherapySessionMessages.sessionMessages[$scope.aTherapySessionMessages.sessionMessages.length - 1];
        if($scope.topic_id.topic != 'No Topic'){
            $scope.selectedTopic.title = $scope.topic_id.topicId;
        }

        if($scope.isPatientMessageApplicable == 'false'){
            $scope.notNewMsg = true;
            $scope.msgListHeight = {          
                "height" : "470px"
            }
            $scope.ErrorMsg = response.data.patientMessageLimitalert;
        }
        $scope.currentMessage(); 
    } 

    $scope.sendMsg = function() {

        if($scope.selectedTopic.title) {

            $scope.isTopicSelected = true;
            var therapyData = $scope.aTherapyDetails;
            var therapySessionMessages = $scope.aTherapySessionMessages;
            var _data = {};
            _data.userType = 'User';
            _data.message = $scope.userMessage;

            if(!therapySessionMessages.sessionMessages) {        
                _data.sender_id = $scope.patientId;
                _data.receiver_id = therapyData.counselorId;
                _data.operator = 'Patient';

                if($scope.selectedTopic){
                    _data.topicId = $scope.selectedTopic.title;
                } else {
                    _data.topicId = '';
                }                
            } else {
                _data.sessionThreadId = therapySessionMessages.sessionThreadId;
                _data.isPatientMessageApplicable = therapyData.isPatientMessageApplicable;

                if(therapySessionMessages.sessionMessages[0].topicId == $scope.selectedTopic.title){
                    _data.topicId = therapySessionMessages.sessionMessages[0].topicId;
                } else {
                    _data.topicId = $scope.selectedTopic.title;
                } 

                if(therapySessionMessages.sessionMessages[0].sender_id == $stateParams.id) {
                    _data.sender_id = therapySessionMessages.sessionMessages[0].sender_id;
                    _data.receiver_id = therapySessionMessages.sessionMessages[0].receiver_id;
                } else {
                    _data.sender_id = therapySessionMessages.sessionMessages[0].receiver_id;
                    _data.receiver_id = therapySessionMessages.sessionMessages[0].sender_id;
                }
            }
            
            $scope.sendMessageToCounselor(_data);

        } else {
            $scope.isTopicSelected = false;
        }
    }

    $scope.sendMessageToCounselor = function(_data) {
        Counselors.sendMessage(_data).success(function(response) {

            if(response.status == 'success') {

                CKEDITOR.instances['patientMessageTextarea'].setData();
                $scope.notNewMsg = false;                    
                $scope.userMessage = false;
                $scope.aTherapySessionMessages.sessionThreadId = response.data.sessionThreadId; 
                $scope.aTherapySessionMessages.sessionMessages.push({message:response.data.message,topic:response.data.topic,created:response.data.created,sender_id:response.data.sender_id,receiver_id:response.data.receiver_id,topicId: response.data.topicId, receiverProfilePic:response.data.receiverProfilePic, senderProfilePic:response.data.senderProfilePic})    
                $scope.currentMessage();

            } else {
                $scope.disableSendBtn = true;
                $scope.notNewMsg = true;
                $scope.msgListHeight = {          
                    "height" : "470px"
                }
                $scope.ErrorMsg = response.message;
            }
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        })
    }

    $scope.patient_logout = function() {
        Counselors.LogoutFunction('user');
    }; 

    $scope.dateFormat = function(date) {
        if(date) {
            var timestamp = date.replace(/-/g,'/');
            return new Date(timestamp).getTime();
        }
    }
    $scope.currentMessage = function(){
        $timeout(function() {
            var scroller = document.getElementById("currentMessagePatient");
            if(scroller){
                scroller.scrollTop = scroller.scrollHeight;
            }
        }, 0, false); 
    } 

    $scope.onChangeCkEditor = function(){
        $scope.userMessage = this.messageText;
        if($scope.userMessage){
            if(this.messageText && $scope.isPlanExpire == '0') {
                $scope.disableSendBtn = false;
            } else {
                $scope.disableSendBtn = true;
            }
        } else if(this.messageText && $scope.isPatientMessageApplicable == 'true') {
            $scope.disableSendBtn = false;
        } else {
            $scope.disableSendBtn = true;
        }
    }

    $scope.getDocumentName = function(docUrl) {
        $scope.documentName = docUrl.substring(docUrl.lastIndexOf('/')+1);
        return $scope.documentName;
    }

    $scope.getDocumentType = function(docUrl) {
        $scope.documentype = docUrl.split('.').pop();
        return $scope.documentype;
    }

    $scope.downloadFile = function(url) {
        $scope.url = CONSTANTS.Base_Url + 'downloadFile';
        $scope.filename = url.substring(url.lastIndexOf('/')+1);
        window.open($scope.url+"/"+$scope.filename, '_self');
    }
});