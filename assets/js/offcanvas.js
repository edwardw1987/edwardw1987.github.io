$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active');
    $(this).children("i").toggleClass("fa-rotate-90");
  });
});