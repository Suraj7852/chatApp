app.controller("resetController", function($scope, $stateParams, resetService){
    $scope.id = $stateParams.token;
    $scope.resetUser = function(){
        let data={}
        data.password = $scope.password;
        console.log("reset", data);
        resetService.reset(data, $scope.id);
        
    }
})