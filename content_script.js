


function summarize() {
    let summary = {
    pname: '',
    residence: '',
    position: '',
    statuss: '',
    url: '',
    photo: '',
    mutual :''
    }

    //fetch URL and Name and Mutual
    const url1 = window.location.origin + window.location.pathname.split('/').slice(0, 3).join('/') + '/';
    summary.url = url1;
    summary.mutual =document.querySelector('.hoverable-link-text span[aria-hidden="true"]').innerText
    const nameElement = document.querySelector("h1");
    if (nameElement) {
    summary.pname = nameElement.innerText;
    }
    //fetch position
    const positionElement = document.querySelector('.text-body-medium.break-words');
    if (positionElement) {
    summary.position = positionElement.innerText;
    }
    //fetch residence
    const residenceElement = document.querySelector('span.text-body-small.inline.t-black--light.break-words')
    if (residenceElement) {
    const originalString = residenceElement.innerText;
    const strippedString = originalString.replace(/(<([^>]+)>)/gi, "");
    const lines = strippedString.split(/\r?\n/);
    console.log(lines)
    summary.residence = lines[0].trim();
    }
    // fetch profile picture's url
    const divElement = document.querySelector('.pv-top-card__non-self-photo-wrapper.ml0');
    if (divElement) {
    const images = divElement.querySelectorAll('img');
    if (images.length > 0) {
        summary.photo = images[0].getAttribute('src');
    }
    }

        return summary
}
console.log(summary)
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    console.log("jeni el action")
    if (message.action === "summarize") {
        try {
            const summary = await summarize();
            sendResponse({ summary });
        } catch (error) {
            sendResponse({ error: error.message });
        }
        return true;
    }
});

