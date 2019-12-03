import React from 'react';
import SpanningTableRender from './SpanningTableRender';
import PropTypes from "prop-types";

// return the discount for a given rate
const getDiscountPercentage = (value, discountRate) => discountRate * value;

// return the price per row
function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit, isbn) {
    const price = priceRow(qty, unit);
    return {desc, qty, unit, price, isbn};
}

// return the slice number for a given amount
const deductionPerPurchaseTranche = (slice, sliceValue, invoiceTotal) =>
    Math.floor(invoiceTotal / slice) * sliceValue;

// return sub total
function subtotal(items) {
    return items.map(({unit, qty}) => unit * qty).reduce((sum, i) => sum + i, 0);
}

// use of the heap algorithm to calculate all combinations of possible offers
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

    for (let i = 0; i < n; i ++) {
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
    let tmp = arr[idxA];
    arr[idxA] = arr[idxB];
    arr[idxB] = tmp;
}

// for a given array return the index of the best offer (the minimum)
export const searchIndexBestOffer = (array) => {
    let indexBestOffer;
    let min = null;
    for (let i = 0, c = array.length; i < c; i++) {
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

// the three functions below have not been refactored to test these behaviors alone
// for this array [6, 5, 4] it make the calcul -> 6 - 5 - 4 and getDiscountPercentage
// for this array [6] directly getDiscountPercentage
// returns the result for this offer taking into account the previously calculated values
export const getValueOfferPercentage = (dataView, resultForEachOffers, count) => {
    let result;
    if (count === 0) {
        result = getDiscountPercentage(dataView.invoiceSubtotal, dataView.discountRate);
    }
    else {
        for (let i = 0; i < resultForEachOffers.length; i++) {
            if (i === 0) {
                result = dataView.invoiceSubtotal - resultForEachOffers[i];
                continue;
            }
            result -= resultForEachOffers[i];
        }
        result = getDiscountPercentage(result, dataView.discountRate);
    }
    return result;
};

// same with slice value
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

// returns the result for a given offer combination
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

// return the result of each offers possibility
export const getResultForAllOffer = (dataView) => {
    let resultForEachOffers = [];
    let resultsByPossibility = [];
    let resultsPerOffer = [];
    for (let i = 0, c = dataView.offersPossibilities.length; i < c; i++) {
        let count = 0;
        resultForEachOffers = [];
        let result = 0;
        for (let prop in dataView.offersPossibilities[i]) {

            if (Object.prototype.hasOwnProperty.call(dataView.offersPossibilities[i], prop)) {
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
                    default:
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

// component or concentrates all the logic of the basket view
function SpanningTable(props) {
    const handleChangeQuantity = (e) => {
        props.handleUpdateQuantity(e); // callback for re render the basket
    };
    const {bookInBasket, offer } = props;
    let dataView = { // init object that we are going to give SpanningTableRender
        rows: [],
        offersPossibilities: [] // all possibiliity offers with 3 operand => 6 possibility (3*2*1)
    };

    bookInBasket.forEach((item) => {
        let qty = 1;
        if (item.isbn === props.qty.isbn) { // if we get qty props from the parent
            qty = parseInt(props.qty.nbre); // update qty
        }
        dataView.rows.push(createRow(item.title, qty, item.price, item.isbn)); // and create row
    });
    dataView.invoiceSubtotal = subtotal(dataView.rows);

    /*
    array offers contain all type offers that we are going to give to getPermutation.
    it calculates all possible combination of offers
     */
    let offers = [];
    offer.forEach(function (item) { // for each offer 'slice, percentage, deduction'
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

// check the props
SpanningTable.propTypes = {
    bookInBasket: PropTypes.array.isRequired,
    offer: PropTypes.array.isRequired,
    handleUpdateQuantity: PropTypes.func.isRequired,
    qty: PropTypes.object.isRequired
};

export default SpanningTable;