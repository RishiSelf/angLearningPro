/**
 * @Method :     Counselors Controller
 * @Purpose:     Controller for Counselors edit profie
 */

as.controller('CounselorsEditProfileCtrl', function($timeout, $rootScope, $sce, $scope, $state, $stateParams, Counselors, $location, Upload, editableOptions, localStorageService, Main) {

    $scope.om_migEditable = false;
    $scope.specialiseringEditable = false;
    $scope.licensingEditable = false;
    $scope.counter = '';
    $scope.statusCounter = '';
    $scope.showProfilePic = true;
    $scope.showCropper = false;
    editableOptions.theme = 'bs3';
    $scope.licensingData = [];
    $scope.uploadBanner = 0;
    $scope.notLicensing = false; 

    $scope.imageCrop = {
        originalImage: '',
        croppedImage: ''
    };

    $scope.stateChange();

    Counselors.getCounselorDetailPersonal($stateParams.id).success(function (response) {

        if(response.status == 'success') {

            $scope.statusCounter = true;
            $scope.counselorData = response.data;
            $scope.counselor_details = response.data;
            $scope.user = response.data.CounselorDetail;              

            response.data.CounselorDetail.about_show = response.data.CounselorDetail.about.replace(/(?:\r\n|\r|\n)/g, '<br />');
            $scope.user.about_show = $sce.trustAsHtml($scope.user.about_show);
            $scope.user.about_counselor = $scope.user.about_show;
            $scope.aboutInitial = response.data.CounselorDetail.about;

            $scope.usersComment = response.data.CounselorDetail.comment;            
            $scope.roleInitial = '';
            if($scope.user.role) {
                $scope.user.role = $scope.user.role;
                $scope.roleInitial = $scope.user.role;
            } else {
                $scope.user.role = 'Ange din titel';
                $scope.roleInitial = 'Ange din titel';
            }

            $scope.counselorDetails($scope.user);

        } else {
            $scope.user = [];
            $scope.counselorDetail = [];
        }
    }).error(function (error) {
        Main.popupCommonFunction('apiError');
    });

    $scope.counselorDetails = function(data) {
        $scope.specialitiesList = $scope.counselor_details.specialities;
        $scope.user.specs = [];
        $scope.specsInitial = [];
        $scope.licensingInitial = [];
        angular.forEach(data.CounselorSpeciality, function(specs) {
            angular.forEach($scope.specialitiesList, function(specsList) {
                if(specs.speciality_id === specsList.id) {
                    $scope.user.specs.push({'id':specsList.id,'title':specsList.title});
                    $scope.specsInitial.push({'id':specsList.id,'title':specsList.title});
                }
            }); 
        });

        if(data.licensing) {
            angular.forEach($scope.user.licensing, function(data) {
                $scope.licensingInitial.push({'name':data.name, 'designation':data.designation});
            });
            localStorageService.set('userLicData', $scope.licensingInitial);
        }
    }


    $scope.editBtn = function(edit_type){

        switch (edit_type) {
            case 'om_mig':
                $scope.om_migEditable = true;
                if(!$scope.user.about && !$scope.statusCounter) {
                    $scope.user.about = '';  
                }
            break;

            case 'specs':
                $scope.specialiseringEditable = true;
            break;

            case 'license':
                $scope.licensingEditable = true;
                if($scope.user.licensing == '') {
                    $scope.notLicensing = true;
                    $scope.user.licensing_name1 = '';
                    $scope.user.licensing_designation1 = '';
                } else if(!$scope.statusCounter) {
                    $scope.user.licensing_name1 = '';
                    $scope.user.licensing_designation1 = '';
                }
            break;
        } 
    }

    $scope.update = function(user_type, user, index){
        var data = {};

        switch (user_type) {

            case 'om_mig':
                $scope.om_migEditable = false;
                $scope.user.about_show = $scope.user.about.replace(/(?:\r\n|\r|\n)/g, '<br />');
                data = {"about":user,"id": $scope.counselorData.User.id}
            break;

            case 'specs':
                $scope.specialiseringEditable = false;
                if (!$scope.$$phase) $scope.$apply();
                $scope.specialities = {};

                var index_spec = 0;
                if($scope.updateType == 'removeItem') {
                    user.specs = user.specialities;  
                }
                angular.forEach(user.specs, function(spec, index) {               
                    if(spec.title != '' && spec.title != undefined) {
                        $scope.specialities[index_spec] = spec.id;
                        index_spec = index_spec + 1;   
                    }                  
                });
                data = {"specs":$scope.specialities, "id": $scope.counselorData.User.id}
            break;

            case 'comments':
                $scope.specialiseringEditable = false;
                if (!$scope.$$phase) $scope.$apply();
                $scope.user_comment = user.comment;
                data = {"comment":$scope.user_comment, "id": $scope.counselorData.User.id}                
                
            break;

            case 'license':
                $scope.licensingEditable = false;
                if (!$scope.$$phase) $scope.$apply();

                if(user.licensing_name1 || user.licensing_designation1) {
                    $scope.user.licensing = [{"name":user.licensing_name1, "designation":user.licensing_designation1}]
                }

                if($scope.updateType == 'removeItem') {
                    $scope.user.licensing = user.licensing;  
                }

                $scope.licensingData = [];
                angular.forEach($scope.user.licensing, function(lic, index) {                  
                    if((lic.name != '' && lic.name != undefined) || (lic.designation != '' && lic.designation != undefined)) {
                        $scope.licensingData.push({"name":lic.name, "designation":lic.designation});
                    }               
                });
                $scope.user.licensing = $scope.licensingData;
                data = {"licensing":$scope.user.licensing,"id": $scope.counselorData.User.id}
            break;

            case 'role':

                data = {"role":$scope.user.role,"id": $scope.counselorData.User.id}
            break;

        }

        $scope.userProfile(data); 
    }

    $scope.userProfile = function(data) {

        $scope.popupCounter = 0;
        if(data.role == '' || data.about == '' || data.licensing == '' || data.specs == '' || data.comment == ''){
            // $scope.user.role = $scope.roleInitial;
            $scope.popupCounter = 1;
            $scope.initailValues();
        }

        if($scope.popupCounter == 0){
            $scope.saveUserProfile(data);
        }
    }

    $scope.saveUserProfile = function(data, user_type) {

        var CounselorDetail = {"counselorData": data};
        Counselors.saveProfile(CounselorDetail).success(function (response) {

            $scope.counter = 'yes';
            if(response.status == 'success') {
                $scope.updateType = 'submit';                    
                $scope.statusCounter = false;              
                $scope.initailValues();
                if(response.message == 'You have made no changes') {
                    Main.popupCommonFunction('noChangeInEditProfile');
                } else {
                    $scope.showPopup(); 
                }                                                         
            }
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }

    $scope.showPopup = function(){
        Main.popupCommonFunction('counselorEditProfile');
    }

    $scope.initailValues = function() {
        $scope.user.specs  = [];
        $scope.user.licensing = [];
        for(var i=0;i<$scope.specsInitial.length;i++){
            $scope.user.specs.push($scope.specsInitial[i]);
        }
        $scope.user.comment = $scope.usersComment;
        $scope.user.about = $scope.aboutInitial;
        
        $scope.userLicData = localStorageService.get('userLicData');
        for(var i=0;i<$scope.userLicData.length;i++){
            $scope.user.licensing.push($scope.userLicData[i]);
        }
        $scope.user.role = $scope.roleInitial;
    }

    $scope.cancelChanges = function(user_type) {

        switch (user_type) {
            case 'om_mig':
                $scope.om_migEditable = false;
                $scope.user.about_show = $scope.user.about;
            break;

            case 'specs':
                $scope.specialiseringEditable = false;
                if($scope.counter == 'no') {
                    $scope.user.specs = '';
                } else {
                    $scope.user.specs  = [];
                    for(var i=0;i<$scope.specsInitial.length;i++){
                        $scope.user.specs.push($scope.specsInitial[i]);
                    }
                }
            break;

            case 'comments':
                $scope.specialiseringEditable = false;
                $scope.user.comment = $scope.usersComment;
            break;

            case 'license':
                $scope.licensingEditable = false;
                if($scope.counter == 'no') {
                    $scope.user.licensing = '';
                    $scope.notLicensing = true;
                } else {
                    $scope.user.licensing  = [];
                    for(var i=0;i<$scope.licensingInitial.length;i++){
                        $scope.user.licensing.push($scope.licensingInitial[i]);
                    }
                }
            break;
        } 
    }

    

    $scope.cropImgType = function(type){
        if(type == 'banner'){
            $scope.image_type = 'banner';
            $('#bannerImagePopup').modal('show');
        } else {
            $scope.image_type = 'profile';          
        }
    } 

    $scope.photos = [
        {src: 'images/banner_img/banner1.png', desc: 'Image 01'},
        {src: 'images/banner_img/banner2.png', desc: 'Image 03'},
        {src: 'images/banner_img/banner3.png', desc: 'Image 04'},
        {src: 'images/banner_img/banner4.png', desc: 'Image 05'},
        {src: 'images/banner_img/banner5.png', desc: 'Image 05'}
    ];
    // initial image index
    $scope._Index = 0;
    // if a current image is the same as requested image
    $scope.isActive = function (index) {
        return $scope._Index === index;
    };
    // show prev image
    $scope.showPrev = function () {
        $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
    };
    // show next image
    $scope.showNext = function () {
        $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
    };
    // show a certain image
    $scope.showPhoto = function (index) {
        $scope._Index = index;
    };

    $scope.uploadBanner = function() {
        getDataUri($scope.photos[$scope._Index].src, function(dataUri) {
            $scope.cropped_profileImg(dataUri);
        })      
    }


    function getDataUri(url, callback) {
        var image = new Image();

        image.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
            canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

            canvas.getContext('2d').drawImage(this, 0, 0);

            // Get raw image data
            // callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

            // ... or get as Data URI
            callback(canvas.toDataURL('image/png'));
        };

        image.src = url;
    }    
    
    function handleFileSelect(evt){
        $scope.showProfilePic = false;
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

    angular.element(document.querySelector('#profilePicInput')).on('change',handleFileSelect);


    $scope.cropped_profileImg = function(file) { 

        $scope.showCropper = false;
        var a = Upload.dataUrltoBlob(file);
        // $scope.file = new File([a], 'myFile.png', {type: 'image/png'});
        $scope.file = new Blob([a], {type: 'image/png'});
        $scope.file.name = 'myFile.png';
        // $scope.errFile = errFiles && errFiles[0];

        if($scope.image_type == 'banner' && file){

            $('#bannerImagePopup').modal('hide');
            Counselors.saveProfilePic($scope.file, $scope.counselorData.User.id, 'banner').then(function (response) {

                if(response.data.status == 'failure') {
                   alert(response.data.message); 
                } else {
                    $timeout(function () {
                        file.result = response.data;
                        $scope.counselorData.User.banner_pic = response.data.data.pic;
                    });
                }
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });

        } else if (file) { 

            $scope.showProfilePic = true;

            Counselors.saveProfilePic( $scope.file, $scope.counselorData.User.id, 'profile_pic').then(function (response) {

                if(response.data.status == 'failure') {
                   alert(response.data.message); 
                } else {
                    $timeout(function () {
                        file.result = response.data;
                        $scope.counselorData.User.profile_pic = response.data.data.pic;
                        $scope.$emit('profile_pic_data', $scope.counselorData.User.profile_pic);
                    });
                }
            }, function (response) {
                
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    }

    $scope.popupClose = function() {
        $scope.showCropper = false;
        $scope.showProfilePic = true;
    }

    $scope.addNewItem = function(type) {
        if($scope.notLicensing == true) {
            $scope.user.licensing = [{"name":$scope.user.licensing_name1, "designation":$scope.user.licensing_designation1}]
            $scope.counter = 'no';
            $scope.notLicensing = false;
            $scope.user.licensing_name1 = "";
            $scope.user.licensing_designation1 = "";
        } else {
            $scope.counter = 'yes';
        }
        $scope.user.licensing.push({});       
    }

    $scope.removeItem = function($index, type) {
        $scope.updateType = 'removeItem';        
        if(type == 'spec') { 
            $scope.user.specs.splice($index, 1);
        } else {
            $scope.user.licensing.splice($index, 1);
        }      
    }

    $scope.navigation = function(id, e) {
        $('html, body').animate({
            scrollTop: $("#"+id).position().top
        }, 1000);
    }    
});