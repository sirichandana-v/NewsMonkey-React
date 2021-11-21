import React, { Component } from 'react'

export class NewsItem extends Component {
    constructor(){
        super();
    }
    render() {
        let {title, description,imageUrl,newsUrl}=this.props;
        return (
            <div className="my-3">
                <div className="card" style={{width: "18rem"}}>
                    <img className="card-img-top" src={imageUrl} alt="news image"/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a rel="noreferrer"href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
        </div>
        )
    }
}

export default NewsItem
