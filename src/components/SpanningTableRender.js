import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import {makeStyles} from "@material-ui/core";

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

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

function SpanningTableRender(props) {
    const {propsParent, dataView } = props;
    const classes = useStyles();
    const generateOffersCells = () => {
        var stuff = [];
        for (let i = 0, c = propsParent.offer.length; i < c; i++) {
            let typeOffer = dataView.offersPossibilities[dataView.indexBestOffer]['value' + i];
            switch (typeOffer) {
                case 'percentage':
                    stuff.push((
                        <TableRow>
                            <TableCell>Remise</TableCell>
                            <TableCell align="right">{`${(dataView.discountRate * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right">{ccyFormat(dataView.offersPossibilities[dataView.indexBestOffer].data[i])}</TableCell>
                        </TableRow>
                    ));
                    break;
                case 'slice':
                    stuff.push((
                        <TableRow>
                            <TableCell>tranche</TableCell>
                            <TableCell align="right">{`${dataView.sliceValue} €/ ${dataView.slice} € d'achats`}</TableCell>
                            <TableCell align="right">{ccyFormat(dataView.offersPossibilities[dataView.indexBestOffer].data[i])}</TableCell>
                        </TableRow>
                    ));
                    break;
                case 'minus':
                    stuff.push((
                        <TableRow>
                            <TableCell>Déduction</TableCell>
                            <TableCell align="right"/>
                            <TableCell align="right">{ccyFormat(dataView.offersPossibilities[dataView.indexBestOffer].data[i])}</TableCell>
                        </TableRow>
                    ));
                    break;
            }
        }
        stuff.push((
            <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(dataView.offersPossibilities[dataView.indexBestOffer].result)}</TableCell>
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
                    {dataView.rows.map(row => (
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
                        <TableCell align="right">{ccyFormat(dataView.invoiceSubtotal)}</TableCell>
                    </TableRow>
                    {generateOffersCells().map((item) => item)}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default SpanningTableRender;