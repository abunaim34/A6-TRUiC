const dataLoad = () => {
    const url = 'https://openapi.programming-hero.com/api/retro-forum/posts'
    fetch(url)
       .then(res => res.json())
       .then(data => {
        const posts = data.posts
        displayPosts(posts)
        
       })
}

const displayPosts = (posts) =>{
    // console.log(posts)
    handleSpinner("none")
    const allPostContainer = document.getElementById('post-container')
    allPostContainer.textContent = ''
    posts.forEach(post =>{
        // console.log(post)
        let online = ""
        if(post.isActive){
            online = `<div class="avatar online w-20 h-20 pl-4 pt-4">
            <div class="w-24">
              <img class=" rounded-2xl" src="${post.image}" />
            </div>
            </div>`
        }else{
            online = `<div class="avatar offline w-20 h-20 pl-4 pt-4">
            <div class="w-24">
              <img class=" rounded-2xl" src="${post.image}" />
            </div>
            </div>`
        }
        const postCard = document.createElement('div')
        postCard.classList = `flex flex-row bg-[#F3F3F5] lg:w-[702px] rounded-2xl`
        postCard.innerHTML = `
         ${online}

        <div class="mt-5 px-3 pb-2">
            <div class="space-x-4 mb-2 flex text-[#12132DCC]">
                <p># <span>${post.category}</span></p>
                <p> Author : <span>${post.author.name}</span></p>
            </div>
            <div class="">
                <h3 id="post-title" class="text-xl font-bold">${post.title}</h3>
                <p class="lg:w-[520px] pt-4">${post.description} </p>
                <div class="flex justify-between items-center mt-6 mb-11">
                    <div class="flex items-center mt-6 gap-2 lg:gap-7">
                        <div><i class="fa-solid fa-message"></i><span class="lg:pl-3">${post.comment_count}</span></div>
                        <div id="ila"><i class="fa-regular fa-eye"></i><span id="view" class="lg:pl-3">${post.view_count}</span></div>
                        <div><i class="fa-regular fa-clock"></i><span class="lg:pl-3">${post.posted_time}</span> Min</div>
                    </div>
                    <div  class="text-white pt-6">
                        <button id="btn" onclick="getTitleAndView('${post.title}, ${post.view_count}')" class="btn"> <i class="fa-regular fa-envelope bg-[#10B981] p-1 rounded-full"></i></button>
                    </div>
                </div>
            </div>
        </div>
        `;
        allPostContainer.appendChild(postCard)
        
    })
}

// const getView = (view) =>{
//     // console.log(view)
//     // const countView = view;
//     getTitleAndView(view)
// }


const getTitleAndView = (title) =>{
    // console.log( title )
    // getView()
    const countContainer = document.getElementById('count-container')

    const div = document.createElement('div')
    div.classList = `flex bg-white rounded-3xl p-8`;
    const h1 = document.createElement('h1')
    h1.classList = 'font-semibold flex'
    // const p = document.createElement('p')
    h1.innerText = title;
    // p.innerText = title
    div.appendChild(h1)
    // div.appendChild(p)
    countContainer.appendChild(div)

    updateMarkAsRead()
}

function updateMarkAsRead(){
    const defaultReadCount = document.getElementById("selected").innerText;
    const convertDefaultReadCount = parseInt(defaultReadCount);
    document.getElementById("selected").innerText = convertDefaultReadCount + 1;
}

const latestPostLoad = () => {
    fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        displayLatestPost(data)
      })
}

const displayLatestPost = (posts) => {
    // console.log('click', post)
    const latestPostContainer = document.getElementById('latest-post-container')
    posts.forEach(post =>{
        console.log(post)
        let postDate = ''
        if(post.author.posted_date){
            postDate = `<p>${post.author.posted_date}</p>`
        }else{
            postDate ='No publish date'
        }
        let designation = ''
        if(post.author.designation){
            designation = `<p>${post.author.designation}</p>`
        }else{
            designation ='Unknown'
        }
        const cardPost = document.createElement('div')
        cardPost.classList - 'card lg:w-96 bg-base-100 shadow-xl';
        cardPost.innerHTML = `
        <figure class="px-8 pt-10">
        <img src="${post.cover_image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body space-y-3">
            <div class="flex justify-between items-center gap-3">
                <img src="./images/birth.png" alt="">
                ${postDate}
            </div>
            <h1 class="font-extrabold">${post.title}</h1>
            <p class="text-[#12132D99]">${post.description}</p>
            <div class="flex items-center gap-4">
                <img class="h-11 w-11 rounded-full" src="${post.profile_image}" alt="">
                <div >
                    <h1 class="font-bold">${post.author.name}</h1>
                    ${designation}
                </div>
            </div>
        </div>
        `;
        latestPostContainer.appendChild(cardPost)
    })
}

const loadPostCategroy = (category) =>{
    handleSpinner("block");
    // setTimeout("block")
    fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`)
       .then(res => res.json())
       .then(data => {
        // console.log(data.posts)
        const posts = data.posts
        // console.log(posts)
        displayPosts(data.posts)
       })
}

const handleSearch = () =>{
    const searchField = document.getElementById('search-field');
    const value = searchField.value
    if(value){
        loadPostCategroy(value)
    }
    else{
        alert('Please enter valid string')
    }
}

const handleSpinner = () => {
    // setTimeout(() =>{
        
    // }, 2000)
    document.getElementById('loading-spiner').style.display = status;
}




loadPostCategroy()
latestPostLoad()
dataLoad()

 