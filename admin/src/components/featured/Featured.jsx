import { KeyboardArrowDown, KeyboardArrowUp, MoreVert } from "@mui/icons-material"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./featured.scss"

const Featured = () => {
  return (
    <div className="featured" >
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVert fontSize="small" className="titleOptions" />
      </div>
      <div className="bottom">
        <div className="progressBar">
          <CircularProgressbar value={66} text={`66%`} strokeWidth={3} styles={ buildStyles({
            pathColor: "#76b900",
            textColor: "#76b900"
          })} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">$ 1400</p>
        <p className="desc">Previous transactions processing, Last payment may not be included</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDown fontSize="small" />
              <div className="resultAmount">$32.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUp fontSize="small" />
              <div className="resultAmount">$32.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult negative">
              <KeyboardArrowDown fontSize="small" />
              <div className="resultAmount">$32.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured