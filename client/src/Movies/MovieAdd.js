import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


const initialItem = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const MovieAdd = props => {

    const { setMovieList} = props

    const [item, setItem] = useState(initialItem)
    
    const history = useHistory()

    const updateHandler = event => {
        const { name, value } = event.target
        setItem({
            ...item,
            [name]: value,
        })
    }
    
    const updateArr = event => {
        const { name, value } = event.target
        setItem({
            ...item,
            [name]: value.split(',')
        })
     }
    
    const submitHandler = event => {
        event.preventDefault()
        axios
            .post('http://localhost:5000/api/movies', item)
            .then(res => {
                setMovieList(res.data)   
            })
        history.push('/')
    }

    return (
        <form>
            <label>Title<input type='text' name='title' value={item.title} onChange={updateHandler} /></label>
            <label>Director<input type='text' name='director' value={item.director} onChange={updateHandler} /></label>
            <label>Metascore<input type='text' name='metascore' value={item.metascore} onChange={updateHandler} /></label>
            <label>Stars<input type='text' name='stars' value={item.stars} onChange={updateArr} /></label>
            <button onClick={submitHandler}>Submit</button>
        </form>
    )
}

export default MovieAdd
