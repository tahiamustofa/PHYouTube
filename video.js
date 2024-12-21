let selectedCategoryId = null; 
let fetchVideo = async function (url) {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const response = await res.json();
    const all = response.data;
    const divPost = document.getElementById('divPost');
    // console.log(all);
    all.forEach(element => {
        console.log(element)
        const createNew = document.createElement('div');
        createNew.classList = (`flex gap-3`);
        const uniqueId = `btnCat_${element.category_id}`;
        createNew.innerHTML = `
    <button id="${uniqueId}" class="px-4 py-2  flex gap-2 text-gray-700 bg-gray-200 rounded active:bg-red-300">
                ${element.category}
                </button>
                `;
        divPost.appendChild(createNew)
        // Add an event listener for the second button
        const btn = document.getElementById(uniqueId);
        btn.addEventListener('click', () => {
            allID(`${element.category_id}`);
            selectedCategoryId =`${element.category_id}`;
        });

    });
}
const sortId=document.getElementById('sortId');
sortId.addEventListener('click', () => {
    sortClick(selectedCategoryId)
});
async function allID(id) {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const response = await res.json();
    const get = response.data;
    // console.log(get)
    display(get);
}
function display(get) {
    const cardShow = document.getElementById('cardShow');
    cardShow.innerHTML = "";
    get.forEach(item => {
        const innerCont = document.createElement('div');
        function secondsToTime(sec) {
            const h = Math.floor(sec / 3600);
            const m = Math.floor((sec % 3600) / 60);
            return `${h} h ${m}m ago`;
        }
        innerCont.innerHTML = `
          <div class="relative flex  flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
              <div class="relative flex flex-col justify-center items-center h-4/5">
                <img src=" ${item.thumbnail}" alt="" class="w-full lg:h-[500px] h-[400px]">
                <p class="absolute top-4 right-1 p-3 text-white font-bold">

                ${item.others.posted_date ? `<span class="rounded-full text-white bg-purple-500 p-2 shadow-2xl">${secondsToTime(item.others.posted_date)}</span>` : ""}
                        </p>
               <div class="absolute mx-auto lg:top-1/2 top-1/3 lg:w-96 w-72">
                <div
                class="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                <span class="absolute top-10 z-0 h-2 w-2 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[100]"></span>
                <div class="relative z-10 mx-auto max-w-md">
                    <span class="grid h-2 w-2 place-items-center rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-sky-400">
                        
                       </span>
                    <div class="flex justify-between gap-5 my-4">
          <div class="rounded-full"><img src="${item.authors[0].profile_picture}" alt="" class="rounded-full w-[70px] h-[70px]"></div>
<div class="text-xl text-gray-600 transition-all duration-300 group-hover:text-white/90">
                        <p class="font-bold">${item.title}</p>
                    </div>
                     
          </div>
        <div class="flex justify-between gap-1 my-2"><p>${item.authors[0].profile_name}</p>
                              <p>${item.authors[0].verified ? '<span class="rounded-full text-white bg-green-400">✔</span>' : ''}</p></div>
                    <div class="text-base font-semibold leading-7">
                        <p>
                            <a href="#" class="text-sky-500 transition-all duration-300 group-hover:text-white">views
                               ${item.others.views}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
               </div>
              </div>
                    </div> `
       
        cardShow.appendChild(innerCont);
        
    });
}
async function sortClick(id) {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const response = await res.json();
    const get = response.data;
    const sortCont = get.sort((a, b) => {const A=(parseFloat(a.others.views.replace(/[^0-9.]/g, '')));
        const B= (parseFloat(b.others.views.replace(/[^0-9.]/g, '')));
         return B-A;});
    console.log(sortCont)
    display(sortCont);
}

fetchVideo();
