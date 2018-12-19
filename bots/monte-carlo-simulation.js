let hoyle = require('hoyle')

// let holeCards = ["Ts", "Ts"]
// let communityCards = []
// let nbPlayers = 8

// // simulateOneRound(holeCards, communityCards, nbPlayers)

// var handLikelyHoodToWin = simulateMultipleRound(1000, holeCards, communityCards, nbPlayers)
// console.log('handLikelyHoodtoWin', handLikelyHoodToWin)



////////////////////////////////////////////////////////////////////////
//		Code
////////////////////////////////////////////////////////////////////////

function pickRandomCard() {
	var SUITS = ['s', 'h', 'c', 'd']
	var cardValue = hoyle.Card.VALUES[Math.floor(Math.random() * hoyle.Card.VALUES.length)]
	var cardSuit = SUITS[Math.floor(Math.random() * SUITS.length)]
	var card = cardValue + cardSuit
	return card
}

function pickUnusedCards(nbCards, usedCards) {
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
//		Code
////////////////////////////////////////////////////////////////////////

function simulateMultipleRound(nbRounds, holeCards, communityCards, nbPlayers) {
	var result = 0
	for (let roundIndex = 0; roundIndex < nbRounds; roundIndex++) {
		var amIWinning = simulateOneRound(holeCards, communityCards, nbPlayers)
		if (amIWinning === true) {
			result += 1
		} else {
			result += 0
		}
	}
	let average = result / nbRounds
	return average
}


function simulateOneRound(holeCards, communityCards, nbPlayers) {
	// generate community cards
	let randomCommunityCards = pickUnusedCards(5 - communityCards.length, holeCards.concat(communityCards))
	let finalCommunityCards = communityCards.concat(randomCommunityCards)

	// generate other players hold cards
	let otherPlayersHoleCards = []
	let unusedCards = pickUnusedCards(nbPlayers * 2, holeCards.concat(finalCommunityCards))
	for (let i = 0; i < nbPlayers; i++) {
		let otherPlayerHoleCards = unusedCards.slice(i * 2, i * 2 + 2)
		otherPlayersHoleCards[i] = otherPlayerHoleCards
	}

	let myFinalCards = holeCards.concat(finalCommunityCards)
	let myFinalHand = hoyle.Hand.make(myFinalCards)

	let otherPlayersFinalHand = []
	for (let i = 0; i < nbPlayers; i++) {
		let otherPlayerFinalCards = otherPlayersHoleCards[i].concat(finalCommunityCards)
		otherPlayersFinalHand[i] = hoyle.Hand.make(otherPlayerFinalCards)
	}


	let finalHands = [myFinalHand].concat(otherPlayersFinalHand)
	let winnersHand = hoyle.Hand.pickWinners(finalHands)
	let winnerIndex = finalHands.indexOf(winnersHand[0])

	////////////////////////////////////////////////////////////////////////
	//		display result
	////////////////////////////////////////////////////////////////////////


	// console.log('###########################')
	// console.log('my holeCards', holeCards)
	// console.log('----')
	// for (let i = 0; i < nbPlayers; i++) {
	// 	let otherPlayerHoleCards = otherPlayersHoleCards[i]
	// 	console.log(`other player #${i} hole`, otherPlayerHoleCards)
	// }
	// console.log('----')
	// console.log('finalCommunityCards', finalCommunityCards)
	// console.log('###########################')
	// console.log('myFinalHand', myFinalHand.name, 'with', myFinalHand.toString(), 'of rank', myFinalHand.rank)
	// for (let i = 0; i < nbPlayers; i++) {
	// 	let otherPlayerFinalHand = otherPlayersFinalHand[i]
	// 	console.log(`other player #${i} hand`, otherPlayerFinalHand.name, 'with', otherPlayerFinalHand.toString(), 'of rank', otherPlayerFinalHand.rank)
	// }
	// console.log('winnerIndex', winnerIndex)

	let amIWinning = winnerIndex === 0
	return amIWinning
}


////////////////////////////////////////////////////////////////////////
//		Code
////////////////////////////////////////////////////////////////////////
exports.simulateMultipleRound = simulateMultipleRound
