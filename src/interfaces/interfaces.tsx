export interface DeviceInterface {
    line: string,
    id: string,
    internalUuid: string,
    name: string,
    shortNames: string,
    maxPower: string,
    speed: string,
    numPorts: string,
    icon: {
        res: number[],
        id: string
    }
}

export interface fetchFunctionInterface {
    (): Promise<{
        json : {
        () : Promise <{
            devices: fetchedDeviceInterface[]
        }> 
        } 
    }>
}

export interface fetchedDeviceInterface {
    icon: {
        resolutions: number[][],
        id: string
    }
    line: {
        name: string,
        id: string
    },
    product: {
        abbrev: string,
        name: string
    },
    shortnames: string[]
}
  
export interface AppStateInterface {
    typeOfWindow: string,
    viewOfFullList: string,
    selectedDevice: DeviceInterface,
    devices: DeviceInterface[],
    searchTerm: string,
    filterTerms: string[]
}

export interface setAppStateInterface {
    (AppState : AppStateInterface) : void
}

export interface ListOfAllInterface {
    devices: DeviceInterface[],
    view: string,
    selectDevice: {(uuid : string): void}
}

export interface NavigationInterface {
    devices: DeviceInterface[], 
    filterTerms: string[],
    searchTerm: string,
    setSearchTerm: {(searchTerm : string) : void},
    setFilter: {(filterTerms : string[]) : void},
    setView: {(viewType : string) : void},
}

export interface FilterInterface {
    devices: DeviceInterface[], 
    filterTerms: string[],
    setFilter: {(filterTerms : string[]) : void},
}


