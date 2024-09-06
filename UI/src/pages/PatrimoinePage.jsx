import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Possession from '../../../model/possession/Possession';
import ChartPage from './chartPage';


function PatrimoinePage() {
  const [possessions, setPossessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalValeurActuelle, setTotalValeurActuelle] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/patrimoine')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then(data => {
        const possessionsData = data.data.possessions[0].data.possessions;

        const loadedPossessions = possessionsData.map(possession =>
          new Possession(
            possession.possesseur.nom,
            possession.libelle,
            possession.valeur,
            new Date(possession.dateDebut),
            possession.dateFin ? new Date(possession.dateFin) : null,
            possession.tauxAmortissement || 0,
            possession.valeurConstante || 0
          )
        );

        setPossessions(loadedPossessions);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des données:', error);
      });
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    if (selectedDate) {
      const updatedPossessions = possessions.map(possession => {
        return new Possession(
          possession.possesseur,
          possession.libelle,
          possession.valeur,
          possession.dateDebut,
          selectedDate,
          possession.tauxAmortissement,
          possession.valeurConstante
        )
      });

      const total = updatedPossessions.reduce((sum, possession) => {
        return sum + possession.getValeur(selectedDate);
      }, 0);

      setPossessions(updatedPossessions);
      setTotalValeurActuelle(total);
    } else {
      alert('Veuillez sélectionner une date.');
    }
  };


  return (
<Container>
        <h1 className='text-danger text-center fw-bold mb-4'> Patrimoine</h1>
      <Col md={12} className="text-center mb-4">
        <h4 className='text-decoration-underline'>Calculer la valeur totale du patrimoine</h4>
      </Col>
      <Col md={7} className="bg-light p-4 border border-secondary">

      <Form>
          <Form.Group className="mb-3">
            <Form.Label>Sélectionner une date :</Form.Label>
            <div className="d-flex justify-content-between align-items-center">
              <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="dd/MM/yyyy" className="form-control me-2" />
              <Button variant="outline-success" onClick={handleSubmit}>Valider</Button>
            </div>
          </Form.Group>
      </Form>

              <h4 className='mt-4 text-center bg-info text-white p-3 rounded'>
                La valeur est: {totalValeurActuelle} Ar
              </h4>

      </Col>
      
            <ChartPage />
      
</Container>
  );
}

export default PatrimoinePage;