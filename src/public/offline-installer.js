const offlineController = (function() {

    function install() {
        UpUp.start({
            'content-url': 'index.html', 
            'assets': [ 
                'data/test.json',
                'img/favicon.ico',
                'css/app.3aa82c5615e6affb977a.css',
                'js/polyfills.3aa82c5615e6affb977a.js', 
                'js/vendor.3aa82c5615e6affb977a.js',  
                'js/app.3aa82c5615e6affb977a.js'      
            ]
        });
    }

    function prompt() {
        let doInstall = confirm('Install service worker to use & access this app offline?');
        if (doInstall) {
            install();
            localStorage.setItem('wasInstalled', 'true');
        } else {
            localStorage.setItem('wasInstalled', 'false');
        }
    }

    function init() {
        if ('serviceWorker' in navigator) {
            let wasInstalled = localStorage.getItem('wasInstalled');
            if (wasInstalled == 'false' || !wasInstalled) {
                prompt();
            } else {
                console.log('Service worker already installed'); 
            }
        }
    }

    init();

})();
