/**
 * @Method :     Patients FAQ us Controller
 * @Purpose:     Controller for Patients FAQ
 */

as.controller('PatientsFaqCtrl', function($scope, $rootScope, $state, $timeout, $location, $stateParams, Pages, Main) {

	$scope.patientStateChange();
    $scope.clinicalContent = function () {
        Pages.getFaqs('P').success(function (response) {
            $scope.aPatientFaqs = response.data;
            // Set first dt and dd as selected
            $scope.activeIndex = 0;
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }
    $scope.toggleElements = function ($index) {

        if($scope.activeIndex == $index) {
            return;
        }
        $scope.activeIndex = -1;
        $('dt.term').removeClass('active');
        $('dd.description').hide(500);
        $('dt#' + $index).addClass('active');
        $('dt.active').next('dd').show(500);
        $scope.activeIndex = $index;
    };
})