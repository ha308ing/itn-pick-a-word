const Input = require("./input");
const Output = require("./output");
const Hmac = require("./hmac");
const Key = require("./key");
const Rules = require("./rules");
const Table = require("./table");

class Game {
    makeComputerChoice(moves) {
        const computerChoice = Math.round(Math.random() * (moves.length - 1));
        return computerChoice;
    }

    start() {
        const input = Input.getInput();
        const { result, output } = Input.checkInput(input);

        if (!result) {
            console.log(output);
            return;
        }

        const moves = output;

        let round = 0;
        while (round < moves.length) {
            Output.printRoundStart(round, moves.length);

            const key = Key.genKey();
            const computerChoice = this.makeComputerChoice(moves);
            const hmac = Hmac.genHmac(moves[computerChoice], key);
            console.log("HMAC:", hmac);

            const winMoves = Rules.getWinningMoves(moves, computerChoice);
            let choice = Input.getChoice(moves, winMoves);
            if (Input.checkExit(choice)) {
                Output.printBye();
                return 0;
            }
            choice = choice - 1;
            const move = moves[choice];
            Output.printResult(choice, computerChoice, moves, winMoves);

            const username = require("os").userInfo().username || "username";
            const strings = {
                corner: `moves\\${username}`,
                winString: "win",
                lostString: "lost",
                drawString: "draw",
            };
            const results = Rules.findResults(
                moves,
                computerChoice,
                move,
                strings
            );
            Table.printTable(results);

            console.log("\nHMAC key:", key);
            round++;
        }
        Output.printBye();
    }
}

module.exports = new Game();
