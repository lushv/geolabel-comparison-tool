(function ($) {

    $(function () {

        // fix sub nav on scroll
        var $win = $('#outer-east'),
            $body = $('body'),
            $stickyDiv = $('#sticky-tmp'),
            tabHeight = $('#tabs').first().height(),
            stickyHeight = $stickyDiv.first().height(),
            stickyTop = $stickyDiv.length && $stickyDiv.offset().top - tabHeight,
            marginTop = parseInt($body.css('margin-top'), 10);
        isFixed = 0;

        processScroll();

        $win.on('scroll', processScroll);

        function processScroll() {
            var i, scrollTop = $win.scrollTop();

            if (scrollTop >= stickyTop && !isFixed) {
                isFixed = 1;
                $stickyDiv.addClass('sticky-fixed');
                $body.css('margin-top', marginTop + stickyHeight + 'px');
            } else if (scrollTop <= stickyTop && isFixed) {
                isFixed = 0;
                $stickyDiv.removeClass('sticky-fixed');
                $body.css('margin-top', marginTop + 'px');
            }
        }

    });

})(window.jQuery);