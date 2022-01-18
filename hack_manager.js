import {getServers} from "./get_servers.js";

function getAvailableRam(ns, server) {
    return ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
}

export async function main(ns) {
    // weaken threads 1
    // grow threads 1
    // hack x3 threads 5..8
    let host = ns.args[0];
    let hackThreads = ns.args[1];
    let script = ["hack", "grow", "weaken"];
    let scriptRamHack = ns.getScriptRam("test_hack.js");
    let totalRam = 0;
    let serverCount = [];
    getServers(ns).forEach(server => {
        if (ns.hasRootAccess(server.name)) {
            let availableRam = getAvailableRam(ns, server.name);
            totalRam += availableRam;
            serverCount[Math.floor(availableRam / 4)]++;
        }
    });
    serverCount.forEach((count, i)=>{
        ns.tprint(`${i*4}G: ${count}`)
    })
    ns.tprint(`server count:${serverCount}, total ram:${totalRam}`)
}