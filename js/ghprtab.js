function getBranchNameTextMatchArray(info){
  var selectedText = info.selectionText;
  return /^(.+?)\.\.\.(.+?)$/.exec(selectedText) || [];
}
function isInvalidMatchArray(matchArray){
  var numOriginalTextAndTwoMatches = 3 ;
   return matchArray == null || matchArray.length !== numOriginalTextAndTwoMatches;
}
function onClickContextMenu(info, tab){
  match = getBranchNameTextMatchArray(info);
  if(isInvalidMatchArray(match)){
    return;
  }
  to = $.trim(match[1]);
  from = $.trim(match[2]);
  switch (info.menuItemId){
    case 'ADD_BRANCH_NAME_TO_SETTINGS':
      addBrancheNameToSettings(to, from);
      alert("updated to:" + to + ", from:" + from);
    break;
    case 'OPEN_PR_TABS':
      openPrTabs(to, from);
    break;
  }
}
function addBrancheNameToSettings(to, from){
    localStorage.to = to ;
    localStorage.from = from ;
}
function openPrTabs(to, from){
  var ghe = localStorage.url;
  var compare = '/compare/' + to + '...' + from
  var repos = localStorage.repos.split("\n");
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
}
