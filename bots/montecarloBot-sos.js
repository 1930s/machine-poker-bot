// TODO put all that in monte-carlo.js

let MonteCarloSimulation = require('./monte-carlo-simulation.js')

// debugger

let hoyle = require('hoyle')

// let garyHand = hoyle.Hand.make(["2s","3s","4h","5c","As","Ts","8d"])
// let mikeHand = hoyle.Hand.make(["5s","Ts","3h","Ac","2s","Ts","8d"])
// let steveHand = hoyle.Hand.make(["5s","5h","3s","3c","2s","Ts","3d"])
// let winners = hoyle.Hand.pickWinners([garyHand, mikeHand, steveHand])
// console.log(winners)


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


let holeCards = ["Ts", "Ts"]
let communityCards = []
let nbPlayers = 8

// simulateOneRound(holeCards, communityCards, nbPlayers)

var handLikelyHoodToWin = MonteCarloSimulation.simulateMultipleRound(1000, holeCards, communityCards, nbPlayers)
console.log('handLikelyHoodtoWin', handLikelyHoodToWin)

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



module.exports = function () {

	var info = {
		name: "MontecarloBot"
	};

	function update(game) {
		if (game.state === "complete") return

		let myHoleCards = game.self.cards
		let communityCards = game.community
		let nbOtherPlayers = game.players.length - 1

		var handLikelyHoodToWin = simulateMultipleRound(500, myHoleCards, communityCards, nbOtherPlayers)
		console.log('handLikelyHoodtoWin', handLikelyHoodToWin)
		// var heads = handLikelyHoodToWin >
		// debugger
		if (handLikelyHoodToWin > 0.6) {
			return game.betting.raise * 3;
			// } else if (handLikelyHoodToWin > 0.85) {
			// 	return game.betting.raise * 4;
		// } else if (handLikelyHoodToWin > 0.5) {
		// 	return game.betting.raise * 1.5;
		} else if (handLikelyHoodToWin > 0.55) {
			return game.betting.raise;
		} else if (handLikelyHoodToWin < 0.4 ) {
			return 0;
		} else {
			return game.betting.call
		}

		// var heads = Math.random() > 0.5;
		// if (heads) {
		// 	return game.betting.raise;
		// } else {
		// 	return game.betting.call
		// }
	};

	return { update: update, info: info }

}
