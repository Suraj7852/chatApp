app.controller("loginController", function($scope, loginService){

    $scope.loginUser = function(){
        var data = {}
        data.email = $scope.email;
        data.password =  $scope.password;
        console.log("Printing scope",data);
        loginService.login(data)
    }
})