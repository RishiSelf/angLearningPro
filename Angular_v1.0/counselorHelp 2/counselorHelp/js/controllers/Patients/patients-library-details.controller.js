/**
 * @Method :     Patients library details Controller
 * @Purpose:     Controller for Patients library details
 */

as.controller('PatientsLibraryDetailsCtrl', function($scope, $rootScope, $state, $timeout, $location, $stateParams, Pages, localStorageService, Main){
   
    $scope.patientStateChange();
    
    $scope.getLibDetails = function () {
        $scope.libId = localStorageService.get('libId');      
        Pages.getLibrariesDetail($scope.libId).success(function (response) {
            $scope.aData = response.data;
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }

    $scope.gotoAnchor = function (id, event) {
        Main.scrollTo(id, event)
    };
})