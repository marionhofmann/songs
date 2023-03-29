var mySongs = readTextFile();

const searchInput = document.querySelector('.input');

searchInput.addEventListener("input", (e) => {
    let value = e.target.value

    if (value && value.trim().length > 0){
         value = value.trim().toLowerCase()
         setList(mySongs)
    } else {
        clearList()
    }

});

const clearButton = document.getElementById('clear');

clearButton.addEventListener("click", () => {
    clearList()
})

function clearList(){
    while (list.firstChild){
        list.removeChild(list.firstChild)
    }
}

function noResults(){
    const error = document.createElement('li')
    error.classList.add('error-message')

    const text = document.createTextNode('No results found. Sorry!')
    error.appendChild(text)
    list.appendChild(error)
}

function setList(results){

    for (const person of results){
        const resultItem = document.createElement('li')
        resultItem.classList.add('result-item')
        const text = document.createTextNode(person.name)
        resultItem.appendChild(text)
        list.appendChild(resultItem)
    }

    if (results.length === 0 ){
        noResults()
    }
}






function readTextFile()
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", 'songs.txt', false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
    return allText;
}