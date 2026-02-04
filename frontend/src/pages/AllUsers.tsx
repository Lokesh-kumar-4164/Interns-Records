import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
}
const VITE_API_URL = import.meta.env.VITE_API_URL

const UserTable: React.FC = () => {
    const navigate = useNavigate();
    const [users,setUsers] = useState<User[]>([])

    try{
        useEffect(() => {
            const func =  async ():Promise<void> => {
                const response = await fetch(`${VITE_API_URL}/admin/get-users`,{
                    "method":"GET",
                })

                if(!response.ok){
                    throw new Error("Error while fetching users")
                }
                const data = await response.json();
                setUsers(data);
            }
            func();
        },[])
    }catch(e){
        console.log(`Error : ${e}`);
    }

  
  const handleChangePassword = (email:string) => {
    navigate('/update-password',{state:{email}});
  };

  if(users.length===0){
    return <h1 className='m-40 font-semibold'>No users found</h1>
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#2c3e50' }}>All users</h2>

      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '', textAlign: 'left' }}>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Email</th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={cellStyle}>{user.name}</td>
              <td style={cellStyle}>{user.email}</td>
              <td style={cellStyle}>
                <button 
                  onClick={() => handleChangePassword(user.email)}
                  style={buttonStyle}
                >
                  Change Password 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const cellStyle: React.CSSProperties = {
  padding: '12px',
  border: '1px solid #ddd'
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default UserTable;