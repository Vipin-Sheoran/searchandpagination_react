import React, { useState, useEffect } from 'react'
import './FetchPost.css'

function FetchPost() {
    const [post, setpost] = useState([])
    const [input, setinput] = useState('')
    const [initialPage, setinitialPage] = useState(0)
    const [disabledPrev, setdisabledPrev] = useState(true)
    const [disabledNext, setdisabledNext] = useState(false)
    const [PPerpage] = useState(5)




    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(result => setpost(result))
            .catch(error => alert(error))
    }, [])

    const currentPosts = post.filter(each => {
        if (input === '') {
            return each
        } else if (each.title.toLowerCase().includes(input.toLowerCase())) {
            return each
        }
    })



    const pages = []
    for (let i = 1; i <= Math.ceil(currentPosts.length / PPerpage); i++) {
        pages.push(i)
    }
    useEffect(() => {
        console.log(pages.length)
        if (initialPage === 0) {
            setdisabledPrev(true)
        } else {
            setdisabledPrev(false)
        }

        if (initialPage === (pages.length - 1)) {
            setdisabledNext(true)
        } else if (pages.length === 1 && initialPage === 0) {
            setdisabledNext(true)
        }
        else {
            setdisabledNext(false)
        }
    }, [initialPage, input])

    const changeHandler = (e) => {
        setinput(e.target.value)
        setinitialPage(0)
    }
    

    return (
        <div className='container'>
            <div className='top'>
            <input type='text' placeholder='Search by Title' onChange={changeHandler} />
            
            {   
                currentPosts.slice(initialPage * PPerpage, (initialPage + 1) * PPerpage).map(each => {
                    return (
                        <div className='posts' key={each.id}>
                            <div>{each.id}. Title-{each.title}</div>
                            <div>Body-{each.body}</div>
                            <hr />
                        </div>
                    )
                })
            }
            <br />
            </div>
            <div className='bottom'>
            <button disabled={disabledPrev} onClick={() => setinitialPage(initialPage - 1)}>Prev</button>
            {
                pages.map(each => {
                    return <button key={each} onClick={() => setinitialPage(each - 1)}>{each}</button>
                })
            }
            <button disabled={disabledNext} onClick={() => setinitialPage(initialPage + 1)}>Next</button>
            </div>
        </div>
    )
}

export default FetchPost
