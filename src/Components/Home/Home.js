import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { exportJsonFile } from '../../utilities/utilities';
import Loader from '../Shared/Loader';

const Home = () => {
    const [inputFile, setInputFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleFileUpload = () =>{
        if(inputFile === null) return;
        setErrorMessage('');
        setLoading(true);
        const formData = new FormData();
        formData.append("file", inputFile);

        axios.post('https://beanstalkedu-server-atique-atq.vercel.app/processlog', formData)
        .then(res =>  exportData(res.data?.data))
        .catch(error => {
            setErrorMessage(`Error occurred. Code: ${error.code}, Message: ${error.message}`);
        })
        .finally(()=> {
            setTimeout(() => {setLoading(false)}, 200);
        })
    }

    const exportData = (data) => {
        if (!data) {
            toast.error('Empty File');
            return;
        };
        exportJsonFile(data);
        toast.success('File Downloaded!');
    };


    return (
        <div>
            <div className="hero w-full mt-12 rounded-lg">
                <div className="flex-col lg:flex-row items-center justify-center justify-items-center">
                    <div>
                        {errorMessage && <p className='text-red-600 font-semibold text-center mb-2'>{errorMessage}</p>}
                    </div>
                    <div className="card w-96 shadow-2xl bg-base-100 py-6">
                        <h3 className="text-lg font-semibold text-center py-0 my-5 text-gray-600">Upload file to parse the log </h3>
                        <div className="card-body">
                            <div className="">
                                <input className="input input-bordered w-full max-w-xs pt-2 rounded-none "  type="file" id="file" 
                                accept=".csv" onChange={ event => { setInputFile(event.target.files[0])}}/>
                                <label htmlFor="file"><span className='italic text-xs'>(only .csv file)</span></label>
                            </div>
            
                            <div className="mt-10">
                                <button className="btn w-full btn-info border-none hover:bg-success text-lg" type="submit"
                                onClick={handleFileUpload}>
                                    { loading ?  <Loader/> :  'Submit'}
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