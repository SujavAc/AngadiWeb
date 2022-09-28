import React, { useState, useEffect } from "react";
import useTable from "../../common/useTable";
import {
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Visibility, Search } from "@material-ui/icons";
import Controls from "../../common/controls/Controls";
import { ConvertDate } from "../../utils/ConvertDate";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(1),
    minHeight: "80vh",
    backgroundColor: "#FFFFFF",
    paddingTop: theme.spacing(2),
  },
  searchInput: {
    width: "100%",
  },
}));

const headCells = [
  { id: "orderId", label: "Order ID", disableSorting: true },
  { id: "date", label: "Date", disableSorting: true },
  { id: "amount", label: "Amount" },
  { id: "status", label: "Status" },
  { id: "view", label: "View", disableSorting: true },
];

// FIXME: orderId is not wraping in tablecell
// FIXME: table content is overflowing on small screen device

// const getDate = (time) => {
//   var date = new Date(time.toDate().toString());
//   return (
//     date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
//   );
// };

const wrapStyle = {
  whiteSpace: "normal",
  wordWrap: "break-word",
};

function OrdersTable({ orders, orderSelected, changeOrderSelected }) {
  const classes = useStyles();
  const [records, setRecords] = useState(orders);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    setRecords(orders);
  }, [orders]);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter(
            (x) =>
              x.id.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };

  return (
    <div className={classes.pageContent}>
      <Toolbar>
        <Controls.Input
          label="Search with Pincode or Order ID"
          className={classes.searchInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
        />
      </Toolbar>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((item, idx) => {
            var isSelected = item === orderSelected;
            return (
              <TableRow key={idx}>
                <TableCell style={wrapStyle}>{item.id} </TableCell>
                <TableCell>{ConvertDate(item.createdAt)} </TableCell>
                <TableCell>{item.amount} </TableCell>
                <TableCell>
                    {!item.cancelled && !item.deliverd && (
                      <>ToDo</>
                    )}
                  {item.cancelled && (
                    <>Cancelled</>
                  )}
                  {item.deliverd && (
                    <>Delivered</>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => changeOrderSelected(item)}
                    disabled={isSelected}
                  >
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </div>
  );
}

export default OrdersTable;
