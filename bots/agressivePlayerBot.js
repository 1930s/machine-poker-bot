let MonteCarloSimulation = require('./monte-carlo-simulation.js')

// let holeCards = ["Ts", "Ts"]
// let communityCards = []
// let nbPlayers = 8
// var handLikelyHoodToWin = MonteCarloSimulation.simulateMultipleRound(10000, holeCards, communityCards, nbPlayers)
// console.log('handLikelyHoodtoWin', handLikelyHoodToWin)

function computePotSize(gameData){
	let allWages = gameData.players.map((player)=> player.wagered)
	let potSize = allWages.reduce( (accumulator, currentValue) => accumulator + currentValue)
	return potSize
}

function computePositionIndex(gameData){
	let positionIndex = gameData.players.findIndex((player)=> player.name === gameData.self.name)
	return positionIndex
}


module.exports = function () {

	var info = {
		name: "Agressive Player"
	};

	function update(game) {
		if (game.state === "complete") return

		let myHoleCards = game.self.cards
		let communityCards = game.community
		let nbOtherPlayers = game.players.length - 1

		var likelyHoodToWin = MonteCarloSimulation.simulateMultipleRound(100, myHoleCards, communityCards, nbOtherPlayers)
		console.log('handLikelyHoodtoWin', likelyHoodToWin)

		var potSize = computePotSize(game)
		var potOdds = potSize / game.betting.call	// FIXME what is game.betting.call === 0
		var pokerEquity = likelyHoodToWin
		var potEquity = Math.round(likelyHoodToWin*potSize)
		console.log('potSize', potSize, 'potEquity', potEquity, 'potOdds', potOdds)


		// my own version of expected value
		// - this is 'another' version - it seems very similar - https://www.cardschat.com/poker-odds-expected-value.php
		// - is that the expected value before i do my move from update() or after... it is a one-off
		// - TODO do read this post, it seems right on point, and then apply it
		// - build another bot using expectedValue. expectedValueBot.js
		var probabilityToWin = likelyHoodToWin
		var probabilityToLoose = (1-probabilityToWin)
		var expectedValue = probabilityToWin * (potSize - game.self.wagered) - probabilityToLoose * game.self.wagered
		console.log('expectedValue', expectedValue)

		// var positionIndex = computePositionIndex(game)
		// console.log('positionIndex', positionIndex)

		// console.log('chips', game.self.chips, game.betting.raise, game.betting.call)
		// debugger
		if (likelyHoodToWin > 2 / nbOtherPlayers) {
			return game.betting.raise * 6
		} else 
		if (likelyHoodToWin > 1 / nbOtherPlayers) {
			return game.betting.raise * 2
		} else 
		if (likelyHoodToWin > 0.7 / nbOtherPlayers) {
			return game.betting.raise
		} else 
		if (likelyHoodToWin > 0.4 / nbOtherPlayers) {
			return game.betting.call
		} else 
		{
			return 0
		}
	};

	return { update: update, info: info }

}
