import Possession from "./Possession.js";
var TYPE_ARGENT = {
  Courant: "Courant",
  Epargne: "Epargne",
  Espece: "Espece"
};

export default class Argent extends Possession {
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, type) {
    super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
    try {
     
      this.type = type;
    }
    catch (e) {
      console.error(e);
    }
  }
}