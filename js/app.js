const loadPhones = async (searchText, dataLimit) => {
    const url = (`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    try {
        const res = await fetch(url)
        const data = await res.json();
        displayPhone(data.data, dataLimit);
    } catch (error) {
        console.log(error);
    }
}


const displayPhone = (phone, dataLimit) => {
    // console.log(phone);
    const phoneContainer = document.getElementById('phone-container')
const showAll = document.getElementById('show-all')
    if(dataLimit && phone.length > 6){
        phone = phone.slice(0,6)
        showAll.classList.remove('hidden')
    }else{
        showAll.classList.add('hidden')
    }

// no found message
    const noFoundMessage = document.getElementById('no-found-message')
    if(phone.length === 0){
        noFoundMessage.classList.remove('hidden')
    }else{
        noFoundMessage.classList.add('hidden')
    }

    phoneContainer.innerText = '';
    phone.forEach(element => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('grid')
        phoneDiv.innerHTML = `
        <div class="card w-96 bg-base-400 shadow-xl ">
                    <img class="w-52 mx-auto" src="${element.image}" alt="Shoes" />
                    <div class="card-body">
                        <h2 class="card-title">${element.phone_name}</h2>
                        <p>${element.brand}</p>
                        <div class="card-actions justify-end">
                            <label for="my-modal-6" onclick="loadPhoneDetail('${element.slug}')" href="#" class="btn btn-primary">Show Details</label>
                            
                        </div>
                    </div>
                </div>
        `
        phoneContainer.appendChild(phoneDiv)
    });
    toggleSpinner(false)
}

const processSearch = (dataLimit)=>{
    toggleSpinner(true)
    const searchField= document.getElementById('search-field')
    loadPhones(searchField.value, dataLimit);
    searchField.value = '';
}

const searchPhone =()=>{
    processSearch(6)
 }

//  input field enter key event handler
 document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(6)
    }
 })

 const toggleSpinner = (isLoading)=>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('hidden')
    }else{
        loaderSection.classList.add('hidden')
    }
 }

 const buttonShowAll =()=>{
   processSearch()
 }

 const loadPhoneDetail = async (id)=>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetail(data.data);
 }

 const displayPhoneDetail = (phone)=>{
    console.log(phone);
    const phoneName = document.getElementById('phone-name')
    phoneName.innerText = phone.name

    const phoneDetail = document.getElementById('phone-detail')
    phoneDetail.innerHTML=`
    <img class="mx-auto" src="${phone.image}" alt="">
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'Release date not found'}</p>
    <p class="text-center">Main Features</p>
    <p>Display: ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No Display Information Found'}</p>
    <p>Storage: ${phone.mainFeatures.memory}</p>
    <p>Sensors: ${phone.mainFeatures.sensors}</p>
    <p>Wlan: ${phone.others.WLAN}</p>

    `
    
 }

loadPhones('apple');