function consoleLog(item: unknown) {
    console.log(item)
}
function consoleTable(item: unknown) {
    console.table(item)
}

const $l = consoleLog
const $t = consoleTable

export {$l, $t}
