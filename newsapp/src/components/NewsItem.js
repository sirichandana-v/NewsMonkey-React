import React from 'react'



const NewsItem =(props)=> {
    
    
        
        return (
            <div className="my-3">
                <span className="badge badge-danger">Danger</span>
                <div className="card">
                    <img className="card-img-top" src={props.imageUrl} alt="news image"/>
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">{props.description}</p>
                        <p className="card-text"><small className="text-muted">By {props.author} on {new Date(props.date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={props.newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
        </div>
        )
    
}

export default NewsItem
