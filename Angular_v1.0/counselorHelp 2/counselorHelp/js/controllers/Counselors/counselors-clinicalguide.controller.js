/**
 * @Method :     Counselors Controller
 * @Purpose:     Controller for Counselors clinical guide
 */

as.controller('ConselorsClinicalGuideCtrl', function($scope, $rootScope, $state, $stateParams, Pages, Main) {

    $scope.stateChange(); 
    Pages.getFaqs('CCG').success(function (response) {
        $scope.aClinicalGuides = response.data;
        $scope.activeIndex = 0;
    }).error(function (error) {
        Main.popupCommonFunction('apiError');
    });
    
    $scope.toggleElements = function ($index) {
        if($scope.activeIndex == $index) {
            return;
        }
        $scope.activeIndex = -1;
        $('dt.term').removeClass('active');
        $('dd.description').hide(500);
        $('dt#' + $index).addClass('active');
        $('dt.active').next('dd').show(500);
        $scope.activeIndex = $index;
    };
});