/**
 * @Method :     Patients Controller
 * @Purpose:     Controller for Add card details before login
 */

as.controller('checkoutCtrl', function($rootScope, $scope, $state, $stateParams, Counselors, localStorageService, CONSTANTS, Patients, currentPlanData, Main, ipCookie, Pages, monthName, cardDetail, stripe) {

    $scope.cardInfo = {};
    $scope.cardInfo.card = {};
    $scope.cardName = {};
    // $scope.conditionArray = ['anon.plan-price-info', 'anon.plan-detail'];

    $scope.checkoutPageInit = function() {
        if(angular.fromJson(localStorageService.get('authData'))){
            if(cardDetail.data.data.cards != '') {
                $scope.isCardAvailable = true;
                $scope.aCardDetail = cardDetail.data.data.cards;
                $scope.setCookieForCheckout();
            } else {
               Patients.getyear();
               $scope.monthName = monthName; 
               $scope.isCardAvailable = false;
            }

            if(!localStorageService.get('counter')){
                $scope.isCartEmpty = false;
                $scope.constant = CONSTANTS;    
                $scope.aData = currentPlanData.data.data.Plan; 
            } else {
                $scope.isCartEmpty = true;
            }  
        } else {
            $state.transitionTo('anon', { reload: true, inherit: false, notify: true });
        }
        
    }    

    $scope.removeSelectedPlan = function($event) {
        var target = angular.element($event.target);
        target.parents('table').remove();
        $scope.isCartEmpty = true;
        localStorageService.set('counter',true);
    }

    $scope.backToPricePage = function() {
        // if($scope.isInArray(localStorageService.get('prevState'), $scope.conditionArray)){
            $state.go('anon.plan-price-info')
        // } else {
            // $state.go('patient.pricepage')
        // }
    }

    $scope.isInArray = function(value, array) {
        return array.indexOf(value) > -1;
    }

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
        cardDetail.stripe_token = id;
        Patients.saveCardDetails(cardDetail).success(function(response){
            if(response.status == 'success') {
                $scope.isCardAvailable = true;
                $scope.aCardDetail = response.data.cards;
                $scope.setCookieForCheckout();
            }
        });
    }

    $scope.resetFrm = function() {
        this.cardInfoFrm.$setPristine(); 
        this.cardInfoFrm.$setUntouched(); 
        $scope.cardInfo = {};
        $scope.cardInfo.card = {};
        $scope.cardInfo.card.exp_year = $scope.years[0].id;
        $scope.cardInfo.card.exp_month = $scope.monthName.months[0].id;      
    }

    $scope.setCookieForCheckout = function() {
        console.log('cookie set');
        var now = new Date(); 
        now.setMinutes(now.getMinutes() + 5);
        ipCookie('checkout', 'purchasePlan', { expires: now});
    }


    $scope.payNow = function() {
        $scope.isPayment = true;
        var _data = {};
        _data.userId = angular.fromJson(localStorageService.get('authData')).user_id;
        if(!ipCookie('checkout')) {
            Main.popupCommonFunction('sessionError');
            $state.go('anon.counselor-matching');
        } else {        
            $scope.assignedCounselor();
        }  
    }

    $scope.assignedCounselor = function() {
        var _data = {};
        _data.planId = $scope.aData.id;
        _data.patientId = angular.fromJson(localStorageService.get('authData')).user_id;
        _data.counselorId = localStorageService.get('counselorId').User.id;

        Pages.assignCounselorToPatient(_data).success(function (response) {
            if(response.status == 'success') {
                Main.popupCommonFunction('checkOut');
                localStorageService.remove('isCounselorMatchingState')               
                $state.go('anon.questionnaire');                
            }       
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });     
    }    
})