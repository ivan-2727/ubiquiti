import { DeviceInterface } from "../interfaces/interfaces";
import '../styles/OneDevice.css'

function OneDevice (props : {device : DeviceInterface}) {
    console.log(props.device);
    return (
        <div className="OneDevice--wrapper"> 
    <div className="OneDevice--container">
        <div className="OneDevice--image"> 
        <img  src={`https://static.ui.com/fingerprint/ui/icons/${props.device.icon.id}_${props.device.icon.res[1]}x${props.device.icon.res[1]}.png`}></img>
        </div>
        <div className="OneDevice--description">  
        <table >
        <tbody> 
            <tr>
                <td className="oneDevice--description--left"> Product line </td>
                <td className="oneDevice--description--right"> {props.device.line}</td>
            </tr>
            <tr>
                <td className="oneDevice--description--left"> ID </td>
                <td className="oneDevice--description--right"> {props.device.id}</td>
            </tr>
            <tr>
                <td className="oneDevice--description--left"> Name </td>
                <td className="oneDevice--description--right"> {props.device.name}</td>
            </tr>
            <tr>
                <td className="oneDevice--description--left"> Short name </td>
                <td className="oneDevice--description--right"> {props.device.shortNames}</td>
            </tr>
            <tr>
                <td className="oneDevice--description--left"> Max. power </td>
                <td className="oneDevice--description--right"> {props.device.maxPower}</td>
            </tr>
            <tr>
                <td className="oneDevice--description--left"> Speed </td>
                <td className="oneDevice--description--right"> {props.device.speed}</td>
            </tr>
            <tr>
                <td className="oneDevice--description--left"> Number of ports </td>
                <td className="oneDevice--description--right"> {props.device.numPorts}</td>
            </tr>
        
        </tbody>
        </table>
        </div>
    </div>
    </div>
    ); 
}

export default OneDevice;