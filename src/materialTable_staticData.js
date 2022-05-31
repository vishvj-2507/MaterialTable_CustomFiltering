import React, { useState } from "react";
import "./App.css";
import MaterialTable from "material-table";
import GetAppIcon from "@material-ui/icons/GetApp";
import AddIcon from "@material-ui/icons/Add";

function App() {
  const [tableData, setTableData] = useState([
    {
      name: "Vijay",
      email: "vijay@gmail.com",
      phone: 7894561230,
      age: null,
      gender: "M",
      city: "Madurai",
      fee: 78777,
    },
    {
      name: "Amir",
      email: "amir@gmail.com",
      phone: 7845721590,
      age: 45,
      gender: "M",
      city: "Delhi",
      fee: 236125,
    },
    {
      name: "Mona",
      email: "mona@gmail.com",
      phone: 741856712,
      age: 16,
      gender: "F",
      city: "Noida",
      fee: 453796,
    },
    {
      name: "Vikas",
      email: "vikas@gmail.com",
      phone: 9876543210,
      age: 12,
      gender: "M",
      city: "Mumbai",
      fee: 774569,
    },
    {
      name: "Nancy",
      email: "nancy@gmail.com",
      phone: 7845621301,
      age: 25,
      gender: "F",
      city: "Patna",
      fee: 658521,
    },
    {
      name: "Vijay",
      email: "vijay@gmail.com",
      phone: 7894561230,
      age: null,
      gender: "M",
      city: "Madurai",
      fee: 78777,
    },
    {
      name: "Mona",
      email: "mona@gmail.com",
      phone: 741856712,
      age: 16,
      gender: "F",
      city: "Noida",
      fee: 453796,
    },
    {
      name: "Vikas",
      email: "vikas@gmail.com",
      phone: 9876543210,
      age: 20,
      gender: "M",
      city: "Mumbai",
      fee: 774569,
    },
    {
      name: "Raj",
      email: "Raj@gmail.com",
      phone: 7894561230,
      age: null,
      gender: "M",
      city: "Chennai",
      fee: 78956,
    },
    {
      name: "Vijay",
      email: "vijay@gmail.com",
      phone: 7894561230,
      age: null,
      gender: "M",
      city: "Madurai",
      fee: 78777,
    },
    {
      name: "Nancy",
      email: "nancy@gmail.com",
      phone: 7845621301,
      age: 25,
      gender: "F",
      city: "Patna",
      fee: 658521,
    },
    {
      name: "Vikas",
      email: "vikas@gmail.com",
      phone: 9876543210,
      age: 20,
      gender: "M",
      city: "Mumbai",
      fee: 774569,
    },
  ]);

  const columns = [
    {
      title: "Name",
      field: "name",
      filtering: true,
      // cellStyle: { background: "#009688" },
      headerStyle: { color: "#fff" },
      filterPlaceholder: "Filter Name",
    },
    {
      title: "Email",
      field: "email",
      filterPlaceholder: "Filter Email",
      align: "center",
    },
    {
      title: "Phone",
      field: "phone",
      align: "right",
      grouping: false,
      filtering: false,
    },
    {
      title: "Age",
      field: "age",
      emptyValue: () => <em>null</em>,
      render: (rowData) => (
        <div
          style={{
            background: rowData.age >= 18 ? "#008000aa" : "#f90000aa",
            borderRadius: "4px",
            paddingLeft: 5,
          }}
        >
          {rowData.age >= 18 ? "18+" : "18-"}
        </div>
      ),
      searchable: false,
      export: false,
      filtering: false,
      align: "right",
    },
    {
      title: "Gender",
      field: "gender",
      lookup: { M: "Male", F: "Female" },
      align: "right",
      // defaultGroupOrder: 1,
    },
    {
      title: "City",
      field: "city",
      filterPlaceholder: "Filter City",
      align: "center",
    },
    {
      title: "Fee Amount",
      field: "fee",
      type: "currency",
      currencySetting: { currencyCode: "INR", minimumFractionDigits: 0 },
      filtering: false,
      filterPlaceholder: "Filter Amount",
      align: "cnter",
      // cellStyle: { background: "#009688" },
      // headerStyle: { color: "#fff" },
    },
  ];
  return (
    <div className="App">
      <h1>Material Table</h1>

      <MaterialTable
        className="table"
        columns={columns}
        data={tableData}
        editable={{
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
        actions={[
          {
            icon: () => <GetAppIcon />,
            tooltip: "Click me-1",
            onClick: (e, data) => console.log(data),
            isFreeAction: true,
          },
          {
            icon: () => <GetAppIcon />,
            tooltip: "Click me-2",
            onClick: (e, data) => console.log(data),
            isFreeAction: true,
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
          pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
          pageSize: 5,
          paginationType: "stepped",
          showFirstLastPageButtons: false,
          paginationPosition: "bottom",
          exportButton: true,
          exportAllData: true,
          exportFileName: "StudentData",
          addRowPosition: "first",
          actionsColumnIndex: -1,
          selection: true,
          showSelectAllCheckbox: true,
          showTextRowsSelected: true,
          selectionProps: (rowData) => ({
            disabled: rowData.age == null,
            // color:"primary"
          }),
          columnsButton: true,
          rowStyle: (data, index) =>
            index % 2 === 0 ? { background: "#f5f5f5" } : null,
          headerStyle: { background: "yellowgreen", color: "#fff" },
          // showTitle: false,
        }}
        title="Students Information"
        icons={{ Add: () => <AddIcon /> }}
      />
    </div>
  );
}

export default App;
