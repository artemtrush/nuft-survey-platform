import Base   from './Base';
import Update  from '../Page/Calendar/Update';

export default class Calendar extends Base {
    async update() {
        const response = await this.api.calendar.show();
        if (!response.Status) {
            return this.abortNotFound();
        }

        this.render(new Update({
            Calendar: response.Calendar
        }));
    }
}
