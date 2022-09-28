import React, { useState, useEffect } from "react";
import useTable from "../../../../common/useTable";
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
import Controls from "../../../../common/controls/Controls";
import { ConvertDate } from "../../../../utils/ConvertDate";
import FaqEditDialog from "./FaqEditDialog";
import DeleteIconDialog from "../../../../common/DeleteIconDialog";
import Editor from "rich-markdown-editor";

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
  { id: "faqId", label: "Faq ID", disableSorting: true },
  { id: "date", label: "Date", disableSorting: true },
  { id: "question", label: "Question" },
  { id: "answer", label: "Answer" },
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

function FaqTable({ faqs, faqsSelected, changeFaqsSelected, handleUpdateFaq, handleDeleteFaq }) {
  const classes = useStyles();
  const [records, setRecords] = useState(faqs);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    setRecords(faqs);
  }, [faqs]);

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
              x.question.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };

  return (
    <div className={classes.pageContent}>
      <Toolbar>
        <Controls.Input
          label="Search using question"
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
            var isSelected = item === faqsSelected;
            return (
              <TableRow key={idx}>
                <TableCell style={wrapStyle}>{item.id} </TableCell>
                <TableCell>{ConvertDate(item.date)} </TableCell>
                <TableCell>{item.question} </TableCell>
                <TableCell>
                        
                    {!item.answer && (
                      <>ToDo</>
                    )}
                  {item.answer && 
                    <Editor 
                    defaultValue={item?.answer}
                    className="editor-description"
                    readOnly
                    value={item?.answer}
                    />
                  }
                </TableCell>
                <TableCell>
                  <>
                  <FaqEditDialog
                    initialData={item}
                    question={item.question}
                    answer={item.answer ? item.answer : ""}
                    callbackUpdate={handleUpdateFaq}
                  />
                    <DeleteIconDialog
                    alertText={"Are you sure to delete this product?"}
                    callbackDelete={() => handleDeleteFaq(item.id)}
                  /> 
                  <IconButton
                    color="primary"
                    onClick={() => changeFaqsSelected(item)}
                    disabled={isSelected}
                  >
                    <Visibility />
                  </IconButton>
                  </>
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

export default FaqTable;
