class ApiClient {
    constructor(request) {
        this.request = request;
    }

    async triggerEndpoint(endpointName, ruleData) {
        const baseUrl = `https://${endpointName}.free.beeceptor.com`;
        const url = `${baseUrl}${ruleData.path}`;
        
        const response = await this.request.fetch(url, {
            method: ruleData.method,
            data: ruleData.method === 'POST' ? { message: 'Automated E2E Test' } : undefined,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        return response;
    }
}

module.exports = ApiClient;
