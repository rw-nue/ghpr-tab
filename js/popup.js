$(function(){

  initInputValues();
  initInputListeners();

  $('#go').on('click', function(){
    var from = $('#from').val();
    var to = $('#to').val();
    var ghe = $('#url').val();
    var compare = '/compare/' + to + '...' + from
    var repos = $('#repos').val().split("\n");
    for(var i = 0; i < repos.length; i++){
      repo = repos[i];
      url = ghe + repo + compare
      options = {
        url: url,
        active: false,
        selected: false
      }
      chrome.tabs.create(options)
    }
  });
  function initInputValues(){
    $('#from').val(localStorage.from);
    $('#to').val(localStorage.to);
    $('#url').val(localStorage.url);
    $('#repos').val(localStorage.repos);
  }
  function initInputListeners(){
    $("#to").on('input', function(){
      localStorage.to = $(this).val();
    });
    $("#from").on('input', function(){
      localStorage.from = $(this).val();
    });
    $("#url").on('input', function(){
      localStorage.url = $(this).val();
    });
    $("#repos").on('input', function(){
      localStorage.repos = $(this).val();
    });
  }
});
