import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Widget from "../../components/widget/Widget"
import Featured from "../../components/featured/Featured"
import Chart from "../../components/chart/Chart"
import List from "../../components/list/List"
import "./home.scss"

const Home = () => {
  return (
    <div className="home" >
      <Sidebar/>
      <div className="homeContainer">
        <Navbar/>
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured/>
          <Chart title="Last 6 Months (Revenue)" aspect={2/1} />
        </div>
        <div className="tableContainer">
          <div className="tableTitle">Latest Transactions</div>
          <List/>
        </div>
      </div>
    </div>
  )
}

export default Home