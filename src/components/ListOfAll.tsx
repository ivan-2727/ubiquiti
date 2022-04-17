import {ListOfAllInterface} from '../interfaces/interfaces'
import '../styles/ListOfAll.css'

function ListOfAll (props : ListOfAllInterface) {
    return (
    <div className='ListOfAll--container'>
    {props.view === 'list' && <table className='ListOfAll--table'>
        <thead>
            <tr>
                <th className='IconHeader'> {props.devices.length.toString() + " devices"}</th>
                <th className='LineHeader'> PRODUCT LINE </th>
                <th className='NameHeader'> NAME </th>
            </tr>
        </thead>
        <tbody> 
        {
            props.devices.map(device => 
            <tr className="ListOfAll--OneDeviceRow" onClick={()=>{props.selectDevice(device.internalUuid)}}>
                <td className="IconCol" > 
                    <img className="Icon" src={`https://static.ui.com/fingerprint/ui/icons/${device.icon.id}_${device.icon.res[1]}x${device.icon.res[1]}.png`}/> 
                </td>
                <td className="LineCol" > {device.line}</td>
                <td className="NameCol" > {device.name}</td>
            </tr>)
        }
        </tbody>
    </table>}
    {props.view === 'grid' && <div>
        <p className='ListOfAll--number'>{props.devices.length.toString() + " devices"}</p>
        <div className='ListOfAll--grid'>
        {
            props.devices.map(device => 
            <div className='ListOfAll--grid--item' onClick={()=>{props.selectDevice(device.internalUuid)}}>
                <img className="ListOfAll--grid--item--image" src={`https://static.ui.com/fingerprint/ui/icons/${device.icon.id}_${device.icon.res[1]}x${device.icon.res[1]}.png`}/> 
                <p className="ListOfAll--grid--item--name" > {device.name}</p>
                <p className="ListOfAll--grid--item--line" > {device.line}</p>
            </div>)
        } 
        </div>
    </div>

    }
    </div>
    ); 
}

export default ListOfAll;