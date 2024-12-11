import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SweetAlert from 'sweetalert2';
import ModalEmpleado from './components/ModalEmpleado';

const App = () => {
  const [empleados, setEmpleados] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Obtener empleados desde la API
  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await axios.get('https://674c84c054e1fca9290cd05f.mockapi.io/api/examen/empleado');
        setEmpleados(response.data);
      } catch (error) {
        SweetAlert.fire('Error', 'Hubo un problema al cargar los empleados', 'error');
      }
    };

    fetchEmpleados();
  }, []);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const addEmpleado = (newEmpleado) => {
    setEmpleados([...empleados, newEmpleado]);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Listado de Empleados</h1>
      <button className="btn btn-success mb-4" onClick={openModal}>Agregar Empleado</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Dirección</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id}>
              <td>{empleado.nombre}</td>
              <td>{empleado.dni}</td>
              <td>{empleado.direccion}</td>
              <td>{empleado.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalEmpleado
        show={showModal}
        closeModal={closeModal}
        onAddEmpleado={addEmpleado}
      />
    </div>
  );
};

export default App;