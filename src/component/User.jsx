import React, { useState } from 'react';

const User = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    role: 'Administrator',
    position: 'Administrator',
    password: '',
  });
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const deleteUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    setSelectedUserIndex(null);
  };

  const addUser = () => {
    if (selectedUserIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[selectedUserIndex] = newUser;
      setUsers(updatedUsers);
      setSelectedUserIndex(null);
    } else {
      setUsers([...users, newUser]);
    }

    setNewUser({
      role: 'Administrator',
      position: 'Administrator',
      password: '',
    });
  };

  const editUser = (index) => {
    setSelectedUserIndex(index);
    const selectedUser = users[index];
    setNewUser(selectedUser);
  };

  return (
    <div className="p-8">
      <div className="bg-orange-500 text-white text-lg p-4 mb-4">Usuarios</div>

      <form className="flex space-x-2 mb-4">
        <input
          className="form-input flex-shrink px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="text"
          placeholder="Buscar"
          aria-label="Buscar"
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-md focus:outline-none focus:shadow-outline-green"
          type="submit"
        >
          Buscar
        </button>
      </form>

      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4">
          <label className="block mb-2">
            Role:
            <select
              className="form-select mt-1 block w-full"
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
            >
              <option value="Administrator">Administrator</option>
              <option value="Support">Support</option>
              <option value="Assistant">Assistant</option>
            </select>
          </label>
        </div>

        <div className="card p-4">
          <label className="block mb-2">
            Position:
            <select
              className="form-select mt-1 block w-full"
              name="position"
              value={newUser.position}
              onChange={handleInputChange}
            >
              <option value="Auditor">Auditor</option>
              <option value="Administrator">Administrator</option>
              <option value="Developer">Developer</option>
              <option value="Manager">Manager</option>
            </select>
          </label>
        </div>

        <div className="card p-4">
          <label className="block mb-2 ">
            Password:
            <input
              className="form-input mt-1 block w-full text-3xl m-1"
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
            />
          </label>
        </div>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-md mt-4 mr-4"
        onClick={addUser}
      >
        {selectedUserIndex !== null ? 'Actualizar Usuario' : 'Crear Usuario'}
      </button>

      <table className="table-auto mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Position</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">{user.position}</td>
              <td className="border px-4 py-2">
                <button
                  className="btn btn-success"
                  onClick={() => editUser(index)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger m-2"
                  onClick={() => deleteUser(index)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
