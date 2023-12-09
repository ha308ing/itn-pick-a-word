const prompt = require("prompt-sync")({ sigint: true });
const Errors = require("./errors");
const Output = require("./output");

class Input {
    getInput() {
        const [, , ...input] = process.argv;
        return input;
    }

    checkInput(input) {
        for (const err of Errors.errors) {
            const res = err.condition(input);
            if (res) return { result: false, output: err.message };
        }
        return { result: true, output: input };
    }

    checkHelp(choice) {
        return choice === "help" || choice === "?";
    }

    checkExit(choice) {
        return choice === "exit" || choice === "0";
    }

    checkChoice(moves, choice) {
        return choice - 1 in moves || this.checkExit(choice);
    }

    showHelp(moves, winMoves) {
        console.log("Here's some help:");
        console.log(
            `Winning moves: ${winMoves
                .map(i => `${moves[i]} (${i + 1})`)
                .join(", ")}`
        );
    }

    getChoice(moves, winMoves) {
        const choices = this.getChoices(moves);
        let choice = undefined;
        let i = 0;
        do {
            if (i != 0) Output.printWrongChoice();
            console.log(choices);
            choice = prompt();
            if (this.checkHelp(choice)) this.showHelp(moves, winMoves);
            i = 1;
        } while (!this.checkChoice(moves, choice));
        return choice;
    }

    getChoices(moves) {
        const moveOptions = moves
            .map((m, i) => `${i + 1} - ${moves[i]}`)
            .join("\n");
        const controls = `0 - exit\n? - help`;
        return `Available moves:\n${moveOptions}\n${controls}`;
    }
}

module.exports = new Input();
