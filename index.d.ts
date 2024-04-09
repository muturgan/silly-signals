export type Primiteve = string | number | boolean | bigint | null | undefined;

export interface ISource<T extends Primiteve> {
	next(value: T): void;
}

export interface ISignal<T extends Primiteve> {
	getCurrent(): T;
	subscribe(listener: (value: T) => void): void;
	unsubscrib(listener: (value: T) => void): void;
	removeAllListeners(): void;
}

export declare function factory<T extends Primiteve = Primiteve>(): {
	source: ISource<T>;
	signal: ISignal<T | undefined>;
};
export declare function factory<T extends Primiteve = Primiteve>(initialValue: T): {
	source: ISource<T>;
	signal: ISignal<T>;
};

export declare function combineSignals<T extends Primiteve, S extends Primiteve>(listener: (arg: S) => T, signal: ISignal<S>): ISignal<T>;
export declare function combineSignals<T extends Primiteve, S1 extends Primiteve, S2 extends Primiteve>(listener: (arg1: S1, arg2: S2) => T, signal1: ISignal<S1>, signal2: ISignal<S2>): ISignal<T>;
export declare function combineSignals<T extends Primiteve, S1 extends Primiteve, S2 extends Primiteve, S3 extends Primiteve>(listener: (arg1: S1, arg2: S2, arg3: S3) => T, signal1: ISignal<S1>, signal2: ISignal<S2>, signal3: ISignal<S3>): ISignal<T>;
export declare function combineSignals<T extends Primiteve, S1 extends Primiteve, S2 extends Primiteve, S3 extends Primiteve, S4 extends Primiteve>(listener: (arg1: S1, arg2: S2, arg3: S3, arg4: S4) => T, signal1: ISignal<S1>, signal2: ISignal<S2>, signal3: ISignal<S3>, signal4: ISignal<S4>): ISignal<T>;
export declare function combineSignals<T extends Primiteve, S1 extends Primiteve, S2 extends Primiteve, S3 extends Primiteve, S4 extends Primiteve, S5 extends Primiteve>(listener: (arg1: S1, arg2: S2, arg3: S3, arg4: S4, arg5: S5) => T, signal1: ISignal<S1>, signal2: ISignal<S2>, signal3: ISignal<S3>, signal4: ISignal<S4>, signal5: ISignal<S5>): ISignal<T>;
