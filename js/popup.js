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
			chrome.tabs.create({url: url})
		}
	});
  function initInputValues(){
    $('#from').val(localStorage.from);
    $('#to').val(localStorage.to);
    $('#url').val(localStorage.url);
    $('#repos').val(localStorage.repos);
  }
  function initInputListeners(){
    setInputListener('#to', localStorage.to);
    setInputListener('#from', localStorage.from);
    setInputListener('#url', localStorage.url);
    setInputListener('#repos', localStorage.repos);
  }
  function setInputListener( inputElement, store){
    $(inputElement).on('input', function(){
      store = $(this).val();
    });
  }
});
