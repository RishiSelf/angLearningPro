/**
 * @Method :     about Controller
 * @Purpose:     Controller for about product
 */

as.controller('aboutController', function ($scope) {

    $scope.toggleAbout = function (obj) {
        
        sClass = obj.target.attributes.class.value;
        fieldId = obj.target.attributes.id.value;

        if (sClass == "icon icon-close") {            
            $("#" + fieldId).parents('.abt-member-section').animate({height: 'auto'});
            $("#" + fieldId).parents('.abt-member-section').removeClass('active');
            $("#" + fieldId).removeClass('icon-close');
            $("#" + fieldId).addClass('icon-open');
        } else {
            $("#" + fieldId).parents('.abt-member-section').animate({height: 'auto'});
            $("#" + fieldId).parents('.abt-member-section').addClass('active');
            $("#" + fieldId).removeClass('icon-open');
            $("#" + fieldId).addClass('icon-close');
        }
    }
});