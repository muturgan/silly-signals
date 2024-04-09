class Emitter {
	#listeners;

	constructor() {
		this.#listeners = new Set();
	}

	emit(value) {
		this.#listeners.forEach((listener) => listener(value));
	}

	addListener(listener) {
		this.#listeners.add(listener);
	}

	removeListener() {
		this.#listeners.delete(listener);
	}

	removeAllListeners() {
		this.#listeners.clear();
	}
}

class Source {
	#emitter;

	constructor(emitter) {
		this.#emitter = emitter;
	}

	next(value) {
		this.#emitter.emit(value);
	}
}

class Signal {
	#emitter;
	#current;
	#listeners;

	constructor(emitter, initialValue) {
		this.#emitter = emitter;
		this.#current = initialValue;
		this.#listeners = new Map();
	}

	getCurrent() {
		return this.#current;
	}

	subscribe(listener) {
		if (!this.#listeners.has(listener)) {
			const that = this;

			const record = (value) => {
				if (value !== that.#current) {
					that.#current = value;
					listener(value);
				}
			};
			this.#listeners.set(listener, record);

			listener(this.#current);

			this.#emitter.addListener(record);
		}
	}

	unsubscrib(listener) {
		const record = this.#listeners.get(listener);

		if (record !== undefined) {
			this.#emitter.removeListener(record);
			this.#listeners.delete(listener);
		}
	}

	removeAllListeners() {
		this.#emitter.removeAllListeners();
		this.#listeners.clear();
	}
}

function factory(initialValue) {
	const emitter = new Emitter();

	const source = new Source(emitter);
	const signal = new Signal(emitter, initialValue);

	return { source, signal };
}

function combineSignals(listener, ...signals) {
	const currentValues = signals.map((signal) => signal.getCurrent());

	const initialValue = listener(...currentValues);

	const { source, signal: newSignal } = factory(initialValue);

	signals.forEach((signal, i) => {
		signal.subscribe((value) => {
			const cur = currentValues[i];
			if (cur !== value) {
				currentValues[i] = value;
				const computed = listener(...currentValues);
				source.next(computed);
			}
		});
	});

	return newSignal;
}

module.exports.factory = factory;
module.exports.combineSignals = combineSignals;
