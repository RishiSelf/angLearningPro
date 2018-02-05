
as.service('Main', function ($rootScope, $http, $location, CONSTANTS, Upload, $state, localStorageService, Counselors) {
	this.newsletterSignUp = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'signupNewsletter',JSON.stringify( data ) );
    }

    this.saveCounselorRequest = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'saveCounselorRequest',JSON.stringify( data ) );
    }

    this.popupCommonFunction = function (type) {
        if(type == 'inactivity') {
            Counselors.LogoutFunction();
        }
        $rootScope.popupType = type;
        $('#commonPopup').modal('show');
        $("#blurDiv").addClass("blur-effect");

        $('#commonPopup').on('hidden.bs.modal', function (e) {
            $("#blurDiv").removeClass("blur-effect");
        })
    }


    this.reviewPopup = function () {
        $('#review').modal('show');
        $("#blurDiv").addClass("blur-effect");

        $('#review').on('hidden.bs.modal', function (e) {
            $rootScope.notRating = false;
            $("#rateYo").rateYo("option", "rating", "0");
            $("#blurDiv").removeClass("blur-effect");
        })
    }

    this.scrollTo = function(id, e) {
        $('html, body').animate({
            scrollTop: $("#"+id).position().top
        }, 1000);
    }

    this.getCounselor = function(id) {
        return $http.get(CONSTANTS.Base_Url + 'getAssignedCounselorForPatient?userId='+id)
    }

    this.getSetting = function() {

        $http.get(CONSTANTS.Base_Url + 'getSetting').success(function (response) {
            if(response.status == 'success') {
                $rootScope.homePrice = response.data.home_page_price;
            }
        }).error(function (error) {
            this.popupCommonFunction('apiError');
        });;
    }

    this.removeLocalStorageData = function() {
        localStorageService.remove("auth_token");
        localStorageService.remove("authData");
        localStorageService.remove("sessionid");
        localStorageService.remove("authType");
        localStorageService.remove("userType");
        localStorageService.remove("user_type");
        localStorageService.remove('user_registered');
        localStorageService.remove('counselor_registered');
        localStorageService.remove('prevState');
        localStorageService.remove('userMatching');
        localStorageService.remove('counselorId');  
        localStorageService.remove('counselorMatching'); 
        localStorageService.remove('isRegistrationProcess'); 
        localStorageService.remove('isCounselorMatchingState'); 
        $rootScope.isMatchingProcess = false; 
    }
});