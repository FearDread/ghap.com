/* Ghap.com App Module */
$.GUI().create('App', function(gui) {
    var $container = gui.$('.page-container'), mediaListener;
    gui.log('GUI :: ', gui);

    // dynamic responsive styles
    mediaListener = new gui.ui.media({
        media:'(max-width: 1024)',
        in: function() {
            console.log('media in');
        },
        out: function() {
            console.log('media out');
        },
        both: function() {
            console.log('media both');
        }
    });

    mediaListener();

    function scrollTop() {
        $container.animate({
            'scrollTop': gui.$(window).height()
        }, 500);
    }

    function showCaption($div) {
        if ($div.length > 0) {

            setTimeout(function() {

                $div.addClass('is-loaded');
                showCaption($div.next());

            }, 150);
        }
    }

    function openPage(e) {
        var $selected = gui.$(this),
            toggle = !$selected.hasClass('is-full-width');

        if (toggle) {
            projectToggle($selected, $container, toggle);
        } 
    }

    function closePage() {
        projectToggle($('.is-full-width'), $container, false);
    }

    function projectToggle($project, $container, bool) {
        var mediaQuery, delay;

        if (bool) {
            $container.addClass('project-is-open');
            $project.addClass('is-full-width').siblings('.single-page').removeClass('is-loaded');

        } else {
            mediaQuery = window.getComputedStyle(document.querySelector('.page-container'), '::before').getPropertyValue('content');
            delay = (mediaQuery === 'mobile') ? 100 : 0;

            $container.removeClass('project-is-open');

            $project.animate({opacity: 0}, 800, function() {
                $project.removeClass('is-loaded');
                $container.find('.page-scroll').attr('style', '');

                setTimeout(function() {
                    $project.attr('style', '').removeClass('is-full-width').find('.page-title').attr('style', '');
                }, delay);

                setTimeout(function(){
                    showCaption($('.page-container .single-page').eq(0));
                }, 300);
            });
        }
    }

    function requestAnim(value) {
        return window.requestAnimationFrame(value);
    }

    function changeOpacity() {
        var newOpacity = 1 - ($('.page-container').scrollTop()) / 300;

        $('.page-container .page-scroll').css('opacity', newOpacity);
        $('.is-full-width .page-title').css('opacity', newOpacity);
    }

    return {
        containerScroll: function() {
            requestAnim(changeOpacity);
        },
        bindEvents: function() {
            var _this = this;

            $container.scroll(_this.containerScroll);

            $('.page-close', $container).click(closePage);
            $('.page-scroll', $container).click(scrollTop);
            $('.single-page').click(openPage);
        },
        preload: function() {
            $('.loader').fadeOut();

            $('.preloader').delay(300).fadeOut('slow');
            $('body').delay(300);

            new gui.ui.charm().init();
        },
        load: function() {
            var _this = this;

            setTimeout(function(){
                _this.preload();
                _this.bindEvents();

                gui.$('.single-page').background({
                    afterLoaded: function() {
                        showCaption($('.single-page', $container).eq(0));
                    }
                });
            }, 1000);
        },
        unload: function() {}
    };
}).start();
