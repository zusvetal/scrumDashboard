angular.module('DashBoard')
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('tokenInterceptor');
    })
    .run(function ($rootScope, $location, authenticationService, userService) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            console.log(toState)
            if (toState.url === '/logout') {
                console.log(userService)
                userService.logOut();
                $location.path('/login');
            }

            if (toState.requiredLogin && !authenticationService.isLogged) {
                $location.path('/login');
            }
        });
    });

