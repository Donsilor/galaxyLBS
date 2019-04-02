$(function () {

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  * 通用左侧  JS
  * */

  var sideListItemSwitch = $('.sideList .item > .switchBtn');

  sideListItemSwitch.on('click', function () {

    var thisItem = $(this).parents('.item');

    if (thisItem.siblings('ul').css('display') === 'none') {

      thisItem.siblings('ul').slideDown(100);
      thisItem.addClass('show');

    } else {

      thisItem.siblings('ul').slideUp(100);
      thisItem.removeClass('show');

    }
  });


  var fixedSideToggleBtn = $('.fixed-side-nav > .toggleBtn');
  var fixedSide = $('#fixed-side');
  var fixedMainWrap = $('#fixed-main-wrap');

  fixedSideToggleBtn.on('click', function () {
    if ($(this).hasClass('unfold')) {

      $(this).removeClass('unfold');
      fixedSide.css('left', '-245px');
      $(this).css('right', 'auto');
      $(this).css('left', '100%');

      fixedMainWrap.css('left', '0');

    } else {

      $(this).addClass('unfold');
      fixedSide.css('left', '0');
      $(this).css('right', '1px');
      $(this).css('left', 'auto');

      fixedMainWrap.css('left', '245px');

    }
  });

  /*
  *
  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  * 通用背景  JS
  * */

  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame
  })();
  var canvas = document.getElementById("space");
  var c = canvas.getContext("2d");

  var numStars = 1900;
  var radius = '0.' + Math.floor(Math.random() * 9) + 1;
  var focalLength = canvas.width * 2;
  var warp = 0;
  var centerX, centerY;

  var stars = [], star;
  var i;

  var animate = true;

  initializeStars();

  function executeFrame() {

    if (animate)
      requestAnimFrame(executeFrame);
    moveStars();
    drawStars();
  }

  function initializeStars() {
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    stars = [];
    for (i = 0; i < numStars; i++) {
      star = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width,
        o: '0.' + Math.floor(Math.random() * 99) + 1
      };
      stars.push(star);
    }
  }

  function moveStars() {
    for (i = 0; i < numStars; i++) {
      star = stars[i];
      star.z--;

      if (star.z <= 0) {
        star.z = canvas.width;
      }
    }
  }

  function drawStars() {
    var pixelX, pixelY, pixelRadius;

    // Resize to the screen
    if (canvas.width !== window.innerWidth || canvas.width !== window.innerWidth) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeStars();
    }
    if (warp === 0) {
      c.fillStyle = "rgba(0,10,20,1)";
      c.fillRect(0, 0, canvas.width, canvas.height);
    }
    c.fillStyle = "rgba(209, 255, 255, " + radius + ")";
    for (i = 0; i < numStars; i++) {
      star = stars[i];

      pixelX = (star.x - centerX) * (focalLength / star.z);
      pixelX += centerX;
      pixelY = (star.y - centerY) * (focalLength / star.z);
      pixelY += centerY;
      pixelRadius = (focalLength / star.z);

      c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
      c.fillStyle = "rgba(209, 255, 255, " + star.o + ")";
      //c.fill();
    }
  }

  document.getElementById('warp').addEventListener("click", function (e) {
    window.c.beginPath();
    window.c.clearRect(0, 0, window.canvas.width, window.canvas.height);
    window.warp = warp ? 0 : 1;
    executeFrame();
  });

  executeFrame();


  /*
  *
  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */



  /* 16xtgl-clgl-xzcl */
  $(".wrap-l ul li").click(function(){
    $(this).siblings('li').removeClass('choose');
    $(this).addClass('choose');
  });


  /* 通用弹窗关闭按钮 */
  var closeBtn = $('.closeBtn');
  closeBtn.on('click', function () {
    $(this).parents('.popup').hide();
    $('#layer').hide();
  });
  var cancelBtn = $('.cancelBtn');
  cancelBtn.on('click', function () {
    $(this).parents('.popup').hide();
    $('#layer').hide();
  });

  var closeBtn1 = $('.closeBtn1');
  closeBtn1.on('click', function () {
    $('#layer1').show();
    $('#prompt').show();
  });
  var cancelBtn1 = $('.cancelBtn1');
  cancelBtn1.on('click', function () {
    $('#layer1').show();
    $('#prompt').show();
  });
  var pqr = $('.pqr');
  pqr.on('click', function () {
    $('.popup').hide();
    $('#layer').hide();
    $('#layer1').hide();
    $('#prompt').hide();
  });

  var pqx = $('.pqx');
  pqx.on('click', function () {
    $('#layer1').hide();
    $('#prompt').hide();
  });
  var closex = $('.closex');
  closex.on('click', function () {
    $('#layer1').hide();
    $('#prompt').hide();
  })

});
