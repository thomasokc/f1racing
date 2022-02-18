const DOM_Elements = {
    racers: '.racer-list',
}


const form = document.querySelector('#testDataForm')

form.addEventListener('submit', (event) =>{
    event.preventDefault()
    let season = document.querySelector('#season')
    let round = document.querySelector('#round')
    console.log(season, round)
    let seasonName = event.path[0][0].value
    let roundName = event.path[0][1].value
    console.log(seasonName, roundName)
    loadData(seasonName, roundName)
})



const racer_data = async (seasonName, roundName) => {
    document.querySelector('#testDataForm')
    let response = await axios.get(`https://ergast.com/api/f1/${seasonName}/${roundName}/driverStandings.json`)
    console.log(response)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
}

const loadData = async (seasonName, roundName) => {
    clearData()
    const racerList = await racer_data(seasonName, roundName);
    racerList.forEach(racer => create_racer(racer.position,racer.Driver,racer.Driver.familyName,racer.Driver.nationality));
}

const create_racer = (position,Driver, lastName,racerNation) =>{
    const html = `<a href ='#' class= 'list-group-item list-group-item-action list-group-item-light' position="${position}" driver="${Driver}">#${position}- ${lastName}, Nationality: ${racerNation}</a>`
    document.querySelector(DOM_Elements.racers).insertAdjacentHTML("beforeend",html)
}

const clearData = () =>{
    document.querySelector(DOM_Elements.racers).innerHTML = '';
}