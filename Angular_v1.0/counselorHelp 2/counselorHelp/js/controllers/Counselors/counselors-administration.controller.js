/**
 * @Method :     Counselors Controller
 * @Purpose:     Controller for Counselors Contact info (Administration)
 */

as.controller('counselorAdministrationController', function($rootScope, $scope, Patients, localStorageService, Main) {

    $scope.ifEmailExist = false;
    $scope.whenchecked  = false;
    $scope.counselorContactInfo = {};

    $scope.stateChange();

    $scope.$on('counselor_data', function (event, data) {
        $scope.counselorPayment = data.CounselorDetail.CounselorPayment;
    });
    $('.radio-btn.ng-pristine.ng-invalid.ng-invalid-required.ng-touched').parents('.radio-field.bankgiro-radio').addClass('red');

    $('.bank-option-radio .radio-field .radio-btn').click(function(){
        if($(this).is(':checked')) {
            var radioFieldDataId = $(this).attr('data-id');
            $('.radio-textbox').hide();
            $('.radio-textbox.' + radioFieldDataId ).show();
            $scope.whenchecked = true;           
        } else {
            $('.radio-textbox').hide();
        }        
    })

    if(angular.fromJson(localStorageService.get('authData'))) {
        Patients.registration(angular.fromJson(localStorageService.get('authData')).user_id, 'counselorAdmin').success(function (response){
            if(response.data.Counselor.tax_approve == '1'){
                response.data.Counselor.tax_approve = 1;
            } else {
                response.data.Counselor.tax_approve = 0;
            }

            if(response.status == 'success') {
                $scope.counselorContactInfo ={
                    first_name: response.data.User.firstname,
                    last_name: response.data.User.lastname,
                    address: response.data.User.street_address,
                    zipcode: response.data.User.zipcode,
                    place: response.data.User.place,
                    telephone_no: response.data.User.telephone_no,
                    email: response.data.User.email,
                    company_name: response.data.Counselor.company_name,
                    organization_number: response.data.Counselor.organization_number,
                    mailing_address: response.data.Counselor.mailing_address,
                    counselor_co_zipcode: response.data.Counselor.counselor_co_zipcode,
                    counselor_co_place: response.data.Counselor.counselor_co_place,
                    bank_type: response.data.Counselor.bank_type,
                    bank_type_text: response.data.Counselor.bank_type_text,
                    vat_number: response.data.Counselor.vat_number,
                    tax_approve: response.data.Counselor.tax_approve
                }
            } 
            if($scope.counselorContactInfo.bank_type == 'BG' || $scope.counselorContactInfo.bank_type == 'PG') {
                $scope.BankTypeText();
            } 
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        }); 
    }

    $scope.BankTypeText = function() {

        var radioFieldDataId = $("input[value='"+$scope.counselorContactInfo.bank_type+"']").attr('data-id');
        $('.radio-textbox').hide();
        $('.radio-textbox.' + radioFieldDataId ).show();
        $scope.whenchecked = true; 
    }

    $scope.counselorAdmin = function (isValid) {
        if (isValid) {
            var _data = {};
            _data = $scope.counselorContactInfo;
            _data.userType = 'Counselor';
            _data.userId = angular.fromJson(localStorageService.get('authData')).user_id;
            console.log(JSON.stringify(_data))
            Patients.registration(_data, 'submit').success(function (response) {
                if(response.status == 'success') {
                    Main.popupCommonFunction('CounselorAdminInfo');
                }             
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            });
        }
    }
})