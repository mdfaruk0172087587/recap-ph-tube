// Categories name button 
const buttonCategories = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
  const data = await response.json();
  displayButtonLoad(data.categories)
}
buttonCategories();
// display button load
const displayButtonLoad = (categories) => {
  const container = document.getElementById('btn-container');
  categories.forEach(element => {
    // console.log(element)
    const div = document.createElement('div');
    div.innerHTML = `
        <button id="btn-${element.category_id}" onclick="buttonLoadCategory('${element.category_id}')" class="btn hover:text-white hover:bg-red-500">${element.category}</button>
        `;
    container.appendChild(div);
  });
}

// all video load
const allVideoLoad = async (inputText = '') => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${inputText}`);
  const data = await response.json();
  displayAllVideos(data.videos);
  removeActive();
  document.getElementById('btn-all').classList.add('active');
}

// all video display 
const displayAllVideos = (videos) => {
  const videoContainer = document.getElementById('video-container');
  videoContainer.innerHTML = '';
  if (videos.length === 0) {
    videoContainer.innerHTML = `
     <div class="flex flex-col col-span-full justify-center items-center py-20">
        <img src="asst/Icon.png" alt="">
        <h1 class="text-2xl font-semibold mt-3 text-center">Oops!! Sorry, There is no <br> content here</h1>
       </div>
    `;
    return;
  }
  videos.forEach(video => {
    // console.log(video)
    const div = document.createElement('div');
    div.innerHTML = `
     <div class="card bg-base-100  shadow-sm">
            <figure class="relative">
              <img class="w-full h-[150px] object-cover"
                src="${video.thumbnail}"
                alt="Shoes" /> <span class="text-sm text-white bg-black px-2 absolute bottom-2 right-2 rounded">3hrs 56 min ago</span>
            </figure>
            <div class=" flex py-5 gap-3 px-0">
                <!-- avatar -->
              <div>
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
              </div>
              <!-- text -->
               <div>
                <h1 class="text-2xl font-semibold">${video.title}</h1>
                <p class="text-gray-400 text-sm flex">${video.authors[0].profile_name}
                   ${video.authors[0].verified === true ? ` <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=bE5mRAhk65Br&format=gif" alt="">` : ``}
                </p>
                <p class="text-gray-400 text-sm">${video.others.views} views</p>
               </div>
              
            </div>
            <button onclick="viewVideoID('${video.video_id}')" class="btn btn-block">Details</button>
          </div>
    `;
    videoContainer.appendChild(div);
  })
}


// video load category id
const buttonLoadCategory = async (id) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
  const data = await response.json();
  displayAllVideos(data.category);
  removeActive()
  const activeButton = document.getElementById(`btn-${id}`);
  activeButton.classList.add('active');

}
// remove active class
const removeActive = () => {
  const activeClass = document.getElementsByClassName('active');
  for (const btn of activeClass) {
    btn.classList.remove('active');
  }
}
// video id mo te details show
const viewVideoID = async (videoID) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`);
  const data = await response.json();
  displayModal(data.video)
}
// view display details
const displayModal = (video) => {
  // console.log(video)
  document.getElementById('view_modal').showModal();
  const container = document.getElementById('view-container');
  container.innerHTML = `
  <div class="card bg-base-100 image-full w-96 shadow-sm">
  <figure>
    <img class="object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    
  </div>
</div>
  `
}
// search bar
document.getElementById('input-box').addEventListener('keyup', (e) => {
  const inputText = e.target.value;
  allVideoLoad(inputText)
})



