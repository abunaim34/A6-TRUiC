const dataLoad = () => {
    const url = 'https://openapi.programming-hero.com/api/retro-forum/posts'
    fetch(url)
       .then(res => res.json())
       .then(data => {
        const posts = data.posts
        // console.log(data.posts)
        displayPosts(posts)
       })
}

const displayPosts = (posts) =>{
    console.log(posts)
    const allPostContainer = document.getElementById('post-container')
    posts.forEach(post =>{
        console.log(post)
        const postCard = document.createElement('div')
        postCard.classList = `flex flex-col lg:flex-row bg-[#F3F3F5] lg:w-[702px] rounded-2xl`
        postCard.innerHTML = `
        <div class="avatar online w-20 h-20 pl-4 pt-4">
        <div class="w-24">
          <img class=" rounded-2xl" src="${post.image}" />
        </div>
        </div>
        <div class="mt-5 px-3 pb-2">
            <div class="space-x-4 mb-2 flex text-[#12132DCC]">
                <p># <span>${post.category}</span></p>
                <p> Author : <span>${post.author.name}</span></p>
            </div>
            <div class="">
                <h3 class="text-xl font-bold">${post.title}</h3>
                <p class="lg:w-[520px] pt-4">${post.description} </p>
                <div class="flex justify-between items-center mt-6 mb-11">
                    <div class="flex items-center mt-6 gap-2 lg:gap-7">
                        <div><i class="fa-solid fa-message"></i><span class="pl-3">${post.comment_count}</span></div>
                        <div><i class="fa-regular fa-eye"></i><span class="pl-3">${post.view_count}</span></div>
                        <div><i class="fa-regular fa-clock"></i><span class="pl-3">${post.posted_time}</span> Min</div>
                    </div>
                    <div class="text-white ">
                        <i class="fa-regular fa-envelope bg-[#10B981] p-1 rounded-full"></i>
                    </div>
                </div>
            </div>
        </div>
        `;
        allPostContainer.appendChild(postCard)
    })
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
        // console.log(post)
        const cardPost = document.createElement('div')
        cardPost.classList - 'card lg:w-96 bg-base-100 shadow-xl';
        cardPost.innerHTML = `
        <figure class="px-8 pt-10">
        <img src="${post.cover_image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body space-y-3">
            <div class="flex justify-between items-center gap-3">
            <img src="./images/birth.png" alt="">
            <p>${post.author.posted_date}</p>
            </div>
            <h1 class="font-extrabold">${post.title}</h1>
            <p class="text-[#12132D99]">${post.description}</p>
            <div class="flex items-center gap-4">
            <img class="h-11 w-11 rounded-full" src="${post.profile_image}" alt="">
            <div >
                <h1 class="font-bold">${post.author.name}</h1>
                <p>${post.author.designation}</p>
            </div>
            </div>
        </div>
        `;
        latestPostContainer.appendChild(cardPost)
    })
}

latestPostLoad()
dataLoad()

 