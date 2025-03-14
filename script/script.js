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
const allVideoLoad = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
  const data = await response.json();
  displayAllVideos(data.videos);
  removeActive();
  document.getElementById('btn-all').classList.add('active');
}

// all video display 
const displayAllVideos = (videos) => {
  const videoContainer = document.getElementById('video-container');
  videoContainer.innerHTML = ''
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
            <button class="btn btn-block">Details</button>
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
const removeActive = () =>{
  const activeClass = document.getElementsByClassName('active');
  for(const btn of activeClass){
   btn.classList.remove('active');
  }
}



