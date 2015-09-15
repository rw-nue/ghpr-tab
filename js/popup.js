$(function(){
	$('#from').val(localStorage.from);
	$('#to').val(localStorage.to);

	$('#from').on('input', function(){
		localStorage.from = $(this).val();
	});
	$('#to').on('input', function(){
		localStorage.to = $(this).val();
	});
	$('#go').on('click', function(){
		var from = $('#from').val(); 
		var to = $('#to').val(); 
		var ghe = 'https://your_project';
		var compare = '/compare/' + to + '...' + from
		var repos = [
			"your_repo1",
			"your_repo2",
		]
		for(var i = 0; i < repos.length; i++){
			repo = repos[i];
			url = ghe + repo + compare
			chrome.tabs.create({url: url})
		}
	});
});
