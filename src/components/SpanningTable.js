import React, {useEffect} from 'react';
import SpanningTableRender from './SpanningTableRender';

var offersPossibility = [];

const invoiceTaxes = (value, discountRate) => discountRate * value;

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return {desc, qty, unit, price};
}

const deductionPerPurchaseTranche = (slice, sliceValue, invoiceTotal) =>
    Math.floor(invoiceTotal / slice) * sliceValue;


function subtotal(items) {
    return items.map(({price}) => price).reduce((sum, i) => sum + i, 0);
}

// Generate the permutation for a given n (amount of elements) and a given array
function generate(n, arr) {
    // If only 1 element, just output the array
    if (n === 1) {
        let pattern = {};
        for (let i = 0, c = arr.length; i < c; i++) {
            pattern['value' + i] = arr[i];
        }
        offersPossibility.push(pattern);
        return;
    }

    for (var i = 0; i < n; i += 1) {
        generate(n - 1, arr);

        // If n is even
        if (n % 2 === 0) {
            swap(arr, i, n - 1);
        } else {
            swap(arr, 0, n - 1);
        }
    }
}

function swap(arr, idxA, idxB) {
    var tmp = arr[idxA];
    arr[idxA] = arr[idxB];
    arr[idxB] = tmp;
}

const searchIndexBestOffer = (array) => {
    let indexBestOffer;
    let min = null;
    for (var i = 0, c = array.length; i < c; i++) {
        if (i === 0) {
            min = array[i];
            indexBestOffer = i;
        } else {
            if (min > array[i]) {
                min = array[i];
                indexBestOffer = i;
            }
        }
    }
    return indexBestOffer;
};

const getValueOfferPercentage = (dataView, resultForEachOffers, count) => {
    let result;
    if (count === 0) return invoiceTaxes(dataView.invoiceSubtotal, dataView.discountRate);
    else {
        for (let i = 0; i < resultForEachOffers.length; i++) {
            if (i === 0) result = dataView.invoiceSubtotal - resultForEachOffers[i];
            else result -= resultForEachOffers[i];
        }
        return invoiceTaxes(result, dataView.discountRate);
    }
};

const getValueOfferSlice = (dataView, resultForEachOffers, count) => {
    let result;
    if (count === 0) result = deductionPerPurchaseTranche(dataView.slice, dataView.sliceValue, dataView.invoiceSubtotal);
    else {
        for (let i = 0; i < resultForEachOffers.length; i++) {
            if (i === 0) {
                result = dataView.invoiceSubtotal - resultForEachOffers[i];
            } else result -= resultForEachOffers[i];
        }
        result = deductionPerPurchaseTranche(dataView.slice, dataView.sliceValue, result);
    }
    return result;
};

const getresulTotalPerOffer = (resultForEachOffers, dataView) => {
    let resultTotalPerOffer;
    for (let i = 0, c = resultForEachOffers.length; i < c; i++) {
        if (i === 0) resultTotalPerOffer = dataView.invoiceSubtotal - resultForEachOffers[i];
        else resultTotalPerOffer -= resultForEachOffers[i];
    }
    return resultTotalPerOffer;
};

const getIndexBestOffer = (dataView) => {
    let resultForEachOffers = [];
    let resultsByPossibility = [];
    let indexBestOffer;
    for (let i = 0, c = offersPossibility.length; i < c; i++) {
        let count = 0;
        resultForEachOffers = [];
        let result = 0;
        for (var prop in offersPossibility[i]) {

            if (offersPossibility[i].hasOwnProperty(prop)) {
                switch (offersPossibility[i][prop]) {
                    case 'percentage':
                        result = getValueOfferPercentage(dataView, resultForEachOffers, count);
                        break;
                    case 'slice':
                        result = getValueOfferSlice(dataView, resultForEachOffers, count);
                        break;
                    case 'minus':
                        result = dataView.deduction;
                        break;
                    // TODO spinner
                }
                if (result !== 0) resultForEachOffers.push(result);
                count++;
            }
        }
        offersPossibility[i].data = resultForEachOffers;

        let resultTotalPerOffer = getresulTotalPerOffer(offersPossibility[i].data, dataView);
        resultsByPossibility.push(resultTotalPerOffer);
        indexBestOffer = searchIndexBestOffer(resultsByPossibility);
        offersPossibility[i].result = resultsByPossibility[i];
    }
    return indexBestOffer;
};

function SpanningTable(props) {
    useEffect(() => {
        return () => {
            console.log('will unmount');
            offersPossibility = [];
        };
    }, []);
    useEffect(() => {
        console.log('mounted');
        offersPossibility = [];
    });
    let dataView = {
        rows: [],
        offersPossibility: []

    };

    props.bookInBasket.forEach((item) => dataView.rows.push(createRow(item.title, 1, item.price)));
    dataView.invoiceSubtotal = subtotal(dataView.rows);

    let offers = [];
    props.offer.forEach(function (item) {
        switch (item.type) {
            case "percentage":
                offers.push(item.type);
                dataView.discountRate = item.value / 100;
                break;
            case "minus":
                offers.push(item.type);
                dataView.deduction = item.value;
                break;
            case "slice":
                offers.push(item.type);
                dataView.slice = item.sliceValue;
                dataView.sliceValue = item.value;
                break;
            default:
        }
    });

    // Get the permutations
    generate(offers.length, offers);
    dataView.indexBestOffer = getIndexBestOffer(dataView);
    dataView.offersPossibility = offersPossibility;

    return (
        <SpanningTableRender propsParent={props} dataView={dataView}/>
    );

}

export default SpanningTable;
