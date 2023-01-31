import axios from 'axios';
import React, { useState } from 'react';


const Home = () => {
    const [inputFile, setInputFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [parsedLog, setParsedLog] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleFileUpload = (event) =>{
        if(inputFile === null) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("file", inputFile);
        formData.append("name", 'atiqur');

        const api = 'http://localhost:5000/processlog';
        axios.post(api, formData)
        .then(res =>  setResponse(res.data?.data))
        .catch(error => {
            setLoading(false);
            setErrorMessage(`Error occurred. Code: ${error.code}, Message: ${error.message}`);
            console.log(`Error occurred. Code: ${error.code}, Message: ${error.message}`);
        });
    }

    const setResponse = (response) => {
        if (response){
            setParsedLog(response);
            console.log('this is response 1: ', response);
            console.log('this is response 2: ', parsedLog);
            setLoading(false);
        }
    }

    console.log('outside here:', parsedLog);

    return (
        <div>
            <div className="hero w-full mt-12 rounded-lg">
                <div className="flex-col lg:flex-row items-center justify-center justify-items-center">
                    <div>
                        {errorMessage && <p className='text-red-600 font-semibold'>{errorMessage}</p>}
                    </div>
                    <div className="card w-96 shadow-2xl bg-base-100 py-6">
                        <h3 className="text-lg font-semibold text-center py-0 my-5 text-gray-600">Upload file to parse the log </h3>
                        <div className="card-body">
                            <div className="">
                                <input className="input input-bordered w-full max-w-xs pt-2 rounded-none "  type="file" id="file" 
                                accept=".csv" onChange={ event => { setInputFile(event.target.files[0])}}/>
                            </div>
            
                            <div className="mt-10">
                                <button className="btn w-full btn-info border-none hover:bg-success text-lg" type="submit"
                                onClick={handleFileUpload}>
                                    { loading ?  'loading...' : 'submit'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;