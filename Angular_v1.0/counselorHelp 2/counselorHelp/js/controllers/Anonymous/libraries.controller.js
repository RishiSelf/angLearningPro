/**
 * @Method :     libraries Controller
 * @Purpose:     Controller for libraries
 */

as.controller('librariesCtrl', function ($scope, $state, $rootScope, $location, Pages, localStorageService, Main) {

    $scope.libraryData = function () {

        Pages.getLibraries().success(function (response) {         
            $scope.aLibraries = response.data;
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }

    $scope.loadDetailHtml = function (catName, catId) {
        $rootScope.catId = catId;
        localStorageService.set('libId', $rootScope.catId);
        $state.transitionTo('anon.library-details', {catName: catName});
    }

    $scope.loadDetailData = function () {

        $scope.libId = localStorageService.get('libId');           
        Pages.getLibrariesDetail($scope.libId).success(function (response) {
            $scope.aData = response.data;
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }

    $scope.navigation = function (id, event) {
        Main.scrollTo(id, event)
    };
});