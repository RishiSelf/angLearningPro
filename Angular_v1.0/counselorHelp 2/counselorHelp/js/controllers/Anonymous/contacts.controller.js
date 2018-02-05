/**
 * @Method :     contact Controller
 * @Purpose:     Controller for contacts
 */

as.controller('contactsCtrl', function ($scope, $location, Pages, $anchorScroll, $rootScope, Main) {

    $scope.saveContact = function (isValid) {
        if (isValid) {
            var _data = {};
            _data.Contact = $scope.Contact;
            _data.Contact.user_type = 'N';
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