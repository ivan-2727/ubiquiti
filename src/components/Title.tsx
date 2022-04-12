import { BsChevronLeft } from "react-icons/bs";
import '../styles/Title.css'

function Title (props : {name : string, backToFullList : {(): void}}) {
    return (
        <div className="Title--Container">  
            <button className="Title--BackButton" onClick={(e)=>{props.backToFullList();}}> <BsChevronLeft /> </button>
            <div className="Title--Name">{props.name}</div>
        </div>
    )
}
export default Title;