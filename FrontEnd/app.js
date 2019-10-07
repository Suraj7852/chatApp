let app = angular.module('app', ['ui.router','btford.socket-io']);

app.config( function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
 
    $stateProvider
    .state('register', {
        url: '/register',
        templateUrl: 'template/register.html',
        controller: 'registerController'
    })


   .state('login', {
        url: '/login',
        templateUrl: 'template/login.html',
        controller: 'loginController'
    })

    
   .state('forgetPassword', {
        url: '/forget',
        templateUrl: 'template/forget.html',
        controller: 'forgetController'

    })

    .state('reset', {
        url: '/reset/:token',
        templateUrl: 'template/reset.html',
        controller: 'resetController'
    })

    .state('dashboard', {
        url: '/dashboard',
        templateUrl: './template/dashboard.html',
        controller:'usersController'

    })
    

});

app.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:3000')
    });
}]);