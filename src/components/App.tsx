import { useState, useEffect } from 'react';
import '../styles/App.css';
import ListOfAll from './ListOfAll';
import Header from './Header';
import OneDevice from './OneDevice';
import Navigation from './Navigation';
import Title from './Title';
import {AppStateInterface} from '../interfaces/interfaces'
import { fetchDevices, initialAppState, searchAndFilter} from '../functions/functions';

function App() {

  const [AppState, setAppState] = useState <AppStateInterface> (initialAppState);

  useEffect(() => {
    const handleFetch = async () => {
      const devices = await fetchDevices();
      setAppState({
        ...AppState,
        devices
      });
    }
    handleFetch();
  }, []);
  
  const selectDevice = (uuid: string) => {
    setAppState({
      ...AppState,
      typeOfWindow: 'one',
      selectedDevice: AppState.devices.filter(device => device.internalUuid === uuid)[0]
    })
  }

  const backToFullList = () => {setAppState({...AppState, typeOfWindow: 'fullList'});}

  const setSearchTerm = (searchTerm : string) => {
    setAppState({...AppState, 
      searchTerm: searchTerm
    });
  }

  const setFilter = (filterTerms : string[]) => {
    setAppState({...AppState,
      filterTerms: filterTerms
    })
  }

  const setView = (viewType : string) => {
    setAppState({...AppState,
      viewOfFullList: viewType
    })
  }
  
  return (
    <>
      <Header /> 
      {AppState.typeOfWindow === 'one' && 
        <Title name={AppState.selectedDevice.name} backToFullList={backToFullList}/>}
      {AppState.typeOfWindow === 'fullList' && 
        <Navigation 
          setSearchTerm={setSearchTerm} 
          searchTerm={AppState.searchTerm}
          filterTerms={AppState.filterTerms} 
          setFilter={setFilter} 
          setView={setView} 
          devices={AppState.devices}/>}

      {AppState.typeOfWindow === 'one' && 
        <OneDevice 
          device={AppState.selectedDevice} 
        />
      }
      {AppState.typeOfWindow === 'fullList' && 
        <ListOfAll 
          devices={searchAndFilter(AppState.searchTerm, AppState.filterTerms, AppState.devices)} 
          view={AppState.viewOfFullList} 
          selectDevice={selectDevice}/>
      }
    </>
  );
}

export default App;
