app.service('UserService', function($http){
    this.getdata = function(dataobj,callback) {
       $http({
           method: 'GET',
           url: 'http://localhost:3000/dashboard'
       }).then(function(sucess){
           console.log('api',sucess);
           callback(null,sucess.data.result)
       },function(err){
           callback(err, null);
           console.log('api',err);
       })
    }
})

// app.service('UserService', function($http,$location,$state){
//     this.getdata = function(data,$scope) {
//        $http({
//            method: 'POST',
//            url: 'http://localhost:3000/dashboard',
//            data: data
//        }).then(function(responceResult){
//            if(responceResult.data.sucess==true){
//                $scope.allusers = responceResult.data.result;
//                $scope.currentUser = localStorage.getItem('senderName');
//            }else{
//                $location('/login');
//            }
//        })
//     }
// })