function getSecond(milliseconds) {
    return (milliseconds / 1000).toFixed(2);
}

export function calcServerScore(ns, host) {
    let serverMaxMoney = ns.getServerMaxMoney(host);
    let hackTime = ns.getHackTime(host);
    let growTime = ns.getGrowTime(host);
    let weakenTime = ns.getWeakenTime(host);
    let score = serverMaxMoney / (hackTime + growTime + weakenTime);
    ns.tprint(`${host} max money:${serverMaxMoney}, hack:${(getSecond(hackTime))}s, grow:${getSecond(growTime)}s, weaken:${getSecond(weakenTime)}s, score:${score}`)
    return score;
}

export function main(ns) {
    calcServerScore(ns, ns.args[0])
}
