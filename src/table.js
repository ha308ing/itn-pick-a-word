const AsciiTable = require("ascii-table");

class Table {
    genTable(resultObj) {
        const [headingRow, contentRows] = this.formatJsonArrays(resultObj);

        var table = new AsciiTable().fromJSON({
            heading: headingRow,
            rows: [...contentRows],
        });

        return table.toString();
    }

    printTable(resultObj) {
        const table = this.genTable(resultObj);
        console.log(table.toString());
    }

    formatJsonArrays(result) {
        const [f, ...o] = Object.entries(result);
        const headingRow = this.formatEntriesArray(f);

        const contentRows = o.reduce((acc, v) => {
            const contentRow = this.formatEntriesArray(v);
            return [...acc, contentRow];
        }, []);

        return [headingRow, contentRows];
    }

    formatEntriesArray(rowJsonEntries) {
        const [f0, f1] = rowJsonEntries;
        return [f0, ...f1];
    }
}

module.exports = new Table();
