import React, { useState, useEffect } from "react";
import "./App.css";
import MaterialTable from "material-table";
import GetAppIcon from "@material-ui/icons/GetApp";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import {Avatar, FormControl, FormControlLabel, Grid, Radio, RadioGroup} from "@material-ui/core";
import FilterInput from "./FilterComponent";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: "blue",
    "&:hover": {
      color: "red",
    },
  },
});

function App() {
  const classes = useStyles();
  const filterColumn = [{ title: "ID" }];
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [anchorEl, setAnchorEl] = useState("");
  const [operator, setOperator] = useState(""); 
  var status;

  const handleChange = (event) => {
    console.log(event.target.value);
  };

  const handleChangeFilter = (event) => {
    // console.log(event.target.value, "+++");
    setValue(event.target.value);
    console.log(operator, "operator");
    var filteredValue = tableData.filter((item) => 
    {      
      if(operator === "=")
        status = (item.id == event.target.value)
      else if(operator === "!=")
        status = (item.id != event.target.value)
      else if(operator === "<")
        status = (item.id < event.target.value)
      else if(operator === ">")
        status = (item.id > event.target.value)
      else if(operator === "<=")
        status = (item.id <= event.target.value)
      else if(operator === ">=")
        status = (item.id >= event.target.value)
      return status
    })
   
    console.log(filteredValue, "======");
    setDataFunc(filteredValue);
    // setTableData(filteredValue)
    // console.log(tableData.map(item => item.id.toString() === event.target.value),"mmmmmmmmm")
    // console.log(tableData.filter(item => item.id.toString() === event.target.value),"rrrrrr")
  };

  const setDataFunc = (value) => {
    // console.log(value, "value123");
    setData(value);
  };
  // console.log(data, "table");

  const handleFilterClick = event => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl,"anchorEl")
  };

  const handleClose = e => {
    // console.log(e.target.innerText, "0000000") 
    setAnchorEl(null);
    setOperator(e.target.innerText)
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
        // console.log(data,"data");
      });
  }, []);

  const columns = [
    {
      title: "ID",
      field: "id",
      align: "left",
      sorting: true,
      filtering: true,
      cellStyle: {
        width: "7%",
      },
      filterComponent: (props) =>               // Custom Filter for particular column
        <FilterInput
          {...props}
          onChange={handleChangeFilter}
          handleFilterClick={handleFilterClick}
          handleClose={handleClose}
          value={value}            
          anchorEl={Boolean(anchorEl)}                                    
          filterOptions={
          ["=", "!=", "<", ">", "<=", ">="]}
        />
    },
    {
      title: "UserName",
      field: "username",
      filtering: true,
      align: "center",
      filterPlaceholder: "Filter by UserName",
      cellStyle: { color: "red" },
      render: (row) => (
        <Grid container alignItems="center">
          <Grid item sm={4}>
            <Avatar style={{ width: 35, height: 35, backgroundColor:"red", fontSize:17}}>
              {row.username[0] + row.username[1]}
            </Avatar>
          </Grid>
          <Grid item sm={4}>
            {row.username}
          </Grid>
        </Grid>
      ),
    },
    {
      title: "Email",
      field: "email",
      filterPlaceholder: "Filter by Email",
      align: "center",
    },
    {
      title: "City",
      field: "address.city",
      filterPlaceholder: "Filter by City",
      align: "center",
    },
    {
      title: "Zipcode",
      field: "address.zipcode",
      align: "center",
      grouping: false,
      filtering: true,
      filterPlaceholder: "Filter by zipcode",
    },
    {
      title: "Website",
      field: "website",
      render: (rowData) => (
        <a href={"http://" + rowData.website} className={classes.link}>
          {rowData.website}
        </a>
      ),
      filterPlaceholder: "Filter by website",
      align: "center",
    },
    {
      title: "Status",
      align: "center",
      cellStyle: {
        width: "14%",
      },
      render: (row) => (
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="Approval status"
            name="status1"
            onChange={handleChange}
          >
            <FormControlLabel
              value="yes"
              control={<Radio />}
              label="Y"
              labelPlacement="top"
            />
            <FormControlLabel
              value="no"
              control={<Radio />}
              label="N"
              labelPlacement="top"
            />
          </RadioGroup>
        </FormControl>
      ),
    },
  ];
  return (
    <div className="App">
      <h1 style={{ color: "red" }}>Material Table</h1>

      <div>
        <MaterialTable
          style={{ borderRadius: "20px", margin: 30 }}
          className={classes.table}
          columns={columns}
          data={value.length === 0 ? tableData : data}
          editable={{
            // isDeleteHidden: (row) => row.id === 1,
            // isDeletable: (row) => row.id % 2 === 0,
            // isEditable: (row) => row.id % 2 !== 0,

            onRowAdd: (newRow) =>
              new Promise((resolve, reject) => {
                setTableData([...tableData, newRow]);
                setTimeout(() => resolve(), 500);
              }),
            onRowUpdate: (newRow, oldRow) =>
              new Promise((resolve, reject) => {
                const updatedData = [...tableData];
                updatedData[oldRow.tableData.id] = newRow;
                setTableData(updatedData);
                setTimeout(() => resolve(), 500);
              }),
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                const updatedData = [...tableData];
                updatedData.splice(selectedRow.tableData.id, 1);
                setTableData(updatedData);
                setTimeout(() => resolve(), 1000);
              }),
          }}

          // onRowClick={(event, rowData) => console.log(rowData)}

          // components={{                               // Custom Filter for all columns
          //   FilterRow: (props, rowData) => (
          //     <tr>
          //       <td style={{ width: "50px" }} />
          //       {filterColumn.map((column) => (
          //         <td>
          //           <FilterInput
          //             {...props}
          //             name={column.title}
          //             onChange={handleChangeFilter}
          //             handleFilterClick={handleFilterClick}
          //             handleClose={handleClose}
          //             value={value}
          //             anchorEl={Boolean(anchorEl)}
          //             filterOptions={
          //             ["=", "!=", "<", ">", "<=", ">="]}
          //           />
          //         </td>
          //       ))}
          //     </tr>
          //   ),
          // }}

          actions={[
            {
              icon: () => <GetAppIcon />,
              tooltip: "clear filter",
              onClick: (e, data) => console.log(data),
              // isFreeAction: true,
            },
          ]}
          onSelectionChange={(selectedRows) => console.log(selectedRows)}
          options={{
            sorting: true,
            search: true,
            searchFieldAlignment: "right",
            searchAutoFocus: true,
            searchFieldVariant: "standard",
            filtering: true,
            paging: true,
            pageSizeOptions: [3, 5, 10, 20, 25, 50, 100],
            pageSize: 5,
            paginationType: "stepped",
            showFirstLastPageButtons: false,
            paginationPosition: "top",
            exportButton: true,
            exportAllData: true,
            exportFileName: "UsersData",
            addRowPosition: "first",
            actionsColumnIndex: -1,
            selection: true,
            showSelectAllCheckbox: true,
            showTextRowsSelected: true,
            columnsButton: true,
            rowStyle: (data, index) =>
              index % 2 === 0 ? { background: "#f5f5f5" } : null,
            headerStyle: { background: "yellowgreen", color: "black" },
            // showTitle: false,
          }}
          title="User's Data"
          icons={{
            Add: () => <AddIcon />,
          }}
        />
      </div>
    </div>
  );
}

export default App;
