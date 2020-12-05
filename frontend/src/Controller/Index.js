import Base from './Base';
import IndexPage from '../Page/Index';

export default class Index extends Base {
    async show() {
        this.render(new IndexPage());
    }
}
