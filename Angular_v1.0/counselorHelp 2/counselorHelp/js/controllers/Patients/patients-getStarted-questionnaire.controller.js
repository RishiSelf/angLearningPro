/**
 * @Method :     Patients Controller
 * @Purpose:     Controller for Get Started Questionnaire
 */

as.controller('getStartedCtrl', function($rootScope, $scope, $state, $stateParams, Patients, localStorageService, Main) {

    $scope.questionnaire = {};
    $scope.questionnaireArr = {};
    $scope.questionnaireArr.questionAns = [];
    $scope.questionnaire.questionAns = []; 
    $scope.counter = 0;    
    $scope.item = 1;
    $scope.count = 0;
    $scope.allAnswered = false;    


    if(angular.fromJson(localStorageService.get('authData'))) {
        var _data = {};
        _data.userId = angular.fromJson(localStorageService.get('authData')).user_id;
        Patients.getQuestions(_data).success(function(response){
            $scope.aQuestions = response.data.questions;
            $scope.counselor_details = response.data;
            $scope.btnText = 'N&auml;sta';        
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        }); 
    } else {
        $state.transitionTo('anon', { reload: true, inherit: false, notify: true });
    }
    

    $scope.submitQuestions = function(isValid, txt) {
        $scope.count++;
        if(isValid) {
            if(txt == 'addData') {

                $scope.questionnaire.questionAns.push({value:$scope.questionnaire.questionAns.value, questionId : $scope.aQuestions[$scope.counter].StartUpQuestion.id});
                $scope.questionnaireArr.questionAns.push({value:$scope.questionnaire.questionAns.value, questionId : $scope.aQuestions[$scope.counter].StartUpQuestion.id});
            }   
            if($scope.aQuestions.length > $scope.item) {

                $scope.questionnaireFrm.$setPristine(); 
                $scope.questionnaireFrm.$setUntouched(); 
                $scope.questionnaire.questionAns = [];
                $scope.item++;
                $scope.counter++;

                if($scope.count == $scope.aQuestions.length-1) {
                    $scope.btnText = 'Spara';   
                }
            } else if($scope.count > $scope.aQuestions.length-1) {
                $scope.saveQuestionnaire();                
            }
        }        
    } 

    $scope.saveQuestionnaire = function() {
        var _data = {};
        _data = $scope.questionnaireArr;
        _data.userId = angular.fromJson(localStorageService.get('authData')).user_id;
        Patients.saveUserQuestionAns(_data).success(function(response){
            
            localStorageService.set('auth_token', JSON.stringify(response.data));
            localStorageService.set('userType', 'P');
            if(response.status == 'success') {  
                localStorageService.set('user_registered', 'true');  
                localStorageService.remove('prevState');
                localStorageService.remove('userMatching'); 
                localStorageService.remove('stateName'); 
                localStorageService.remove('counselorMatching'); 
                localStorageService.remove('isCounselorSelected');
                localStorageService.remove('isCounselorMatchingState');
                localStorageService.remove('isRegistrationProcess');               
                $state.go('patient.message',{id:angular.fromJson(localStorageService.get('authData')).user_id});
            } 

        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }  
});