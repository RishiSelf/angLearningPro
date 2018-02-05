var UsersService = angular.module('UsersService', []);

UsersService.service('Users', function ($rootScope, $http, $location, CONSTANTS) {


    this.square = function (a) {
        return a * a
    };

    this.register = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'register', data);
    }

    this.login = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'login', data);
    }

    this.getCountryList = function () {
        return $http.get(CONSTANTS.Base_Url + 'getCountryList');
    }

    this.saveProfilePic = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'saveProfilePic', data);
    }

    this.saveProfileData = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'saveProfileData', data);
    }

    this.updateEmail = function (data) {
        return $http.post(CONSTANTS.Base_Url + 'changeEmail', data);
    }

    this.checkUniqueValue = function (id, property, value) {
        var data = {
            email: value
        };
        var _data = {};
        var jsonData = {};
        jsonData.User = data;
        _data.JSON = JSON.stringify(jsonData);

        return $http.post(CONSTANTS.Base_Url + 'checkEmailExists', _data).then(function (response) {
            if (response.data.status == 'failure') {
                return false;
            } else {
                return true;
            }
        });
    }

    this.getUserProfileData = function (iUserId) {
        return $http.get(CONSTANTS.Base_Url + 'getUserProfileData/' + iUserId);
    }
});
