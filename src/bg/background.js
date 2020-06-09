let numIncidents = -1;

chrome.runtime.onMessage.addListener((data) => {
  console.log('Received message:', data.type || data)
  switch (data.type) {
    case "notification":
      chrome.notifications.create("icm", data.options);
      break;
    case "IncidentsCount":
      console.log("Incident Count:", data.count);

      if (numIncidents === -1) {
        numIncidents = data.count;
      } else {
        const newIncidents = data.count - numIncidents;
        if (newIncidents > 0) {
          console.log("New Incidents Count:", newIncidents);
          chrome.notifications.create("icm", {
            title: "Edge Pump IcM",
            message: `There are ${newIncidents} new incidents!`,
            iconUrl: "../../icons/icon128.png",
            type: "basic",
            priority: 2,
          });
        } else {
          console.log("No new incidents.");
        }
      }
      break;
  }
});

const tabStorage = {};
const networkFilters = {
  urls: ["*://icm.ad.msft.net/api2/incidentapi/IncidentCount*"],
};

chrome.webRequest.onBeforeRequest.addListener((details) => {
  const { tabId, requestId } = details;
  if (!tabStorage.hasOwnProperty(tabId)) {
    return;
  }

  tabStorage[tabId].requests[requestId] = {
    requestId: requestId,
    url: details.url,
    startTime: details.timeStamp,
    status: "pending",
  };
}, networkFilters);

chrome.webRequest.onCompleted.addListener((details) => {
  const { tabId, requestId } = details;
  if (
    !tabStorage.hasOwnProperty(tabId) ||
    !tabStorage[tabId].requests.hasOwnProperty(requestId)
  ) {
    return;
  }

  const request = tabStorage[tabId].requests[requestId];

  Object.assign(request, {
    endTime: details.timeStamp,
    requestDuration: details.timeStamp - request.startTime,
    status: "complete",
  });

  console.log('Getting incidents count.')
  chrome.tabs.sendMessage(tabId, { message: "GetIncidentsCount" });
}, networkFilters);

chrome.tabs.onActivated.addListener((tab) => {
  const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
  if (!tabStorage.hasOwnProperty(tabId)) {
    tabStorage[tabId] = {
      id: tabId,
      requests: {},
      registerTime: new Date().getTime(),
    };
  }
});
chrome.tabs.onRemoved.addListener((tab) => {
  const tabId = tab.tabId;
  if (!tabStorage.hasOwnProperty(tabId)) {
    return;
  }
  tabStorage[tabId] = null;
});
