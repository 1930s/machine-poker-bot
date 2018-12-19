let MonteCarloSimulation = require('./monte-carlo-simulation.js')

module.exports = function () {

	var info = {
		name: "HonestPlayer Bot"
	};

	function update(game) {
		if (game.state === "complete") return

		let myHoleCards = game.self.cards
		let communityCards = game.community
		let nbOtherPlayers = game.players.length - 1

		var likelyHoodToWin = MonteCarloSimulation.simulateMultipleRound(100, myHoleCards, communityCards, nbOtherPlayers)
		// console.log('chips', game.self.chips)

		if (likelyHoodToWin > 0.5 / nbOtherPlayers) {
			return game.betting.call
		} else {
			return 0
		}
	};

	return { update: update, info: info }
}
