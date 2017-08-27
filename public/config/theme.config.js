/**
 * Created by vcantu on 6/19/17.
 */
(function () {
    angular
        .module('RU')
        .config(configuration);

    function configuration($mdThemingProvider) {
        $mdThemingProvider.definePalette('default-red', {
            '50': 'f8e7e7',
            '100': 'edc3c3',
            '200': 'e29c9c',
            '300': 'd67474',
            '400': 'cd5656',
            '500': 'c43838',
            '600': 'be3232',
            '700': 'b62b2b',
            '800': 'af2424',
            '900': 'a21717',
            'A100': 'ffd6d6',
            'A200': 'ffa3a3',
            'A400': 'ff7070',
            'A700': 'ff5757',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
                '50',
                '100',
                '200',
                '300',
                'A100',
                'A200',
                'A400',
                'A700'
            ],
            'contrastLightColors': [
                '400',
                '500',
                '600',
                '700',
                '800',
                '900'
            ]
        });
        $mdThemingProvider.definePalette('default-blue', {
            '50': 'e9f2f9',
            '100': 'c8ddf0',
            '200': 'a3c7e6',
            '300': '7eb1db',
            '400': '63a0d4',
            '500': '478fcc',
            '600': '4087c7',
            '700': '377cc0',
            '800': '2f72b9',
            '900': '2060ad',
            'A100': 'e7f1ff',
            'A200': 'b4d4ff',
            'A400': '81b6ff',
            'A700': '68a8ff',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
                '50',
                '100',
                '200',
                '300',
                '400',
                '500',
                'A100',
                'A200',
                'A400',
                'A700'
            ],
            'contrastLightColors': [
                '600',
                '700',
                '800',
                '900'
            ]
        });



        $mdThemingProvider.theme('default')
            .primaryPalette('default-blue')
            .accentPalette('default-red', {
                'default': '500'
            });

        $mdThemingProvider.theme('grey-theme')
            .primaryPalette('grey', {
                'default': '100'
            })
    }
})();