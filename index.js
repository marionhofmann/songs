var mySongs = readTextFile();

console.log(mySongs);

const searchInput = document.querySelector('.input');

searchInput.addEventListener("input", (e) => {
    let value = e.target.value
    clearList()

    if (value && value.trim().length > 0){
         value = value.trim().toLowerCase()
         setList(mySongs.filter(song => {
            return song.toLowerCase().includes(value)
        }))
    } else {
        clearList()
    }

});

const clearButton = document.getElementById('clear');

clearButton.addEventListener("click", () => {
    clearList()
})

function clearList(){
    list.innerHTML = ''
}

function noResults(){
    const error = document.createElement('li')
    error.classList.add('error-message')

    const text = document.createTextNode('No results found. Sorry!')
    error.appendChild(text)
    list.appendChild(error)
}

function setList(results){

    for (const song of results){
        const resultItem = document.createElement('li')
        resultItem.classList.add('result-item')
        const text = document.createTextNode(song)
        resultItem.appendChild(text)
        list.appendChild(resultItem)
    }

    if (results.length === 0 ){
        noResults()
    }
}

function readTextFile()
{
    var allText = [];
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", 'songs.json', false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = JSON.parse(rawFile.responseText);
            }
        }
    }
    rawFile.send(null);
    return allText;
}