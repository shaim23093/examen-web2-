import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function UpdatePossessionPage() {
  const { libelle } = useParams(); 
  const navigate = useNavigate();

  const [possesseur, setPossesseur] = useState('');
  const [libelleState, setLibelleState] = useState('');
  const [valeur, setValeur] = useState('');
  const [dateDebut, setDateDebut] = useState(new Date());
  const [dateFin, setDateFin] = useState(null);
  const [tauxAmortissement, setTauxAmortissement] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/possession/${libelle}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then(data => {
        setPossesseur(data.possesseur.nom);
        setLibelleState(data.libelle);
        setValeur(data.valeur);
        setDateDebut(new Date(data.dateDebut));
        setDateFin(data.dateFin ? new Date(data.dateFin) : null);
        setTauxAmortissement(data.tauxAmortissement || '');
      })
      .catch(error => {
        console.error('Erreur lors du chargement des données:', error);
      });
  }, [libelle]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedPossession = {
      possesseur,
      libelle: libelleState,
      valeur: parseFloat(valeur),
      dateDebut: dateDebut.toISOString().split('T')[0],
      dateFin: dateFin ? dateFin.toISOString().split('T')[0] : null,
      tauxAmortissement: parseFloat(tauxAmortissement),
    };

    fetch(`http://localhost:5000/possession/${libelle}`, {	
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPossession),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de la possession:', error);
        setError('Impossible de mettre à jour la possession.');
      });
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md={6}  className="mt-5">
          <h2>Editer la possession choisie :</h2>
        </Col>
        <Col md={6} className='border p-5'>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nom du Possesseur</Form.Label>
              <Form.Control type="text" value={possesseur} onChange={(e) => setPossesseur(e.target.value)} required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Libellé</Form.Label>
              <Form.Control type="text" value={libelleState} onChange={(e) => setLibelleState(e.target.value)} required
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valeur Initiale (Ar)</Form.Label>
              <Form.Control type="number" step="0.01" value={valeur} onChange={(e) => setValeur(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date de Début :</Form.Label>
              <DatePicker selected={dateDebut} onChange={date => setDateDebut(date)} dateFormat="yyyy/MM/dd" className="form-control"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Taux d'Amortissement (%)</Form.Label>
              <Form.Control type="number" step="0.01" value={tauxAmortissement} onChange={(e) => setTauxAmortissement(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="outline-primary">Enregistrer les Modifications</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UpdatePossessionPage;