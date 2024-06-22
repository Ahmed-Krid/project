

function summarize() {
let summary = {
    pname: '',
    residence :'',
    position :'',
    statuss: '',
    url :'',
    photo: '',
    experience: {
        company: [],
        position: [],
        duration: []
    },

};
url1 =  window.location.origin + window.location.pathname.split('/').slice(0, 3).join('/') + '/'
summary.url = url1
names = document.querySelector("h1").innerText
summary.pname = names
summary.position=document.querySelector('.text-body-medium.break-words').innerText


let Element = document.querySelector("yTckwdyFiUvZXypMWLBADJQOOqMJeKugSTM mt2");
const strippedString = originalString.replace(/(<([^>]+)>)/gi, "")
const lines = strippedString.split(/\r?\n/);
let tab=[];
let j=0 ;

for (let i = 0; i < lines.length; i++) {
const line = lines[i].trim();
if(line!== '') {
    tab[j]=line;
    j++;

}
}
summary.residence=tab[0]
const divElement = document.querySelector('.pv-top-card__non-self-photo-wrapper.ml0');
const images = divElement.querySelectorAll('img');
const imgurl = images[0].getAttribute('src');
summary.photo=imgurl



const expURL=url1 +"details/experience/"
fetch(expURL)
.then(response => response.text())
.then(html => {
    const parser = new DOMParser();
    const newDocument = parser.parseFromString(html, 'text/html');
    const UListe= newDocument.querySelector("ul.BjvTfVJogUBsqXidaWMpEQdXPTLjSVvGeHEFc ")
    if(UListe){
        const liElements = ulElement.querySelectorAll('li');
        liElements.forEach(li => {
            const company = document.querySelector('.t-normal span[aria-hidden="true"]').innerText
            const position = li.querySelector('.t-bold span[aria-hidden="true"]').innerText
            const duration = li.querySelector('.t-black--light span[aria-hidden="true"]').innerText
            summary.position.push(position)
            summary.company.push(company)
            summary.duration.push(duration)
        })


    }
    else{
        console.log("no experience")
    }





})
.catch(error => {
    console.error(error);
    return summary;
});
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
if (message.action === "summarize") {
summarize().then(summary => {
    sendResponse({ summary });
});
return true; // Keeps the messaging channel open for sendResponse
}
});
