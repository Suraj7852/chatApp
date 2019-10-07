app.controller("usersController", function($scope, UserService){
    UserService.getdata($scope,(err,data) =>{
        if(err)
            console.log("not found");
        else
            $scope.data = data;
    })
})

// app.controller("usersController", function($scope, UserService, SocketServices){
//     $scope.result = true;
//     $scope.loginUser = localStorage.getItem('senderName')
//     $scope.senderId = localStorage.getItem('senderId')

//     $scope.allusers=[];
//     $scope.allusers = UserService.getdata($scope, (err,data) =>{
//         if(err)
//             console.log("not found");
//         else
//             $scope.data = data;
//         })
    
    

//     $scope.receiver = function(data){
//         localStorage.setItem("userId",data._id)
//         localStorage.setItem("userName",data.firstName)

//         $scope.userId = data._id;
//         $scope.userName = data.firstName;
//     }

//     $scope.sendMessage = function() {
//         var sentObject={
//             "senderId": localStorage.getItem('senderId'),
//             "senderName": localStorage.getItem('senderName'),
//             "userId": localStorage.getItem('userId'),
//             "userName": localStorage.getItem('userName'),
//             "message":$scope.message
//         }
//         SocketServices.emit("messageContainer",sentObject);
//     }


// })