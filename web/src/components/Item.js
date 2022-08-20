import React from 'react';

function Item(props) {
    return (
        <>
            <h1>{props.item.title}</h1>
            <h2>{props.item.eid}</h2>
            <h1>{props.item.url}</h1>
            <h3>{props.item.description}</h3>
            <h3>{props.item.photos}</h3>
            <h3>{props.item.tags}</h3>
        </>
    );
  }



export default Item;