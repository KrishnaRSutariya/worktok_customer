import { Constants } from '../constants/Constants';
import { Environments } from '../constants/Environments';

const ApiService = async (
    url: string,
    type: string | 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    data: any = {},
    formData = false,
    baseUrl = Environments.BACKEND_URL
) => {
    const token = null;

    const requestOptions: RequestInit = {
        method: type,
        headers: {
            'x-api-key': Environments.X_API_KEY,
            ...(formData ? {} : { 'Content-Type': 'application/json' }),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            lang: 'en',
        },
        ...(![Constants.GET, Constants.DELETE].includes(type) && { body: formData ? data : JSON.stringify(data) }),
        redirect: 'follow',
    };

    const response = await fetch(`${baseUrl}/${url}`, requestOptions);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export default ApiService;
