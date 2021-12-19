import {getServers} from "./get_servers.js";
import {calcServerScore} from "./calc_server_score.js";

export async function main(ns) {
    let maxScore = 0;
    let maxScoreServer;
    getServers(ns).forEach(server => {
        if (ns.hasRootAccess(server.name)) {
            let score = calcServerScore(ns, server.name);
            if (score > maxScore) {
                maxScore = score;
                maxScoreServer = server.name;
            }
        }
    });
    ns.tprint(`Max score server:${maxScoreServer}, score:${maxScore}`);
}