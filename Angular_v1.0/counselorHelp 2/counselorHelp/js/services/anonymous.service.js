var PagesService = angular.module('PagesService', []);

PagesService.service('Pages', function ($rootScope, $http, $location, CONSTANTS) {

    this.square = function (a) {
        return a * a
    };

    this.getFaqs = function (user_type) {
        return $http.get(CONSTANTS.Base_Url + 'getFaqs/'+user_type);
    }

    this.getArticles = function (pageNum) {
        return $http.get(CONSTANTS.Base_Url + 'getArticles/' + pageNum);
    }

    this.getPopupText = function () {
        return $http.get(CONSTANTS.Base_Url + 'getPopupText');
    }

    this.getLibrariesDetail = function (catId) {
        return $http.get(CONSTANTS.Base_Url + 'getLibrarySubCategory/' + catId);
    }


    this.getLibraries = function () {
        return $http.get(CONSTANTS.Base_Url + 'getLibraries');
    }

    this.saveContact = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'saveContact', data);
    }

    this.getJobCategories = function (pageNum) {
        return $http.get(CONSTANTS.Base_Url + 'getJobCategories');
    }

    this.getJobPositionDetail = function (positionId) {
        return $http.get(CONSTANTS.Base_Url + 'getJobPositionDetail/' + positionId);
    }

    this.getJobApplyFrm = function (positionId) {
        return $http.get(CONSTANTS.Base_Url + 'getJobPositionForm/' + positionId);
    }

    this.saveJobFrm = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'applyJob/', data);
    }

    this.getAdvisors = function (pageNum) {
        return $http.get(CONSTANTS.Base_Url + 'getAdvisors');
    }

    this.getPlans = function (type, id) {
        if(type == 'anon' && id) {
            return $http.get(CONSTANTS.Base_Url + 'getPlans/' + 1+'/'+id);
        } else if(type == 'anon') {
            return $http.get(CONSTANTS.Base_Url + 'getPlans/' + 1);
        } else {
            return $http.get(CONSTANTS.Base_Url + 'getPlans/' + 0);
        }
        
    }

    this.getPriceList = function () {
        return $http.get(CONSTANTS.Base_Url + 'getAssignedPlans');
    }
    
    this.priceSubmit = function (payment_data) {
        return $http.post(CONSTANTS.Base_Url + 'processPayment', payment_data);
    }

    this.getUsersStripe = function () {
        return $http.get(CONSTANTS.Base_Url + 'getCustomerList');
    }

    this.getUserDetailStripe = function () {
        return $http.get(CONSTANTS.Base_Url + 'getCustomerDetail');
    }

    this.getReviews = function(data) {
        return $http.get(CONSTANTS.Base_Url + 'getReviews?offset='+data);
    }

    this.FilteredCounselors = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'get_counselors',JSON.stringify( data ) );
    } 

    this.assignCounselorToPatient = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'assignCounselorToPatient',JSON.stringify( data ) );
    }   
});