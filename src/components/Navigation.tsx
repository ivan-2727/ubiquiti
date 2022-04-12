import { NavigationInterface } from "../interfaces/interfaces"
import Filter from "./Filter"
import {BsFillGridFill, BsListUl} from 'react-icons/bs'
import '../styles/Navigation.css'

function Navigation(props : NavigationInterface) {
    return (<div className="Navigation--container">
        <form>
            <input className="Navigation--search" onChange={(e)=>{props.setSearchTerm((e.target as HTMLInputElement).value)}} value={props.searchTerm} type="text" />
        </form>
        <button title="Show as grid" className="Navigation--gridButton" onClick={()=>{props.setView('grid')}}> <BsFillGridFill /> </button> 
        <button title="Show as list" className="Navigation--listButton" onClick={()=>{props.setView('list')}}> <BsListUl /> </button> 
        <Filter setFilter={props.setFilter} filterTerms={props.filterTerms} devices={props.devices}/>
    </div>);
}


export default Navigation;