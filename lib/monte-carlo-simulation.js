let hoyle = require('hoyle')
let utils = require('../lib/utils')

////////////////////////////////////////////////////////////////////////
//		Code
////////////////////////////////////////////////////////////////////////

function simulateMultipleRound(nbRounds, holeCards, communityCards, nbOtherPlayers) {
	var result = 0
	for (let roundIndex = 0; roundIndex < nbRounds; roundIndex++) {
		var amIWinning = simulateOneRound(holeCards, communityCards, nbOtherPlayers)
		if (amIWinning === true) {
			result += 1
		} else {
			result += 0
		}
	}
	let average = result / nbRounds
	return average
}


function simulateOneRound(holeCards, communityCards, nbOtherPlayers) {
	// generate community cards
	let randomCommunityCards = utils.pickUnusedCards(5 - communityCards.length, holeCards.concat(communityCards))
	let finalCommunityCards = communityCards.concat(randomCommunityCards)

	// generate other players hold cards
	let otherPlayersHoleCards = []
	let unusedCards = utils.pickUnusedCards(nbOtherPlayers * 2, holeCards.concat(finalCommunityCards))
	for (let i = 0; i < nbOtherPlayers; i++) {
		let otherPlayerHoleCards = unusedCards.slice(i * 2, i * 2 + 2)
		otherPlayersHoleCards[i] = otherPlayerHoleCards
	}

	let myFinalCards = holeCards.concat(finalCommunityCards)
	let myFinalHand = hoyle.Hand.make(myFinalCards)

	let otherPlayersFinalHand = []
	for (let i = 0; i < nbOtherPlayers; i++) {
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
	// for (let i = 0; i < nbOtherPlayers; i++) {
	// 	let otherPlayerHoleCards = otherPlayersHoleCards[i]
	// 	console.log(`other player #${i} hole`, otherPlayerHoleCards)
	// }
	// console.log('----')
	// console.log('finalCommunityCards', finalCommunityCards)
	// console.log('###########################')
	// console.log('myFinalHand', myFinalHand.name, 'with', myFinalHand.toString(), 'of rank', myFinalHand.rank)
	// for (let i = 0; i < nbOtherPlayers; i++) {
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
