function getBranchNameTextMatchArray(text){
  return /^(.+?)\.\.\.(.+?)$/.exec(text) || [];
}
function isInvalidMatchArray(matchArray){
  var numOriginalTextAndTwoMatches = 3 ;
   return matchArray == null || matchArray.length !== numOriginalTextAndTwoMatches;
}
function onClickContextMenu(info, tab){
  var selectedText = info.selectionText;
  match = getBranchNameTextMatchArray(selectedText);
  if(isInvalidMatchArray(match)){
    alert('Invalid format.');
    return;
  }
  var menuItemId = info.menuItemId;
  if(menuItemId == 'OPEN_PR_TABS'){
    openPrTabsFromBranchDiffString(selectedText);
  }else if (menuItemId == 'ADD_BRANCH_NAME_TO_SETTINGS'){
    to = $.trim(match[1]);
    from = $.trim(match[2]);
    addBrancheNameToSettings(to, from);
    alert("updated to:" + to + ", from:" + from);
  }
}
function addBrancheNameToSettings(to, from){
    localStorage.to = to ;
    localStorage.from = from ;
}
function openPrTabs(to, from){
  var branchDiffString = to + '...' + from;
  openPrTabsFromBranchDiffString(branchDiffString);
}
function openPrTabsFromBranchDiffString(branchDiffString){
  var projectUrlString = localStorage.url;
  var compareUrlString = '/compare/' + branchDiffString;
  var reposArray = localStorage.repos.split("\n");
  for(var i = 0; i < reposArray.length; i++){
    repoUrl = reposArray[i];
    pullRequestUrl = projectUrlString + repoUrl + compareUrlString
    openTab(pullRequestUrl);
  }
}
function openTab(url){
  options = {
    url: url,
    active: false,
    selected: false
  }
  chrome.tabs.create(options)
}
