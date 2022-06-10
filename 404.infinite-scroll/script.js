'use strict';

var App = angular.module('PagingApp', ['services.SharedServices']);

App.controller('ScrollCtrl', ['$scope','$filter', 'TypekitService', function($scope, $filter, Typekit){        
    $scope.families = [];
    $scope.status_bar = "";
    
    var page = 1;
    var per_page = 10;
    $scope.loadMore = function() {        
        for (var i = 0; i < 1; i++) {
            Typekit.getTypekits(page, per_page).then(function(res){
                $scope.families = $scope.families.concat(res.data.library.families);
                $scope.status_bar = "Showing " + ($scope.families.length === 0 ? "0" : "1") + " to " + $filter('number')($scope.families.length) + " of " + $filter('number')(res.data.library.pagination.count) + " entries";                
            });                                         
            page +=1;
        }
                
    };
    
    $scope.loadMore();
}]);

App.factory('TypekitService',['$http',function($http){
    return {
        getTypekits : function(page, per_page){
            return $http.jsonp('https://typekit.com/api/v1/json/libraries/full?page='+page+'&per_page='+per_page+'&callback=JSON_CALLBACK');
        }
    }
}]);

App.directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
        
        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});

/** Ajax Spinner **/
angular.module('services.SharedServices', []).config(function($httpProvider) {
	$httpProvider.responseInterceptors.push('myHttpInterceptor');
	var spinnerFunction = function(data, headersGetter) {
			$("#loading").show();
			return data;
		};
	$httpProvider.defaults.transformRequest.push(spinnerFunction);
}).factory('myHttpInterceptor', function($q, $window) {
	return function(promise) {
		return promise.then(function(response) {
			$("#loading").hide();
			return response;
		}, function(response) {
			$("#loading").hide();
			return $q.reject(response);
		});
	};
})

/** Ajax Spinner **/