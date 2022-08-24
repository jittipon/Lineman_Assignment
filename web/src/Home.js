import 'antd/dist/antd.css';
import React, { useRef } from 'react';
import { useState, useEffect } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Item from './components/Item.js';
import Loader from './components/Loader.js';
import './style/_mixin.scss'
import ScrollButton from './components/ScrollButton.js';
import SearchButton from './components/SearchButton.js';

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadinglan, setLoadinglan] = useState(false);
  const [error, setError] = useState(null);
  const [formValue, setFormValue] = useState('');
  const [language, setLanguage] = useState('th');

  const [searchParams] = useSearchParams();
  const [keyword] = useState(searchParams.get('keyword'));
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
    window.location.replace('/');
  }

  const changeLanguage = () => {
    setLoadinglan(true);
    if (language == "th") {
      setLanguage('en')
      refreshPage();
    } else {
      setLanguage('th')
      refreshPage();
    }
  }

  const checkLocalStorage = async () => {
    if (localStorage['language']) {
      langLocal = JSON.parse(localStorage.getItem('language'));
      setLanguage(langLocal);
    }
  }

  const fetchData = () => {
    if (langLocal == "th") {
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
      localStorage.setItem('language', JSON.stringify(language));
    } else {
      isMounted.current = true;
    }
  }, [language]);

  useEffect(() => {
    checkLocalStorage();
    fetchData();
  }, []);

  if (loading) {
    //loading on slow internet
    return <div className='App-loader'><Loader /></div>
  }
  if (loadinglan) {
    //loading on when change language
    return <div className='App-loader'><Loader /><h1>กำลังเปลี่ยนภาษา</h1></div>
  }
  if (error) {
    //error when server is down
    return <div>Error please comeback agin later</div>
  }
  return (
    <div className='App'>
      <div className='language-Btn'>
        <div className='row'>
          {language != "th"
            ? <Link to={'/'}><img className='langBtn' onClick={changeLanguage} src={require('./assets/Flag_of_the_United_Kingdom.svg')} alt="eng flag" /></Link>
            : <Link to={'/'}><img className='langBtn' onClick={changeLanguage} src={require('./assets/Flag_of_Thailand.svg')} alt="thai flag" /></Link>
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
          ? <form className='row'>
            <input name="keyword" placeholder="find and go..."
              value={formValue}
              onChange={onChange}
              onFocus={(e) => e.target.placeholder = ""}
              style={{ marginRight: "2rem" }}
              onBlur={(e) => e.target.placeholder = "find and go..."} />
            <SearchButton type="submit" value="Submit" />
          </form>
          : <form className='row'>
            <input name="keyword" placeholder="หาที่เที่ยวเเล้วไปกัน..."
              value={formValue}
              onChange={onChange}
              onFocus={(e) => e.target.placeholder = ""}
              style={{ marginRight: "2rem" }}
              onBlur={(e) => e.target.placeholder = "หาที่เที่ยวเเล้วไปกัน..."} />
            <SearchButton type="submit" value="Submit" />
          </form>
        }
      </div>

      {data != "not found"
        ? <>
          {data.map((item, index) => (
            <Item key={index} item={item} language={language} />
          ))}
        </>
        : <>
          {language != "th"
            ? <div style={{ marginTop: "10rem", textAlign: "center", fontSize: "1.5rem" }}>
              <div>We not found place from your keyword</div>
              <a href='/' style={{ color: "orange" }}>Back</a>
            </div>
            : <div style={{ marginTop: "10rem", textAlign: "center", fontSize: "1.5rem" }}>
              <div>ไม่พบสถานที่ ที่ตรงกับค้นหาที่คุณต้องการ</div>
              <a href='/' style={{ color: "orange" }}>กลับไปค้นหาใหม่อีกครั้ง</a>
            </div>
          }
        </>
      }

      <ScrollButton />
      <div style={{ height: "5rem" }} />
    </div>
  );
}

export default Home;