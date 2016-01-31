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
  switch(info.menuItemId){
  case 'OPEN_PR_TABS':
    openPrTabsFromBranchDiffString(selectedText);
    break;
  case 'ADD_BRANCH_NAME_TO_SETTINGS':
    to = $.trim(match[1]);
    from = $.trim(match[2]);
    addBrancheNameToSettings(to, from);
    alert("updated to:" + to + ", from:" + from);
    break;
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
function isEmptyString(string, errorMessage){
  if(string == ''){
    alert(errorMessage);
    return true;
  }else{
    return false;
  }
}
function isInvalidSettings(){
  if(isEmptyString(localStorage.to,    'error! input merge_to.')   ){ return true; }
  if(isEmptyString(localStorage.from,  'error! input merge_from.') ){ return true; }
  if(isEmptyString(localStorage.url,   'error! input project url.')){ return true; }
  if(isEmptyString(localStorage.repos, 'error! input repos.')      ){ return true; }
  return false;
}
function openPrTabsFromBranchDiffString(branchDiffString){
  if(isInvalidSettings()){
    return;
  }
  var projectUrlString = localStorage.url;
  var compareUrlString = '/compare/' + branchDiffString;
  var reposArray = localStorage.repos.split("\n");
  for(var i = 0; i < reposArray.length; i++){
    openPrTabForRepo(reposArray, i, projectUrlString, compareUrlString);
  }
}
function openPrTabForRepo(repos, index, projectUrl, compareUrl){
  repoUrl = $.trim(repos[index]);
  if(repoUrl == ''){
    return;
  }
  pullRequestUrl = projectUrl + repoUrl + compareUrl
  openTab(pullRequestUrl);
}
function openTab(url){
  options = {
    url: url,
    active: false,
    selected: false
  }
  chrome.tabs.create(options)
}
