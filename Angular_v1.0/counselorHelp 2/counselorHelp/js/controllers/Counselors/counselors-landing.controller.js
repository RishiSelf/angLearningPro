/**
 * @Method :     Counselors Controller
 * @Purpose:     Controller for Counselors landing page
 */

as.controller('counselorLandingController', function($scope, $rootScope, Counselors, $sce, localStorageService, $stateParams, $state, Main) {

	$scope.showPagination = true;
    $scope.currentPage = 1;
    $scope.cancelSearch = false;
    $scope.aCounselorPosts = [];
    $scope.showWhenNotification = false;

	$scope.$on('counselor_data', function (event, data) {
        $scope.counselor_data = data;
        $rootScope.notificationCount = $scope.counselor_data.notifications.notificationCount;      
    });

    $scope.stateChange();

    $scope.postNotification = function(){
	    if($state.params.postId != ''){
	        angular.forEach($rootScope.aCounselorNotifications, function(data) {

	            if($state.params.postId == data.Post.id) {
	                var _data = {};
	                _data.postId = $state.params.postId;
	                _data.userId = $stateParams.id;
	                _data.userType = 'C';  

	                Counselors.showUpdatedNotification(_data, 'counselor').then(function(response){
	                	$scope.aCounselorPosts = [];
				       	$scope.showPagination = false;
				        $scope.aCounselorPosts.push(response.data.data);
				        $scope.showWhenNotification = true;
	                })
	            }
	        }); 
	    }
	}
	$scope.postNotification();

    
	$scope.getCounselorLandingData = function(currentPage) { 

		$scope.showWhenNotification = false;
		var _data = {};
		_data.offset = currentPage-1;
		_data.userType = 'C';
		
		Counselors.counselorsLandingData(_data).success(function (response) {
			if(response.status == 'success') {
		        $scope.aCounselorLandingData = response.data;
		        $scope.aCounselorPosts = response.data.posts;
		        $scope.showPagination = true;	 
		        $scope.total_count = response.data.totalPosts;
		        for(var i=0;i<$scope.aCounselorPosts.length;i++) {
		        	$scope.aCounselorPosts[i].Post["ReadMore"]=0;
		        }
		    }
	        
	    }).error(function (error) {
	        Main.popupCommonFunction('apiError');
	    });    
	}
	$scope.getCounselorLandingData($scope.currentPage);	

	$scope.searchData = function(evt, data) {
		if(evt.which === 13 && data !== '') {
			var _data = {};
			_data.userType = 'C';
			$scope.serachData = data;
			Counselors.counselorsLandingData(_data, $scope.serachData, 'search').success(function (response) {
	        	$scope.showWhenNotification = false;
	        	if(response.status == 'success') {
	        		$scope.showPagination = false;
	        		$scope.aCounselorPosts = [];
	        		$scope.aCounselorPosts = response.data.posts;
	        		$scope.noResponse = false;
	        		for(var i=0;i<$scope.aCounselorPosts.length;i++) {
			        	$scope.aCounselorPosts[i].Post["ReadMore"]=0;
			        }
	        	} else {	
	        		$scope.noResponse = true;
	        		$scope.aCounselorPosts = [];
	        		$scope.showPagination = false;
	        		$scope.errorMsg = "Tyv&auml;rr, din s&ouml;kning gav inga resultat. &Auml;ndra dina s&ouml;kord och f&ouml;rs&ouml;k igen.";
	        	}	        	
			}).error(function (error) {
	        	Main.popupCommonFunction('apiError');
	    	});
		} else if(data !== '') {
			$scope.cancelSearch = true;
		} else {
			$scope.showPagination = true;
			$scope.aCounselorPosts = $scope.aCounselorLandingData.posts;
			$scope.total_count = $scope.aCounselorLandingData.totalPosts;
			$scope.cancelSearch = false;
			$scope.noResponse = false;			
		}
	}

	$scope.search_cancel = function() {	
		$scope.showPagination = true;	
		$scope.noResponse = false;
		$scope.searchPosts = '';
		$scope.cancelSearch = false;
		$scope.showWhenNotification = false;
		$scope.total_count = $scope.aCounselorLandingData.totalPosts;
		$scope.aCounselorPosts = $scope.aCounselorLandingData.posts;
	}

	$scope.showAllData = function() {
		$scope.showPagination = true;
		$scope.showWhenNotification = false;
		$scope.total_count = $scope.aCounselorLandingData.totalPosts;
		$scope.aCounselorPosts = $scope.aCounselorLandingData.posts;
		$scope.showWhenNotification = false;
	}

	$scope.signupnewsletter = function() {
        $rootScope.Newsletter_popup = true;
        $rootScope.ifResponse = false;
        $rootScope.myObj = {
        	"display" : "block"
        }

        Counselors.getNewsLetter(angular.fromJson(localStorageService.get('auth_token')).user_id).success(function (response) {
        	if(response.status == 'success') {
        		$rootScope.email = response.data;
        	}
		}).error(function (error) {
	        Main.popupCommonFunction('apiError');
    	});
    }   

    $scope.ReadMore = function(id) {
    	for(var i=0;i<$scope.aCounselorPosts.length;i++) {
            if($scope.aCounselorPosts[i].Post["id"] == id )
    		$scope.aCounselorPosts[i].Post["ReadMore"]= 1;
    	    else
    		$scope.aCounselorPosts[i].Post["ReadMore"]= 0;
    	}
    } 
    
    $scope.GetHtmlText = function(text) {
       return $sce.TrustasHtml(text);
    }
});

