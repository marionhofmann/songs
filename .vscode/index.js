
var mySongs = readTextFile();

generateList(mySongs);

const searchInput = document.querySelector('.input');

searchInput.addEventListener("input", (e) => {
    let value = e.target.value
    clearList()
    clearTimeout(this.delay);
    this.delay = setTimeout(function(){
        if (value && value.trim().length > 3){
            value = value.trim().toLowerCase()
            setVisible(Object.keys(mySongs).reduce(function(r, e) {
                var splitVal = value.split(" ");
                var found = true;
                splitVal.forEach(
                    function(value) {
                        if (!mySongs[e].toLowerCase().includes(value)) {
                            found = false;
                        }
                    });
                if (found) {
                    r[e] = mySongs[e]
                }
                return r;
              }, {}))
       } else {
           clearList()
       }
   }.bind(this), 800);
});

const clearButton = document.getElementById('clear');

clearButton.addEventListener("click", () => {
    clearList()
})

function clearList(){
    var resultClass = document.getElementsByClassName('result-line');
    for (const res of resultClass){
        res.style.display = "none";
    }
}

function noResults(){
    const error = document.createElement('li')
    error.classList.add('error-message')

    const text = document.createTextNode('No results found. Sorry!')
    error.appendChild(text)
    list.appendChild(error)
}

function setVisible(songs){

    for (const [key, value] of Object.entries(songs)){

        console.log(key);
        console.log(value);
        console.log(' ---- ');
        list = document.getElementById(key);
        list.style.display = 'block';
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
}

function readTextFile()
{
    var allText = [];
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", 'songs.json?1', false);
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
    return null;
}