/**
 * @Method :     price page Controller
 * @Purpose:     Controller for price page with out phone session after login 
 */

as.controller('pricepageCtrl', function($scope, Pages, $stateParams, CONSTANTS, Patients, $rootScope, Counselors, $state, Main, localStorageService) {

    $scope.phonesession = false;
    $scope.constant = CONSTANTS;
    localStorageService.set('counter',false);

    $scope.$on('patient_all_detail', function (event, data){
        $scope.patientOtherDetail = data;
        // console.log(JSON.stringify(data))
        if($scope.patientOtherDetail.isAdditionalPhoneSession == 'true'){
            $scope.phonesession = true;
        }
    })

    if($rootScope.aPatientAllNotifications){
        Counselors.showUpdatedNotification($rootScope.aPatientAllNotifications, 'patient')
    }
    $scope.patientStateChange();
    
    $scope.getPlans = function() {
        Pages.getPlans('user').success(function (response) {
            $scope.pricePlans = response.data.plans;
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });        
    }

    $scope.buyAdditionalPhoneSession = function(){
        $state.go('patient.checkout', {planId : 'telephonesession'}, {reload:true});        
    }

})