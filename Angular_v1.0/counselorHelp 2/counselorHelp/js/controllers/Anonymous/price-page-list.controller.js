/**
 * @Method :     price listing page Controller
 * @Purpose:     Controller for price listing page
 */


as.controller('PricePageListController', function ($scope, Pages, CONSTANTS, $state, Main, localStorageService, $rootScope) {

    $scope.constant = CONSTANTS;

    $scope.getPriceList = function() {

        Pages.getPriceList().success(function (response) {
            // console.log(JSON.stringify(response))
            $scope.priceListPlans = response.data.plans;
            $scope.pricePlanFeatures = response.data.planFeatures;  
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });       
    }

    $scope.lowerCaseString = function(str) {
        return str.toLowerCase();         
    }

    $scope.isCheckStrType = function(item) {
        return !isNaN(item);
    }

    $scope.GetValidString = function(value) {

        if(value.indexOf("kr") > -1) {
            return value;
        } else if(value == 'Unlimited'){
            return 'Obegr&auml;nsat';
        } else {
            return value;
        }
    }
    
    $scope.checkout = function(id, forFreePlan) {

        if(localStorageService.get('userType') == 'P' && localStorageService.get('user_registered') == 'true' && localStorageService.get('userMatching') == 'true' && forFreePlan && localStorageService.get('stateName') == 'anon.counselor-matching' && localStorageService.get('isCounselorSelected')){

            // localStorageService.set('planId', id);
            // localStorageService.set('prevState', 'anon.plan-detail');
            $state.go('anon.checkout', {planId:id});

        } else if(localStorageService.get('authData') && localStorageService.get('userMatching') != 'true' && localStorageService.get('stateName') != 'anon.counselor-matching') {

            $state.go('patient.subscription',{id:angular.fromJson(localStorageService.get('authData')).user_id});

        } else if(localStorageService.get('userType') == 'C' && localStorageService.get('counselor_registered') == 'true'){

            $state.go('counselor.landing_page',{id:angular.fromJson(localStorageService.get('auth_token')).user_id}, { reload: true, inherit: false, notify: true });
            
        } else {

            $state.go('anon.login', {userType:'User'})
        }
        
    }
})