var PatientsService = angular.module('PatientsService', []);

PatientsService.service('Patients', function ($rootScope, $http, $location, CONSTANTS, localStorageService, Main, $stateParams, stripeError) {
    
    this.sendEmail = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'comingSoonContact', data);
    }

    this.registration = function (data, type) {
        if(type == 'submit') {
            return $http.post(CONSTANTS.Base_Url + 'updateUserDetails', data);
        } else if(type == 'other') {
            return $http.get(CONSTANTS.Base_Url + 'updateUserDetails?userId='+data);
        } else {
            return $http.get(CONSTANTS.Base_Url + 'updateUserDetails?userId='+data+'&userType='+localStorageService.get('user_type'));
        }       
    }

    this.getCountryList = function() {
        return $http.get(CONSTANTS.Base_Url + 'getCountryList');
    }

    this.saveBillingDetails = function(data) {
        return $http.post(CONSTANTS.Base_Url + 'saveBillingDetails', data);
    }

    this.saveCardDetails = function(data) {
        return $http.post(CONSTANTS.Base_Url + 'saveCard', data);
    }

    this.getQuestions = function(data) {
        return $http.post(CONSTANTS.Base_Url + 'getQuestions', data);
    }

    this.saveUserQuestionAns = function(data) {
        return $http.post(CONSTANTS.Base_Url + 'saveUserQuestionAns', data);
    }
    
    this.getPatientDetails = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'getPatientDetails',data).success(function (response) {

            if(response.status == 'success') {
                $rootScope.$broadcast('patient_profile_data', response.data.User);
                $rootScope.$broadcast('patient_card_detail', response.data.cards);
                $rootScope.$broadcast('patient_all_detail', response.data);
            }
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });;
    }

    this.getConversations = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'getConversations',data);
    }

    this.getPatientPlanDetails = function (data, type) {
        if(type=='pastPlan') {
            return $http.get(CONSTANTS.Base_Url + 'getPatientPlanDetails?userId='+data+'&isRequest='+1);
        } else {
            return $http.get(CONSTANTS.Base_Url + 'getPatientPlanDetails?userId='+data);
        }
    }

    this.buyPlan = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'buyPlan',data);
    }

    this.buyAdditionalPhoneSession = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'buyAdditionalPhoneSession',data);
    }

    this.getBillingDetails = function (data) {
        return $http.get(CONSTANTS.Base_Url + 'getBillingDetails?userId='+data);
    }

    this.addCard = function(data) {        
        return $http.post(CONSTANTS.Base_Url + 'addCard', data);
    }

    this.getyear = function() {
        var year = new Date().getFullYear();
        $rootScope.years = [];
        $rootScope.years.push({ id:year, value:year});
        for (var i = 1; i < 7; i++) {
            $rootScope.years.push({ id:year + i, value:year + i });
        }
    }

    this.submitReview = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'submitReview',data);
    }

    this.deleteCard = function (id, index) {
        var _data = {};
        _data.userId = $stateParams.id;
        _data.cardId = id;
        $http.post(CONSTANTS.Base_Url + 'deleteCard',_data).success(function (response) {
            if(response.status == 'success'){
                $rootScope.patientCardDetail.splice(index, 1);
            }           
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }

    this.setDefaultCard = function (id) {
        var _data = {};
        _data.userId = $stateParams.id;
        _data.cardId = id;
        $http.post(CONSTANTS.Base_Url + 'setDefaultCard',_data).success(function (response) {
            if(response.status == 'success'){
                Main.popupCommonFunction('defaultCard'); 
            }           
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }

    this.getPreviousMatchingData = function(id) {
        return $http.get(CONSTANTS.Base_Url + 'getPreviousMatchingData?userId='+id);
    }

    this.sendEmailToAdmin = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'sendEmailToAdminNoCounselorFilter',data);
    }

    this.stripeError = function (code) {

        switch (code) {
            case 'invalid_number':
                $rootScope.Errmsg = stripeError.invalid_number;
                break;
            case 'invalid_expiry_month':
                $rootScope.Errmsg = stripeError.invalid_expiry_month;
                break;
            case 'invalid_expiry_year':
                $rootScope.Errmsg = stripeError.invalid_expiry_year;
                break;
            case 'invalid_cvc':
                $rootScope.Errmsg = stripeError.invalid_cvc;
                break;
            case 'incorrect_number':
                $rootScope.Errmsg = stripeError.incorrect_number;
                break;
            case 'expired_card':
                $rootScope.Errmsg = stripeError.expired_card;
                break;
            case 'incorrect_cvc':
                $rootScope.Errmsg = stripeError.incorrect_cvc;
                break;
            case 'incorrect_zip':
                $rootScope.Errmsg = stripeError.incorrect_zip;
                break;
            case 'processing_error':
                $rootScope.Errmsg = stripeError.processing_error;
            break;
        }
    }
});
