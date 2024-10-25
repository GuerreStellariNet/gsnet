const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const { query } = JSON.parse(event.body).queryResult.parameters;

    const googleAPIKey = 'AIzaSyDEONt3HX1G8Yun42srh6KBG2cwCs0_iPs';
    const searchEngineID = '90d22e418744f4392';
    const response = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${googleAPIKey}&cx=${searchEngineID}&q=${encodeURIComponent(query)}+site:guerrestellari.net`);

    const results = response.data.items.map(item => item.title).join(', ');

    return {
      statusCode: 200,
      body: JSON.stringify({ fulfillmentText: `Risultati trovati per '${query}': ${results}` })
    };
  } catch (error) {
    console.error("Errore nella gestione della richiesta:", error);
    return {
      statusCode: 500,
      body: "Errore nella comunicazione con Google Custom Search."
    };
  }
};
