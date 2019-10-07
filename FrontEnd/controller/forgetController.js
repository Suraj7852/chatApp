app.controller("forgetController", function($scope,forgetService){
    $scope.forgetUser = function(){
        let data = {}
        data.email = $scope.email;
        console.log("forget", data);
        forgetService.forget(data);
    }
})