$(function(){
    initInputValues();
    initInputListeners();
    initSubmitButtonListeners();
});
function initInputValues(){
  $('#from').val(localStorage.from);
  $('#to').val(localStorage.to);
  $('#url').val(localStorage.url);
  $('#repos').val(localStorage.repos);
}
function initInputListeners(){
  $("#to").on('input', function(){
    localStorage.to = $.trim($(this).val());
  });
  $("#from").on('input', function(){
    localStorage.from = $.trim($(this).val());
  });
  $("#url").on('input', function(){
    localStorage.url = $.trim($(this).val());
  });
  $("#repos").on('input', function(){
    localStorage.repos = $.trim($(this).val());
  });
}
function initSubmitButtonListeners(){
  $('#go').on('click', function(){
    var to = $('#to').val();
    var from = $('#from').val();
    openPrTabs(to, from);
  });
}
