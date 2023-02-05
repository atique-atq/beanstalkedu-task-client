import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ReactJson from 'react-json-view';
import { exportJsonFile, checkErrorCode, isEmptyObject } from '../../utilities/utilities';
import Loader from '../Shared/Loader';

const Home = () => {
    const [inputFile, setInputFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [response, setResponse] = useState({});
    
    const handleFileUpload = () =>{
        if(inputFile === null) return;
        setErrorMessage('');
        setLoading(true);
        const formData = new FormData();
        formData.append("file", inputFile);

        axios.post('https://beanstalkedu-server-typescript.vercel.app/processlog', formData)
        .then(res =>  exportData(res.data?.data))
        .catch(error => {
            setErrorMessage(checkErrorCode(error));
        })
        .finally(()=> {
            setTimeout(() => {setLoading(false)}, 200);
        })
    }

    const exportData = (data) => {
        if (data?.length === 0) {
            toast.error('Invalid Input File Format');
            return;
        };
        setResponse(data);
        exportJsonFile(data);
        toast.success('File Downloaded!');
    };


    return (
        <div>
            <div className="hero w-full mt-12 rounded-lg">
                <div className="flex flex-col items-center justify-center mx-auto">
                    <div className='flex flex-col items-center justify-center'>
                        <div>
                            {errorMessage && <p className='text-red-600 font-semibold text-center mb-2'>{errorMessage}</p>}
                        </div>
                        <div className="card w-96 shadow-2xl bg-base-100 py-6">
                            <h3 className="text-lg font-semibold text-center py-0 my-5 text-gray-600">Upload file to parse the log </h3>
                            <div className="card-body">
                                <div className="">
                                    <input className="input input-bordered w-full max-w-xs pt-2 rounded-none"  type="file" id="file" 
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

                    <div >
                        {
                            !isEmptyObject(response) && <div>
                                <p className='my-2 font-semibold underline text-blue-500 ml-8 text-xl'>Parsed Log is:</p>
                                <div className='bg-[#1E1E1E] mt-4 lg:px-44 md:20 py-2 rounded-lg shadow-2xl'>
                                    <ReactJson name={false} theme={'twilight'} displayDataTypes={false}
                                    displayObjectSize={false} indentWidth={4    } src={response} />
                                </div>
                            </div>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;