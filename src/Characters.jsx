import React, { Fragment, useEffect, useState } from 'react';
import Api from './helper/Api'
import ApiList from './helper/ApiList';
import { BsFillHeartFill, BsArrowRight, BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

function Search(props) {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(15)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    // ** Function to handle Pagination
    const handlePagination = page => {
        setCurrentPage(page.selected + 1)
    }

    const handleSearchValue = (e) => {
        const value = e.target.value;

        setSearchValue(value)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true)
        const page = currentPage > 1 ? 1 : currentPage;
        setCurrentPage(page)

        Api.get(ApiList.Characters + `?page=${page}&limit=${perPage}${searchValue !== "" ? `&q=${searchValue}` : ""}&order_by=favorites&sort=desc`)
            .then((res) => {
                let data = res.data;
                setLoading(false)
                setData(data.data)
                setCurrentPage(data?.pagination?.current_page)
                setPerPage(data?.pagination?.items?.per_page)
                setTotal(data?.pagination?.items?.total)
            })
            .catch((error) => {
                setLoading(false)
                console.log(error)
            })
    }

    const getAllCharacters = () => {
        setLoading(true)
        Api.get(ApiList.Characters + `?page=${currentPage}&limit=${perPage}${searchValue !== "" ? `&q=${searchValue}` : ""}&order_by=favorites&sort=desc`)
            .then((res) => {
                let data = res.data;
                setLoading(false)
                setData(data.data)
                setCurrentPage(data?.pagination?.current_page)
                setPerPage(data?.pagination?.items?.per_page)
                setTotal(data?.pagination?.items?.total)
            })
            .catch((error) => {
                setLoading(false)
                console.log(error)
            })
    }

    useEffect(() => {
        getAllCharacters()
    }, [currentPage])

    return (
        <>
            <section className='bg-secondary'>
                <div className='container text-center'>
                    <div className='row'>
                        <h1 className='text-center my-4'>Search Anime Character</h1>
                        <div className="d-flex justify-content-center mt-4">
                            <input className='form-control w-25' placeholder='Search' onChange={(e) => handleSearchValue(e)} />
                            <button className='btn btn-primary ms-3' onClick={(e) => handleSearch(e)}>Search</button>
                        </div>
                        <p className='text-center mt-3 mb-0'>Total <span className='fw-bold'>{`${total}`}</span> matching anime characters found</p>
                    </div>
                    <button className='btn btn-primary mt-3' onClick={() => navigate("/task2")}>Navigate to Task 2</button>
                </div>
                <hr />
            </section>
            <div className='container mt-3'>
                <div className='row'>
                    {
                        loading ? <div className='text-center mt-3'>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> : data && data.length > 0 ?
                            data.map((value, i) => {
                                return (
                                    <Fragment key={i}>
                                        <div className='d-flex justify-content-center'>
                                            <div className="card col-12 col-lg-6 col-md-10 mb-3 border-0" style={{ boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.10)" }}>
                                                <div className="row">
                                                    <div className="col-3 d-flex justify-content-center align-items-center">
                                                        <img src={value.images.webp.image_url} className="img-fluid rounded-start w-100" style={{ height: "90px" }} alt="..." />
                                                    </div>
                                                    <div className="col-9 d-flex align-items-center justify-content-center">
                                                        <div className="card-body d-flex justify-content-between">
                                                            <div>
                                                                <h5 className="card-title">{value.name}</h5>
                                                                {
                                                                    value && value.nicknames && value.nicknames.length > 0 ?
                                                                        value.nicknames.map((nick, index) => {
                                                                            return (
                                                                                <Fragment key={index}>
                                                                                    <span className="badge rounded-pill text-bg-secondary me-1">{nick}</span>
                                                                                </Fragment>
                                                                            )
                                                                        })
                                                                        : ""
                                                                }
                                                            </div>
                                                            <div className='d-flex justify-content-center align-items-center'>
                                                                <BsFillHeartFill color="red" />
                                                                <p className='ms-1 mb-0'>{value.favorites}</p>
                                                            </div>
                                                            {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> */}
                                                        </div>
                                                        <div className='border-start h-100 d-flex align-items-center px-3' onClick={() => navigate(`/characters/${value.mal_id}`)}>
                                                            <BsArrowRight style={{ fontSize: "20px" }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                )
                            })
                            : <p className='text-center m-0'>No Result Found</p>
                    }
                    {
                        loading ? "" : data.length > 0 && <ReactPaginate
                            nextLabel={<BsArrowRightShort />}
                            previousLabel={<BsArrowLeftShort />}
                            pageRangeDisplayed={2}
                            forcePage={currentPage - 1}
                            marginPagesDisplayed={2}
                            activeClassName='active'
                            pageClassName='page-item'
                            breakClassName='page-item'
                            nextLinkClassName='page-link'
                            pageLinkClassName='page-link'
                            breakLinkClassName='page-link'
                            previousLinkClassName='page-link'
                            nextClassName='page-item next-item'
                            previousClassName='page-item prev-item'
                            pageCount={Math.ceil(total / perPage) || 1}
                            onPageChange={page => handlePagination(page)}
                            containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
                        />
                    }
                </div>
            </div>

        </>
    );
}

export default Search;