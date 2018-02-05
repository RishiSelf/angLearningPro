/**
 * @Method :     Anonymous Controller
 * @Purpose:     Controller for Reviews of Counselors
 */

as.controller('reviewsCtrl', function($rootScope, $scope, $state, $stateParams, Pages, Main) {
	
	$scope.currentPage = 1;
	$scope.ifNoReview = false;

	$scope.getReviews = function(currentPage) {
		var screenHeight = window.innerHeight;
	    var headerHeight = $('#header-frame').innerHeight();
	    var footerHeight = $('#header-frame').innerHeight();
	    if($rootScope.isCounselorLoggedIn){
	    	var middleFrameHeight = $('.middle-frame').css('minHeight',screenHeight - 190);
	    } else {
	    	var middleFrameHeight = $('.middle-frame').css('minHeight',screenHeight - 278);
	    }
	    
		$scope.offset = currentPage-1;
	    Pages.getReviews($scope.offset).success(function(response) {
	        if(response.status == 'success') {
	        	$scope.aReviews = response.data.reviews;
	        	$scope.total_count = response.data.totalReviews;
	        } else {
	        	$scope.ifNoReview = true;
	        }       
	    }).error(function (error) {
	        Main.popupCommonFunction('apiError');
	    })
	}
	$scope.getReviews($scope.currentPage);    
});