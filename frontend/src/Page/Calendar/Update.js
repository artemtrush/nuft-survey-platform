import Base from "../Base";
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import 'fullcalendarCoreCss';
import 'fullcalendarDaygridCss';

export default class Update extends Base {

    async init() {
        const self = this;

        const holdidaysEvents = [];
        $.each(this.Calendar.Holidays, (idx, date) => {
            holdidaysEvents.push(this.buildCalendarDateEvent(date));
        });

        const container = document.getElementById('calendar');
        this.fullcalendar = new Calendar(container, {
            plugins: [ dayGridPlugin ],
            locale: 'ru',
            defaultView: 'dayGridMonth',
            firstDay: 1,
            editable: true,
            events: holdidaysEvents
        });
        this.fullcalendar.render();

        $(document).offon('click', '.fc-day', function () {
            const date = $(this).attr('data-date');
            self.updateCalendarDateState(date);
        });
    }

    buildCalendarDateEventId(date) {
        return 'event-' + date;
    }

    buildCalendarDateEvent(date) {
        return {
            id: this.buildCalendarDateEventId(date),
            start: date,
            end: date,
            allDay: true,
            color: '#ff726f'
        };
    }

    updateCalendarDateState(date) {
        const eventId = this.buildCalendarDateEventId(date);
        const event = this.fullcalendar.getEventById(eventId);
        if (event) {
            event.remove();
        } else {
            this.fullcalendar.addEvent(this.buildCalendarDateEvent(date));
        }
    }

    getCalendarHolidaysDates() {
        const dates = [];
        const events = this.fullcalendar.getEvents();

        $.each(events, (idx, event) => {
            dates.push(this.date.formatDate(event.start));
        });

        return dates;
    }

    async bindEvents() {
        $('form#calendar_update').on('submit', e => {
            e.preventDefault();
            this.updateCalendar();
        });

        $('form#calendar_update').on('reset', e => {
            e.preventDefault();
            this.redirect(this.pathFor('index'));
        });
    }

    header() {
        return 'Редактирование календаря';
    }

    content() {
        return `
            <form id="calendar_update">
                ${this.component.FormErrorBlock()}
                <div id="calendar"></div>
                ${this.component.FormSubmitBlock()}
            </form>
        `;
    }

    async updateCalendar() {
        const params = {
            Holidays: this.getCalendarHolidaysDates()
        };
        const response = await this.api.calendar.update(params);

        if (response.Status) {
            this.reload();
        } else {
            const formSelector = '#calendar_update';
            this.validator.showFormError(formSelector, response);
        }
    }
}
