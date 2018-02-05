/**
 * @Method :     Patients Controller
 * @Purpose:     Controller for Patient registeration
 */

as.controller('PatientRegisterCtrl', function($rootScope, $scope, $state, $stateParams, Patients, localStorageService, Main) {
   
    $scope.failed = false;
    
    if(angular.fromJson(localStorageService.get('authData'))) {
        Patients.registration(angular.fromJson(localStorageService.get('authData')).user_id, 'counselorAdmin').success(function (response){
            if(response.status == 'success') {                
                $scope.patientRegister = {
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

    $scope.patientRegistration = function (isValid) {
        
        if (isValid) {
            var _data = {};
            _data = $scope.patientRegister;
            _data.userType = 'User';
            _data.is_registered = '1';
            _data.userId = angular.fromJson(localStorageService.get('authData')).user_id;
            Patients.registration(_data, 'submit').success(function (response) {
                if(response.status == 'success') {
                    $scope.failed = false;
                    $state.go('anon.counselor-matching');
                } else {
                    $scope.failed = true;
                    $scope.message = response.message;
                }              
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            });
        }
    }
})