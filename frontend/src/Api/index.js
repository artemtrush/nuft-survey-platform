import ApiClient        from './ApiClient';

import Confirmations    from './Main/Confirmations';
import Curriculums      from './Main/Curriculums';
import Disciplines      from './Main/Disciplines';
import Groups           from './Main/Groups';
import Sessions         from './Main/Sessions';
import Surveys          from './Main/Surveys';
import Teachers         from './Main/Teachers';
import Users            from './Main/Users';

import AdminSurveys          from './Admin/Surveys';
import AdminTeachers         from './Admin/Surveys';

export default function ({ apiPrefix } = {}) {
    if (!apiPrefix) {
        throw new Error('API prefix required');
    }

    const apiClient = new ApiClient({
        prefix : apiPrefix
    });

    const adminApiClient = new ApiClient({
        prefix : apiPrefix + '/admin'
    });

    return {
        confirmations       : new Confirmations({ apiClient }),
        curriculums         : new Curriculums({ apiClient }),
        disciplines         : new Disciplines({ apiClient }),
        groups              : new Groups({ apiClient }),
        sessions            : new Sessions({ apiClient }),
        surveys             : new Surveys({ apiClient }),
        teachers            : new Teachers({ apiClient }),
        users               : new Users({ apiClient }),
        admin               : {
            surveys         : new AdminSurveys({ adminApiClient }),
            teachers        : new AdminTeachers({ adminApiClient })
        }
    };
}
