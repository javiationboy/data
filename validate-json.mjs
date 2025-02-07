import {readFileSync} from "node:fs";
import {join} from "path";

JSON.parse(readFileSync(join(import.meta.dirname, 'custom-data', 'airlines.json'), 'utf-8'));
