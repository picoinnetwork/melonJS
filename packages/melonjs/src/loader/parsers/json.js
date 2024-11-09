import { jsonList } from "../cache.js";
import { fetchData } from "./fetchdata.js";

/**
 * parse/preload a JSON files
 * @param {loader.Asset} data - asset data
 * @param {Function} [onload] - function to be called when the resource is loaded
 * @param {Function} [onerror] - function to be called in case of error
 * @param {Object} [settings] - Additional settings to be passed when loading the asset
 * @returns {number} the amount of corresponding resource parsed/preloaded
 * @ignore
 */
export function preloadJSON(data, onload, onerror, settings) {
	if (typeof jsonList[data.name] !== "undefined") {
		// already loaded
		return 0;
	}

	fetchData(data.src, "json", settings)
		.then((response) => {
			jsonList[data.name] = response;
			if (typeof onload === "function") {
				// callback
				onload();
			}
		})
		.catch((error) => {
			if (typeof onerror === "function") {
				onerror(error);
			}
		});

	return 1;
}
