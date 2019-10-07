app.service("registerService", function($http){
    this.register = function(inputData) {
        console.log("data",inputData);
        $http({
            method: 'POST',
            url: 'http://localhost:3000/register',
            data: inputData
        }).then(function (sucess){
            console.log('api',sucess);
        }, function(err){
            console.log('api',err);
            
        })
    }
})