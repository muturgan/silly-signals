import { strictEqual } from 'node:assert';
import { test } from 'node:test';

import { factory, combineSignals } from './index.mjs';


test('silly-signals', (t) => {
	let count = 0;
	const { source: p1, signal: s1 } = factory(1);
	const { source: p2, signal: s2 } = factory(2);

	const s3 = combineSignals((a, b) => a + b, s1, s2);

	s3.subscribe((value) => { count = value; });

	p1.next(10);
	p2.next(5);
	p1.next(4);
	p2.next(7);

	strictEqual(count, 11);
});
