
let news = []
let menus = document.querySelectorAll(".menu button")

let searchButton = document.getElementById("search-button");
menus.forEach(m => m.addEventListener("click", (event) => getNewsByTopic(event)))
let url = undefined;

const getNews = async() => {
    let headers = new Headers({
        'x-api-key': 'S2Ps336dSyQrfl6bazBEnG_WPtTul6yqJkNtPtkJgwU'
        })
    let response = await fetch(url, { headers })

    let data = await response.json()
    console.log({ data })
    news = data?.articles || []
    render();
}

const getLatestNews = () => { 
url = new URL(
        'https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=world&page_size=10'
        );
    getNews();
};

const getNewsByTopic = (event) => {
    let topic = event.target.textContent.toLowerCase();
url = new URL(
        `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
        );
    getNews();
    console.log({topic, url})
};

const getNewsBySearch = () => {
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