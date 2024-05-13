import React, { useMemo, useState } from 'react';
import {useGetUsers} from "./api/index"
import './App.css';
import { getTime } from './utils/dateTime';
import UserTable from './UserTable';

function App() {
  const { loading,countires} = useGetUsers()
  const [selectedCountry, setSelectedCountry] = useState("")
  const targetUsers = useMemo(() => {
    return countires.map.get(selectedCountry)?.sort((a,b) => getTime(a.registered.date) - getTime(b.registered.date)) ||[]
  }, [selectedCountry, countires.map])
  return (
    <div className="App">
      <header className="App-header">
       <div className="row">
        <div>
        {loading ? <p>is fetching data</p> : <div>
            <h2>data fetched</h2>
            {countires.list.map((country) => <div key={country} onClick={() => {setSelectedCountry(country)}}>
              {country}
            </div>)}
          </div>}
       </div>
       <div className="table">
        <UserTable users={targetUsers} />
       </div>
       </div>
      </header>
    </div>
  );
}

export default App;
