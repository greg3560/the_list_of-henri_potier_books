import {
    getValueOfferPercentage,
    getValueOfferSlice,
    getResulTotalPerOffer,
    getResultForAllOffer
} from '../src/components/SpanningTable';

describe('Calcul basket', () => {
    describe('getValueOfferPercentage', () => {
        it('should return percentage amount with count = 0', () => {
            let dataView = {
                discountRate: 0.08,
                invoiceSubtotal: 160
            };
            let resultForEachOffers = [];
            let count = 0;
            const result = getValueOfferPercentage(dataView, resultForEachOffers, count);
            expect(result).to.equal(12.8);
        });
        it('should return percentage amount with count = 1', () => {
            let dataView = {
                discountRate: 0.08,
                invoiceSubtotal: 160
            };
            let resultForEachOffers = [15];
            let count = 1;
            const result = getValueOfferPercentage(dataView, resultForEachOffers, count);
            expect(result).to.equal(11.6);
        });
        it('should return percentage amount with count = 3', () => {
            let dataView = {
                discountRate: 0.08,
                invoiceSubtotal: 160
            };
            let resultForEachOffers = [15, 15, 15];
            let count = 3;
            const result = getValueOfferPercentage(dataView, resultForEachOffers, count);
            expect(result).to.equal(9.200000000000001);
        });
    });

    describe('getValueOfferSlice', () => {
        it('should return 0', () => {
            let dataView = {
                slice: 100,
                sliceValue: 12,
                invoiceSubtotal: 90
            };
            let resultForEachOffers = [];
            let count = 0;
            const result = getValueOfferSlice(dataView, resultForEachOffers, count);
            expect(result).to.equal(0);
        });
        it('should return 12', () => {
            let dataView = {
                slice: 100,
                sliceValue: 12,
                invoiceSubtotal: 110
            };
            let resultForEachOffers = [10];
            let count = 1;
            const result = getValueOfferSlice(dataView, resultForEachOffers, count);
            expect(result).to.equal(12);
        });
        it('should return 36', () => {
            let dataView = {
                slice: 100,
                sliceValue: 12,
                invoiceSubtotal: 330
            };
            let resultForEachOffers = [15, 15];
            let count = 0;
            const result = getValueOfferSlice(dataView, resultForEachOffers, count);
            expect(result).to.equal(36);
        });
    });

    describe('getResulTotalPerOffer', () => {
        it('should return total price for each offers possibility => 94.12', () => {
            let dataView = {
                invoiceSubtotal: 112
            };
            let resultForEachOffers = [0, 15, 2.88];
            const result = getResulTotalPerOffer(resultForEachOffers, dataView);
            expect(result).to.equal(94.12);
        });
        it('should return total price for each offers possibility => 139.12', () => {
            let dataView = {
                invoiceSubtotal: 354
            };
            let resultForEachOffers = [0, 15, 2.88, 156, 24, 17];
            const result = getResulTotalPerOffer(resultForEachOffers, dataView);
            expect(result).to.equal(139.12);
        });

    });

    describe('getResultForAllOffer', () => {
        it('should return an array with total per possibilities offers', () => {
            let dataView = {
                "offersPossibilities": [
                    {
                        "value0": "percentage",
                        "value1": "minus",
                        "value2": "slice"
                    },
                    {
                        "value0": "minus",
                        "value1": "percentage",
                        "value2": "slice"
                    },
                    {
                        "value0": "slice",
                        "value1": "percentage",
                        "value2": "minus"
                    },
                    {
                        "value0": "percentage",
                        "value1": "slice",
                        "value2": "minus"
                    },
                    {
                        "value0": "minus",
                        "value1": "slice",
                        "value2": "percentage"
                    },
                    {
                        "value0": "slice",
                        "value1": "minus",
                        "value2": "percentage"
                    }
                ],
                "invoiceSubtotal": 182,
                "discountRate": 0.1,
                "deduction": 30,
                "slice": 80,
                "sliceValue": 14
            };
            let output = [
                119.80000000000001,
                122.80000000000001,
                108.6,
                105.80000000000001,
                124.2,
                111.6
            ];
            const result = getResultForAllOffer(dataView);
            expect(result).to.be.an('array').to.include.members(output);
        });
    });
});