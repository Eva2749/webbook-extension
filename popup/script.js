console.log("this is popup script");

// const gettingCurrent = browser.tabs.getCurrent();
// console.log(gettingCurrent);

let button = document.getElementById("bookmark");
button.onclick = ()=>{
  chrome.runtime.sendMessage({type:"getTabId",type:"getScrollPosition"});
  // chrome.tabs.sendMessage(tabs[0].id, {type:"getScrollPosition"});
}
