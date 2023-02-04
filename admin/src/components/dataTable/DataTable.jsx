import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumn, userRows } from "./dataTableSource";
import { Link } from "react-router-dom";
import { useState } from "react";

const DataTable = () => {
  const [rowData, setRowData] = useState(userRows)

  const handleDelete = (id) =>{
    setRowData(rowData.filter(item=>(item.id !== id)))
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params)=>{
        return(
          <div className="cellAction" >
          <Link to="/users/test" className='link' >
            <button className="viewButton" >View</button>
          </Link>
            <button className="deleteButton" onClick={()=>{handleDelete(params.row.id)}} >Delete</button>
          </div>
        )
      }
    }
  ]

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <span>Current Users</span>
        <Link to="/users/new" className='link' >
          <button>Add New</button>
        </Link>
      </div>
      <DataGrid
        rows={rowData}
        columns={userColumn.concat(actionColumn)}
        pageSize={7}
        rowsPerPageOptions={[7]}
        className="datagrid"
      />
    </div>
  );
};

export default DataTable;
