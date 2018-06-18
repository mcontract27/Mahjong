const checkCalls = (discard, hand, canCallChi) => {
    const results = {}
    const filteredHand = hand.filter(tile => tile.suit === discard.suit)
    const sameTiles = filteredHand.filter(tile => tile.value === discard.value)
    results.kan = (sameTiles.length === 3) ? sameTiles : false
    results.pon = (sameTiles.length >= 2) ? sameTiles.slice(0,2) : false
    results.chi = false;

    if (canCallChi && discard.suit !== 'dragon' && discard.suit !== 'wind') {
        const twoHigher = filteredHand.filter(tile => tile.value + 2 === discard.value)
        const oneHigher = filteredHand.filter(tile => tile.value + 1 === discard.value)
        const oneBelow = filteredHand.filter(tile => tile.value - 1 === discard.value)
        const twoBelow = filteredHand.filter(tile => tile.value - 2 === discard.value)

        if (twoHigher.length && oneHigher.length) {
            results.chi ? results.chi.push([oneHigher[0], twoHigher[0]]) : results.chi = [[oneHigher[0], twoHigher[0]]]
        }
        if (oneHigher.length && oneBelow.length) {
            results.chi ? results.chi.push([oneBelow[0], oneHigher[0]]) : results.chi = [[oneBelow[0], oneHigher[0]]]
        }
        if (twoBelow.length && oneBelow.length) {
            results.chi ? results.chi.push([twoBelow[0], oneBelow[0]]) : results.chi = [[twoBelow[0], oneBelow[0]]]
        }
    }
    return results
}

module.exports = {checkCalls}