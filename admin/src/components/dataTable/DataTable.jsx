import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumn, userRows } from "./dataTableSource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { v } from "../../config/config";
import axios from "axios";
import { toast } from "react-toastify";

const DataTable = ({column, item}) => {

  // to find which page to render
  const location = useLocation()
  // getting page end point
  const path = location.pathname.split("/")[1]
  const [list, setList] = useState([])
  const { data } = useFetch(`/api/${v}/${path}`)  //automaticaly detect with page to fetch

  // to update the list as data changes
  useEffect(()=>{

    setList(data)
  }, [data])

  const handleDelete = async (id) =>{
      try{
        const res = await axios.delete(`/api/${v}/${path}/${id}`) //deleting from backend
        setList(list.filter(item=>(item._id !== id))) 
        toast(res.data, {
          type: "success",
          position: "bottom-center"
        })
      }catch(err){
        toast(err.message, {
          type: "error",
          position: "bottom-center"
        })
      }
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
            <button className="deleteButton" onClick={()=>{handleDelete(params.row._id)}} >Delete</button>
          </div>
        )
      }
    }
  ]

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <span>Current {item}</span>
        <Link to="/users/new" className='link' >
          <button>Add New</button>
        </Link>
      </div>
      <DataGrid
        rows={list}
        columns={column.concat(actionColumn)}
        pageSize={7}
        rowsPerPageOptions={[7]}
        className="datagrid"
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default DataTable;
