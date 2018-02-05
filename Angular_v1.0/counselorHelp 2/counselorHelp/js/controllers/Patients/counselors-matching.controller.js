/**
 * @Method :     Counselors Controller
 * @Purpose:     Controller for Counselors matching
 */

as.controller('CounselorsMatchingController', function($rootScope, $scope, $document, $timeout, $state, Pages, specialities, Main, localStorageService, Patients) {
    var docHeight = window.innerHeight; 
    $('.counselor-matching .content-section').css('minHeight', docHeight - 150-50 );
    $(window).resize(function(){
        var docHeight = window.innerHeight;
        $('.counselor-matching .content-section').css('minHeight', docHeight - 150-50 );        
    })

    $rootScope.noHeader = true;
    $rootScope.noFooter = false;
    $rootScope.footerShow = false;
    $scope.show_progress = false;
    $scope.section1_show = false;
    $scope.section2_show = false;
    $scope.section3_show = false;
    $scope.section4_show = false;

    $scope.matching_dataModel = {
        gender:"",
        ageRange:""
    };
    

    $scope.matchingSavedData = function() {

        if(angular.fromJson(localStorageService.get('authData')) && specialities.data.status == 'success') {
            
            localStorageService.set('isCounselorMatchingState', 'true');
            $scope.aPatientProblems = specialities.data.data;
            $scope.matching_dataModel.patient_problem = $scope.aPatientProblems[0].id;
            Patients.getPreviousMatchingData(angular.fromJson(localStorageService.get('authData')).user_id).success(function (response){

                if(response.status == 'success') {
                    $scope.section1_show = true;
                    $scope.section2_show = true;
                    $scope.section3_show = true; 
                    $scope.section4_show = true;
                    $scope.matching_dataModel = {
                        gender:response.data.filter_data.gender,
                        ageRange:response.data.filter_data.ageRange,
                        patient_problem:response.data.filter_data.patient_problem
                    };

                    $scope.isPrevActiveGender = $scope.matching_dataModel.gender;
                    $scope.isPrevActiveAgeRange = $scope.matching_dataModel.ageRange;

                    localStorageService.set('userMatching', 'true');
                    localStorageService.set('userType', 'P');
                    localStorageService.set('user_registered', 'true');
                    $scope.counselorsMatching = 'true';
                    $scope.aFilteredCounselors = response.data.counselors_data;
                } else {
                    $scope.counselorsMatching = 'false';
                }
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            }); 
        } else {
            $state.transitionTo('anon', { reload: true, inherit: false, notify: true });
        }
    }

    

    $scope.start_matching = function() {

        $scope.section1_show = true;
        $scope.scrollElement(1, 0);        
    }

    $scope.nextStep_matching = function() {

        $scope.show_progress = true;
        $scope.section2_show = true;
        $scope.scrollElement(2, 30)         
    }

    $scope.choose_psychotherapist = function(type) {
                            
        $scope.matching_dataModel.gender = type;
        $scope.isPrevActiveGender = '';
        $scope.section3_show = true;    
        if (type === $scope.selected) {
            $scope.selected = $scope.selected;
        } else {          
            $scope.selected = type;                  
        }

        $scope.scrollElement(3, 60) 
    }
    
    $scope.Pschyotherapist_age = function(age) {

        $scope.matching_dataModel.ageRange = age; 
        $scope.isPrevActiveAgeRange = '';
        $scope.section4_show = true; 

        if (age === $scope.selectedAge) {
            $scope.selected = $scope.selected;
        } else {          
            $scope.selectedAge = age;                        
        } 

        $scope.scrollElement(4, 100)
        $scope.getCounselorsList();     
    }

    $scope.scrollElement = function(id, data) {

        $timeout(function (){
            var someElement = angular.element(document.getElementById('section'+id));
            $document.scrollToElementAnimated(someElement);
            $scope.progress = data;
        },600)
    }

    $scope.getCounselorsList = function() {

        $scope.matching_dataModel.userId = angular.fromJson(localStorageService.get('authData')).user_id;        
        Pages.FilteredCounselors($scope.matching_dataModel).success(function (response) {
            if(response.status == 'success') {                
                localStorageService.set('userType', 'P');
                localStorageService.set('user_registered', 'true');
                localStorageService.set('userMatching', 'true');
                $scope.counselorsMatching = 'true';
                $scope.aFilteredCounselors = response.data;
            } else {
                $scope.counselorsMatching = 'false';
                Main.popupCommonFunction('noFilterCounselor');
            }
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        }); 
    }

    $scope.counselorList = function() {
        localStorageService.set('user_registered', 'true');
        localStorageService.set('userMatching', 'true');
        $state.go('anon.counselor-directory');
    }

    $scope.selectCounselor = function(data) {

        localStorageService.set('counselorId', data);
        Main.popupCommonFunction('matchingConfirmation');       
    }


    $scope.isActive = function(item, section) {

        switch (section) {
            case 'section2':
                return $scope.selected === item;
            break;

            case 'section3':
                return $scope.selectedAge === item;
            break;
        }      
    };

    $rootScope.success = function() {

        $('#commonPopup').modal('hide');
        $("#blurDiv").removeClass("blur-effect");             
        localStorageService.set('stateName','anon.counselor-matching');
        localStorageService.set('isCounselorSelected', true);
        // localStorageService.remove('isCounselorMatchingState');  
        $state.go('anon.plan-price-info');      
    }

    $rootScope.saveMatchingEmail = function(isValid, email) {

        if(isValid) {

            var _data = {};
            _data.email = email;
            _data.gender = $scope.matching_dataModel.gender;
            _data.ageRange = $scope.matching_dataModel.ageRange;            
            angular.forEach($scope.aPatientProblems, function(data) {
                if($scope.matching_dataModel.patient_problem == data.id) {
                    _data.patient_problem = data.title;
                }
            });

            Patients.sendEmailToAdmin(_data).success(function (response){
                if(response.status == 'success') {
                    $('#commonPopup').modal('hide');
                    $("#blurDiv").removeClass("blur-effect");
                } 
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            });            
        }
    }  

    $scope.couselorProfileData = function(profileData) {        
        localStorageService.set('profileData', profileData);
    }  
});