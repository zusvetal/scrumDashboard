angular.module('DashBoard')
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('tokenInterceptor');
    })
    .run(function ($rootScope, $location, authenticationService, userService) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            if (toState.url === '/logout') {
                console.log(userService)
                userService.logOut();
                $location.path('/login');
            }
            console.log(authenticationService);
            if (toState.requiredLogin && !authenticationService.isLogged) {
                $location.path('/login');
            }
        });
    });

