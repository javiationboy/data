import {useRuntimeConfig} from "nitropack/runtime";
import {readFileSync} from "node:fs";
import {join} from "path";
import {dataDirectory} from "~~/utils";

export default defineCachedEventHandler(async (event) => {
    const airlines = JSON.parse(readFileSync(join(dataDirectory, 'airlines.json'), 'utf-8')).list
    let virtualAirlines = JSON.parse(readFileSync(join(dataDirectory, 'virtual-airlines.json'), 'utf-8')).list
    const customList = JSON.parse(readFileSync(join(dataDirectory, 'custom-list.json'), 'utf-8'))

    virtualAirlines = virtualAirlines.filter(x => !airlines.some(y => x.icao === y.icao));

    const fullList = [...airlines, ...virtualAirlines];

    for(const airline of customList) {
        const existing  = fullList.find(x => x.icao === airline.icao);
        if (existing) Object.assign(existing, airline);
        else fullList.push(airline);
    }

    return fullList;
}, {
    maxAge: import.meta.dev ? 1 : 60 * 60 * 24 * 7,
})
