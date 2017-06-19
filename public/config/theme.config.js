/**
 * Created by vcantu on 6/19/17.
 */
(function () {
    angular
        .module('RU')
        .config(configuration);

    function configuration($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('red')
    }
})();