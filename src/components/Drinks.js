import React from 'react';
import Drink from './Drink';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate, BrowserRouter, Route, Routes, Router, Link } from "react-router-dom";
import '../../src/Drinks.css';

function Drinks(props) {

    //Proslijedjeno slovo za pretragu
    const inputValue=props.text

    //Hooks koji sluze za okidanje odredjenih aktivnosti i prikupljanje podataka
    const[drinks, setDrinks]=useState([]);
    const[selectedID, setKey]=useState("deselected");
    const[btnPopUp, setBtn]=useState(false);

    //Prikupljanje podataka na osnovu unesenog 
    const fetchAPIData= async() =>{
        try{
    
          const dataAPI = await axios.get(
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`
            );

          /*
            Provjera vrijednosti JSON-a i okidanje alert-a ukoliko se radi o praznom nizu
            u suprotno se niz dodjeljuje drink varijabli preko hooks useState 
          */ 
          if(dataAPI.data['drinks']===null){
            return alert("No recipes with that letter!")

          }
          setDrinks(dataAPI.data['drinks'])
        }catch(e){
          console.log(e);
        }
      };
    useEffect(()=>{
          fetchAPIData()
        },[setDrinks]);

    /*
      Prilikom okidanja button-a DETAIL postavljaju se trigger i
      vrijednost varijable koja ce se proslijediti Drink komponenti.
      Onemogucava se overflow kako bi se sprijecila mogucnos scroll-ovanja
      izvan popup-a, a setBtn postavlja se na vrijednost id-a kako bi se 
      "selectovao" jedan koktel. Ova vrijednost ce se prilikom zatvaranja 
      popup-a koji prikazuje pojedinacan koktel, vratiti na "deselected" 
      kako bi se iz iste liste mogao opet aktivirati button DETAIL.
    */
    const getID=(keyValue)=>{
        setKey(keyValue)
        setBtn(true)
        document.body.style.overflow="hidden"
    }

  //Prikupljeni i proslijedjeni podaci se parsiraju na definisan nacin 
  return (
      <div className="fetchData">
        <div className="container">
          <ul className="searchList">
          {drinks.map(item=>
              <li className="listItem"  key={item.idDrink}>
              <img className="thumbnail" alt="" src={item.strDrinkThumb}/>
              <h2 className='title'>{item.strDrink}</h2>
              <button type='button' className='btn' onClick={()=>getID(item.idDrink)}>DETAILS</button>
              </li>
              )
            }
          </ul>
          {/* 
            Ukoliko je selektovan pojedinacan koktel poziva se Drink komponenta kojoj se 
            prosljedjuje id selektovanog koktela, trigger koji otvara/zatvara popup, 
            setKey kako bi se iz child komponente Drink mogao deselektovati koktel prilikom zatvaranja popup-a.

          */}
          {selectedID!=="deselected" && <Drink selectedDrink={selectedID} trigger={btnPopUp} setTrigger={setBtn} setKey={setKey}/>} 
          </div>
      </div>
  );
}

export default Drinks;