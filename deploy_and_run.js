export function calcThreads(ns, hostname, script) {
    return Math.floor((ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname)) / ns.getScriptRam(script));
}

export async function deployAndRun(ns, script, hostname, target) {
    await ns.scp(script, "home", hostname);
    let threads = calcThreads(ns, hostname, script);
    ns.exec(script, hostname, threads, target);
}

export async function main(ns) {
    await deployAndRun(ns, ns.args[0], ns.args[1], ns.args[2])
}
