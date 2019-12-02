import React, { useEffect } from 'react';
import SpanningTableRender from './SpanningTableRender';
import PropTypes from "prop-types";

const invoicePercentage = (value, discountRate) => discountRate * value;

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit, isbn) {
    const price = priceRow(qty, unit);
    return {desc, qty, unit, price, isbn};
}

const deductionPerPurchaseTranche = (slice, sliceValue, invoiceTotal) =>
    Math.floor(invoiceTotal / slice) * sliceValue;

// function subtotal(items) {
//     return items.map((item) => item.price * item.qty).reduce((sum, i) => sum + i, 0);
// }

function subtotal(items) {
    return items.map(({unit, qty}) => unit * qty).reduce((sum, i) => sum + i, 0);
}

// Generate the permutation for a given n (amount of elements) and a given array
function getPermutation(n, arr, callback) {
    // If only 1 element, just export arr with callback
    if (n === 1) {
        let pattern = {};
        for (let i = 0, c = arr.length; i < c; i++) {
            pattern['value' + i] = arr[i];
        }
        callback(pattern);
    }

    for (var i = 0; i < n; i ++) {
        getPermutation(n - 1, arr, callback);

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

export const searchIndexBestOffer = (array) => {
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

export const getValueOfferPercentage = (dataView, resultForEachOffers, count) => {
    let result;
    if (count === 0) {
        result = invoicePercentage(dataView.invoiceSubtotal, dataView.discountRate);
    }
    else {
        for (let i = 0; i < resultForEachOffers.length; i++) {
            if (i === 0) {
                result = dataView.invoiceSubtotal - resultForEachOffers[i];
                continue;
            }
            result -= resultForEachOffers[i];
        }
        result = invoicePercentage(result, dataView.discountRate);
    }
    return result;
};

export const getValueOfferSlice = (dataView, resultForEachOffers, count) => {
    let result;
    if (count === 0) {
        result = deductionPerPurchaseTranche(dataView.slice, dataView.sliceValue, dataView.invoiceSubtotal);
    }
    else {
        for (let i = 0; i < resultForEachOffers.length; i++) {
            if (i === 0) {
                result = dataView.invoiceSubtotal - resultForEachOffers[i];
                continue;
            }
            result -= resultForEachOffers[i];
        }
        result = deductionPerPurchaseTranche(dataView.slice, dataView.sliceValue, result);
    }
    return result;
};

export const getResulTotalPerOffer = (resultForEachOffers, dataView) => {
    let resultTotalPerOffer;
    for (let i = 0, c = resultForEachOffers.length; i < c; i++) {
        if (i === 0) {
            resultTotalPerOffer = dataView.invoiceSubtotal - resultForEachOffers[i];
            continue;
        }
        resultTotalPerOffer -= resultForEachOffers[i];
    }
    return resultTotalPerOffer;
};

export const getResultForAllOffer = (dataView) => {
    let resultForEachOffers = [];
    let resultsByPossibility = [];
    let resultsPerOffer = [];
    for (let i = 0, c = dataView.offersPossibilities.length; i < c; i++) {
        let count = 0;
        resultForEachOffers = [];
        let result = 0;
        for (var prop in dataView.offersPossibilities[i]) {

            if (dataView.offersPossibilities[i].hasOwnProperty(prop)) {
                switch (dataView.offersPossibilities[i][prop]) {
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
                resultForEachOffers.push(result);
                count++;
            }
        }
        let resultTotalPerOffer = getResulTotalPerOffer(resultForEachOffers, dataView);
        resultsByPossibility.push(resultTotalPerOffer);
        resultsPerOffer.push(resultsByPossibility[i]);

        dataView.offersPossibilities[i].result = resultsByPossibility[i];
        dataView.offersPossibilities[i].data = resultForEachOffers;
    }
    return resultsPerOffer;
};

function SpanningTable(props) {
    const handleChangeQuantity = (e) => {
        props.handleStuff(e);
    };
    const {bookInBasket, offer } = props;
    let dataView = {
        rows: [],
        offersPossibilities: []
    };

    bookInBasket.forEach((item) => {
        let qty = 1;
        if (item.isbn === props.qty.isbn) {
            qty = parseInt(props.qty.nbre);
        }
        dataView.rows.push(createRow(item.title, qty, item.price, item.isbn))
    });
    dataView.invoiceSubtotal = subtotal(dataView.rows);

    let offers = [];
    offer.forEach(function (item) {
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
    getPermutation(offers.length, offers, (arr) => {
        dataView.offersPossibilities.push(arr);
    });

    let arrayOffers = getResultForAllOffer(dataView);

    dataView.indexBestOffer = searchIndexBestOffer(arrayOffers);

    return (
        <SpanningTableRender propsParent={props} dataView={dataView} handleChangeQuantity={handleChangeQuantity}/>
    );
}

SpanningTable.propTypes = {
    bookInBasket: PropTypes.array.isRequired,
    offer: PropTypes.array.isRequired,
};

export default SpanningTable;