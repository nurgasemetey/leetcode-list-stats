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
          if(document.getElementsByClassName("list-name-header-shared").length>0) {
            var text = document.getElementsByClassName("list-name-header-shared")[0].innerText;
            document.getElementsByClassName("list-name-header-shared")[0].innerText=text +"->Solved/Total - "+solvedProblems+"/"+totalProblems;
          }
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
          if(document.getElementsByClassName("list-name-header-shared").length>0) {
            var text = document.getElementsByClassName("list-name-header-shared")[0].innerText;
            var splitted = text.split("->Solved/Total - ");
            document.getElementsByClassName("list-name-header-shared")[0].innerText=splitted[0]; 
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
          if(document.getElementsByClassName("list-name-header-shared").length>0) {
            var text = document.getElementsByClassName("list-name-header-shared")[0].innerText;
            document.getElementsByClassName("list-name-header-shared")[0].innerText=text +"->Solved/Total - "+solvedProblems+"/"+totalProblems;
          }
          `
        }
      );
    }
  );
});
