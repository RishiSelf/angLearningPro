/**
 * @Method :     Counselors Controller
 * @Purpose:     Controller for Counselors FAQ
 */

as.controller('CounselorsFAQCtrl', function($rootScope, $scope, Pages) {

    $scope.stateChange();
    
    Pages.getFaqs('C').success(function (response) {
        $scope.faqs = response.data;
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