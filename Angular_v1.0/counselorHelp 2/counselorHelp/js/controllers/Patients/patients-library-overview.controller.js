/**
 * @Method :     Patients library overview Controller
 * @Purpose:     Controller for Patients library overview
 */

as.controller('PatientsLibOverviewCtrl', function($scope, $rootScope, $state, $timeout, $location, $stateParams, Pages, localStorageService, Main){

	$scope.patientStateChange();
    
    $scope.library_overview = function () {
        Pages.getLibraries().success(function (response) {
            $scope.aLibraries = response.data;
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }

    $scope.getlibraryDetails = function (catName, catId) {  
        $rootScope.catId = catId;
        localStorageService.set('libId', $rootScope.catId);
        $state.go('patient.patient-library-details', {catName: catName}, {reload: true});
    }
})