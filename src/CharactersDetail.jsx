import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiList from './helper/ApiList';
import Api from './helper/Api';
import { BsArrowRight, BsFillHeartFill } from 'react-icons/bs';

function CharactersDetail(props) {
    const { id } = useParams()
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({})

    useEffect(() => {
        setLoading(true)
        Api.get(ApiList.Characters + `/${id}`)
            .then((res) => {
                let data = res.data.data;
                setLoading(false)
                setData(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])


    return (
        <div>
            <h1 className='text-center mt-3'>Characters Detail</h1>
          {
           loading ? <div className='text-center mt-5'>
           <div className="spinner-border text-primary" role="status">
               <span className="visually-hidden">Loading...</span>
           </div>
       </div> : Object.values(data).length > 0 && <div className='d-flex justify-content-center pt-3 pb-5 px-2'>
            <div className="card col-12 col-xl-4 col-md-6 mb-3">
                <div className="row">
                    <div className="">
                        <img src={data.images.webp.image_url} className="img-fluid rounded-start w-100" style={{ height: "250px" }} alt="..." />
                    </div>
                    <div className="align-items-center justify-content-center">
                        <div className="card-body justify-content-between">
                            <div>
                                <h5 className="card-title">{data.name}</h5>
                                {
                                    data && data.nicknames && data.nicknames.length > 0 ?
                                        data.nicknames.map((nick, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <span className="badge rounded-pill text-bg-primary me-1">{nick}</span>
                                                </Fragment>
                                            )
                                        })
                                        : ""
                                }
                            </div>
                            <div className='d-flex align-items-center my-2'>
                                <BsFillHeartFill color="red" />
                                <p className='ms-1 mb-0'>{data.favorites}</p>
                            </div>
                            <p className="card-text">{data.about}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
          }
        </div>
    );
}

export default CharactersDetail;