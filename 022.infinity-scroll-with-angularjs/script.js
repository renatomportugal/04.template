var scroll=angular.module("scroll",[]);

scroll.controller("Main",function($scope){
   $scope.items = [];
    
    var counter = 0;
    $scope.loadMore = function() {
        for (var i = 0; i < 5; i++) {
          /*if(counter>1000){
            If you wanna stop scroll at some moment
              return false;
            }*/
            $scope.items.push({id: counter});
            counter += 10;
        }
    };
    
    $scope.loadMore();
});

scroll.directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
        
        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});