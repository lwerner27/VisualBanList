// Variables
let startDate = "2018-02-05"

let cardIndex = 0
let rowIndex = 0
let rowArray = []


// Functions
// ---------------------------------------------------------------

// Gets The banlist and calls other setup functions
function getBanlist (date) {

    let requestUrl = `https://www.ygohub.com/api/banlist_info?region=TCG&start_date=${date}&game_type=Advanced`

    $.ajax({url: requestUrl, method: "GET"})
    .then(function (res) {

        let banList = JSON.parse(res).banlist 

        // console.log(banList)

        let numOfRows = banList.cards.length / 4

        // createRows(numOfRows)

        for (let i = 0; i < banList.cards.length; i++) {
            getCard(banList.cards[i].card_name)
        }

    })
}

// Creates needed amount of rows
function createRows (length) {
    for (let i = 0; i < length; i++) {
        let newRow = $("<div>").attr("class", 'row')
        newRow = $("<div>").attr("id", `row-${i}`)
        rowArray.push(newRow)
    }
}

function getCard (cardName) {
    let cardUrl = `https://www.ygohub.com/api/card_info?name=${cardName}`

    $.ajax({url: cardUrl, method: "GET"})
    .then(function (res) {

        let cardObject =  JSON.parse(res)

        // console.log(cardObject)
        
        createCardDiv(cardObject)

    })

}

function createCardDiv (cardObject) {
    let newCardDiv = $("<div>")

    newCardDiv.attr("class", "card-div center")
    newCardDiv.attr("data-value", cardObject.card.name)
    
    let cardName = $("<h5>")
    cardName.text(cardObject.card.name)

    let cardImg = $("<img>")
    cardImg.attr("src", cardObject.card.image_path)

    let status = $("<p>")
    status.text(`Status: ${cardObject.card.legality.TCG.Advanced}`)

    let cardText = $("<p>")
    cardText.text(cardObject.card.text)

    newCardDiv.append(cardName, cardImg, status, cardText)

    $("#main-container").append(newCardDiv)

}

getBanlist(startDate)

