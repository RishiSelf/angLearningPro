/**
 * @Method :     Counselors Controller
 * @Purpose:     Controller for Counselors Registration
 */

as.controller('CounselorRegisterCtrl', function($rootScope, $scope, Patients, localStorageService, $state, Main, $filter) {
    
    if(angular.fromJson(localStorageService.get('authData'))) {
        Patients.registration(angular.fromJson(localStorageService.get('authData')).user_id, 'counselorAdmin').success(function (response){

            if(response.status == 'success') {
                $scope.counselorRegister ={
                    first_name: response.data.User.firstname,
                    last_name: response.data.User.lastname,
                    email: response.data.User.email,
                    zipcode: response.data.User.zipcode,
                    place: response.data.User.place,
                    address: response.data.User.street_address,
                    gender: response.data.User.gender,
                    telephone_no: response.data.User.telephone_no
                }
                $scope.Personnummer = response.data.User.personal_number;
            }      
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        }); 
    } else {
        $state.transitionTo('anon', { reload: true, inherit: false, notify: true });
    }

    $scope.counselorRegistration = function (isValid) {

        if (isValid) {
            var _data = {};
            _data = $scope.counselorRegister;
            _data.userType = 'Counselor';
            _data.is_registered = '1';
            _data.userId = angular.fromJson(localStorageService.get('authData')).user_id;
            Patients.registration(_data, 'submit').success(function (response) {
                if(response.status == 'success') {
                    localStorageService.set('auth_token', JSON.stringify(response.data)); 
                    localStorageService.set('userType', 'C');
                    localStorageService.set('counselor_registered', 'true');
                    localStorageService.remove('isRegistrationProcess');
                    $rootScope.isCounselorLoggedIn = true;
                    $state.go('counselor.landing_page',{id:angular.fromJson(localStorageService.get('authData')).user_id});
                }             
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            });
        }
    }    
})