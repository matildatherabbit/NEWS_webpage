
let news = []
let menu = document.querySelectorAll(".menu button")

let searchButton = document.getElementById("search-button");
menu.forEach(menu => menu.addEventListener("click", (event) => getNewsByTopic(event)))
let url;

const getNews = async() => {
    let header = new Headers({
        'x-api-key': 'S2Ps336dSyQrfl6bazBEnG_WPtTul6yqJkNtPtkJgwU'
        })
    let response = await fetch(url, {headers:header})
    let data = await response.json()
    news = data.articles

    render()
}

const getLatestNews = async() => { 
url = new URL(
        'https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=world&page_size=10'
        );
    getNews();
};

const getNewsByTopic = async(event) => {
    let topic = event.target.textContent.toLowerCase();
url = new URL(
        `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
        );
    getNews();
};

const getNewsBySearch = async() => {
    let keyword = document.getElementById("search-input").value;
url = new URL(
        `https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`
        );
    getNews();       
};

const render = () => {
    let newsHTML = ""
    newsHTML = news.map((item) => {
        return `<div class = "row news">
        <div class = "col-lg-4"> 
            <img class = "news-img-size" src = "${item.media}"> 
        </div>
        <div class = "col-lg-8">
        <h2>
            ${item.title}
        </h2>
        <p>
            ${item.summary}
        </p>
        ${item.published_date} * ${item.rights} 
        </div>
    </div>`
        }
    ).join('');

document.getElementById("news-board").innerHTML = newsHTML

}
searchButton.addEventListener("click", getNewsBySearch)
getLatestNews();