import Index                            from '../Controller/Index';
import Session                          from '../Controller/Session';

export default {
    /* Unauthorised */
    'entrance': { controller: Index, name: 'entrance' },

    'authorization': { controller: Session, name: 'authorization' },

    'registration': { controller: Session, name: 'registration' },
    'registration/confirmation': { controller: Session, name: 'registration_confirmation' },

    'recovery': { controller: Session, name: 'recovery' },
    'recovery/confirmation': { controller: Session, name: 'recovery_confirmation' },


    /* Authorised admin */
    'admin/teachers': { controller: Session, name: 'admin_teachers' },
    'admin/teachers/:id/profile': { controller: Session, name: 'admin_teacher_profile' },
    'admin/teachers/:id/surveys': { controller: Session, name: 'admin_teacher_surveys' },


    /* Authorised teacher */
    'teacher/profile': { controller: Session, name: 'teacher_profile' },

    'teacher/surveys': { controller: Session, name: 'teacher_surveys' },
    'teacher/surveys/creation': { controller: Session, name: 'teacher_survey_creation' }
};
