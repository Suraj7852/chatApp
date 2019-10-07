app.service('resetService',function($http,$state){
    this.reset = function(inputData,token) {
        console.log('data',inputData);
        
        $http({
            method: 'POST',
            url: 'http://localhost:3000/reset',
            headers: {
                'token' : token
            },
            data: inputData
        }).then( function(sucess){
            $state.go('login')
            console.log('api',sucess);
        }, function(err){
            console.log('api',err);
        })
    }
})