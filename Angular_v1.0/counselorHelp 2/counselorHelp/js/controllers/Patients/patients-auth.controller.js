/**
 * @Method :     Patients authentication Controller
 * @Purpose:     Controller for Patients authentication
 */

as.controller('PatientsAuthController', function($scope, $rootScope, $state, $timeout, $location, $stateParams, localStorageService, Counselors, Patients, Main){
    
    $rootScope.reviewData = {};
    $scope.therapy = false;
    $scope.adminSubMenu = false;
    $scope.helpcenterSubmenu = false;
    $rootScope.id = $stateParams.id;
    $scope.planNotExpired = false;
    $rootScope.notRating = false;
    $scope.$on('patient_profile_data', function (event, data) {
        $scope.patientDetail = data;
    }); 
    
    $rootScope.patientDetail = function(){
        if(localStorageService.get('userType') == 'P' &&  localStorageService.get('user_registered') == 'true' && $stateParams.id){
            var _data = {};
            _data.userId = $stateParams.id;
            Patients.getPatientDetails(_data);

            if(localStorageService.get('responseData')) {
                $scope.conversationData = localStorageService.get('responseData');
                if($scope.conversationData.isPlanExpire == '1' && $scope.conversationData.isSentReview == '0'){
                    $scope.planNotExpired = true;           
                } else {
                    $scope.planNotExpired = false;
                }
            }
        }        
    }
    $rootScope.patientDetail();

    $scope.patientStateChange = function() {
        if($state.current.name == 'patient.administration' || $state.current.name == 'patient.add_card' || $state.current.name == 'patient.subscription' || $state.current.name == 'patient.pricepage' || $state.current.name == 'patient.checkout') {
            $scope.activeMenu = 'patient.administration';
            $scope.adminSubMenu = true;        
        } else if($state.current.name == 'patient.patient_clinicalguide' || $state.current.name == 'patient.patient_faq' || $state.current.name == 'patient.patient_contact') {
            $scope.activeMenu = 'patientHelpcenter';
            $scope.helpcenterSubmenu = true;
        } else  if($state.current.name == 'patient.patient-library-details'){
            $scope.activeMenu = 'patient.patient-library-details';
        } else {
            $scope.activeMenu = 'others';
            $scope.adminSubMenu = false;  
            $scope.helpcenterSubmenu = false;
        }
    }

    $scope.patientStateChange();

    $scope.administration = function() {
        $scope.activeMenu = 'patient.administration';
        $state.go('patient.administration',{}, {reload:true});
        $scope.adminSubMenu = true;
    }


    $scope.patientHelpcenter = function(){
        $('.activeList').removeClass('active');
        $scope.activeMenu = 'patientHelpcenter';
        $scope.helpcenterSubmenu = true;
    }

    $scope.priceInfoPage = function() {        
        $state.go('patient.pricepage');
        $scope.activeMenu = 'priceInfoPage';
    }

    $scope.patient_logout = function() {
        Counselors.LogoutFunction('user');
    };

    $scope.review = function(){
        $rootScope.reviewData = {};
        Main.reviewPopup();
        var rating = 0;
        $("#rateYo").rateYo({
            rating: rating,
            numStars: 5,
            fullStar: true
        }).on("rateyo.set", function (e, data) {
            $rootScope.rating = data.rating;         
        });
    }

    $rootScope.submitReview = function(comment){
        if(!$rootScope.rating) {
            $rootScope.notRating = true;
        } else {
                $rootScope.notRating = false;
                var _data = {};
                _data.counselor_id = $scope.conversationData.counselorId;
                _data.patient_id = $stateParams.id;
                _data.rating = $rootScope.rating;
                _data.comment = comment;
                _data.plan_subscription_id = $scope.conversationData.planSubscriptionId;
            Patients.submitReview(_data).success(function(response) {
                if(response.status == 'success') {
                    $('#review').modal('hide');
                    $scope.planNotExpired = false;
                    Main.popupCommonFunction('review');
                    // $state.go('patient.message',{},{reload:true})
                }        
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            })
        }
    }
})