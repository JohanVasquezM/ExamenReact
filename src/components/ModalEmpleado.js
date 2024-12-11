import React, { useState } from 'react';
import SweetAlert from 'sweetalert2';
import Entrada from './Entrada';
import axios from 'axios';

const ModalEmpleado = ({ show, closeModal, onAddEmpleado }) => {
  const [empleado, setEmpleado] = useState({
    nombre: '',
    dni: '',
    direccion: '',
    email: ''
  });

  const handleChange = (e) => {
    setEmpleado({
      ...empleado,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, dni, direccion, email } = empleado;

    // Validaciones
    if (!nombre || !dni || !direccion || !email) {
      SweetAlert.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    try {
      const response = await axios.post('https://674c84c054e1fca9290cd05f.mockapi.io/api/examen/empleado', empleado);
      onAddEmpleado(response.data);
      closeModal();
      SweetAlert.fire('Éxito', 'Empleado agregado correctamente', 'success');
    } catch (error) {
      SweetAlert.fire('Error', 'Hubo un problema al guardar el empleado', 'error');
    }
  };

  return (
    show && (
      <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar Empleado</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <Entrada label="Nombre" name="nombre" value={empleado.nombre} onChange={handleChange} type="text" />
                <Entrada label="DNI" name="dni" value={empleado.dni} onChange={handleChange} type="text" />
                <Entrada label="Dirección" name="direccion" value={empleado.direccion} onChange={handleChange} type="text" />
                <Entrada label="Email" name="email" value={empleado.email} onChange={handleChange} type="email" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
                <button type="submit" className="btn btn-primary">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalEmpleado;