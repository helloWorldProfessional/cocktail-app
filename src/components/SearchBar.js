import React from 'react';
import Drinks from './Drinks';
import { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";


function SearchBar(props) {

    const [data, setData]=useState(null)
    const [inputEntered, setInput]=useState("false")

    //"Hvatanje" inputa
    const getData=(e)=>{
        setData(e.target.value)
    }

    //Provjerava se da li postoji unos i pokrece se alert ako ne postoji
    const handleSearch=()=>{
        if(!data)
            return alert("A letter is required for search!")
        setInput(data)
    }

    return (
        <div>
            <div className='navContainer'>
                <h1 className='navTitle'>Cocktails</h1>
                <div className="searchBar">
                    <input className="searchInput" type="text" onChange={getData} placeholder='Enter a letter...'/>
                    <button className="searchButton" type="button" onClick={handleSearch}> <FaSearch className='searchIcon'/> </button>
                </div>
            </div>
            {/* 
                Potrebno je osluskivati input field i ako je on isti kao i vrijednost prilikom 
                klika buttona Search poziva se komponenta Drinks kojoj se prosljedjuje unos. 
                Za pokretanje Drinks komponente potrebno je samo da inputEntered bude razlicito
                od false, uslov je moga biti i drugacije formulisan. 
            */}
            <div> {inputEntered===data && <Drinks text={data}/>}</div>
        </div>
    );
}

export default SearchBar;