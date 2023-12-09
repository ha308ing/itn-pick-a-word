class Rules {
    result = [];

    findResults(moves, computerMove, playerMove, strings = {}) {
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

        const isFirstResult = Object.keys(this.result).length === 0;

        const result = moves.reduce((acc, v, i) => {
            const winString = strings?.winString ?? "WIN";
            const lostString = strings?.lostString ?? "LOST";
            const drawString = strings?.drawString ?? "DRAW";
            if (win.includes(i)) {
                acc[v] = isFirstResult
                    ? [winString]
                    : [...this.result[v], winString];
            }
            if (los.includes(i)) {
                acc[v] = isFirstResult
                    ? [lostString]
                    : [...this.result[v], lostString];
            }
            if (dra.includes(i)) {
                acc[v] = isFirstResult
                    ? [drawString]
                    : [...this.result[v], drawString];
            }
            return acc;
        }, {});

        const cornerString = strings?.corner ?? "MOVES";

        this.result = {
            [cornerString]: isFirstResult
                ? [playerMove]
                : [...this.result[cornerString], playerMove],
            ...result,
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
