import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    return { desc, qty, unit, price };
}

function deductionPerPurchaseTranche(slice, sliceValue, invoiceTotal) {
    console.log('slice', slice);
    console.log('sliceValue', sliceValue);
    console.log('invoiceTotal', invoiceTotal);
    var result = Math.floor(invoiceTotal / slice);
    console.log('result', result);
    console.log('result * slice', result * slice);
    return result * sliceValue;
}

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}





function SpanningTable(props) {
    const classes = useStyles();
    const rows = [];
    props.bookInBasket.forEach(function(item, index){
        rows.push(createRow(item.title, 1, item.price));
    });
    let discountRate = 0;
    let deduction = 0;
    let slice = 0;
    let sliceValue = 0;
    props.offer.forEach(function(item, index){
        switch (item.type) {
            case "percentage":
                discountRate = item.value / 100;
                break;
            case "minus":
                console.log('minus');
                deduction = item.value;
                break;
            case "slice":
                console.log('"slice"');
                slice = item.sliceValue;
                sliceValue = item.value;
                break;
            default:
                console.log('default');
        }
    });
    const invoiceSubtotal = subtotal(rows);
    const invoiceTaxes = discountRate * invoiceSubtotal;



    let invoiceTotal = invoiceSubtotal - invoiceTaxes - deduction;
    let deductionPerSlice = deductionPerPurchaseTranche(slice, sliceValue, invoiceTotal);
    invoiceTotal -= deductionPerSlice;
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
                        <TableCell rowSpan={5} />
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Remise</TableCell>
                        <TableCell align="right">{`${(discountRate * 100).toFixed(0)} %`}</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Déduction</TableCell>
                        <TableCell align="right" />
                        <TableCell align="right">{ccyFormat(deduction)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>tranche</TableCell>
                        <TableCell align="right">{`${sliceValue} € par tranche de ${slice} €`}</TableCell>
                        <TableCell align="right">{ccyFormat(deductionPerSlice)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
}

export default SpanningTable;
