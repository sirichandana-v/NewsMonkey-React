import React from 'react'
import loading from './loading.gif'

const Spinner = ()=> {
    
        return (
            <div className="text-center" style={{marginBottom:"20px"}}>
                <img src={loading} alt="loading"  />
            </div>
        )
    
}

export default Spinner
