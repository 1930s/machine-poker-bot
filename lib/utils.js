let hoyle = require('hoyle')

////////////////////////////////////////////////////////////////////////
//		Utils to generate random cards from a deck
////////////////////////////////////////////////////////////////////////

function pickRandomCard() {
	var SUITS = ['s', 'h', 'c', 'd']
	var cardValue = hoyle.Card.VALUES[Math.floor(Math.random() * hoyle.Card.VALUES.length)]
	var cardSuit = SUITS[Math.floor(Math.random() * SUITS.length)]
	var card = cardValue + cardSuit
	return card
}

exports.pickUnusedCards = function pickUnusedCards(nbCards, usedCards) {
	var unusedCards = []
	while (unusedCards.length !== nbCards) {
		var randomCard = pickRandomCard()
		if (usedCards.indexOf(randomCard) !== -1) continue
		if (unusedCards.indexOf(randomCard) !== -1) continue
		unusedCards.push(randomCard)
	}
	return unusedCards
}

////////////////////////////////////////////////////////////////////////
//		Utils for gameData
////////////////////////////////////////////////////////////////////////


exports.computePotSize = function computePotSize(gameData){
	let allWages = gameData.players.map((player)=> player.wagered)
	let potSize = allWages.reduce( (accumulator, currentValue) => accumulator + currentValue)
	return potSize
}

exports.computePositionIndex = function computePositionIndex(gameData){
	let positionIndex = gameData.players.findIndex((player)=> player.name === gameData.self.name)
	return positionIndex
}
