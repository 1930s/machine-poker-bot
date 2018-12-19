let MonteCarloSimulation = require('../lib/monte-carlo-simulation.js')

// get those data from command line
let holeCards = ["7s", "Ts"]
let communityCards = []
let nbOtherPlayers = 2

var handLikelyHoodToWin = MonteCarloSimulation.simulateMultipleRound(1000, holeCards, communityCards, nbOtherPlayers)
console.log('handLikelyHoodtoWin', handLikelyHoodToWin)