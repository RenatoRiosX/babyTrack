import React from 'react'
import RastreadorBiberones from './RastreadorBiberones'
import RastreadorPanales from './RastreadorPanales'
import Card from "react-bootstrap/Card";

const InformeEventos = () => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Informe de Eventos</Card.Title>
        <RastreadorBiberones></RastreadorBiberones>
        <RastreadorPanales></RastreadorPanales>
      </Card.Body>
    </Card>
    
  )
}

export default InformeEventos
