// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
var outcome_1 = document.getElementById('recom')
var outcome_2 = document.getElementById('play')
const spinner = document.getElementById("spinner");



// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            
            fetch(`https://movie-recommendation-taral.herokuapp.com/${userData}`)
            .then(response => response.json())
            .then(result => {
               console.log('Success:', result);
             
             
            })
            .catch(error => {
               console.error('Error:', error);
  
            });
        }
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        spinner.classList.add('show');
        fetch(`https://movie-recommendation-taral.herokuapp.com/${selectData}`,{method:'GET'})
        .then(response => response.json())
        .then(result => {
           console.log('Success');

           outcome_1.innerHTML = `<div class="row justify-content-md-center">
           <div class="col col-lg-2">
             
           </div>
           <div class="col-md-auto">
           <div class="card mx-auto border border-primary border-3" style="width: 20rem;">
  <img src="https://image.tmdb.org/t/p/w200/${result[0].poster_path}" class="card-img-top" alt="...">
  <div class="card-body">
  <h5 class="card-title">${result[0].title}&nbsp<span class="badge bg-warning text-dark position-absolute end-0 me-2 ms-2">${result[0].vote_average}</span></h5>
    <p class="card-text">${result[0].overview}</p>
    <h3><span class="badge bg-warning text-dark"><a href="http://imdb.com/title/${result[0].imdb_id}" target="_blank" >IMDb</a></span></h3>
  </div>
</div>
             
           
           </div>
           <div class="col col-lg-2">
             
           </div> <br><br><br>
          

           <div><p><h1 style="color: azure;">Recommended movies based on your search:</h1></p></div><br><br>` 
           


           elements = result.slice(1,12)
           let moviesHtml = ""
           elements.forEach(element => {
            let movies = `<div class="col">
            <div class="card h-100 border border-warning border-3 ml-3">
              <img src="https://image.tmdb.org/t/p/w200/${element.poster_path}" class="card-img-top" alt="Face/off">
              <div class="card-body">
                <h5 class="card-title">${element.title}&nbsp<span class="badge bg-warning text-dark position-absolute end-0 me-2 ms-2">${element.vote_average}</span></h5>
                <p id="box" class="card-text">${element.overview}</p>
                <h3><span class="badge bg-warning text-dark"><a href="http://imdb.com/title/${element.imdb_id}" target="_blank" >IMDb</a></span></h3>
              </div>
            </div>
          </div>`
             
          moviesHtml += movies
           });
           outcome_2.innerHTML = moviesHtml;
           spinner.classList.remove('show');
           

        })
        .catch(error => {
           console.error('Error:', error);

        });
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}





