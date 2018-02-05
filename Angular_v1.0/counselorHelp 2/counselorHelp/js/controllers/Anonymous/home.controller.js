/**
 * @Method :     Home Controller
 * @Purpose:     Controller for Landing page
 */

as.controller('homesCtrl', function (localStorageService, $timeout, $scope, Patients, $rootScope, Main, $state) {

    $scope.timeoutValue = 5000;
    $scope.formData = {};
    $scope.form ={};
    
    var TimeOut_Thread = $timeout(function(){
        if(!localStorageService.get('logout')) {
            Main.popupCommonFunction('landingPopup');   
        }     
    } , $scope.timeoutValue);

    $(document).on('click', function(e){
        localStorageService.remove('logout');
        $timeout.cancel(TimeOut_Thread);       
    })

    $(document).mousemove(function(event){
        localStorageService.remove('logout');
        $timeout.cancel(TimeOut_Thread); 
    })

    if($state.current.name == 'anon'){
        Main.getSetting();
    }

    $scope.saveEmail = function(isValid){

        if (isValid) {
            var _data = {};
            _data.email = $scope.formData.email;
            _data.emailType = 'home';
            
            Patients.sendEmail(_data).success(function (response) { // Service in patients.service.js
                if(response.status == 'success') {                    
                    $scope.formData = {}; 
                    $scope.form.landingPageFrm.$setPristine(); 
                    $scope.form.landingPageFrm.$setUntouched();                   
                    setTimeout(Main.popupCommonFunction('comingSoon'), 1000);
                }    
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            });
        }
    }

    $scope.appComingSoon = function() {
        Main.popupCommonFunction('appComingSoon'); 
    }

    $scope.pricePageAsPerUser = function() {
        $state.go('anon.plan-price-info');
    }
});