import * as React from 'react';
import { TableCell } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomTableCell = styled(TableCell)(() => ({
    padding: 5,
    paddingLeft: 16,
    margin: 'auto !important'
}))

export default function ListTableCell({ID, value}){
    return <CustomTableCell id={ID}>{value}</CustomTableCell>
}