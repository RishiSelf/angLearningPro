/**
 * @Method :     users Controller
 * @Purpose:     Controller for Patients
 */

as.controller('UsersController', function($scope, $rootScope, $state, $timeout, $location, $stateParams, localStorageService, Users, Main) {

    $scope.IsEmailDivHidden = true;
    $scope.disableRegisterBtn = false;  

    $scope.getQuestions = function() {
        Users.getQuestions().success(function (response) {
            $scope.aQuestions = response.data;
            $scope.activeIndex = 0;
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }

    $scope.getCountryList = function() {
        Users.getCountryList().success(function (response) {
            $scope.aCountries = response.data;              
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }

    $scope.getUserProfileData = function() {
        Users.getUserProfileData(localStorageService.get('loggedInUser').id).success(function (response) {      
            localStorageService.set('loggedInUser', response.data);            
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }
  
    // If user hit the Register page and questions variable is undefined thenredirect to start page.
    $scope.checkQuestionsEmpty = function() {   
        if ($rootScope.quiz == undefined) {
            $state.transitionTo('start'); 
        } 
    }
  
    $scope.saveQuiz = function(aData) {
        $rootScope.quiz = aData;   
        $state.transitionTo('user_register');  
    }

  
    $scope.register = function(isValid) {
        if (isValid) {
            $scope.disableRegisterBtn = true;
            if ($rootScope.quiz == undefined) {           
                $state.transitionTo('start');
                return false;
            } else {
                var _data = {};
                var jsonData = {};
                jsonData.User = $scope.User;
                jsonData.Question =  $rootScope.quiz;//localStorageService.get('quiz');
                _data.JSON = JSON.stringify(jsonData);
                Users.register(_data).success(function (response) {         
                    if(response.status == 'failure') {
                        $scope.resMessage = "<span class='errorMsg'>"+response.message+"</span>";
                    } else {
                        $scope.resMessage = "<span class='successMsg'>Thank you. We will contact you by phone or email soon.</span>";
                        alert("Thank you. We will contact you by phone or email soon.");
                        //$scope.disableRegisterBtn = false;
                        $location.path('/#');
                    }           
                }).error(function (error) {
                    Main.popupCommonFunction('apiError');
                });
            } 
        }
    }

    $scope.login = function(isValid) {
        
        if (isValid) {          
            var _data = {};
            var jsonData = {};
            jsonData.User = $scope.User;
            _data.JSON = JSON.stringify(jsonData);
            Users.login(_data).success(function (response) {        
                if(response.status == 'failure') {
                    $scope.resMessage = response.message;
                } else {
                    localStorageService.set('loggedInUser', response.data);
                    var loggedInUser = localStorageService.get('loggedInUser'); 
                    $state.transitionTo('account')
                }
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            });
        }
    }

    $scope.saveProfilePic = function(isValid) {
        if (isValid) {
            var _data = {};
            var jsonData = {};
            var imgData = {};
            if ($scope.profile_pic != undefined && $scope.profile_pic_type != undefined) {
                imgData.profile_pic = "data:"+$scope.profile_pic_type.concat(";base64,", $scope.profile_pic);
            }
            jsonData.User = imgData;
            jsonData.User.user_id = localStorageService.get('loggedInUser').id;
            _data.JSON = JSON.stringify(jsonData);      
            Users.saveProfilePic(_data).success(function (response) {
                var d= new Date();      
                $rootScope.profile_pic = response.data.profile_pic+"?"+d.getTime();       
                localStorageService.set('profile_pic_updated', response.data.profile_pic+"?"+d.getTime());    
                if(response.status == 'failure') {
                    $scope.resMessage = "<span class='errorMsg'>"+response.message+"</span>";
                } else {
                    $scope.resMessage = "<span class='successMsg'>Profile Pic has been updated successfully.</span>";
                }         
                $timeout(function () { $scope.resMessage = ""; }, 3000);
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            });
        }
    }

    $scope.saveProfileData = function(isValid) {
        if (isValid) {
            var _data = {};
            var jsonData = {};
            jsonData.User = $scope.User;
            _data.JSON = JSON.stringify(jsonData);
            Users.saveProfileData(_data).success(function (response) {         
                if(response.status == 'failure') 
                {
                    $scope.profileResMessage = "<span class='errorMsg'>"+response.message+"</span>";
                } 
                else 
                {
                    $scope.profileResMessage = "<span class='successMsg'>Profile data has been updated successfully.</span>";
                }
                $timeout(function () { $scope.profileResMessage = ""; }, 3000);   // Hide message after 5 seconds.
                // Update User data in local storage 
                localStorageService.set('loggedInUser', response.data);
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            });
        }
    }

    $scope.updateEmail = function(isValid) {
        if (isValid) {
            var _data = {};
            var jsonData = {};
            jsonData.User = $scope.User;
            jsonData.User.user_id =$rootScope.User.id;
            _data.JSON = JSON.stringify(jsonData);    
            Users.updateEmail(_data).success(function (response) {         
                if(response.status == 'failure') 
                {
                    $scope.emailResMessage = "<span class='errorMsg'>"+response.message+"</span>";
                } 
                else 
                {
                    $scope.emailResMessage = "<span class='successMsg'>Email has been updated successfully.</span>";
                }
                $timeout(function () { $scope.emailResMessage = ""; }, 3000);   // Hide message after 5 seconds.
                // Update User data in local storage 
                localStorageService.set('loggedInUser', response.data);
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            });
        }
    }

    $scope.toggleEmailDiv = function() {
       $scope.IsEmailDivHidden = $scope.IsEmailDivHidden ? false : true;
    };

    $scope.handleProfilePicUpload = function (ele) {    
        var files = ele.files;
        var file = files[0];
        var l = files.length;
        var namesArr = [];
        if (files && file) {
          var reader = new FileReader();
        }
        reader.onload = function(readerEvt) {
            var binaryString = readerEvt.target.result;
            $scope.profile_pic = btoa(binaryString);
            $scope.profile_pic_type = files[0].type;
        };
        reader.readAsBinaryString(file);
    }
    
    $scope.getStarted_comparison = function(){
        $state.go('anon.comparison');
    }

});