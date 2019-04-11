// FUNCTION speedTest
var speedTest = function () {

    var functions = {

        removeClass: function (obj, cLass) {
            $(obj).removeClass(cLass);
        },
        addClass: function (obj, cLass) {
            $(obj).addClass(cLass);
        },
        addLocalStore: function ( name, obj ) {
            localStorage.setItem( name, obj );
        },
        addInfoLocalStore: function(){
           var name = $('#nameUserHistoric'),
               kbps = $('#kbpSHistoric'),
               bps  = $('#bpSHistoric'),
               mbps = $('#mbpSHistoric');

            name.html( localStorage.getItem( 'Nome' ).toString() );
            kbps.html( localStorage.getItem( 'KBPS' ).toString() );
            bps.html( localStorage.getItem( 'MBPS' ).toString() );
            mbps.html( localStorage.getItem( 'BPS' ).toString() );
        },
        navOpen: function () {
            var self = this;
            self.addClass('.nav', 'active');
            self.removeClass('.nav', 'hidden');
            self.removeClass('.bg', 'hidden');
            self.addClass('.nav__btn-nav', 'active');
        },
        navClose: function () {
            var self = this;
            self.removeClass('.nav', 'active');
            self.addClass('.nav', 'hidden');
            self.addClass('.bg', 'hidden');
            self.removeClass('.nav__btn-nav', 'active');
        },
        speedCalculation: function () {
            var self = this;
            var image_addr = "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" + "?n=" + Math.random();
            var download_size = 500;
            var start_time;
            var end_time;
            var download = new Image();
            var cache_buster = "?nnn=" + start_time;

            self.addClass('.aguarde', 'hidden');
            self.addClass('.results', 'display-flex');

            download.onload = function () {
                end_time = (new Date()).getTime();
                showResults();
            }

            start_time = (new Date()).getTime();
            download.src = image_addr + cache_buster;

            function showResults() {
                var duration = (end_time - start_time) / 31.5;
                var bits_loaded = download_size * 2;
                var speed_bps = (bits_loaded / duration).toFixed(2);
                var speed_kbps = (speed_bps * 1 / 2).toFixed(2);
                var speed_mbps = (speed_kbps * 1 / 2).toFixed(2);

                $('#resultsKbps').html(speed_kbps);
                $('#resultsMbps').html(speed_mbps);
                $('#resultsBps').html(speed_bps);

                self.addLocalStore( 'KBPS', speed_kbps );
                self.addLocalStore( 'MBPS', speed_mbps );
                self.addLocalStore( 'BPS', speed_bps );
            }
        },
        progressBar: function () {
            var self = this;
            var width = 1;
            var id = setInterval(frame, 50);

            self.addClass('.initial', 'hidden');
            self.removeClass('.aguarde', 'hidden');

            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                } else {
                    width++;
                    $('.footer__progress--item-color-orange').width(width + '%');
                }
                var resusts = width >= 100 ? self.speedCalculation() : null;
            }
        }

    };

    return {

        plugins: function () {

            $(document).ready(function () {

                $('.header__btn-nav').click(function (e) {
                    e.preventDefault();
                    functions.navOpen();
                })
                $('.nav__btn-nav').click(function (e) {
                    e.preventDefault();
                    functions.navClose();
                    functions.addClass('#userShow', 'hidden');
                    functions.removeClass('.nav__group', 'hidden');
                })
                $('#btnInitial').click(function (e) {
                    e.preventDefault();
                    functions.progressBar();
                });
                $('#newUser').click(function(e){
                    e.preventDefault();
                    functions.addClass('.nav__group', 'hidden');
                    functions.removeClass('#userShow', 'hidden');
                });
                $('#editName').click(function(e){
                    e.preventDefault();
                    functions.addClass('.nav__group', 'hidden');
                    functions.removeClass('#userShowEdit', 'hidden');
                });
                $('#openHistoric').click(function(){
                    functions.navClose();
                    functions.removeClass('.historic ', 'hidden');
                    functions.removeClass( '.results', 'display-flex' );
                    functions.addClass('.initial', 'hidden');
                    functions.addClass( '.results', 'hidden' );
                    functions.addInfoLocalStore();
                });
                $('#userShow .nav__button').click(function(e){
                    e.preventDefault();
                    var input_value = $('#name').val();
                    functions.addLocalStore( 'Nome', input_value );
                    functions.navClose();
                    functions.addClass('#userShow', 'hidden');
                    functions.removeClass('.nav__group', 'hidden');
                });
                $('#userShowEdit .nav__button').click(function(e){
                    e.preventDefault();

                    var input_value = $('#newName').val();

                    functions.addLocalStore( 'Nome', input_value );
                    functions.navClose();
                    functions.addClass('#userShowEdit', 'hidden');
                    functions.removeClass('.nav__group', 'hidden');
                    functions.addInfoLocalStore();
                });
                $('#btnEditName').click(function(e){
                    e.preventDefault();
                    functions.navOpen();
                    functions.addClass('.nav__group', 'hidden');
                    functions.removeClass('#userShowEdit', 'hidden');
                });

            });

        },

        //init nav
        init: function () {
            this.plugins();
        }

    };

}();

//init object
speedTest.init();