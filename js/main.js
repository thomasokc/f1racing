const DOM_Elements = {
    racers: '.racer-list',
}

const create_racer = (position,Driver, lastName,racerNation) =>{
    const html = `<a href ='#' class= 'list-group-item list-group-item-action list-group-item-light' position="${position}" driver="${Driver}">#${position}- ${lastName}, Nationality: ${racerNation}</a>`
    document.querySelector(DOM_Elements.racers).insertAdjacentHTML("beforeend",html)
}

const loadData = async () => {
    const racerList = await racer_data();

    racerList.forEach(racer => create_racer(racer.position,racer.Driver,racer.Driver.familyName,racer.Driver.nationality));
}

let submitButton = document.getElementById('submit')

const form = document.querySelector('#testDataForm')

form.addEventListener('submit', (event) =>{
    event.preventDefault()
    let seasonName = event.path[0][0].value
    let roundName = event.path[0][1].value
    
})

const racer_data = async () => {
    let response = await axios.get(`https://ergast.com/api/f1/2020/1/driverStandings.json`)
    console.log(response)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
}