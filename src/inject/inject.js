chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request)
  if (request.message === "GetIncidentsCount") {
    const countContainer = document.querySelector(
      "div.clearfix.search-results-footer.search-results-have-results > div.search-results-pagination > p"
    );
    console.log(countContainer)

    if (countContainer) {
      const count = countContainer.innerText.split(" ");
      chrome.runtime.sendMessage("", {
        type: "IncidentsCount",
        count: count[count.length - 2],
      });
    }
  }
});
