
let news = []
let page = 1
let total_pages = 0
let menus = document.querySelectorAll(".menu button")

let searchButton = document.getElementById("search-button");
menus.forEach(m => m.addEventListener("click", (event) => getNewsByTopic(event)))
let url = undefined;

const getNews = async() => {
    try{
        let headers = new Headers({
            'x-api-key': 'iH7B5UDo2Tb6fBEyOMXQSasffFLymxoycqzb8Z9r_UU'
            })
        url.searchParams.set("page", page);    
        console.log("url??", url)
        let response = await fetch(url, { headers })
        let data = await response.json();
        if(response.status == 200){
            if(data.total_hits == 0){
                throw new Error("검색된 결과값이 없습니다")
            }
            console.log("받는 데이터 확인", data)
            news = data.articles;
            total_pages = data.total_pages;
            page = data.page;
            console.log(news)
            render();
            pagination();
        }else {
            throw new Error(data.message)
        }
    }catch(error){
        console.log("에러메시지:", error.message)
        errorRender(error.message)
    }
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

const errorRender = (message) =>{
    let errorHTML = `</div>
    <div class="alert alert-danger text-center" role="alert"> 
    ${message}
    </div>`
    document.getElementById("news-board").innerHTML = errorHTML
}

const pagination = () => {
    let paginationHTML = ``
    let pageGroup = Math.ceil(page/5)
    let lastPage = pageGroup * 5 
        if (lastPage > total_pages) {
        // 마지막 그룹이 5개 이하이면
        lastPage = total_pages;
      }
    let firstPage = lastPage - 4 <= 0 ? 1 : lastPage - 4; 
    for(let i = firstPage; i <= lastPage; i++){
        paginationHTML += `<li class="page-item ${page == i ? "active" : ""}"><a class="page-link" href="#" onclick = "moveToPage(${i})">${i}</a></li>`
    }

    document.querySelector(".pagination").innerHTML = paginationHTML;
}

const moveToPage = (pageNum) => {
    page = pageNum;
    getNews();

}
searchButton.addEventListener("click", getNewsBySearch)
getLatestNews();