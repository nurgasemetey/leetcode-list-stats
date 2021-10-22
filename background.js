function reddenPage() {
  // document.body.style.backgroundColor = 'red';
  let totalProblems = document.getElementsByClassName('css-alevek').length;
  let solvedProblems = document.getElementsByClassName('text-success fa fa-check css-alevek').length;
  console.log(totalProblems, solvedProblems);
  // var div=document.createElement("div"); 
  document.getElementsByClassName("list-name-header-shared")[0].innerText=`Must Do Medium Questions - ${solvedProblems}/${totalProblems}`
  // div.innerText="test123";
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: reddenPage
  });
});