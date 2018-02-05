/**
 * @Method :     Counselors Controller
 * @Purpose:     Controller for Counselors 
 */

as.controller('counselorsCtrl', function ($scope, $location, Pages, $anchorScroll, $rootScope, Main) {

    $scope.counselorsRequest = function (isValid) {
        if (isValid) {            
            Main.saveCounselorRequest($scope.counselors).success(function (response) {
                if(response.status == 'success') {                    
                    $scope.counserlorsFrm.$setPristine(); 
                    $scope.counserlorsFrm.$setUntouched();             
                    $scope.counselors = {};
                    setTimeout(Main.popupCommonFunction('counselorsPopup'), 1000);                   
                }    
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            });
        }
    }
});