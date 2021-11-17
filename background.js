document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({}, function(tabArray) {
    tabArray.forEach((tab) => {
      // console.log("DOMContentLoaded", new Date())
      chrome.tabs.executeScript(
        tab.id,
        {
          code: `
          var totalProblems = document.getElementsByClassName('css-alevek').length;
          var solvedProblems = document.getElementsByClassName('text-success fa fa-check css-alevek').length;
          var perc = ((solvedProblems/totalProblems) * 100).toFixed(0);

          var el = document.createElement('div');
          el.setAttribute('class', 'panel-heading');
          el.setAttribute('id', 'leetcode-stat-extension-id')
          el.innerText="Problems solved: "+solvedProblems+"/"+totalProblems+" - " + perc+"%";

          var btn = document.createElement("BUTTON");
          btn.innerHTML = "CLICK ME";  
          btn.onclick = function(){
            alert('here be dragons');return false;
          };
          el.appendChild(btn);

          
          
          document.getElementsByClassName("panel-heading")[2].parentNode.insertBefore(el, document.getElementsByClassName("panel-heading")[2].nextSibling);
          `
        }
      );
    });
  });
  chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
      // console.log("onUpdated", new Date())
      // removePreviousDivs(tabId);
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
          var totalProblems = document.getElementsByClassName('css-alevek').length;
          var solvedProblems = document.getElementsByClassName('text-success fa fa-check css-alevek').length;
          var perc = ((solvedProblems/totalProblems) * 100).toFixed(0);

          var el = document.createElement('div');
          el.setAttribute('class', 'panel-heading');
          el.setAttribute('id', 'leetcode-stat-extension-id')
          el.innerText="Problems solved: "+solvedProblems+"/"+totalProblems+" - " + perc+"%";

          var btn = document.createElement("BUTTON");
          el.appendChild(btn);
          
          document.getElementsByClassName("panel-heading")[2].parentNode.insertBefore(el, document.getElementsByClassName("panel-heading")[2].nextSibling);

          `
        }
      );
    }
  );
});
