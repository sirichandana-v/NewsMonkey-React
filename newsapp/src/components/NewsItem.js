import React, { Component } from 'react'



export class NewsItem extends Component {
    
    render() {
        let {title, description,imageUrl,newsUrl,author,date}=this.props;
        
        return (
            <div className="my-3">
                <span className="badge badge-danger">Danger</span>
                <div className="card">
                    <img className="card-img-top" src={imageUrl} alt="news image"/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
        </div>
        )
    }
}

export default NewsItem
