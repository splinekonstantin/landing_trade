$(document).ready(function() {
  const descriptions = $('.option__main');
  const optionHeaders = $('.option__prev');
  const headerOptions = $('.header-option');
  let noActive = true; // true when all tabs are inactive
  let isMobile;

  // custom variables
  const mobileSize = 800; // value in px

  const makeFirstTabActive = function() {
    $(optionHeaders[0]).addClass('active');
    $(headerOptions[0]).addClass('active');
  };

  if ($(window).width() > mobileSize) {
    makeFirstTabActive();
    isMobile = false;
  } else {
    isMobile = true;
  }

  $(window).resize(function() {
    if ($(window).width() <= mobileSize) {
      isMobile = true;
    } else {
      isMobile = false;
    }

    if ($(window).width() > mobileSize && noActive) {
      makeFirstTabActive();
    }
  });

  optionHeaders.on('click', function() {
    $this = $(this);
    const dataId = $this.data('tab');
    $this.closest('.options-wrapper').attr('data-tab', dataId);
    $('.wrapper').attr('data-tab', dataId);

    if ($this.hasClass('active')) {
      if (isMobile) {
        optionHeaders.removeClass('active');
      }
      noActive = true;
    } else {
      const headerOptionToActive = `.header-option[data-headeroption="${dataId}"`;

      headerOptions.removeClass('active');
      optionHeaders.removeClass('active');
      $this.addClass('active');
      noActive = false;

      $(headerOptionToActive).addClass('active');
    }
  });

  headerOptions.on('click', function() {
    const tabToActive = `.option__prev[data-tab="${$(this).data(
      'headeroption'
    )}"]`;
    $('html, body').animate(
      {
        scrollTop: $('.options-wrapper').offset().top,
      },
      1000
    );
    $(tabToActive).click();
  });
});
