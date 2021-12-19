import {deployAndRun} from "./deploy_and_run";

function isMoneyEnough(ns, ram) {
    return ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram);
}

export async function main(ns) {
    const ram = ns.args[0];
    const script = ns.args[1];
    const target = ns.args[2];

    let i = 0;
    while (i < ns.getPurchasedServerLimit()) {
        if (isMoneyEnough(ns, ram)) {
            await deployAndRun(ns, script, ns.purchaseServer(`serv-${i}`, ram), target);
            i++;
        } else {
            await ns.sleep(200);
        }
    }
}