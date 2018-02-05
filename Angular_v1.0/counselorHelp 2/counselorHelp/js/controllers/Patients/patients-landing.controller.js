/**
 * @Method :     Patients Controller
 * @Purpose:     Controller for Patient landing page
 */

as.controller('PatientsLandingCtrl', function($rootScope, $scope, $state, $stateParams, Counselors, localStorageService, Main) {

	$scope.showPagination = true;
    $scope.currentPage = 1;
    $scope.cancelSearch = false;
    $scope.aPatientPosts = [];
    $scope.showWhenNotification = false;
    $scope.maxSize = 5;	

    $scope.$on('patient_all_detail', function (event, data) {
        $scope.patient_data = data;
        $rootScope.notificationCount = $scope.patient_data.notifications.notificationCount;     
    });

    $scope.patientStateChange(); 
    
    $scope.patientPostNotification = function(){
	    if($state.params.postId != ''){
	        angular.forEach($rootScope.aPatientNotifications, function(data) {
	            if($state.params.postId == data.Post.id) {
	                var _data = {};
	                _data.postId = $state.params.postId;
	                _data.userId = $stateParams.id;
	                _data.userType = 'P';  
	                Counselors.showUpdatedNotification(_data, 'counselor').then(function(response){
	                	$scope.aPatientPosts = [];
				       	$scope.showPagination = false;
				        $scope.aPatientPosts.push(response.data.data);
				        $scope.showWhenNotification = true;
	                })
	            }
	        }); 
	    }
	}
	$scope.patientPostNotification();

    $scope.getPatientLandingData = function(currentPage) {	 
    	
		var _data = {};
		_data.offset = currentPage-1;
		_data.userType = 'P';
		Counselors.counselorsLandingData(_data).success(function (response) {

	        $scope.aPatientLandingData = response.data;
	        $scope.aPatientPosts = response.data.posts;
	        $scope.showPagination = true;	 
	        $scope.total_count = response.data.totalPosts;
	        for(var i=0;i<$scope.aPatientPosts.length;i++) {
	        	$scope.aPatientPosts[i].Post["ReadMore"]=0;
	        }	        
	    }).error(function (error) {
	        Main.popupCommonFunction('apiError');
	    });    
	}
	$scope.getPatientLandingData($scope.currentPage);

	$scope.searchData = function(evt, data) {
		if(evt.which === 13 && data !== '') {
			var _data = {};
			_data.userType = 'P';
			$scope.serachData = data;
			Counselors.counselorsLandingData(_data, $scope.serachData, 'search').success(function (response) {
	        	if(response.status == 'success') {
	        		$scope.showPagination = false;
	        		$scope.aPatientPosts = [];
	        		$scope.aPatientPosts = response.data.posts;
	        		$scope.noResponse = false;
	        		for(var i=0;i<$scope.aPatientPosts.length;i++) {
			        	$scope.aPatientPosts[i].Post["ReadMore"]=0;
			        }
	        	} else {	
	        		$scope.noResponse = true;
	        		$scope.aPatientPosts = [];
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
			$scope.aPatientPosts = $scope.aPatientLandingData.posts;
			$scope.total_count = $scope.aPatientLandingData.totalPosts;
			$scope.cancelSearch = false;
			$scope.noResponse = false;			
		}
	}

	$scope.search_cancel = function() {	
		$scope.showPagination = true;	
		$scope.noResponse = false;
		$scope.searchPosts = '';
		$scope.cancelSearch = false;
		$scope.total_count = $scope.aPatientLandingData.totalPosts;
		$scope.aPatientPosts = $scope.aPatientLandingData.posts;
	}

	$scope.showAllData = function() {
		$scope.showPagination = true;
		$scope.showWhenNotification = false;
		$scope.total_count = $scope.aPatientLandingData.totalPosts;
		$scope.aPatientPosts = $scope.aPatientLandingData.posts;
	}

	$scope.signupnewsletter = function() {
        $rootScope.Newsletter_popup = true;
        $rootScope.ifResponse = false;
        $rootScope.myObj = {
        	"display" : "block"
        }

        Counselors.getNewsLetter($stateParams.id).success(function (response) {
        	if(response.status == 'success') {
        		$rootScope.email = response.data;
        	}
		}).error(function (error) {
	        Main.popupCommonFunction('apiError');
    	});
    }   

    $scope.ReadMore = function(id) {
    	for(var i=0;i<$scope.aPatientPosts.length;i++) {
            if($scope.aPatientPosts[i].Post["id"] == id )
    		$scope.aPatientPosts[i].Post["ReadMore"]= 1;
    	    else
    		$scope.aPatientPosts[i].Post["ReadMore"]= 0;
    	}
    } 
    
    $scope.GetHtmlText = function(text) {
       return $sce.TrustasHtml(text);
    }
})