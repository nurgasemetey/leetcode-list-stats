// function reddenPage() {
//   console.log(document);
//   let totalProblems = document.getElementsByClassName('css-alevek').length;
//   let solvedProblems = document.getElementsByClassName('text-success fa fa-check css-alevek').length;
//   console.log(totalProblems, solvedProblems);
//   document.getElementsByClassName("list-name-header-shared")[0].innerText=`${document.getElementsByClassName("list-name-header-shared")[0].innerText} - ${solvedProblems}/${totalProblems}`
// }

// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: reddenPage
//   });
// });

document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({}, function(tabArray) {
    tabArray.forEach((tab) => {
      chrome.tabs.executeScript(
        tab.id,
        {
          code: `
          var totalProblems = document.getElementsByClassName('css-alevek').length;
          var solvedProblems = document.getElementsByClassName('text-success fa fa-check css-alevek').length;
          var text = document.getElementsByClassName("list-name-header-shared")[0].innerText;
          document.getElementsByClassName("list-name-header-shared")[0].innerText=text +"->Solved/Total - "+solvedProblems+"/"+totalProblems;
          `
        }
      );
    });
  });
  chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
      // removePreviousDivs(tabId);
      chrome.tabs.executeScript(
        tabId,
        {
          code: `
          var text = document.getElementsByClassName("list-name-header-shared")[0].innerText;
          var splitted = text.split("->Solved/Total - ");
          document.getElementsByClassName("list-name-header-shared")[0].innerText=splitted[0];
          `
        }
      );
      chrome.tabs.executeScript(
        tabId,
        {
          code: `
          var totalProblems = document.getElementsByClassName('css-alevek').length;
          var solvedProblems = document.getElementsByClassName('text-success fa fa-check css-alevek').length;
          var text = document.getElementsByClassName("list-name-header-shared")[0].innerText;
          document.getElementsByClassName("list-name-header-shared")[0].innerText=text +"->Solved/Total - "+solvedProblems+"/"+totalProblems;
          `
        }
      );
    }
  );
});


// // print(document);
// if(document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded',afterDOMLoaded);
// } else {
//   afterDOMLoaded();
// }

// function afterDOMLoaded(){
//   //Everything that needs to happen after the DOM has initially loaded.
//   chrome.tabs.query({}, function(tabArray) {
//     tabArray.forEach((tab) => {
//         chrome.scripting.executeScript({
//           target: { tabId: tab.id },
//           function: reddenPage
//         });
//     });
//   });
// }

// document.addEventListener('DOMContentLoaded', function () {

//   // initialize tabs
  
//   // chrome.tabs.onUpdated.addListener(
//   //   function(tabId, changeInfo, tab) {
//   //     removePreviousDivs(tabId);
//   //     addDivsToPage(tabId, tab);
//   //   }
//   // );
// });