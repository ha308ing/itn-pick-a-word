const clc = require("cli-color");

class Output {
    printResult(choice, computerMove, moves, winMoves) {
        let string =
            `\nYour move: ` +
            moves[choice] +
            `\nComputer move: ` +
            moves[computerMove];
        const resultString =
            `\nIt's ` +
            (choice === computerMove
                ? `a draw!`
                : winMoves.includes(choice)
                  ? `a win!`
                  : `a loss!`);
        console.log(string + resultString);
    }

    printRoundStart(round, totalRounds) {
        const headingString = `Round #${round + 1} of ${totalRounds}`;
        const border = "*".repeat(headingString.length);
        console.log(`\n${clc.bold(border)}`);
        console.log(clc.bold(headingString));
    }

    printBye() {
        const goodbyeString = "Goodbye!";
        console.log(clc.bold(goodbyeString));
    }

    printWrongChoice() {
        const wrongChoiceString = "\nPlease make the right choice:";
        console.log(clc.bold(wrongChoiceString));
    }
}

module.exports = new Output();
