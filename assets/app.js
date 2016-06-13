---
---

{% include_relative _js/jquery.js %}
{% include_relative _js/bootstrap.min.js %}

$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top 
        }, 1500, 'easeInOutExpo'
        , function(){ $anchor.blur(); });
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});
