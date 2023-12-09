class Rules {
    result = [];
    currentResult = [];
    win = [];

    findResult(moves, computerMove, playerMove = "?", strings = {}) {
        // strings = { corner: "moves\\user", winString: "win", lostString: "lost", drawString: "draw"}
        const mid = computerMove;
        const length = moves.length;
        const half = (length - 1) / 2;
        const los = [];
        const dra = [];

        const win = this.getWinningMoves(moves, computerMove);

        dra.push(mid);

        for (let i = 0, k = 0; i < length && k < half; i++) {
            if (!win.includes(i) && !dra.includes(i)) {
                los.push(i);
                k++;
            }
        }
        const result = moves.reduce((acc, v, i) => {
            const winString = strings?.winString ?? "WIN";
            const lostString = strings?.lostString ?? "LOST";
            const drawString = strings?.drawString ?? "DRAW";

            if (win.includes(i)) acc[v] = [winString];
            if (los.includes(i)) acc[v] = [lostString];
            if (dra.includes(i)) acc[v] = [drawString];

            return acc;
        }, {});

        const cornerString = strings?.corner ?? "MOVES";

        const resultForTable = {
            [cornerString]: [playerMove],
            ...result,
        };
        this.wins = win;
        this.currentResult = { ...resultForTable };
        return resultForTable;
    }

    findResults(moves, computerMove, playerMove, strings = {}) {
        // strings = { corner: "moves\\user", winString: "win", lostString: "lost", drawString: "draw"}
        const currentResult = this.findResult(
            moves,
            computerMove,
            playerMove,
            strings
        );

        const currentResultMerged = Object.entries(currentResult).reduce(
            (acc, [move, res]) => {
                return {
                    ...acc,
                    [move]:
                        this.result[move] != null
                            ? [...this.result[move], ...res]
                            : res,
                };
            },
            {}
        );

        this.result = {
            ...currentResultMerged,
        };

        return this.result;
    }

    getWinningMoves(moves, computerMove) {
        this.computerMove = computerMove;
        const mid = computerMove;
        const length = moves.length;
        const half = (length - 1) / 2;
        const win = [];
        for (let i = mid + 1, k = 0; i < length && k < half; i++, k++) {
            win.push(i);
        }
        const tail = half - win.length;
        for (let i = 0; i < tail; i++) {
            win.push(i);
        }
        this.win = win;
        return win;
    }
}

module.exports = new Rules();
