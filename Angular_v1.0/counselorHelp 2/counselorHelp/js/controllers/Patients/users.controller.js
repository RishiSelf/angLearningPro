angular.module('myApp.controllers', []);

as.controller('AppCtrl', function($scope, $rootScope, $http, $location) {
    $scope.activeWhen = function(value) {
        return value ? 'active' : '';
    };

    $scope.path = function() {
        return $location.url();
    };

    $scope.logout = function() {
        $rootScope.user = null;
        $scope.username = $scope.password = null;
        $scope.$emit('event:logoutRequest');
        $location.url('/');
    };

    $rootScope.appUrl = "http://localhost/cakephp_angular_sample/";
});

as.controller('PostListCtrl', function($scope, $rootScope, $http, $location) {
        var load = function() {

            $http.get($rootScope.appUrl + '/posts.json')
                    .success(function(data, status, headers, config) {
                        $scope.posts = data.posts;
                        angular.copy($scope.posts, $scope.copy);
                    });
        }

        load();

        $scope.addPost = function() {
            $location.path("/new-post");
        }

        $scope.editPost = function(index) {
            $location.path('/edit-post/' + $scope.posts[index].Post.id);
        }

        $scope.delPost = function(index) {
            var todel = $scope.posts[index];
            $http
                    .delete($rootScope.appUrl + '/posts/' + todel.Post.id + '.json')
                    .success(function(data, status, headers, config) {
                        load();
                    }).error(function(data, status, headers, config) {
            });
        }

});

as.controller('NewPostCtrl', function($scope, $rootScope, $http, $location) {
$scope.post = {};
$scope.savePost = function() {  
    var _data = {};
    _data.Post = $scope.post;
    $http
        .post($rootScope.appUrl + '/posts.json', _data)
        .success(function(data, status, headers, config) {
        $location.path('/posts');
        }).error(function(data, status, headers, config) {
    });
}
});

as.controller('EditPostCtrl', function($scope, $rootScope, $http, $routeParams, $location) {

var load = function() {
    $http.get($rootScope.appUrl + '/posts/' + $routeParams['id'] + '.json')
        .success(function(data, status, headers, config) {
        $scope.post = data.post.Post;
        angular.copy($scope.post, $scope.copy);
        });
}

load();
$scope.post = {};
$scope.updatePost = function() {
    var _data = {};
    _data.Post = $scope.post;
    $http
        .put($rootScope.appUrl + '/posts/' + $scope.post.id + '.json', _data)
        .success(function(data, status, headers, config) {
        $location.path('/posts');
        }).error(function(data, status, headers, config) {
    });
}
});
