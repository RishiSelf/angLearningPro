/**
 * @Method :     Counselors Controller
 * @Purpose:     Controller for Counselors contactus
 */

as.controller('CounselorsContactusCtrl', function($rootScope, $scope, Pages, $stateParams, Main) {

    $scope.stateChange();
    $scope.saveContact = function (isValid) {
        if (isValid) {
            var _data = {};
            _data.Contact = $scope.Contact;
            _data.Contact.user_type = 'C';

            Pages.saveContact(_data).success(function (response) {

                if(response.status == 'success') {                    
                    $scope.contactFrm.$setPristine(); 
                    $scope.contactFrm.$setUntouched();             
                    $scope.Contact = {};
                    setTimeout(Main.popupCommonFunction('contactUs'), 1000); 
                }               
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            });
        }
    }
});