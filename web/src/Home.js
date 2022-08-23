import 'antd/dist/antd.css';
import React from 'react';
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
  const [error, setError] = useState(null);
  const [formValue, setFormValue] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword'));

  //use regex to not allow whitespace in input
  const onChange = (e) => {
    const val = e.target.value;
    const re = /^\S*$/;
    if (re.test(val)) {
      setFormValue(val);
    }
  };

  useEffect(() => {
    if (keyword) {
      setLoading(true);
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
  }, []);

  if (loading) {
    return <div className='App-loader'><Loader /></div>
    //loading on slow internet
  }
  if (error) {
    return <div>Error please comeback agin later</div>
    //error when server is down
  }
  return (
    <div className='App'>
      <h1 className='title'><a href='/'>เที่ยวไหนดี</a></h1>
      <div className='form'>
        <form>
          <input name="keyword" placeholder="หาที่เที่ยวเเล้วไปกัน..."
            value={formValue}
            onChange={onChange}
            onFocus={(e) => e.target.placeholder = ""}
            onBlur={(e) => e.target.placeholder = "หาที่เที่ยวเเล้วไปกัน..."} />
        </form>
      </div>

      {data != "not found" ?
        <>
          {data.map((item, index) => (
            <Item key={index} item={item} />
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
