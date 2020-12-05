import apiFactory from './Api';
import config from './Utils/Config';

export default apiFactory({
    apiPrefix: config.API_URL + config.API_PREFIX
});
