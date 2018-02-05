/**
 * @Method :     Price page Controller
 * @Purpose:     Controller for price page
 */


as.controller('PricePageController', function ($scope, Pages, CONSTANTS, Main, $rootScope, $state, localStorageService) {
	
    $scope.constant = CONSTANTS;

    $scope.arr = {'week':'1 Vecka', 'month':'4 Vecka', 'quarter': '12 Vecka'}
    localStorageService.set('counter',false);

    $scope.getPlans = function() {
        if(localStorageService.get('userType') == 'P' && localStorageService.get('user_registered') == 'true'){

            var id = angular.fromJson(localStorageService.get('authData')).user_id;
            Pages.getPlans('anon', id).success(function (response) {
                $scope.freePlanCheck = response.data.isFree;
                $scope.pricePlans = response.data.plans;

            }).error(function (error) {
    	        Main.popupCommonFunction('apiError');
    	    }); 

        } else {

            Pages.getPlans('anon').success(function (response) {
                $scope.pricePlans = response.data.plans;
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            }); 
        }      
    }

    $scope.checkout = function(id, forFreePlan) { 

        if($scope.freePlanCheck == 1) {

            $state.go('patient.subscription',{id:angular.fromJson(localStorageService.get('authData')).user_id});

        } else if(localStorageService.get('userType') == 'C' && localStorageService.get('counselor_registered') == 'true'){

            $state.go('counselor.landing_page',{id:angular.fromJson(localStorageService.get('auth_token')).user_id}, { reload: true, inherit: false, notify: true });  

        } else if(localStorageService.get('userType') == 'P' && localStorageService.get('user_registered') == 'true' && localStorageService.get('userMatching') == 'true' && forFreePlan && localStorageService.get('isCounselorSelected')){

            // localStorageService.set('planId', id);
            // localStorageService.set('prevState', 'anon.plan-price-info');
            
            $state.go('anon.checkout', {planId:id})

        } else if(forFreePlan == '' && localStorageService.get('userMatching') == 'true' && localStorageService.get('stateName') == 'anon.counselor-matching' && localStorageService.get('isCounselorSelected')) {

            $scope.assignedCounselor(id);

        } else {

            $state.go('anon.login', {userType:'User'})
        }
    }

    $scope.assignedCounselor = function(id) {
        
        var _data = {};
        _data.planId = id;
        _data.patientId = angular.fromJson(localStorageService.get('authData')).user_id;
        _data.counselorId = localStorageService.get('counselorId').User.id;
        
        Pages.assignCounselorToPatient(_data).success(function (response) {
            if(response.status == 'success') { 
                localStorageService.remove('isCounselorMatchingState');
                Main.popupCommonFunction('freePlan');
                $state.go('anon.questionnaire');
            }           
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });     
    }
})