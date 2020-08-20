import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initialItem = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const MovieUpdate = props => {

    const {movieList, setMovieList} = props

    const { id } = useParams()
    const history = useHistory()

    const [item, setItem] = useState(initialItem)

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setItem(res.data))
    }, [id])
    
    const updateHandler = event => {
        const { name, value } = event.target
        setItem({
            ...item,
            [name]: value,
        })
    }


    const submitHandler = event => {
        event.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${id}`, item)
            .then(res => {
                const updatedList = [...movieList]
                updatedList.splice(id, 1, res.data)
                setMovieList(updatedList)
                history.push('/')
            })
     }
    

    return (
        <div>
            <form>
                <label>Title<input type='text' name='title' value={item.title} onChange={updateHandler} /></label>
                <label>Director<input type='text' name='director' value={item.director} onChange={updateHandler} /></label>
                <label>Metascore<input type='text' name='metascore' value={item.metascore} onChange={updateHandler} /></label>
                <button onClick={submitHandler}>Submit</button>
            </form>
        </div>
    )
}

export default MovieUpdate
