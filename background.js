console.log("this is background script");

// https://stackoverflow.com/questions/7303452/how-to-get-current-tabid-from-background-page
// get all active tabs in window
// chrome.tabs.query({active:true,windowType:"normal", currentWindow: true},function(d){console.log(d[0].id);})
let historyList = [];

//when a new website has been visited
chrome.history.onVisited.addListener(function(data) {
    // historyList.push(data.url);
    // console.log(historyList);

    // the following is for getting window scroll position of the active tab (as well as tab ID)
    setTimeout(() => {
    //when tab is active
        chrome.tabs.query({
          active: true,
          currentWindow: true
        }, function(tabs) {

          //get tab ID
          let tabID = tabs[0].id;
          console.log("tab id is " + tabID)

          //when bookmark is clicked, receive button click message from popup script
          chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

            // console.log(message.type);
            if (message.type = "getTabId"){
              //send tabID to content script
              //(tabs.sendmessage: specific for sending message to content script)
              chrome.tabs.sendMessage(tabs[0].id, tabID
                //get response: scrolling position
                ,(response)=>{
                console.log("X: " + response.scrollX + " , "+ "Y: " + response.scrollY);

                //store window Y position and urls
                var windowY = response.scrollY;
                console.log(windowY);

                //create a pair for website url and position
                let websiteInfo = {
                  windowY:windowY,
                  storedURL:data.url
                }

                historyList.push(websiteInfo);
                console.log(historyList);

                chrome.storage.local.set(websiteInfo, function() {
                  console.log("windowY position and url are stored at", windowY,historyList);
                });

                //get window Y position and urls
                    chrome.storage.local.get(websiteInfo, function(result) {
                      console.log("get window position and url");
                      console.log(websiteInfo);
                    })

                  let url = websiteInfo.storedURL;
                  url.onload = ()=>{
                    console.log("this page has been revisited");
                  }


              })

            }


          })
        })

      }, 1000); //Without setTimeout, it will send the request too fast that the tab can't receive it

    })




      //     console.log(scrollPosition);

      //
