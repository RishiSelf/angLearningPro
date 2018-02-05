/**
 * @Method :     Coming soon Controller
 * @Purpose:     Controller for Coming soon
 */

as.controller('comingsoonCtrl', function($scope, $rootScope, $state, $timeout, $location, $stateParams, Patients, Main){

    $rootScope.noHeader = true;
    $rootScope.footerShow = true;
    $scope.sendEmail = function(isValid) {
        if (isValid) {
            Patients.sendEmail($scope.Contact).success(function (response) { // Service in patients.service.js
                if(response.status == 'success') {                    
                    $scope.comingsoonForm.$setPristine(); 
                    $scope.comingsoonForm.$setUntouched();             
                    $scope.Contact = {}; 
                    setTimeout(Main.popupCommonFunction('contactUs'), 1000);                    
                }    
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            });
        }
    }
})