import React from 'react'
import './App.css';
import SearchBar from './components/SearchBar';

function App() {
  /* 
    SearchBar komponenta sluzi za prikupljanje podataka na osnovu unesenog
    i poziva komponentu Drinks kojoj prosljedjuje prikupljene podatke. 
    Drinks komponenta prikazuje listu koktela gdje se pomocu DETAIL button-a
    moze pristupiti dodatnim podacima zeljenog koktela.
    Detalje o izabranom koktelu prikuplja i ispisuje komponenta Drink. 

    CSS fajlovi su odvojeni za komponente Drink i Drinks, a SearchBar komponentu
    sam stilizovala u okviru App.css
  */
  return (
    <div className="App">
      <SearchBar/>
    </div>
  );
}

export default App;
