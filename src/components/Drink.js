import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import '../../src/Drink.css';


function Drink(props) {

  // proslijedjena vrijednost
    const idValue=props.selectedDrink
    
    /*
      prikupljanje podataka asinhrono gdje se try/catch metodom 
      onemogucava "hvatanje" eventualnih gresaka
    */
    const[drink, setDrink]=useState([]);
    const fetchAPIData= async() =>{
        try{
    
          const dataAPI = await axios.get(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idValue}`
          );
          setDrink(dataAPI.data['drinks'])
        }catch(e){
          console.log(e);
        }
      };

    //postavljanje podataka u definisane varijable pomocu hooks useState i useEffect
    useEffect(()=>{
          fetchAPIData()
        },[setDrink]);

    /*
      Close button koji zatvara popup i vraca vrijednost setKey iz komponente Drinks
      na "deselected" kako bi se u istoj instanci pretrage mogao koristiti DETAIL button
      razlicitog koktela. Overflow parent komponente se postavlja na "auto" kako bi se omogucio
      scroll nakon zatvaranja popup-a.   
    */
      const closePopUp=()=>{
        props.setTrigger(false)
        props.setKey("deselected")
        document.body.style.overflow="auto"
      }

      /*
        Ukoliko je "uhvacen" id u komponenti Drinks, isti se prosljedjuje  
        komponenti Drink koja zatim spisuje definisani niz podataka. 
        U suprotnom vraca se "".  
      */
    return (props.trigger)?(
        <div className='drinkResult'>
          <div className='btnContainer'>
            <button type='button'className='closeBtn' onClick={closePopUp}>X</button>
          </div>
          <div className='content'>
          {drink.map(item=>
            <h1 className="drinkName" key={item.idDrink}>
              
              <img className="thumbnail" alt="" src={item.strDrinkThumb}/>
              <p className='text-title'>Name</p>
              <p className='text'> {item.strDrink}</p>
              <hr></hr>
              <p className='text-title'>Category</p>
              <p className='text'> {item.strCategory}</p>
              <hr></hr>
              <p className='text-title'>Alcoholic</p>
              <p className='text'>{item.strAlcoholic}</p>
              <hr></hr>
              <p className='text-title' >Instructions</p>
              <p className='text-instructions'> {item.strInstructions}</p>
              <hr></hr>
              <p className='text-title'>Measure</p>
              <p className='text'> {item.strMeasure1}</p>
            </h1> 
               
            )}
        </div>
        </div>
    ):"";
}

export default Drink;