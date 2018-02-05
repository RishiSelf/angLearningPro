/**
 * @Method :     Patients Controller
 * @Purpose:     Controller for Add Patients administration
 */

as.controller('PatinetsAdministrationCtrl', function($rootScope, $scope, $state, $stateParams, Patients, localStorageService, Main, Counselors, Upload, $timeout) {


	$scope.$on('patient_card_detail', function (event, data) {
        $rootScope.patientCardDetail = data;
	});

	$scope.patientInfo = {};
	$scope.readOnly = true;
	$scope.failed = false;
    $scope.imageCrop = {
        originalImage: '',
        croppedImage: ''
    };

    $scope.patientStateChange(); 
    
	Patients.registration($stateParams.id, 'counselorAdmin').success(function (response){
        if(response.status == 'success') {
        	$scope.userDetails = response.data.User;
        	$scope.patientInfo ={
        		first_name: response.data.User.firstname,
				last_name: response.data.User.lastname,
                email: response.data.User.email,
                telephone_no: response.data.User.telephone_no,
                address: $scope.userDetails.street_address,
                zipcode: $scope.userDetails.zipcode,
                place: $scope.userDetails.place
        	}
        	$scope.Personnummer = response.data.User.personal_number;
        }      
    }).error(function (error) {
        Main.popupCommonFunction('apiError');
    });	

    $scope.resetFrm = function() {
    	$scope.readOnly = false;
    }

    $scope.updateProfile = function(isValid) {

    	if(isValid && !$scope.readOnly){
    		var _data = {};
            _data = $scope.patientInfo;
            _data.userType = 'User';
            _data.userId = $stateParams.id;
            Patients.registration(_data, 'submit').success(function (response) {
            	if(response.status == 'success'){
            		Main.popupCommonFunction('saveParofileInfo');
            		$scope.failed = false;                	
                	$scope.readOnly = true;
                } else{
                	$scope.failed = true;
                	$scope.message = response.message;
                }           
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            });
    	}
    }

    function handleFileSelect1(evt){
        $scope.showCropper = true;
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function($scope){
                $scope.imageCrop.originalImage=evt.target.result;
            });
        };
        reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#profilePicInput')).on('change',handleFileSelect1);

	$scope.cropped_profileImg = function(file, errFiles) { 
        $scope.showCropper = false;
        var a = Upload.dataUrltoBlob(file);
        $scope.file = new Blob([a], {type: 'image/png'});
        $scope.file.name = 'myFile.png';
        // $scope.file = new File([a], 'myFile.png', {type: 'image/png'});
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            Counselors.saveProfilePic( $scope.file, $stateParams.id, 'profile_pic').then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    $scope.patientDetail.profile_pic = response.data.data.pic;
                    $scope.$broadcast('patient_profile_data', $scope.patientDetail.profile_pic);
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
                    alert($scope.errorMsg)
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    }

    $scope.deleteCard = function(id, index) {    
        Patients.deleteCard(id, index)
    }

    $scope.setDefaultCard = function(id) {        
        Patients.setDefaultCard(id)
    }
})