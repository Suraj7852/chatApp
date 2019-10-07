app.controller("registerController", function($scope, registerService){
    $scope.registerUser = function() {
        let data = {}
        data.email=$scope.email;
        data.firstName = $scope.firstName;
        data.lastName = $scope.lastName;
        data.password = $scope.password;
        console.log("Scope", data);
        registerService.register(data);
    }
})