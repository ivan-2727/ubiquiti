import { randomUUID } from "crypto";
import { AppStateInterface, setAppStateInterface, fetchedDeviceInterface, DeviceInterface } from "../interfaces/interfaces";
import {v4 as uuidv4} from 'uuid';
import OneDevice from "../components/OneDevice";

export const fetchDevices = (setAppState : setAppStateInterface, AppState : AppStateInterface ) => {
    fetch('https://static.ui.com/fingerprint/ui/public.json')
    .then(res => res.json())
    .then(res => {      
        const devices = res.devices.map((fetchedDevice : fetchedDeviceInterface) => {
            let shortNames = '';
            fetchedDevice.shortnames.forEach((oneShortname : string) => {shortNames += oneShortname + ', '});
            if (shortNames.length>0) shortNames = shortNames.slice(0,shortNames.length-2);
            let res : number[] = [];
            let fetchedRes = fetchedDevice.icon.resolutions;
            fetchedRes.sort((a,b)=> a[0]-b[0]);
            res.push(fetchedRes[0][0]);
            res.push(fetchedRes[fetchedRes.length-1][0]);
            return {
              line: fetchedDevice.line.name,
              id: fetchedDevice.line.id,
              internalUuid: uuidv4(),
              name: fetchedDevice.product.name,
              shortNames: shortNames,
              maxPower: '',
              speed: '',
              numPorts: '',
              icon: {
                  id: fetchedDevice.icon.id,
                  res: res
              }
            }
          });
      setAppState({
        ...AppState, 
        devices: devices,
      })
    })
  }

  export const initialAppState = {
    typeOfWindow: 'fullList',
    selectedDevice: {
      line: '',
      id: '',
      internalUuid: '',
      name: '',
      shortNames: '',
      maxPower: '',
      speed: '',
      numPorts: '',
      icon: {
        id: '',
        res: []
        }
    },
    viewOfFullList: 'list',
    devices: [],
    searchTerm: '',
    filterTerms: [],
  };

  export const searchAndFilter = (searchTerm : string, filterTerms : string[], devices : DeviceInterface[]) => {
      searchTerm = searchTerm.replace(/\s/g, '');
      return devices.filter(oneDevice => {
        let ok = false;
        if (!searchTerm) ok = true;
        if (searchTerm.length === 0) ok = true;
        let param : keyof typeof oneDevice;
        for (param in oneDevice) {
            if (param != "icon") if (oneDevice[param].toLowerCase().includes(searchTerm.toLowerCase())) ok = true;
        }
        if (filterTerms.length === 0) return ok;
        return ok && (filterTerms.includes(oneDevice.line)); 
      })
  }
