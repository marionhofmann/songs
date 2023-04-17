
var mySongs = readTextFile();

generateList(mySongs);

const searchInput = document.querySelector('.input');

searchInput.addEventListener("input", (e) => {
    let value = e.target.value
    if (value.trim().length >= 0) {
        clearList();
    }
    clearTimeout(this.delay);
    this.delay = setTimeout(function(){
        if (value && value.trim().length >= 3){
            value = value.trim().toLowerCase()
            var splitVal = value.split(" ");
            var maxVisible = 200;
            setVisible(Object.keys(mySongs).reduce(function(r, e) {
                if (maxVisible <= 0) {
                    return r;
                }
                var found = true;
                splitVal.forEach(
                    function(value) {
                        if (!mySongs[e].toLowerCase().includes(value)) {
                            found = false;
                        }
                    })
                if (found) {
                    r[e] = mySongs[e];
                    maxVisible--;
                }
                return r;
              }, {}))
        }
   }.bind(this), 800);
});

const clearButton = document.getElementById('clear');

function startFresh(e) {
    e.preventDefault();
    document.getElementsByClassName("form")[0].reset();
    document.getElementById('error').style.display = 'none';
    
    clearList();
    return false;
}

function clearList(){
    var resultClass = document.getElementsByClassName('result-line');
    for (const res of resultClass){
        res.style.display = "none";
    }
}

function noResults(){
    console.log('no results ')
    clearList();
    document.getElementById('error').style.display = 'flex';
}

function setVisible(songs){
    if (Object.keys(songs).length < 1) {
        noResults();
    } else {
        document.getElementById('error').style.display = 'none';
        for (const [key, value] of Object.entries(songs)){
            list = document.getElementById(key);
            list.style.display = 'flex';
        }
    }
}

function generateList(songs){
    var prototype = document.getElementById("prototype");
    var list = document.getElementById("results");

    for (const [key, song] of Object.entries(songs)){
        var clone = prototype.cloneNode(true);
        clone.id = key;
        clone.querySelectorAll('.result-text')[0].innerHTML = song;
        list.appendChild(clone)
    }
    loadFavs();
}

function readTextFile()
{
    var allText = [];
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", 'songs.json?12', false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status == 0))
        {
            allText = JSON.parse(rawFile.responseText);
        }
    }
    rawFile.send(null);

    // get all object keys and iterate over them
    Object.keys(allText).forEach(function(key) {
        // assign object property based on old property value
        allText["song_" + key] = allText[key];
        // update name property
        allText["song_" + key].name = "song_" + key;
        // delete old object property
        delete allText[key];
    })

    return allText;
}

function loadFavs() {
    var favList = getCookie('music-fav-list')
    var favArr = favList.split(',')
    favArr.forEach(function(val) {
        if (val) {
            var element = document.getElementById(val);
            element.class = element.classList.add("my-fav");
            element.querySelectorAll('img')[0].src="red-heart.png";
        }
    })
}

function showFavs(e) {
    startFresh(e);
    var favList = getCookie('music-fav-list')
    var favArr = favList.split(',')

    favArr.forEach(id => {
        if (id) {
            list = document.getElementById(id);
            list.style.display = 'flex';
        }
    });
}

function toggleFav(element) {
    var favList = getCookie('music-fav-list')

    if (element.classList.contains("my-fav")) {
        element.classList.remove("my-fav");
        element.querySelectorAll('img')[0].src="white-heart.png";
        favList = favList.replaceAll(element.id + ',','');
    } else {
        element.class = element.classList.add("my-fav");
        element.querySelectorAll('img')[0].src="red-heart.png";
        favList += element.id + ',';
    }
    setCookie('music-fav-list', favList);
}

function setCookie(name,value) {
    // max of 400 days expiry
    var date = new Date();
    date.setTime(date.getTime() + (400*24*60*60*1000));
    var expires = "; expires=" + date.toUTCString();

    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return '';
}