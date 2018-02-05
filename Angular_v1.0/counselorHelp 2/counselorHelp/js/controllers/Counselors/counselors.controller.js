/**
 * @Method :     Counselors Controller
 * @Purpose:     Controller for Counselors
 */

as.controller('CounselorsController', function($scope, $rootScope, $stateParams, Counselors, $sce, $anchorScroll, Main, localStorageService, $state) {

    $rootScope.userId = $stateParams.id;
    $scope.ifCounselorList = true;

    $scope.getCounselors = function() {   
        Counselors.getCounselors().success(function (response) {
            if(response.status == 'success') {
                $scope.aCounselors = response.data;      
                $('.icon-ok').tooltip({title: "<div class='dir-tooltip-content'><h2 class='title-text'>Verifierad psykoterapeut</h2> <p class='para'>MinTerapi.se har verifierat denna psykoterapeuts kvalifikationer, legitimering och patientf&ouml;rs&auml;kring.</p></div>", html: true, placement: "top"});
                $('.message').tooltip({title: "<div class='dir-tooltip-content'><p class='para'>Denna psykoterapeut erbjuder meddelandesessioner.</p></div>", html: true, placement: "top"});
                $('.microphone').tooltip({title: "<div class='dir-tooltip-content'><p class='para'>Denna psykoterapeut erbjuder telefonsessioner.</p></div>", html: true, placement: "top"}); 
                $scope.isWorkWithMe();                
            } else {
                $scope.ifCounselorList = false;
                $scope.errorMessage = "Inga psykoterapeuter kunde hittas.";
            }       
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }

    $scope.isCounselorAssign = function() {
        if(localStorageService.get('authData')) {
            Main.getCounselor(angular.fromJson(localStorageService.get('authData')).user_id).success(function (response) {           
                if(response.status == 'success') {
                    $scope.disableCounselor = true;             
                } else {
                    $scope.disableCounselor = false;
                }                                   
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            });      
        } else {
            $scope.disableCounselor = true;
        } 
    }

    $scope.selectCounselor = function(data, type) { 
        if(type == 'directory') {
            $scope.data = data;
        } else {
            $scope.data = localStorageService.get('profileData');
        }       
        localStorageService.set('userType', 'P');
        localStorageService.set('userMatching', 'true');
        localStorageService.set('user_registered', 'true');   
        localStorageService.set('counselorId', $scope.data);
        Main.popupCommonFunction('matchingConfirmation');       
    }

    $rootScope.success = function() {

        $('#commonPopup').modal('hide');
        $("#blurDiv").removeClass("blur-effect"); 
        localStorageService.set('isCounselorSelected', true);       
        localStorageService.set('stateName','anon.counselor-matching');
        // localStorageService.remove('isCounselorMatchingState');  
        $state.go('anon.plan-price-info');      
    }

    $scope.$on('profile_pic_data', function (event, data) {
        $scope.counselor_detail.profile_pic = data;
    });


    $scope.getCounselorPersonalProfile = function() {  

        Counselors.getCounselorPersonalProfile($rootScope.userId).success(function (response) {
            $scope.counselorSpecs = [];
            if(response.status == 'success'){
                $scope.oCounselorDetail = response.data;
                angular.forEach($scope.oCounselorDetail.Testimonial, function(testimonial) {
                    testimonial.description_show = testimonial.description.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    testimonial.description_show = $sce.trustAsHtml(testimonial.description_show);
                });

                angular.forEach(response.data.CounselorDetail.CounselorSpeciality, function(specs) {
                    angular.forEach($scope.oCounselorDetail.specialities, function(specsList) {
                        if(specs.speciality_id === specsList.id) {
                            $scope.counselorSpecs.push({'id':specsList.id,'title':specsList.title});
                        }
                    }); 
                });
                $scope.isWorkWithMe(); 
            }
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }



    $scope.isWorkWithMe = function() { 
        if((!localStorageService.get('isCounselorMatchingState')) || (localStorageService.get('userType') == 'C')) {
            $scope.disableCounselor = true;
        } else {
            $scope.isCounselorAssign();
        }
    }

    $scope.navigation = function(id, e) {
       Main.scrollTo(id, e)
    }

    $scope.couselorProfileData = function(profileData) {        
        localStorageService.set('profileData', profileData);
    }
});