var pageApp = angular.module('pageApp', []);

pageApp.controller('pageController', function($scope, $window) {
  $scope.getItemFromStorage = (key) => {
    return sessionStorage[key];
  };
  $scope.setItemtoStorage = (key, val) => {
    sessionStorage[key] = val;
  };
  $scope.gridVals = $scope.getItemFromStorage('grid') ? JSON.parse($scope.getItemFromStorage('grid')) : [];
  //$scope.gridValsIndx = 0;
  // $scope.gridValsTwo = [];
  $scope.filterGridOne = {
    type: 1
  }
  $scope.filterGridTwo = {
    type: 2
  }
  console.log("testing 01");

  // $scope.saveData = localStorage.getItem('gridVals');
	// $scope.gridValsData = (localStorage.getItem('gridVals')!==null) ? JSON.parse($scope.saveData) : [];
  // localStorage.setItem('gridValsData', JSON.stringify($scope.gridValsData));

  // $scope.savedGridTwo = $window.localStorage.getItem('gridValsTwo');
  // $scope.gridValsTwo = (localStorage.getItem('gridValsTwo')!==null) ? JSON.parse($scope.savedGridTwo) : [];
  // localStorage.setItem('gridValsTwo', JSON.stringify($scope.gridValsTwo));

  $scope.gridvalue = function(type){
      $scope.gridVals.push({
        data: $scope.dataValue,
        type,
      });
      $scope.setItemtoStorage('grid', JSON.stringify($scope.gridVals));
      //localStorage.setItem('gridVals', JSON.stringify($scope.dataValue));
  }//Grid Value One Function end//

  // $scope.gridvalueOne = function(){
  //     $scope.gridVals.push(
  //       $scope.dataValue
  //       type
  //     )
  //     $scope.dataValue= '';
  //    localStorage.setItem('gridVals', JSON.stringify($scope.gridVals));
  // }//Grid Value One Function end//
  //
  // $scope.gridvalueTwo = function(){
  //   console.log("testing 02");
  //     $scope.gridValsTwo.push(
  //       $scope.dataValue
  //     )
  //
  //     $scope.dataValue= '';
  //     localStorage.setItem('gridValsTwo', JSON.stringify($scope.gridValsTwo));
  // }//Grid Value Two Function end//

});
