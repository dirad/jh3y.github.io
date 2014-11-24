;(function(){
  var octoNav = (window.octoNav) ? window.octoNav : undefined;
  octoNav = window.octoNav = (function(oN){
    var $octoNav = $('[octo-nav]'),
      $octoNavPageContent = $('[octo-nav-page-content]'),
      $octoNavControl = $('[octo-nav-control]'),
      $octoNavNavigation = $('[octo-nav-navigation]'),
      animationTime = 500,
      $scrollingPageContent = $('[octo-nav-page-content] > [octo-nav-scrollable]'),
      $header = $('[octo-curtain]'),
      $hiddenMenu = $('#hidden-menu'),
      hiddenMenu = document.getElementById('hidden-menu'),
      $menu = $('#menu'),
      $hiddenMenuCtrl = $('#hidden-menu [octo-nav-control]'),
      initMessage = 'octoNav Initialised';
    oN.setUpNavInternalLinkHandling = function () {
      $('[octo-nav-link]').on('click', function(event) {
        $target = $(event.currentTarget);
        if ($target.attr('octo-nav-link') !== undefined) {
          var hash = $target[0].hash,
            $hash = $(hash);
          if(hash !== undefined && hash.indexOf('#') === 0) {
            event.preventDefault();
            $octoNavPageContent.find('[octo-nav-scrollable]')
              .stop(true, true)
              .animate({
                scrollTop: $hash.offset().top + $hash.parent().scrollTop()
              }, animationTime);
            setTimeout(function(){
              $octoNav.removeClass('show-nav');
            }, animationTime);
          }
        }
      });
    };
    oN.setUpNavigationShowBehavior = function () {
      $hiddenMenu.on('click', function(event) {
        $octoNav.toggleClass('show-nav');
      });
      $octoNavPageContent.on('click', function(event) {
        if ($octoNav.hasClass('show-nav') && $(event.target).attr('octo-nav-control') === undefined) {
          $octoNav.removeClass('show-nav');
        } else if ($(event.target).attr('octo-nav-control') !== undefined) {
          $octoNav.toggleClass('show-nav');
        }
      });
    };
    oN.setUpScrollingBehavior = function () {
      var sC = document.querySelectorAll('[octo-nav-page-content] > [octo-nav-scrollable]')[0],
        startingMargin = 50,
        scrollTop = 0,
        height = $header.outerHeight(),
        scrollPos = 0,
        checkHeight = function() {
          var direction = '';
          if (sC.scrollTop > scrollTop) {
            direction = 'DOWN';
          } else if (sC.scrollTop < scrollTop) {
            direction = 'UP';
          }
          scrollTop = sC.scrollTop;
          return direction;
        },
        updating,
        update = function () {
          if ((sC.scrollTop > height) && (checkHeight().trim() === 'UP')) {
            hiddenMenu.className = 'fixed';
            if (startingMargin !== 0) {
              startingMargin = 0;
              hiddenMenu.setAttribute('style', 'top:' + startingMargin + 'px;');
            }
          } else if (sC.scrollTop > height + 50) {
            startingMargin = 50;
            hiddenMenu.setAttribute('style', 'top: -' + startingMargin + 'px;');
            hiddenMenu.className = 'fixed';
          } else {
            startingMargin = 50;
            hiddenMenu.className = '';
            hiddenMenu.setAttribute('style', 'top: -' + startingMargin + 'px;');
          }
        };
      $(sC).on('scroll', function(event) {
        scrollPos = sC.scrollTop;
        update();
      });
    };
    oN.init = function () {
      oN.setUpNavigationShowBehavior();
      oN.setUpScrollingBehavior();
      oN.setUpNavInternalLinkHandling();
      console.info(initMessage);
    };
    return oN;
  }(octoNav || {}));
})();
window.octoNav.init();

;(function(){
  var $quoteContainer = $('.quotes'),
    $next,
    $current;
  $('.fa-repeat').on('click', function(event) {
    var $this = $(this);
    $this.addClass('spin');
    setTimeout(function() {
      $this.removeClass('spin');
    }, 250);
    $current = $('.quote.show');
    $next = $current.next();
    $current.removeClass('show');
    if ($next.hasClass('quote')) {
      $next.addClass('show');
    } else {
      $quoteContainer.find('.quote').first().addClass('show');
    }
  });
}());
