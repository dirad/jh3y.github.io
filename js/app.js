;(function(){
  var octoNav = (window.octoNav) ? window.octoNav : undefined;
  octoNav = window.octoNav = (function(oN){
    var $octoNav = $('[octo-nav]'),
      $octoNavPageContent = $('[octo-nav-page-content]'),
      $octoNavControl = $('[octo-nav-control]'),
      $octoNavNavigation = $('[octo-nav-navigation]'),
      animationTime = 500,
      $scrollingPageContent = $('[octo-nav-page-content] > [octo-nav-scrollable]'),
      $header = $('header'),
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
                scrollTop: $scrollingPageContent.scrollTop() + $hash.offset().top
              }, animationTime);
            setTimeout(function(){
              $octoNav.removeClass('show-nav');
            }, animationTime);
          }
        }
      });
    };
    oN.setUpNavigationShowBehavior = function () {
      $hiddenMenuCtrl.on('click', function(event) {
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
        scrollPos = 0,
        scrollDirection = '',
        checkHeight = function() {
          var direction = '';
          if (sC.scrollTop > scrollTop) {
            scrollDirection = 'DOWN';
          } else if (sC.scrollTop < scrollTop) {
            scrollDirection = 'UP';
          }
          scrollTop = sC.scrollTop;
          return scrollDirection;
        },
        updating,
        update = function () {
          height = $header.outerHeight();
          if ((sC.scrollTop > height) && (checkHeight().trim() === 'UP')) {
            hiddenMenu.className = 'fixed';
            if (startingMargin !== 0) {
              // console.log('SHOWING')
              startingMargin = 0;
              hiddenMenu.setAttribute('style', 'top:' + startingMargin + 'px;');
            }
          } else if (sC.scrollTop > height + 50 && scrollDirection === 'DOWN') {
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
        // console.log(sC.scrollTop);
        update();
      });
    };
    oN.init = function () {
      oN.setUpNavigationShowBehavior();
      oN.setUpScrollingBehavior();
      oN.setUpNavInternalLinkHandling();
    };
    return oN;
  }(octoNav || {}));
})();
window.octoNav.init();

;(function(){
  var config = {
    id: 'app',
    particleLife: 300,
    amount: 20,
    star: {
      size: {
        upper: 50,
        lower: 25
      },
      rotateLimit: 90,
      points: 5,
      innerRadius: 0.5,
      borderColor: '#000',
      fillColor: 'red',
    }
  };

  myCanvas = new ShootingStars(config);
  myCanvas.flushPool();
  myCanvas.render();

  if (window.navigator.userAgent.indexOf('Trident') !== -1 ||
      window.navigator.userAgent.indexOf('MSIE') !== -1 ||
      window.navigator.userAgent.indexOf('Edge') !== -1) {
    document.body.className += ' ie';
  } else {
    $('header').height(window.innerHeight);
  }
  $(window).on('resize', function() {
    $('header').height(window.innerHeight);
  });


  var fadeStart = 100,
    fadeUntil = 300,
    fading = $('header h1');

  $('[octo-nav-page-content] > [octo-nav-scrollable]').on('scroll', function(){
    var offset = $('[octo-nav-page-content] > [octo-nav-scrollable]').scrollTop(),
      opacity = 0;
    if (offset <= fadeStart) {
        opacity = 1;
        uTop = 100;
    } else if (offset <= fadeUntil) {
        opacity = 1 - offset / fadeUntil;
    }
    if (offset > 0) {
      uTop = 100 - (offset / 2);
    }
    fading.css({
      'opacity': opacity,
      'top': uTop
    });
  });
}());
