import React, { useState } from 'react';
import { Image, Tag } from 'antd';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

function Item(props) {
    const [visible, setVisible] = useState(false);

    function replaceWithBr(e) {
        return e.replace(/\n/g, "<br />")
    }

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
                                : <Image style={{ display: 'none', }} className='item-smallimage' key={index} src={photo} />
                        ))}
                    </Image.PreviewGroup>
                </div>
            </div>

            <div>
                <div className='item-top-section'>
                    {props.language != "th"
                        ? <div className='item-title-en'>
                            <a href={props.item.url} target="_blank">
                                {props.item.title}
                            </a>
                        </div>
                        : <div className='item-title-th'>
                            <a href={props.item.url} target="_blank">
                                {props.item.title}
                            </a>
                        </div>
                    }

                    <div className='item-description'>
                        {props.language != "th"
                            ? <p dangerouslySetInnerHTML={{ __html: (replaceWithBr(props.item.description.substring(0, 120)) + '...') }}></p>
                            : <p dangerouslySetInnerHTML={{ __html: (replaceWithBr(props.item.description.substring(0, 200)) + '...') }}></p>
                        }

                    </div>
                </div>

                <div>
                    <div className='item-readmore'>
                        {props.language != "th"
                            ? <Button type="primary" icon={<ArrowRightOutlined />} size={'middle'} href={props.item.url} target="_blank">Read more</Button>
                            : <Button type="primary" icon={<ArrowRightOutlined />} size={'middle'} href={props.item.url} target="_blank">อ่านต่อ</Button>
                        }
                    </div>

                    <div className='item-tag'>
                        <h3 style={{ marginRight: "1rem", marginTop: "0.5rem" }}>หมวด</h3>
                        <div>
                            {props.item.tags.map((tag, index) => (
                                <Tag color="processing" key={index} style={{ marginTop: "0.5rem" }}>
                                    <a className='small-font' href={"http://localhost:3000/?keyword=" + tag}>{tag}</a>
                                </Tag>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item;