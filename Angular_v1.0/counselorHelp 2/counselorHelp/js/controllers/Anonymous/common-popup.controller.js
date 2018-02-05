/**
 * @Method :     common popup Controller
 * @Purpose:     Controller for showing popups in all pages
 */


as.controller('commonPopupCtrl', function ($scope, Pages, $rootScope, $state, commonPopupData, Main) {

    $rootScope.commonPopupData = commonPopupData;
    Pages.getPopupText().success(function (response) {
        $scope.data = response.data;
        $scope.landingPopup = true;
    }).error(function (error) {
        Main.popupCommonFunction('apiError');
    });
    
});
