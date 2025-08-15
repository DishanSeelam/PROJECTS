import { Allocation, AllocationResult, PretaxByPerson, ReceiptData } from '../types';

export function computePretaxByPerson(receipt: ReceiptData, peopleIds: string[]): PretaxByPerson {
	const pretax: PretaxByPerson = {};
	for (const pid of peopleIds) pretax[pid] = 0;
	for (const item of receipt.items) {
		if (!item.include || item.owners.length === 0) continue;
		const share = item.totalPrice / item.owners.length;
		for (const owner of item.owners) {
			if (pretax[owner] === undefined) pretax[owner] = 0;
			pretax[owner] += share;
		}
	}
	for (const pid of Object.keys(pretax)) {
		pretax[pid] = parseFloat(pretax[pid].toFixed(2));
	}
	return pretax;
}

export function allocateProportionally(totalFee: number, pretax: PretaxByPerson): Allocation {
	const totalPretax = Object.values(pretax).reduce((s, v) => s + v, 0);
	const alloc: Allocation = {};
	if (totalPretax <= 0) {
		for (const pid of Object.keys(pretax)) alloc[pid] = 0;
		return alloc;
	}
	for (const [pid, amount] of Object.entries(pretax)) {
		alloc[pid] = parseFloat(((totalFee * (amount / totalPretax)) || 0).toFixed(2));
	}
	return alloc;
}

export function largestRemainder(raw: Allocation, targetSum?: number): Allocation {
	const rounded: Allocation = {};
	const people = Object.keys(raw);
	let sumRounded = 0;
	for (const pid of people) {
		const val = Math.floor(raw[pid] * 100) / 100;
		rounded[pid] = parseFloat(val.toFixed(2));
		sumRounded += rounded[pid];
	}
	const sumRaw = Object.values(raw).reduce((s, v) => s + v, 0);
	const desired = targetSum ?? sumRaw;
	let cents = Math.round((desired - sumRounded) * 100);
	if (cents === 0) return rounded;
	const remainders = Object.fromEntries(people.map((p) => [p, raw[p] - Math.floor(raw[p] * 100) / 100]));
	const order = people.sort((a, b) => {
		const diff = remainders[b] - remainders[a];
		return cents > 0 ? diff : -diff;
	});
	let idx = 0;
	while (cents !== 0 && order.length > 0) {
		const pid = order[idx];
		if (cents > 0) {
			rounded[pid] = parseFloat((rounded[pid] + 0.01).toFixed(2));
			cents -= 1;
		} else {
			rounded[pid] = parseFloat((rounded[pid] - 0.01).toFixed(2));
			cents += 1;
		}
		idx = (idx + 1) % order.length;
	}
	return rounded;
}

export function computeAllocations(receipt: ReceiptData, peopleIds: string[]): AllocationResult {
	const pretax = computePretaxByPerson(receipt, peopleIds);
	const totalTax = receipt.charges.filter(c => ['CGST','SGST','IGST','GST'].includes(c.type)).reduce((s,c)=>s+c.amount,0);
	const totalService = receipt.charges.filter(c => ['SERVICE_CHARGE','PACKING','DELIVERY','OTHER'].includes(c.type)).reduce((s,c)=>s+c.amount,0);
	const totalRound = receipt.charges.filter(c => c.type === 'ROUND_OFF').reduce((s,c)=>s+c.amount,0);

	const taxAllocated = allocateProportionally(totalTax, pretax);
	const serviceAllocated = allocateProportionally(totalService, pretax);
	const roundOffAllocated = allocateProportionally(totalRound, pretax);

	const raw: Allocation = {};
	for (const pid of peopleIds) {
		const base = pretax[pid] || 0;
		raw[pid] = (base + (taxAllocated[pid]||0) + (serviceAllocated[pid]||0) + (roundOffAllocated[pid]||0));
	}
	const sumRaw = Object.values(raw).reduce((s, v) => s + v, 0);
	const target = receipt.total ?? sumRaw;
	const rounded = largestRemainder(raw, target);

	return {
		pretaxByPerson: pretax,
		taxAllocated,
		serviceAllocated,
		roundOffAllocated,
		finalRawAmounts: raw,
		finalRoundedAmounts: rounded,
	};
}