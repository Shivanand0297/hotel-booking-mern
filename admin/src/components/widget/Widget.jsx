import "./widget.scss"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonIcon from '@mui/icons-material/Person';
import { AccountBalanceWallet, MonetizationOn, ShoppingCart } from "@mui/icons-material";

const Widget = ({ type }) => {

  let data
  // temp
  let amount = 2000
  let diff = 12

  switch(type){
    case "user":
      data = {
        title: "Users",
        isMoney: false,
        link: "See all users",
        icon: (<PersonIcon className="icon" style={{
          color: "#dc143c",
          backgroundColor: "#fdcdce"
        }} />)
      }
    break;
    case "order":
      data = {
        title: "Orders",
        isMoney: false,
        link: "See all orders",
        icon: (<ShoppingCart className="icon" style={{
          color: "#ba9e3b",
          backgroundColor: "#fff8d7"
        }} />)
      }
    break;
    case "earning":
      data = {
        title: "Earnings",
        isMoney: true,
        link: "See net earnings",
        icon: (<MonetizationOn className="icon" style={{
          color: "#2f782f",
          backgroundColor: "#c9e9c4"
        }} />)
      }
    break;
    case "balance":
      data = {
        title: "Users",
        isMoney: true,
        link: "See details",
        icon: (<AccountBalanceWallet className="icon" style={{
          color: "#661164",
          backgroundColor: "#e7cce9"
        }} />)
      }
    break;
    default: 
    break;
  }


  return (
    <div className='widget' >
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.isMoney && "$" }{" "}{amount}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon/> {diff}%
        </div>
      {data.icon}
      </div>
    </div> 
  )
}

export default Widget