const ApiURI = () => {
    let apiUri = "";
    switch (window.location.hostname) {
      case "localhost": {
        apiUri = "https://richter-api-development.azurewebsites.net";
        break;
      }
      case "127.0.0.1": {
        apiUri = "http://localhost:5000";
        break;
      }
      case "richter.checkurmed.com": {
        apiUri = "https://richter-api.azurewebsites.net";
        break;
      }
      case "ashy-bay-028fd6f03.azurestaticapps.net": {
        apiUri = "https://amstermed-api.azurewebsites.net";
        break;
      }
      default: {
        apiUri = "https://richter-api.azurewebsites.net";
        break;
      }
    }
    return apiUri
};

export default ApiURI;