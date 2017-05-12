

$(document).ready(function(){

  var siteUrl = 'http://'+(document.location.hostname||document.location.host);

  var currentPath = window.location.pathname

  if (window.innerWidth > 768) {
    $(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
      e.preventDefault();
      History.pushState({}, "", this.pathname);
    });
  }

  History.Adapter.bind(window, 'statechange', function(){
    var state = History.getState();
      $.get(state.url, function(data){
        document.title = $(data).filter("title").text();
        if (state.url.includes('work')) {
          if (currentPath === '/') { // if this is the homepage use the modal
            displayWorkModal(data);
          } else {
            changePageContent(data);
            currentPath = window.location.pathname;          
          }
        } else {
          if($('#modal').hasClass('isActive')){
            $('#modal').removeClass('isActive');
            $('body').removeClass('modalActive');
          } else {
            changePageContent(data);
            currentPath = window.location.pathname;   
          }
        }
      });
  });

});

var displayWorkModal = function(data) {
  var content = $(data).filter('.page-content').html();
  $('#modal-content').html(content);
  $('#modal').addClass('isActive');
  $('body').addClass('modalActive');
}

var changePageContent = function(data) {
  var content = $(data).filter('.page-content').html();
  $('.page-content').html(content);
}

var backToHome = function() {
  History.pushState({}, "", '/');
}