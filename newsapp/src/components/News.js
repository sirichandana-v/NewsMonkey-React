import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps={
        country:'in',
        pageSize:8,
        category:'general'

    }

    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,

    };
    capitalizeFirstLetter=(string) => string.charAt(0).toUpperCase() + string.slice(1);
      

    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:false,
            page:1
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`
    }

    async updateNews(){
        console.log(this.state.page,"immediate updateNews()")
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=54973e577e34405cb7dbc6415ab549b4&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data=await fetch(url);
        let parsedData= await data.json();
        console.log(this.state.page)
        this.setState({articles :parsedData.articles,
             totalResults:parsedData.totalResults,                        
             loading:false});


    }
    async componentDidMount(){
        
        this.updateNews()
    }

    handleOnPrevClick=async()=>{

        await this.setState({page:this.state.page-1})
        this.updateNews()

    }
    handleOnNextClick=async()=>{
            await this.setState({page:this.state.page+1})
            console.log(this.state.page,"next")
            this.updateNews()
    }
    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center" style={{margin:'35px'}}>{`NewsMonkey - Top Headlines on ${this.capitalizeFirstLetter(this.props.category)}`}</h2>
                {this.state.loading && <Spinner/>}
                <div className="row">
                {!this.state.loading && this.state.articles.map((element)=>{
                    
                    return <div className="col-md-4" key ={element.url}>
                                <NewsItem author={element.author!==null?element.author:"unknown"} title={element.title!==null? element.title:""} description={element.description!==null?element.description:""} date={element.publishedAt!==null?element.publishedAt:""} imageUrl={element.urlToImage!==null?element.urlToImage:"https://images.moneycontrol.com/static-mcnews/2020/07/rupee-653x435.jpg"} newsUrl={element.url}/>
                            </div>
                    }
                    )
                }
                </div>

                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1? true:false} type="button" className="btn btn-dark" onClick={this.handleOnPrevClick}>&larr; Previous</button>
                <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleOnNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
