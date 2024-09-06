import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './CreatePossessionPage.css'; 

function CreatePossessionPage() {
  const [possesseur, setPossesseur] = useState('');
  const [libelle, setLibelle] = useState('');
  const [valeur, setValeur] = useState('');
  const [dateDebut, setDateDebut] = useState(new Date());
  const [tauxAmortissement, setTauxAmortissement] = useState('');
  const [valeurConstante, setValeurConstante] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPossession = {
      possesseur,
      libelle,
      valeur: parseFloat(valeur),
      dateDebut,
      tauxAmortissement: parseFloat(tauxAmortissement),
      valeurConstante: parseFloat(valeurConstante),
    };

    fetch('http://localhost:5000/possession/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPossession),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout de la possession:', error);
      });
  };

  return (
    <Container className="content-box ">
      <Row className="justify-content-center">
        <Col md={16}>
          <Card className="border-orange shadow-lg">
            <Card.Header as="h4" className="text-center text-white bg-gray">
              Ajouter une nouvelle possession
            </Card.Header>
            <Card.Body className="bg-light-gray">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-5">
                  <Form.Label>Possesseur</Form.Label>
                  <Form.Control
                    type="text"
                    value={possesseur}
                    onChange={(e) => setPossesseur(e.target.value)}
                    placeholder="Entrer le nom du possesseur"
                    required
                    className="form-control-lg"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Libellé</Form.Label>
                  <Form.Control
                    type="text"
                    value={libelle}
                    onChange={(e) => setLibelle(e.target.value)}
                    placeholder="Entrer le libellé de la possession"
                    required
                    className="form-control-lg"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Valeur (Ar)</Form.Label>
                  <Form.Control
                    type="number"
                    value={valeur}
                    onChange={(e) => setValeur(e.target.value)}
                    placeholder="Entrer la valeur de la possession"
                    required
                    className="form-control-lg"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Date de début</Form.Label>
                  <Form.Control
                    type="date"
                    value={dateDebut.toISOString().substr(0, 10)}
                    onChange={(e) => setDateDebut(new Date(e.target.value))}
                    required
                    className="form-control-lg"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Taux d'Amortissement (%)</Form.Label>
                  <Form.Control
                    type="number"
                    value={tauxAmortissement}
                    onChange={(e) => setTauxAmortissement(e.target.value)}
                    placeholder="Entrer le taux d'amortissement"
                    className="form-control-lg"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Valeur Constante</Form.Label>
                  <Form.Control
                    type="number"
                    value={valeurConstante}
                    onChange={(e) => setValeurConstante(e.target.value)}
                    placeholder="Entrer la valeur constante"
                    className="form-control-lg"
                  />
                </Form.Group>

                <Button variant="orange" type="submit" className="w-100 py-2">
                  Ajouter maintenant
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePossessionPage;
