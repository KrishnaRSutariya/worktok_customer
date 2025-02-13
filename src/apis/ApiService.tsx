import { Constants } from '../constants/Constants';
import { Environments } from '../constants/Environments';
import { useAsyncStorage } from '../hooks/useAsyncStorage';

const ApiService = async (
    url: string,
    type: string | 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    data: any = {},
    formData = false,
    baseUrl = Environments.BACKEND_URL
) => {
    const { getStoredValue: getUserToken } = useAsyncStorage('userToken');
    const token = await getUserToken().then((res) => res?.accessToken ?? null).catch(() => null);

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

    console.log(`\n${baseUrl}/${url}: `, JSON.stringify(requestOptions), '\n\n');

    const response = await fetch(`${baseUrl}/${url}`, requestOptions);
    const responseJson = await response.json();

    console.log('\nOutput: ', JSON.stringify(responseJson), '\n\n');

    return responseJson;
};

export default ApiService;
