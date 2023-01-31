import axios from 'axios';

const uploadFileToServer = (formData, api) => {
    console.log('came in uploadFile method');

    axios.post(api, formData)
    .then(res =>  {
        console.log('okay is',res.data?.data);
    })
    .catch(error => console.log('error received: ', error));
}


export { uploadFileToServer }