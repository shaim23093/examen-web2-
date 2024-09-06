import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Possession from '../../../model/possession/Possession';
import './CreatePossessionPage.css'; 

function PossessionPage() {
  const [possessions, setPossessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

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

  const getValeurInitiale = (possession) => {
    return possession.valeur === 0 ? possession.valeurConstante : possession.valeur;
  };

  const closePossession = (libelle) => {
    fetch(`/possession/${libelle}/close`, { method: 'PUT' })
      .then(() => setPossessions(possessions.filter(p => p.libelle !== libelle)))
      .catch(error => console.error('Erreur lors de la fermeture de la possession:', error));
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center mb-4">
        <Col md={10} className="text-center">
        <h1 className="bg-info text-white p-3 rounded">Liste des Possessions</h1>
        </Col>
      </Row>

      <Row className="justify-content-center mb-4">
        <Col md={12}>
          <Table bordered hover className="custom-table">
            <thead>
              <tr className="text-center">
                <th>Possesseur</th>
                <th>Libellé</th>
                <th>Valeur Initiale</th>
                <th>Valeur Actuelle</th>
                <th>Date de Début</th>
                <th>Date de Fin</th>
                <th>Taux d'Amortissement</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {possessions.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">Il n'y a pas de possession</td>
                </tr>
              ) : (
                possessions.map((item, index) => (
                  <tr key={index}>
                    <td>{item.possesseur}</td>
                    <td>{item.libelle}</td>
                    <td>{getValeurInitiale(item)} Ar</td>
                    <td>{item.getValeur(selectedDate)} Ar</td>
                    <td>{new Date(item.dateDebut).toLocaleDateString()}</td>
                    <td>{item.dateFin ? new Date(item.dateFin).toLocaleDateString() : 'En cours'}</td>
                    <td>{item.tauxAmortissement} %</td>
                    <td className="text-center">
                      <Button variant="primary" className="me-2" onClick={() => navigate(`/possession/${item.libelle}/update`)}>Modifier</Button>
                      <Button variant="danger" onClick={() => closePossession(item.libelle)}>Fermer</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Link to={`/possession/create`} className="btn btn-success">Créer une possession</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default PossessionPage;
