const API_KEY = '30989027-ff1c7f924c0d6be10aa8f4236';
const URL = "https://pixabay.com/api/";


export function apiGetImages(query, page){
    const searchParams = new URLSearchParams({
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
        page: page,
        q: query,
    })

    return fetch(`${URL}?${searchParams}`)
    .then(response => {
        if(!response.ok){
           return Promise.reject( new Error())  
        } else{
          return response.json();
        }
    })
}