document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
      // console.log("onUpdated", new Date(), JSON.stringify(changeInfo), "tab", JSON.stringify(tab));
      // removePreviousDivs(tabId);
      if(tab.url.includes("https://leetcode.com/list")) {
        chrome.tabs.executeScript(
          tabId,
          {
            code: `
            var el = document.getElementById("leetcode-stat-extension-id");
            if(el) {
              el.parentNode.removeChild(el)
            }
            `
          }
        );
        chrome.tabs.executeScript(
          tabId,
          {
            code: `
            var elems = document.getElementsByClassName("panel-heading");
            // console.log("elems length", elems.length);
            if(elems.length>=2 && elems[2].parentNode) {
              var totalProblems = document.getElementsByClassName('css-alevek').length;
              var solvedProblems = document.getElementsByClassName('text-success fa fa-check css-alevek').length;
              var perc = ((solvedProblems/totalProblems) * 100).toFixed(0);
    
              var el = document.createElement('div');
              el.setAttribute('class', 'panel-heading');
              el.setAttribute('id', 'leetcode-stat-extension-id')
              el.innerText="Problems solved: "+solvedProblems+"/"+totalProblems+" - " + perc+"%";
              
              document.getElementsByClassName("panel-heading")[2].parentNode.insertBefore(el, document.getElementsByClassName("panel-heading")[2].nextSibling);
  
            }
            `
          }
        );
      }
      
    }
  );
});
