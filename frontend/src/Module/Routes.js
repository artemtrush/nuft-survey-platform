import Entrance                 from '../Controller/Entrance';
import Authorization            from '../Controller/Authorization';
import Registration             from '../Controller/Registration';

import TeacherProfile           from '../Controller/Teacher/Profile';
import TeacherSurveys           from '../Controller/Teacher/Surveys';
import TeacherSurveyCreation    from '../Controller/Teacher/SurveyCreation';
import TeacherSurveyView        from '../Controller/Teacher/SurveyView';

export default {
    /* Unauthorised */
    'entrance': { controller: Entrance, name: 'entrance' },

    'authorization': { controller: Authorization, name: 'authorization' },

    'registration': { controller: Registration, name: 'registration' },
    // 'registration/confirmation': { controller: Entrance, name: 'registration_confirmation' },

    // 'recovery': { controller: Entrance, name: 'recovery' },
    // 'recovery/confirmation': { controller: Entrance, name: 'recovery_confirmation' },


    /* Authorised admin */
    // 'admin/teachers': { controller: Entrance, name: 'admin_teachers' },
    // 'admin/teachers/:id/profile': { controller: Entrance, name: 'admin_teacher_profile' },
    // 'admin/teachers/:id/surveys': { controller: Entrance, name: 'admin_teacher_surveys' },


    /* Authorised teacher */
    'teacher/profile': { controller: TeacherProfile, name: 'teacher_profile' },

    'teacher/surveys': { controller: TeacherSurveys, name: 'teacher_surveys' },
    'teacher/surveys/creation': { controller: TeacherSurveyCreation, name: 'teacher_survey_creation' },
    'teacher/surveys/:id/view': { controller: TeacherSurveyView, name: 'teacher_survey_view' }
};
