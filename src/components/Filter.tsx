import '../styles/Filter.css'
import { BiX } from "react-icons/bi";

import { DeviceInterface, FilterInterface } from "../interfaces/interfaces";
import { useState } from 'react';

function Filter (props : FilterInterface) {

    const [showBar, setShowBar] = useState <Boolean> (false); 

    const allPossiblefilterTerms : string[] = [];
    props.devices.forEach((oneDevice : DeviceInterface) => {
        if (!allPossiblefilterTerms.includes(oneDevice.line)) {
            allPossiblefilterTerms.push(oneDevice.line);
        }
    });

    const changeFilterTerms = (clickedTerm : string) => {
        if (props.filterTerms.includes(clickedTerm)) {
            props.setFilter(props.filterTerms.filter(term => term !== clickedTerm));
        }
        else {
            props.setFilter(props.filterTerms.concat([clickedTerm]));
        }
    }

    return (
        <div className='Filter--Container' >
            
            <button className="Filter--Button" onClick={()=>{setShowBar(!showBar)}} >
                {showBar ? <BiX size={25} /> : "Filter"}
            </button>

            {showBar && <form className='Filter--Bar'>
            <p className='Filter--Bar--Clear' onClick={()=>{props.setFilter([])}}> 
            &emsp;Clear&emsp; 
            </p>
            {allPossiblefilterTerms.map(term => 
            <p className='Filter--Bar--Term' onClick={()=>{changeFilterTerms(term)}}> 
                <input type="checkbox" checked={props.filterTerms.includes(term)}/>
                <label className='Filter--Bar--Term--Label'>&emsp;{term}</label> 
            </p>
            )}
            </form>}
        </div>
    )
}

export default Filter;