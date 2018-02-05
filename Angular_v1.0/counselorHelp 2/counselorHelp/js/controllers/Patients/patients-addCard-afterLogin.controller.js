/**
 * @Method :     Patients Controller
 * @Purpose:     Controller for Patient add card after login
 */

as.controller('PatientsAddmoreCardCtrl', function($rootScope, $scope, $state, $stateParams, Patients, localStorageService, stripe, monthName, Main, cardType) {

    $scope.monthName = monthName;
	$scope.cardInfo = {};
    $scope.cardInfo.card = {};
    $scope.cardType = cardType;
    $scope.cardInfo.card.number = '';
    $scope.cardName = {};

    $scope.getYearList = function() {
        Patients.getyear();
    } 

    $scope.patientStateChange(); 
	$scope.saveCardDetails = function(isValid) {
		if(isValid) {            
	        return stripe.card.createToken($scope.cardInfo.card).then(function (response) {            
	            $scope.saveCard(response.id)
	        }).then(function (response) {
	        }).catch(function (err) {
	            if (err.type && /^Stripe/.test(err.type)) {
                    $scope.Errmsg = err.message;
	            } else {
                    Patients.stripeError(err.code);
                }
	        });
	    }
    }

    $scope.saveCard = function(id) {
    	var cardDetail = {};
       	cardDetail.userId = angular.fromJson(localStorageService.get('authData')).user_id;
        cardDetail.stripeToken = id;
        Patients.addCard(cardDetail).success(function(response){
        	if(response.status == 'success') {
        		Main.popupCommonFunction('saveCard');
        		$state.go('patient.administration', {}, {reload:true})
        	}
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }

	$scope.resetFrm = function() {
		$scope.cardInfoFrm.$setPristine(); 
        $scope.cardInfoFrm.$setUntouched(); 
		$scope.cardInfo = {};
        $scope.cardInfo.card = {};
		$scope.cardInfo.card.exp_year = $scope.years[0].id;
        $scope.cardInfo.card.exp_month = $scope.monthName.months[0].id;    	
	}

});