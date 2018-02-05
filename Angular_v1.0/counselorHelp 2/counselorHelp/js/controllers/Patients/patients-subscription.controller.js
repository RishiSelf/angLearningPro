/**
 * @Method :     Patients Controller
 * @Purpose:     Controller for Patient subscription view
 */

as.controller('PatientsSubscriptionCtrl', function($scope, $rootScope, $stateParams, Patients, $sce, localStorageService, Counselors, Main) {

	$scope.counter = 0;
    $scope.current_plans = true;
    $scope.past_plans = true;   

    if($rootScope.aPatientAllNotifications){
        Counselors.showUpdatedNotification($rootScope.aPatientAllNotifications, 'patient')
    }

    $scope.patientStateChange();
    
	Patients.getPatientPlanDetails($stateParams.id, 'allPlan').success(function(response) {
        if(response.status == 'success') {        	
        	if(response.data.currentPlan == '') {
        		$scope.currentErrorMsg = 'Du har inget aktivt paket';
            	$scope.current_plans = false;
        	} else {
        		$scope.counter = 1;
        		$scope.current_plans = true;
            	$scope.planDetails = response.data;
            }

            if(response.data.pastPlans == ''){
            	$scope.pastErrorMsg = 'Du har inga tidigare paket';
            	$scope.past_plans = false;
            } else {
            	$scope.counter = 1;
            	$scope.past_plans = true;
            	$scope.aUserPastPlans = response.data.pastPlans;
            }
        }        
    }).error(function (error) {
        Main.popupCommonFunction('apiError');
    })

    $scope.showMorePastPlans = function() {
        Patients.getPatientPlanDetails($stateParams.id, 'pastPlan').success(function(response) {
            $scope.aUserPastPlans = response.data.pastPlans
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        })
    }
});