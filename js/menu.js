  var ContextMenus = new function () {
      var items = {};
      var callbacks = {};
      this.setItems = function (aItems) {
          aItems.forEach(function (item) {
              callbacks[item.id] = item.onclick;
              item.onclick = null;
              items[item.id] = item;
          });
      };
      this.create = function () {
          Object.keys(items).forEach(
              function (key) {
                  chrome.contextMenus.create(items[key]);
              }
          );
      };
      chrome.contextMenus.onClicked.addListener(function (info, tab) {
          callbacks[info.menuItemId](info, tab);
      });
  };
  ContextMenus.setItems([
      {
          type: 'normal',
          contexts: ['selection'],
          id: 'OPEN_PR_TABS',
          title: 'open pr tabs',
          onclick: onClickContextMenu
      },
      {
          type: 'normal',
          contexts: ['selection'],
          id: 'ADD_BRANCH_NAME_TO_SETTINGS',
          title: 'add to settings',
          onclick: onClickContextMenu
      },
  ]);
  chrome.runtime.onInstalled.addListener(ContextMenus.create);
