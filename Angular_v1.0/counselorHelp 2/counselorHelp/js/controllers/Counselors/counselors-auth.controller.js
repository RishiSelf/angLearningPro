/**
 * @Method :     Counselors Controller
 * @Purpose:     Controller for Counselors authentication, personal details, logout
 */

as.controller('CounselorsAuthController', function($scope, $rootScope, $state, $stateParams, localStorageService, Counselors, Main) {
    
    $scope.$on('profile_pic_data', function (event, data) {
        $scope.counselor_detail.profile_pic = data;
    });
    $rootScope.id = $stateParams.id;
    $rootScope.is_online = true;
    $scope.profil_sublisting = false;
    $scope.helpMenu = false;
    $rootScope.messageCounter = 0;

    Counselors.getCounselorDetailPersonal($stateParams.id);

    $scope.faq = function() {
        $state.go('counselor.faq');
    }

    $scope.contactus = function() {
        $state.go('counselor.contactus');
    }

    $scope.editPofile = function() {
        $state.go('counselor.edit_profile',{id:$scope.counselor_detail.id});
    }

    $scope.counselor_logout = function() {
        Counselors.LogoutFunction('counselor');
    }

    $scope.online_status = function() {

        if($scope.is_online) {
            $scope.is_online_val = 1;
            $scope.online_text = "Tillg&auml;nglig";
        } else {
            $scope.is_online_val = 0;
            $scope.online_text = "Ej Tillg&auml;nglig";
        }
        var _data = {};
        _data.onlineStatus = $scope.is_online_val;
        _data.id = $stateParams.id;
        Counselors.onlineStatus(_data);
    }

    $scope.stateChange = function() {
        if($state.current.name == 'counselor.edit_profile' || $state.current.name == 'counselor.auto-generatedmsgs') {
            $scope.activeMenu = 'counselor.edit_profile'
            $scope.profil_sublisting = true;
        } else if($state.current.name == 'counselor.counselor_clinicalguide' || $state.current.name == 'counselor.faq' || $state.current.name == 'counselor.contactus') {

            $scope.activeMenu = 'helpcenter'
            $scope.helpMenu = true;
        } else {
            $scope.activeMenu = 'others'
            $scope.profil_sublisting = false;
            $scope.helpMenu = false; 
        }
    }

    $scope.stateChange();

    $scope.Profil = function() {

        $scope.activeMenu = 'counselor.edit_profile'
        $state.go('counselor.edit_profile', {}, {reload:true});
        $scope.profil_sublisting = true;
    }    

    $scope.helpcenter = function(){
        
        $('.activeList').removeClass('active');
        $scope.activeMenu = 'helpcenter';
        $scope.helpMenu = true;
    }
});