angular.module('myApp.msgsCtrl', []);

    as.controller('msgsCtrl', function($scope, $rootScope, $http, $location, hexafy, CONSTANTS) {

        // console.log("Msg load");
        var loadMsg = function() {

            var _data = {};
            _data.User =  $rootScope.currentUser;           
            $http.get(CONSTANTS.Base_Url + '/users/messagesList/'+$rootScope.userId + '.json')
           //$http.post(CONSTANTS.Base_Url + '/users/messagesList/', _data)
                    .success(function(data, status, headers, config) {                        
                        $scope.messages = data.messages;
                        $scope.users = data.users;
                        $scope.hex = hexafy.myFunc(255);    
                        //angular.copy($scope.messages, $scope.copy);
                    });
        }

        loadMsg();

        $scope.addMessage = function() {
            // console.log('call newMessage');
            $location.path("/new-msg");
        }

        $scope.delMessage = function(index) {
            // console.log('call delUser'+index);
         
            $http
                    .delete(CONSTANTS.Base_Url + '/users/deleteMessage/' + index + '.json')
                    .success(function(data, status, headers, config) {
                        loadMsg();
                    }).error(function(data, status, headers, config) {
            });
        }

        $scope.saveMessage = function() {
            // console.log('call saveMessage');         
            var _data = {};
            _data.Message = $scope.message;
            _data.Message.sender_id = $rootScope.userId;
            $http
                .post(CONSTANTS.Base_Url + '/users/sendMessage.json', _data)
                .success(function(data, status, headers, config) {
                $location.path('/msgs');
                }).error(function(data, status, headers, config) {
            });
        }
           

    });