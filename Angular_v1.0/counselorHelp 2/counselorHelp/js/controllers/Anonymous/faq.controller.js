/**
 * @Method :     FAQ Controller
 * @Purpose:     Controller for FAQ
 */

as.controller('faqsCtrl', function ($scope, $state, Pages, Main) {

    var load = function () {
        Pages.getFaqs('U').success(function (response) {
            $scope.aFaqs = response.data;            
            $scope.activeIndex = 0; // Set first dt and dd as selected
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }
    load();

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