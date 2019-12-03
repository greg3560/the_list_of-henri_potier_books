import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import {makeStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import TextField from '@material-ui/core/TextField';

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(6),
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    textField: {
        width: '20%'
    }
}));

function SpanningTableRender(props) {
    const {propsParent, dataView, handleChangeQuantity } = props;
    const classes = useStyles();
    const generateOffersCells = () => {
        let cells = [];
        let i;
        for (i = 0; i < propsParent.offer.length; i++) {
            let typeOffer = dataView.offersPossibilities[dataView.indexBestOffer]['value' + i];
            switch (typeOffer) {
                case 'percentage':
                    cells.push((
                        <TableRow key={i}>
                            <TableCell>Remise</TableCell>
                            <TableCell align="right">{`${(dataView.discountRate * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right">{ccyFormat(dataView.offersPossibilities[dataView.indexBestOffer].data[i])}</TableCell>
                        </TableRow>
                    ));
                    break;
                case 'slice':
                    cells.push((
                        <TableRow key={i}>
                            <TableCell>tranche</TableCell>
                            <TableCell align="right">{`${dataView.sliceValue} €/ ${dataView.slice} € d'achats`}</TableCell>
                            <TableCell align="right">{ccyFormat(dataView.offersPossibilities[dataView.indexBestOffer].data[i])}</TableCell>
                        </TableRow>
                    ));
                    break;
                case 'minus':
                    cells.push((
                        <TableRow key={i}>
                            <TableCell>Déduction</TableCell>
                            <TableCell align="right"/>
                            <TableCell align="right">{ccyFormat(dataView.offersPossibilities[dataView.indexBestOffer].data[i])}</TableCell>
                        </TableRow>
                    ));
                    break;
            }
        }
        cells.push((
            <TableRow key={i + 1}>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(dataView.offersPossibilities[dataView.indexBestOffer].result)}</TableCell>
            </TableRow>
        ));
        return cells;
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
                    {dataView.rows.map((row) => (
                        <TableRow key={row.desc}>
                            <TableCell>{row.desc}</TableCell>
                            <TableCell align="right">
                                <TextField
                                    id="standard-number"
                                    // placeholder={row.qty}
                                    type="number"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    inputProps={{
                                        isbn: row.isbn
                                    }}
                                    margin="normal"
                                    onChange={handleChangeQuantity}
                                    defaultValue={row.qty}
                                />
                            </TableCell>
                            <TableCell align="right">{row.unit}</TableCell>
                            <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell rowSpan={5}/>
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">{ccyFormat(dataView.invoiceSubtotal)}</TableCell>
                    </TableRow>
                    {generateOffersCells()}
                </TableBody>
            </Table>
        </Paper>
    );
}

SpanningTableRender.propTypes = {
    propsParent: PropTypes.object.isRequired,
    dataView: PropTypes.object.isRequired,
    handleChangeQuantity: PropTypes.func.isRequired,
};

export default SpanningTableRender;