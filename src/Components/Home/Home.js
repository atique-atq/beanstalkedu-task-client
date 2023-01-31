import React, { useState } from 'react';
import {uploadFile} from '../../utilities/utilities';

const Home = () => {
    const [inputFile, setInputFile] = useState(null);
    
    const handleFileUpload = (event) =>{
        if(inputFile === null) return;

        const file = inputFile[0];
        console.log('file is', file);

        uploadFile(file);
    }
    return (
        <div>
            <div className="hero w-full mt-12  rounded-lg">
                <div className="flex-col lg:flex-row items-center justify-center justify-items-center">
                <div className="card w-96 shadow-2xl bg-base-100 py-6">
                    <h3 className="text-lg font-semibold text-center py-0 my-5 text-gray-600">Upload file to parse the log </h3>
                    <div className="card-body">
                        <div className="">
                            <input className="input input-bordered w-full max-w-xs pt-2 rounded-none "  type="file" id="file" 
                            onChange={ event => { setInputFile(event.target.files)}}/>
                        </div>
        
                        <div className="mt-10">
                            <input className="btn w-full btn-info border-none hover:bg-success text-lg" type="submit"
                            value="upload file" onClick={handleFileUpload}
                            />
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Home;