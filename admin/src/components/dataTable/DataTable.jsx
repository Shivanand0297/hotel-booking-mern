import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { host, v } from "../../config/config";
import axios from "axios";
import { toast } from "react-toastify";

const DataTable = ({column, item}) => {

  // to find which page to render
  const location = useLocation()

  // getting page end point
  const path = location.pathname.split("/")[1]

  // storing fetch data in list
  const [list, setList] = useState([])

  const { data } = useFetch(`${host}/api/${v}/${path}`)  //automaticaly detect with page to fetch

  // to update the list as data changes
  useEffect(()=>{

    setList(data)
  }, [data])

  const handleDelete = async (id) =>{

      if(path === "rooms"){
        const {data} = await axios.get(`${host}/api/${v}/hotels`, {credentials: "include"})

        let hotelId = []

        data.forEach(hotel=>{
          const isRoomPresent = hotel.rooms.some(roomid=>(roomid === id))
          if(isRoomPresent){
            // return hotel._id
            hotelId.push(hotel._id)
          }
        })

        console.log(hotelId)

      try{
          
          await Promise.all(hotelId.map(async hotel_id=>{
            await axios.delete(`${host}/api/${v}/rooms/${id}/${hotel_id}`, {credentials: "include"})

          }))
          console.log(list)
          setList(list.filter(item=>(item._id !== id))) 

        }catch(err){
          console.log(err)
        }
      }

      try{
        const res = await axios.delete(`${host}/api/${v}/${path}/${id}`) //deleting from backend
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
      width: 120,
      renderCell: (params)=>{
        return(
          <div className="cellAction" >
          <Link to={`/${path}/${params.row._id}`} className='link' >
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
        <Link to={`/${path}/new`} className='link' >
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
