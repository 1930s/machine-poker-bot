var MachinePoker = require('machine-poker')

var CallBot = require('./bots/callBot')
var RandBot = require('./bots/randBot')
var FoldBot = require('./bots/foldBot')
var AggressiveBot = require('./bots/agressivePlayerBot.js')
var HonestBot = require('./bots/honestPlayerBot.js')


var table = MachinePoker.create({
	maxRounds: 150,
	betting: MachinePoker.betting.noLimit(25,50),
	chips: 30000,
});

// Add some observers
var narrator = MachinePoker.observers.narrator
var fileLogger = MachinePoker.observers.fileLogger('./examples/results.json');
// table.addObserver(narrator);
// table.addObserver(fileLogger);

var LocalSeat = MachinePoker.seats.JsLocal
var players = [
	// LocalSeat.create(CallBot),
	// LocalSeat.create(CallBot),
	// LocalSeat.create(CallBot),
	// LocalSeat.create(HonestBot),
	// LocalSeat.create(HonestBot),
	// LocalSeat.create(HonestBot),
	LocalSeat.create(HonestBot),
	LocalSeat.create(HonestBot),
	LocalSeat.create(HonestBot),
	// LocalSeat.create(FoldBot),
	// LocalSeat.create(FoldBot),
	// LocalSeat.create(RandBot),
	// LocalSeat.create(RandBot),
	// LocalSeat.create(RandBot),
	// LocalSeat.create(AggressiveBot),
	LocalSeat.create(AggressiveBot),
];
table.addPlayers(players);
table.on('tournamentClosed', function () { process.exit() });
table.start();