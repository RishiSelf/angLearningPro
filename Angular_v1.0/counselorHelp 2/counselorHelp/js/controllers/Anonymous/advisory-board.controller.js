/**
 * @Method :     Advisory Controller
 * @Purpose:     Controller for Advisory board
 */

as.controller('advisoryCtrl', function ($scope, Pages, $rootScope, Main) {

    Pages.getAdvisors().success(function (response) {
        $scope.aArticles = response.data;    // Articles data of a page        
        $scope.test = {};
        $scope.test.tRecs = response.data.length;     // Total articles count
        $scope.test.sColRecs = 3;                       // Max. articles in a column
        $scope.singlePageRecs = $scope.test.sColRecs * 3;
        $scope.test.totalCols = Math.ceil($scope.test.tRecs / $scope.test.sColRecs);       // Columns     
        $scope.range = [];  

        for (var i = 0; i < $scope.test.totalCols; i++) {
            var tmp = {};
            tmp.start = $scope.test.sColRecs * i;
            tmp.end = $scope.test.sColRecs + tmp.start;
            var records = {};

            for (var j = tmp.start; j < tmp.end; j++) {
                if (j > ($scope.test.tRecs - 1)) {
                    break;
                }
                records[j] = $scope.aArticles[j];
            }
            
            tmp.records = records;
            $scope.range.push(tmp);
        }
    }).error(function (error) {
        Main.popupCommonFunction('apiError');
    });

    $scope.toggleAbout = function (obj) {
        
        sClass = obj.target.attributes.class.value;
        fieldId = obj.target.attributes.id.value;

        if (sClass == "icon icon-close") {
            $("#" + fieldId).parents('.abt-landing-row  .abt-member-section').animate({height: '610px'});
            $("#" + fieldId).parents('.advisory-board-frame .abt-member-section').animate({height: '400px'});
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