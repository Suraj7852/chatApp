app.service('forgetService', function($http) {
    this.forget = function(inputData) {
        console.log("data",inputData);
        
        $http({
            method: 'POST',
            url: 'http://localhost:3000/forget',
            data: inputData
        }).then(function(sucess){
            console.log("api",sucess);
        }, function(err){
            console.log("api",err);
        })
    }
})