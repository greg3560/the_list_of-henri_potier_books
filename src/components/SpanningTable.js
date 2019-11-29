import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
}));

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return {desc, qty, unit, price};
}

// const deductionPerPurchaseTranche = (slice, sliceValue, invoiceTotal) =>
//     Math.floor(invoiceTotal / slice) * sliceValue;

const deductionPerPurchaseTranche = (slice, sliceValue, invoiceTotal1) => {
    // console.log('invoiceTotal1', invoiceTotal1);
    // console.log('slice', slice);
    // console.log('Math.floor', Math.floor(invoiceTotal1 / slice));
    // console.log('sliceValue', sliceValue);
    // console.log('invoiceTotal', invoiceTotal1);
    return Math.floor(invoiceTotal1 / slice) * sliceValue;
};


function subtotal(items) {
    return items.map(({price}) => price).reduce((sum, i) => sum + i, 0);
}


var offersPossibility = [];

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


function SpanningTable(props) {
    const classes = useStyles();
    // useEffect(() => { // will unmount
    //     console.log('unMount');
    //     return () => {
    //         offersPossibility = [];
    //     };
    // }, []);
    useEffect(() => { // will unmount
        return () => {
            offersPossibility = [];
        };
    });
    const rows = [];
    props.bookInBasket.forEach(function (item, index) {
        rows.push(createRow(item.title, 1, item.price));
    });
    let discountRate = 0;
    let deduction = 0;
    let slice = 0;
    let sliceValue = 0;
    let indexBestOffer = null;

    props.offer.forEach(function (item, index) {
        switch (item.type) {
            case "percentage":
                discountRate = item.value / 100;
                break;
            case "minus":
                deduction = item.value;
                break;
            case "slice":
                slice = item.sliceValue;
                sliceValue = item.value;
                break;
            default:
        }
    });
    const invoiceSubtotal = subtotal(rows);


    const invoiceTaxes = (value) => discountRate * value;

    const searchIndexBestOffer = (tab2) => {

        let min = null;
        for (var i = 0, c = tab2.length; i < c; i++) {
            if (i === 0) {
                min = tab2[i];
                indexBestOffer = i;
            } else {
                if (min > tab2[i]) {
                    min = tab2[i];
                    indexBestOffer = i;
                }
            }
        }
        return indexBestOffer;
    };


    let invoiceTotal = invoiceSubtotal - invoiceTaxes(invoiceSubtotal) - deduction;
    let deductionPerSlice = deductionPerPurchaseTranche(slice, sliceValue, invoiceTotal);
    invoiceTotal -= deductionPerSlice;

    console.log('props.offer', props.offer);
    var offers = ['invoiceTaxes', 'deductionPerPurchaseTranche', deduction];

// Get the permutations
    generate(offers.length, offers);
    console.log('offersPossibility', offersPossibility);
    let tab = [];
    let tab2 = [];
    for (let i = 0, c = offersPossibility.length; i < c; i++) {
        let count = 0;
        tab = [];
        let result = 0;
        for (var prop in offersPossibility[i]) {

            if (offersPossibility[i].hasOwnProperty(prop)) {
                // tab.push(offersPossibility[i][prop]);
                console.log(`obj.${prop} = ${offersPossibility[i][prop]}`);

                console.log('offersPossibility[i][prop]', offersPossibility[i][prop]);

                switch (offersPossibility[i][prop]) {
                    case 'invoiceTaxes':
                        if (count === 0) result = invoiceTaxes(invoiceSubtotal);
                        else {
                            for (let i = 0; i < tab.length; i++) {
                                if (i === 0) result = invoiceSubtotal - tab[i];
                                else result -= tab[i];
                            }
                            result = invoiceTaxes(result);
                        }
                        // console.log('result1', result);
                        break;
                    case 'deductionPerPurchaseTranche':
                        if (count === 0) result = deductionPerPurchaseTranche(slice, sliceValue, invoiceSubtotal);
                        else {
                            for (let i = 0; i < tab.length; i++) {
                                if (i === 0) {
                                    result = invoiceSubtotal - tab[i];
                                } else result -= tab[i];
                            }
                            console.log('slice', slice);
                            console.log('sliceValue', sliceValue);
                            console.log('result', result);
                            result = deductionPerPurchaseTranche(slice, sliceValue, result);
                            console.log('result2', result);
                        }
                        // console.log('result2', result);
                        break;
                    default:
                        if (count === 0) result = offersPossibility[i][prop];
                        else {
                            for (let i = 0; i < tab.length; i++) {
                                if (i === 0) result = tab[i];
                                else result -= tab[i];
                            }
                            result = offersPossibility[i][prop];
                        }
                    // console.log('result3', result);
                    // TODO spinner
                }
                if (result !== 0) tab.push(result);
                count++;
            }
        }
        console.log('resultZ', tab);
        offersPossibility[i].data = tab;

        let ultimeResult = 0;
        for (let i = 0, c = tab.length; i < c; i++) {
            if (i === 0) ultimeResult = invoiceSubtotal - tab[i];
            else ultimeResult -= tab[i];
        }
        tab2.push(ultimeResult);
        let indexBestOffer = searchIndexBestOffer(tab2);
        offersPossibility[i].result = tab2[i];
    }
    console.log('offersPossibilityoffersPossibility', offersPossibility);
    console.log('TTAABB', tab2);

    // console.log('indexBestOffer', indexBestOffer);
    // console.log('indexBestOffer', offersPossibility[indexBestOffer]);
    // console.log('props.offer', props.offer);
    const generateOffersCells = () => {
        var stuff = [];
        for (let i = 0, c = props.offer.length; i < c; i++) {
            let typeOffer = offersPossibility[indexBestOffer]['value' + i];
            switch (typeOffer) {
                case 'invoiceTaxes':
                    stuff.push((
                        <TableRow>
                            <TableCell>Remise</TableCell>
                            <TableCell align="right">{`${(discountRate * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right">{ccyFormat(offersPossibility[indexBestOffer].data[i])}</TableCell>
                        </TableRow>
                    ));
                    break;
                case 'deductionPerPurchaseTranche':
                    stuff.push((
                        <TableRow>
                            <TableCell>tranche</TableCell>
                            <TableCell align="right">{`${sliceValue} €/ ${slice} € d'achats`}</TableCell>
                            <TableCell align="right">{ccyFormat(offersPossibility[indexBestOffer].data[i])}</TableCell>
                        </TableRow>
                    ));
                    break;
                default:
                    stuff.push((
                        <TableRow>
                            <TableCell>Déduction</TableCell>
                            <TableCell align="right"/>
                            <TableCell align="right">{ccyFormat(offersPossibility[indexBestOffer].data[i])}</TableCell>
                        </TableRow>
                    ));
            }
        }
        stuff.push((
            <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(offersPossibility[indexBestOffer].result)}</TableCell>
            </TableRow>
        ));
        return stuff;
    };
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Livre</TableCell>
                        <TableCell align="right">Quantité.</TableCell>
                        <TableCell align="right">P.U.</TableCell>
                        <TableCell align="right">Prix/€</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.desc}>
                            <TableCell>{row.desc}</TableCell>
                            <TableCell align="right">{row.qty}</TableCell>
                            <TableCell align="right">{row.unit}</TableCell>
                            <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell rowSpan={5}/>
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                    </TableRow>
                    {generateOffersCells().map((item) => item)}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default SpanningTable;
