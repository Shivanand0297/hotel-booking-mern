import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import DataTable from "../../components/dataTable/DataTable"
import "./list.scss"
const List = ({column, item}) => {
  return (
    <div className="list" >
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DataTable column={column} item={item} />
      </div>
    </div>
  )
}

export default List