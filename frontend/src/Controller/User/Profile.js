import Base   from '../Base';
import Update  from '../../Page/User/Profile/Update';

export default class Profile extends Base {
    async update() {
        const user = Storage.get('User');

        this.render(new Update({
            User: user
        }));
    }
}
