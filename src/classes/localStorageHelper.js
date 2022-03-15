export class LocalStorageHelper {
	static #STORAGE = window.localStorage;

	static get(key, fallBackValue) {
		try {
			const item = this.#STORAGE.getItem(key);
			return item ? JSON.parse(item) : fallBackValue;
		} catch (e) {
			console.log(e.message);
			return fallBackValue;
		}
	}

	static set(key, value) {
		try {
			this.#STORAGE.setItem(key, JSON.stringify(value));
		} catch (e) {
			console.log(e.message);
		}
	}

	static clear() {
		try {
			this.#STORAGE.clear();
		} catch (e) {
			console.log(e.message);
		}
	}
}
