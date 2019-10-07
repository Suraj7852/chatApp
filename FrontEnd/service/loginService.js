// var popup = require('popups');
app.service('loginService', function ($http,$location) {

    this.login = function (inputData) {
        console.log('login',inputData);
        
        $http({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: inputData
        }).then(function (success) {
            ('login successfully');
            console.log("data after api call", success);
            $location.path('/dashboard')
        }, function (error) {
            alert('Check email or password');
            console.log("api call", error);
        })
    }
});