let profileURL = document.location.href
function summarize(){
let summary = {
    pname :document.querySelector("h1").innerText,
    statuss,
    photo,



}
let image = document.getElementsByClassName("KRvsAPYCMUbCdmmmalLxnjPqgYkmRgIXA pv-top-card-profile-picture__image--show evi-image ember-view");
let imageurl =image.src
summary.photo = imageurl
let status = document.querySelector("div.pv-top-card-section__info");
let statuss = status.innerText
summary.statuss = statuss
return summary
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "summarize") {
    let summary = summarize();
    sendResponse({ summary: summary });
    }
})



