var pageApp = angular.module('pageApp', ["ngRoute"]);

pageApp.config(function($routeProvider){
  $routeProvider
  .when("/index", {
    templateUrl : "index.html"
  })
  .when("/about", {
    templateUrl : "aboutus.html",
    controller : 'aboutController'
  })
  .when("/services", {
    templateUrl : "services.html",
    controller : 'servicesController'
  })
  .when("/blogs", {
    templateUrl : "blogs.html",
    controller : 'blogController'
  })
  .when("/contact", {
    templateUrl : "contactUs.html",
    controller : 'contactController'
  })
});

pageApp.controller('pageController', function($scope, $window) {
  // $scope.getItemFromStorage = (key) => {
  //   return sessionStorage[key];
  // };
  // $scope.setItemtoStorage = (key, val) => {
  //   sessionStorage[key] = val;
  // };
  // $scope.gridVals = $scope.getItemFromStorage('grid') ? JSON.parse($scope.getItemFromStorage('grid')) : [];
  // //$scope.gridValsIndx = 0;
  // // $scope.gridValsTwo = [];
  // $scope.filterGridOne = {
  //   type: 1
  // }
  // $scope.filterGridTwo = {
  //   type: 2
  // }
  // $scope.gridvalue = function(type){
  //     $scope.gridVals.push({
  //       data: $scope.dataValue,
  //       type,
  //     });
  //     $scope.setItemtoStorage('grid', JSON.stringify($scope.gridVals));
  // }//Grid Value One Function end//
});

pageApp.controller('aboutController', function($scope){
  console.log("Page About Us");
  $scope.aboutMessage = "We are a Team. Know More About Us"
})

pageApp.controller('servicesController', function($scope){
  console.log("Page services Us");
  $scope.message = "We have a lot of services. Know More Services"
})

pageApp.controller('blogController', function($scope){
  console.log("Page Blogs");
  $scope.message = "We have a lots of helpful Article. Know More It"
})
pageApp.controller('contactController', function($scope){
  console.log("Page Contact Us");
  $scope.message = "Want to get in touch. Then send us your contact details"
})
