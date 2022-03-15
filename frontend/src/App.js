import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { deleteUser, editUser, getUser, postUser } from './services';


function App() {
  const user = {
    name: "name",
    username: "-",
    address: "-",
    dob: "-",
    email: "-",
    phone: "-",
    isEditable: true
  }
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const rusers = await getUser();
    console.log(rusers);
    setUsers(prev => [...prev, ...rusers])
  }, [])

  const Adduser = () => {
    setUsers(prev => [user, ...prev])
  }

  const HandleSave = useCallback(async (tempu, index) => {

    tempu.isEditable = false;

    if (tempu._id) {
      console.log("edit");
      editUser(tempu, tempu._id);
      const tempUsers = [...users];
      tempUsers[index].isEditable = false;

      setUsers(tempUsers);
    }
    else {
      console.log("save");
      const user = await postUser(tempu);
      console.log(user);
      const tempUsers = [...users];
      tempUsers[index] = { ...user };

      setUsers(tempUsers);
    }
  }, [users])

  const HandleEdit = useCallback((tempu, index) => {
    const tempUsers = [...users];
    tempUsers[index].isEditable = true;
    setUsers(tempUsers);
  }, [users])

  const HandleDelete = (user, index) => {
    console.log("delete", index, user._id);
    if (user._id) {
      try {
        deleteUser(user._id)
        setUsers(users.filter((item, idx) => item._id !== user._id))
      } catch (error) {
        console.log(error);
      }
    } else {
      setUsers(users.filter((user, idx) => idx !== index))
    }
  }

  console.log(users);
  return (
    <div className="App">
      <div className='header'>
        <div>
          User Table
        </div>
        <button onClick={Adduser}>
          add User
        </button>
      </div>
      <div className='table'>

        <table>
          <tr>
            <th className='table__head'>Name</th>
            <th className='table__head'>Username</th>
            <th className='table__head'>Address</th>
            <th className='table__head'>Phone number</th>
            <th className='table__head'>Email</th>
            <th className='table__head'>Date of birth</th>
            <th className='table__head'>Action</th>
          </tr>
          <>
            {users.map((user, index) => {
              if (user.isEditable) {
                const tempu = user;
                return (

                  <tr key={index}>
                    <td>
                      <input className='table--input' type="text" defaultValue={tempu.name} onChange={(e) => { tempu.name = e.target.value }} />
                    </td>
                    <td>
                      <input className='table--input' type="text" defaultValue={tempu.username} onChange={(e) => { tempu.username = e.target.value }} />
                    </td>
                    <td>
                      <input className='table--input' type="text" defaultValue={user.address} onChange={(e) => { tempu.address = e.target.value }} />
                    </td>
                    <td>
                      <input className='table--input' type="text" defaultValue={user.phone} onChange={(e) => { tempu.phone = e.target.value }} />
                    </td>
                    <td>
                      <input className='table--input' type="text" defaultValue={user.email} onChange={(e) => { tempu.email = e.target.value }} />
                    </td>
                    <td>
                      <input className='table--input' type="date" defaultValue={user.date} onChange={(e) => { tempu.dob = e.target.value }} />
                    </td>
                    <td >
                      <button onClick={() => HandleSave(tempu, index)}>Save</button>
                      <button onClick={() => HandleDelete(tempu, index)}>Delete</button>
                    </td>
                  </tr>
                )

              }
              else {
                return (
                  <tr key={user._id}>
                    <td className='table__cell'>{user.name}</td>
                    <td className='table__cell'>{user.username}</td>
                    <td className='table__cell'>{user.address}</td>
                    <td className='table__cell'>{user.phone}</td>
                    <td className='table__cell'>{user.email}</td>
                    <td className='table__cell'>{user.dob}</td>
                    <td >
                      <button onClick={() => HandleEdit(user, index)}>Edit</button>
                      <button onClick={() => HandleDelete(user, index)}>Delete</button>
                    </td>
                  </tr>
                )
              }
            }
            )}
          </>
        </table>
      </div>
    </div>
  );
}

export default App;
