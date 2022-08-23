import 'antd/dist/antd.css';
import React, { useRef } from 'react';
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Item from './components/Item.js';
import Loader from './components/Loader.js';
import './style/_mixin.scss'
import ScrollButton from './components/ScrollButton.js';

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadinglan, setLoadinglan] = useState(false);
  const [error, setError] = useState(null);
  const [formValue, setFormValue] = useState('');
  const [language, setLanguage] = useState('th');

  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword'));
  let langLocal;

  //use useRef to stop useEffect from running on first render
  const isMounted = useRef(false);

  //use regex to not allow whitespace in input
  const onChange = (e) => {
    const val = e.target.value;
    const re = /^\S*$/;
    if (re.test(val)) {
      setFormValue(val);
    }
  };

  function refreshPage() {
    window.location.reload(false);
  }


  const changeLanguage = () => {
    if (language == "th") {
      setLoadinglan(true);
      setLanguage('en')
      console.log(language);
      console.log('case 1' + language);
      refreshPage();
    } else {
      setLoadinglan(true);
      setLanguage('th')
      console.log(language);
      console.log('case 2' + language);
      refreshPage();
    }
  }

  const checkLocalStorage = async () => {
    if (localStorage['language']) {
      console.log("USE EFEECT");
      langLocal = JSON.parse(localStorage.getItem('language'));
      console.log('langLocal', langLocal);
      setLanguage(langLocal);
    }
  }

  const fetchData = () => {
    console.log("langLocalXXXXXXXXXXXXXXX " + langLocal);
    if (langLocal == "th") {
      console.log("THAILANDDDDDDDDDDDDDDDD");
      if (keyword) {
        setFormValue(keyword);
        axios.get(`http://localhost:7000/trips/${keyword}`)
          .then(response => {
            setData(response.data);
            console.log(response.data);
            setLoading(false);
          }).catch(error => {
            setError(error);
            console.log('error', error);
            setLoading(false);
          }
          );
      }
      else {
        axios.get('http://localhost:7000/trips')
          .then(response => {
            setData(response.data);
            setLoading(false);
            console.log(response.data);
          }).catch(error => {
            setError(error);
            console.log(error);
            setLoading(false);
          });
      }

    } else {
      console.log("ENGLISHHHHHHHHHHHHHHHHHHHH");
      if (keyword) {
        setFormValue(keyword);
        axios.get(`http://localhost:7000/tripsenglish/${keyword}`)
          .then(response => {
            setData(response.data);
            console.log(response.data);
            setLoading(false);
          }).catch(error => {
            setError(error);
            console.log('error', error);
            setLoading(false);
          }
          );
      }
      else {
        axios.get('http://localhost:7000/tripsenglish')
          .then(response => {
            setData(response.data);
            setLoading(false);
            console.log(response.data);
          }).catch(error => {
            setError(error);
            console.log(error);
            setLoading(false);
          });
      }
    }

  }

  useEffect(() => {
    if (isMounted.current) {
      console.log("USEEFFECT ALONE " + language);
      localStorage.setItem('language', JSON.stringify(language));
    } else {
      console.log("Change IS MOUNTED");
      isMounted.current = true;
    }
  }, [language]);

  useEffect(() => {
    checkLocalStorage();
    fetchData();

  }, []);

  if (loading) {
    return <div className='App-loader'><Loader /></div>
    //loading on slow internet
  }
  if (loadinglan) {
    return <div className='App-loader'><Loader /><h1>กำลังเปลี่ยนภาษา</h1></div>
    //loading on when change language
  }
  if (error) {
    return <div>Error please comeback agin later</div>
    //error when server is down
  }
  return (
    <div className='App'>
      <div className='language-Btn'>
        <div className='row'>
          {language != "th"
            ? <img className='langBtn' onClick={changeLanguage} src={require('./assets/Flag_of_the_United_Kingdom.svg')} alt="eng flag" />
            : <img className='langBtn' onClick={changeLanguage} src={require('./assets/Flag_of_Thailand.svg')} alt="thai flag" />
          }
          <h1 >{language}</h1>
        </div>
      </div>

      {language != "th"
        ? <h1 className='title'><a href='/'>Where we go?</a></h1>
        : <h1 className='title'><a href='/'>เที่ยวไหนดี</a></h1>
      }

      <div className='form'>

        {language != "th"
          ? <form>
            <input name="keyword" placeholder="find and go..."
              value={formValue}
              onChange={onChange}
              onFocus={(e) => e.target.placeholder = ""}
              onBlur={(e) => e.target.placeholder = "find and go..."} />
          </form>

          : <form>
          <input name="keyword" placeholder="หาที่เที่ยวเเล้วไปกัน..."
            value={formValue}
            onChange={onChange}
            onFocus={(e) => e.target.placeholder = ""}
            onBlur={(e) => e.target.placeholder = "หาที่เที่ยวเเล้วไปกัน..."} />
        </form>
        }


      </div>

      {data != "not found" ?
        <>
          {data.map((item, index) => (
            <Item key={index} item={item} language={language}/>
          ))}
        </>
        : <div style={{ marginTop: "10rem" }}>
          <div >ไม่พบสถานที่ ที่ตรงกับค้นหาที่คุณต้องการ</div>
          <a href='/'>กลับไปค้นหาใหม่อีกครั้ง</a>
        </div>
      }

      <ScrollButton />
      <div style={{ height: "5rem" }} />
    </div>
  );
}

export default Home;
