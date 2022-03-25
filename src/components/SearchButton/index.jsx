import React, { useEffect, useState } from "react";
import './styles.css';
import iconSearch from '../../assets/icon-search.svg';
import { FindHashContext } from "../../providers/findHash"
import CarouselComponent from "../CarouselComponent"
import PostComponent from "../PostComponent"
import searchTweets from '../../service/searchTweets'
import searchImages from '../../service/searchImages'


function SearchButton() {

    const { word, setWord } = React.useContext(FindHashContext);
    const [text, setText] = useState([]);
    const [users, setUsers] = useState([]);
    const [images, setImages] = useState([]);
    const [author, setAuthor] = useState([]);
    const [data, setData] = useState([]);
    const [invalidField, setInvalidField] = useState(false);
    const [currentTime, setCurrentTime] = useState();
    
    useEffect( () => {
        fetchPost(word)
        newDate();
    }, [word])

    async function handleSearch(word) {
        const correctWord = word.replace('#', '')
        await setWord(correctWord)
        postSearch(correctWord, currentTime);
    }

    async function fetchPost (word) {
        await searchTweets(word).then(data => {
            setText(data.data)
            setUsers(data.includes.users)
        }); 

        await searchImages(word).then(images => {
            setData(images.data);
            setImages(images.includes.media);
            setAuthor(images.includes.users);
        })
    }    

    const onSearch = (event) => {
        if(event.key === 'Enter'){
            if(event.target.value === ''){
                setInvalidField(true)
            } else {
                handleSearch(event.target.value)
                setInvalidField(false)
                
            }
        }
    }

    async function newDate() {
        let dateDay = new Date().getDate();
        let dateMonth = new Date().getMonth()+1;
        let dateYear = new Date().getFullYear();
        let dateHour = new Date().getHours();
        let dateMinutes = new Date().getMinutes();
        if(dateHour.toString().length < 2){
            dateHour = '0'+dateHour;
        }
        if(dateMinutes.toString().length < 2){
            dateHour = '0'+dateMinutes;
        }
        const dateNow = parseInt(dateDay.toString() + '0' + dateMonth.toString() +dateYear.toString() +dateHour.toString() +dateMinutes.toString());
        setCurrentTime(dateNow);
    }

    function postSearch (word, time){
        fetch('https://api.airtable.com/v0/app6wQWfM6eJngkD4/Buscas', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer key2CwkHb0CKumjuM',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                records: [{
                    fields: {
                        Squad: 'z01',
                        Hashtag: word,
                        Data: time,
                    }
                }]
            })
        }) 
    }

/*     const teste = JSON.stringify({
        records:JSON.stringify({
                fields: {
                    Squad: 'z01',
                    Hashtag: 'param',
                    Data: 1414124124124,
                }
            })
            
        })

    console.log(teste) */

    return <>
        <div className='searchContainer'>
            <div className={invalidField? 'buttonSearch alert' : 'buttonSearch'} id="search">
                    <img className="iconSearch" src={iconSearch} alt="" />
                    <input className='inputSearch' maxLength="140" type="text" onKeyUp={onSearch} placeholder="Buscar..." />
            </div>
        </div>
            <div className="invalidField" style={{display: `${invalidField ? 'flex' : 'none'}`}}>
                <p>É obrigatório preecher o campo de busca</p>
            </div>
        <h1 className="titleCarousel"> Exibindo os 10 resultados mais recentes para #{word} </h1>
        <CarouselComponent props={{ images, author, data }} />
        <PostComponent props={{word, text, users}} />
    </>
}

export default SearchButton;