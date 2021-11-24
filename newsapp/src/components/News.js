import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {

    const [articles, setArticles]=useState([])
    const [loading, setLoading]=useState(true)
    const [page, setPage]=useState(1)
    const [totalResults, setTotalResults]=useState(0)
    // document.title=`${CapitalizeFirstLetter(props.category)}-NewsMonkey`
    
    const CapitalizeFirstLetter=(string) => string.charAt(0).toUpperCase() + string.slice(1);
    
    const updateNews=async()=>{
        props.setProgress(10)
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data=await fetch(url);
        props.setProgress(40)
        let parsedData= await data.json();
        props.setProgress(60)
        console.log(page)
        setLoading(false)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setTotalResults(parsedData.loading)
        props.setProgress(100)

    }

    useEffect(() => {
        updateNews()
    }, [])

    const fetchMoreData = async() =>{        
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page+1)
        setLoading(true)
        let data=await fetch(url);
        let parsedData= await data.json();
        console.log(page)
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)                      
        setLoading(false)
      };

        return (
            <>
                <h2 className="text-center" style={{margin:'35px'}}>{`NewsMonkey - Top Headlines on ${CapitalizeFirstLetter(props.category)}`}</h2>
                {loading && <Spinner/>}
                <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length!==totalResults}
                loader={<Spinner/>}>
                <div className="container">

                
                <div className="row">
                {articles.map((element)=>{
                      
                    return <div className="col-md-4" key ={element.url}>
                                <NewsItem author={element.author!==null?element.author:"unknown"} title={element.title!==null? element.title:""} description={element.description!==null?element.description:""} date={element.publishedAt!==null?element.publishedAt:""} imageUrl={element.urlToImage!==null?element.urlToImage:"https://images.moneycontrol.com/static-mcnews/2020/07/rupee-653x435.jpg"} newsUrl={element.url}/>
                            </div>
                    }
                    )
                }
                </div>
                </div>
                </InfiniteScroll>
                </>

                
        )
    
}

News.defaultProps={
    country:'in',
    pageSize:8,
    category:'general'

}

News.propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,

};

export default News
