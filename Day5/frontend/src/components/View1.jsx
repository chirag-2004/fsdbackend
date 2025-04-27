import React, { useState, useEffect } from 'react';
import axios from 'axios';

const View1 = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        viewdata();
    }, []);

    const viewdata = async () => {
        try {
            const res = await axios.get('https://fsdbackend-191o.onrender.com/users');
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Registered Users List</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-green-600 text-white">
                            <th className="py-2 px-4 border">ID</th>
                            <th className="py-2 px-4 border">Name</th>
                            <th className="py-2 px-4 border">Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="text-center border hover:bg-gray-100">
                                <td className="py-2 px-4 border">{user.id}</td>
                                <td className="py-2 px-4 border">{user.name}</td>
                                <td className="py-2 px-4 border">{user.age}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default View1;