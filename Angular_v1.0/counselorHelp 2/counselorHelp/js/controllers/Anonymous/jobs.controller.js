/**
 * @Method :     jobs Controller
 * @Purpose:     Controller for Jobs
 */


as.controller('jobsCtrl', function ($scope, $stateParams, $rootScope, $location, Pages, Main) {
    
    $scope.custom = true;
    $scope.customClass = "icon-showHide";
    $scope.data = {};
    
    $scope.getJobCategories = function () {

        Pages.getJobCategories().success(function (response) {
            $scope.aData = response.data;
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }

    $scope.getJobPositionDetail = function () {

        Pages.getJobPositionDetail($stateParams.id).success(function (response) {
            $scope.aPositionDetail = response.data;
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }

    $scope.getJobApplyFrm = function () {
        
        Pages.getJobApplyFrm($stateParams.id).success(function (response) {
            $scope.aData = response.data;
        }).error(function (error) {
            Main.popupCommonFunction('apiError');
        });
    }

    $scope.saveJobData = function (isValid, obj) {

        var _data = {};
        var jsonData = {};
        jsonData.positionId = $stateParams.id;
        jsonData.jobInfo = obj;
        _data.jobData = JSON.stringify(jsonData);

        if ($scope.image != undefined && $scope.imageType != undefined) {
            _data.photo = "data:" + $scope.imageType.concat(";base64,", $scope.image);
        }

        if ($scope.resume != undefined && $scope.resumeType != undefined) {
            _data.resume = "data:" + $scope.resumeType.concat(";base64,", $scope.resume);
        }

        if (isValid) {
            Pages.saveJobFrm(_data).success(function (response) {
                $location.path('/jobs');
                Main.popupCommonFunction('jobApply');
            }).error(function (error) {
                Main.popupCommonFunction('apiError');
            });
        }
    }


    $scope.handleFileSelect = function (ele) {

        var files = ele.files;
        var file = files[0];
        var l = files.length;
        var namesArr = [];

        if (files && file) {
            var reader = new FileReader();
        }
        reader.onload = function (readerEvt) {
            var binaryString = readerEvt.target.result;
            if (ele.name == 'Bifogabild') {
                $scope.image = btoa(binaryString);
                $scope.imageType = files[0].type;
            } else {
                $scope.resume = btoa(binaryString);
                $scope.resumeType = files[0].type;
            }
        };
        reader.readAsBinaryString(file);
    }

    $scope.toggleJobDetail = function () {

        $scope.customClass = $scope.customClass === "icon-showHide" ? "icon-showHide active" : "icon-showHide";
        if ($scope.customClass === "icon-showHide active") {
            $('.content-section').show(500);
        } else {
            $('.content-section').hide(500);
        }
    }

    $scope.scrollTo = function (id, $event) {
        Main.scrollTo(id, $event);
    };
});