import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Tag } from 'antd';

function Item(props) {
    const [visible, setVisible] = useState(false);


    return (
        <div className='item'>
            <div className='item-imagearea'>
                <div>
                    <Image
                        className='item-largeimage'
                        preview={{
                            visible: false,
                        }}
                        src={props.item.photos[0]}
                        onClick={() => setVisible(true)}
                    />
                    <div
                        style={{
                            display: 'none',
                        }}
                    >
                        <Image.PreviewGroup
                            preview={{
                                visible,
                                onVisibleChange: (vis) => setVisible(vis),
                            }}
                        >
                            {props.item.photos.map((photo, index) => (
                                <Image key={index} width={200} src={photo} />
                            ))}
                        </Image.PreviewGroup>
                    </div>
                </div>

                <div className='item-listimage'>
                    <Image.PreviewGroup>
                        {props.item.photos.map((photo, index) => (
                            index != 0
                                ? <Image className='item-smallimage' key={index} src={photo} />
                                : null
                        ))}
                    </Image.PreviewGroup>
                </div>
            </div>

            <div>
                <div className='item-title'>
                    <a href={props.item.url} target="_blank">
                        {props.item.title}
                    </a>
                </div>
                <h3 className='item-description' >{props.item.description.substring(0, 200)} ... <a className='small-font' href={props.item.url} target="_blank">อ่านต่อ</a></h3>

                {props.item.tags.map((tag, index) => (
                    // <Image key={index}  src={tag} />
                    <Tag color="processing" key={index}>
                        <a className='small-font' href={"http://localhost:3000/?keyword=" + tag}>{tag}</a>
                    </Tag>
                ))}

            </div>
        </div>
    );
}



export default Item;