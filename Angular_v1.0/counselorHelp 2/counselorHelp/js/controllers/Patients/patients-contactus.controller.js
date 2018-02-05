/**
 * @Method :     Patients contact us Controller
 * @Purpose:     Controller for Patients contact us
 */

as.controller('PatientsContactusCtrl', function($scope, $rootScope, $state, $timeout, $location, $stateParams, Pages, Main) {

    $scope.patientStateChange();
    $scope.savePatientContact = function (isValid) {
        if (isValid) {
            var _data = {};
            _data.Contact = $scope.patientContact;
            _data.Contact.user_type = 'P';
            Pages.saveContact(_data).success(function (response) {
                if(response.status == 'success') {
                    $scope.contactusForm.$setPristine(); 
                    $scope.contactusForm.$setUntouched();             
                    $scope.patientContact = {}; 
                    setTimeout(Main.popupCommonFunction('contactUs'), 1000); 
                }  
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            });
        }
    }
})