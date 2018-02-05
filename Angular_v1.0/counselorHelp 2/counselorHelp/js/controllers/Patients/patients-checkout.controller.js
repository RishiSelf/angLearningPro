/**
 * @Method :     Patients Controller
 * @Purpose:     Controller for check out
 */

as.controller('PatientsCheckoutCtrl', function($rootScope, $scope, $state, $stateParams, Counselors, localStorageService, CONSTANTS, Patients, currentPlanData, Main, ipCookie, Pages) {

	$scope.error = false;
	$scope.patientStateChange(); 
	$scope.$on('patient_card_detail', function (event, data) {
        $rootScope.patientCardDetail = data;
	});

	$scope.$on('patient_all_detail', function (event, data){
        $scope.patientOtherDetail = data;
    })

	if(!localStorageService.get('counter')){
		$scope.isCartEmpty = false;
		if($stateParams.planId == 'telephonesession'){
			$scope.planPurchase = false;
			
		} else {
			$scope.planPurchase = true;
			$scope.constant = CONSTANTS;	
			$scope.aData = currentPlanData.data.data.Plan;	
		} 
	} else {
		$scope.isCartEmpty = true;
	}

	$scope.payNow = function() {
		$scope.isPayment = true;
		var _data = {};
	    _data.userId = $stateParams.id;

		if(!$scope.planPurchase){
	        Patients.buyAdditionalPhoneSession(_data).success(function (response) {
	            if(response.status == 'success'){
	            	$scope.error = false;
	            	if($stateParams.planId == 'telephonesession'){
	            		Main.popupCommonFunction('phoneSessionCheckOut');
	            	} else {
	            		Main.popupCommonFunction('checkOut');
	            	}
	            	$state.go('patient.message',{}, {reload:true});
	            } else {
	            	$scope.errorMessage(response);
	            }	    
	        }).error(function (error) {
	            Main.popupCommonFunction('apiError');
	        });
		} else {
			_data.planId = $scope.aData.id;	
			$scope.buyPlan(_data);
		}  
	}

	$scope.buyPlan  = function(data) {
		Patients.buyPlan(data).success(function(response) {
        	if(response.status == 'success'){
        		$scope.error = false;	        		
            	Main.popupCommonFunction('checkOut');
            	$state.go('patient.message',{}, {reload:true});
            } else {
            	$scope.errorMessage(response);
            }
	    }).error(function (error) {
	        Main.popupCommonFunction('apiError');
	    }) 
	}

	$scope.errorMessage = function(response) {
		$scope.error = true;
    	$scope.errorMessage = response.message;
	}

	$scope.deleteCard = function(id, index) {
        Patients.deleteCard(id, index)
    }

    $scope.setDefaultCard = function(id) {        
        Patients.setDefaultCard(id)
    }

    $scope.removeSelectedPlan = function($event) {
    	var target = angular.element($event.target);
        target.parents('table').remove();
        $scope.isCartEmpty = true;
        localStorageService.set('counter',true);
    }

    $scope.backToPricePage = function() {
		$state.go('patient.pricepage')
    }
})