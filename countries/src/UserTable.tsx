import React, { useMemo, useState } from 'react'
import { UserData } from './api/types'

interface IProps {
    users: Array<UserData>
}
enum Gender  {
    Male = "Male", Female = "Female",All = "All"
}
function UserTable(props: IProps) {
    const [filter, setFilter] = useState({ gender: Gender.All})

    const filteredUser = useMemo(() => {
        const temp = [...props.users]
        return  filter.gender === "All" ? temp : temp.filter((user) => user.gender.toLowerCase() === filter.gender.toLowerCase())
    }, [props.users, filter.gender])
  return (
    <table>
    <caption>
      Front-end web developer test: user table
    </caption>
    <thead>
      <tr>
        {/* Name, Gender, City, State, and Date Registered */}
        <th scope="col">Name</th>
        <th scope="col">Gender
            <select onChange={(e) =>setFilter({gender: e.target.value as Gender})}>
            <option value="All">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            </select>
        </th>
        <th scope="col">City</th>
        <th scope="col">State</th>
        <th scope="col">Date Registered</th>
      </tr>
    </thead>
    <tbody>
      {filteredUser.map((user) => <tr key={user.id.value}>
        <th scope="row">{`${user.name.title} ${user.name.first} ${user.name.last}`}</th>
        <td>{user.gender}</td>
        <td>{user.location.city}</td>
        <td>{user.location.state}</td>
        <td>{user.registered.date}</td>
      </tr>)}
    
    </tbody>
  </table>
  
  )
}

export default UserTable