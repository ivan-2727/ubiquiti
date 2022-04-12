import '../styles/Filter.css'

import { DeviceInterface, FilterInterface } from "../interfaces/interfaces";
import React, { useState } from "react";

function Filter (props : FilterInterface) {

    const allPossiblefilterTerms : string[] = [];
    props.devices.forEach((oneDevice : DeviceInterface) => {
        if (!allPossiblefilterTerms.includes(oneDevice.line)) {
            allPossiblefilterTerms.push(oneDevice.line);
        }
    });

    const changeFilterTerms = (clickedTerm : string) => {
        console.log(clickedTerm);
        if (props.filterTerms.includes(clickedTerm)) {
            props.setFilter(props.filterTerms.filter(term => term !== clickedTerm));
        }
        else {
            props.setFilter(props.filterTerms.concat([clickedTerm]));
        }
    }

    return (
        <div className='Filter--Container'>
            <button className="Filter--Button" >
                Filter
            </button>

            <form className='Filter--Bar'>
            <p className='Filter--Bar--Term' onClick={()=>{props.setFilter([])}}> 
                Clear 
            </p>
            {allPossiblefilterTerms.map(term => 
            <p className='Filter--Bar--Term' onClick={()=>{changeFilterTerms(term)}}> 
                <input type="checkbox" checked={props.filterTerms.includes(term)}/>
                <label >&emsp;{term}</label> 
            </p>
            )}
            </form>
        </div>
    )
}

export default Filter;