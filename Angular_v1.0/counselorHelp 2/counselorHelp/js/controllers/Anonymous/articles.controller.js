/**
 * @Method :     articles Controller
 * @Purpose:     Controller for articles
 */

as.controller('mediaCtrl', function ($scope, Pages, Main) {

    $scope.isNoRecord = false;
    var load = function (pagenum) {

        Pages.getArticles(pagenum).success(function (response) {
            if(response.status == 'success') {
                $scope.aArticles = response.data.articles;      // Articles data of a page        
                $scope.test = {};
                $scope.tRecords = response.data.totalArticles;    // Total articles count       
                $scope.test.tRecs = $scope.aArticles.length;     // Current page articles count
                $scope.test.sColRecs = 4;                       // Max. articles in a column
                $scope.singlePageRecs = $scope.test.sColRecs * 3;
                $scope.test.totalCols = Math.ceil($scope.test.tRecs / $scope.test.sColRecs);   // Columns     
                $scope.range = [];
                
                if ($scope.test.tRecs <= $scope.test.sColRecs) {

                    $sClass = "col-lg-8 article-col";
                }
                if (($scope.test.tRecs > $scope.test.sColRecs) && ($scope.test.tRecs <= $scope.test.sColRecs * 2)) {

                    $sClass = "col-lg-6 article-col";
                }
                if (($scope.test.tRecs > $scope.test.sColRecs * 2)) {

                    $sClass = "col-lg-4 article-col";
                }
                $scope.sClass = $sClass;

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
            } else {
                $scope.isNoRecord = true;

            }
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }
    load(0);
    
    $scope.pageChanged = function (pageNum) {
        load(pageNum - 1);
    }
});
