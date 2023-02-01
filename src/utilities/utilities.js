
const toasterStyle = {
    style: {
      border: '1px solid green',
      padding: '16px',
      color: 'white',
      backgroundColor: '#808080'
    },
    duration: 7000,
    position: 'top-left',
}

const exportJsonFile = (data) => {
    if (!data) return;
    
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(data, null, 4)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `parsedLog${Date.now()}.json`;
    link.click();
}



export { toasterStyle, exportJsonFile }