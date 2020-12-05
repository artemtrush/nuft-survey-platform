import 'babel-polyfill';

import $ from 'jquery';
import _ from 'lodash'; // eslint-disable-line
import 'bootstrap';
import 'bootstrapCss';
import 'fontAwesome';
import 'admCss';
import 'admSkin';
import 'admin-lte';
import 'datatables.net';
import 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
import 'momentJs';
import { pinEvents } from "./Utils/Page";

import './main.less';

import Main from './main';

$(document).ready(async () => {
    new Main().init();

    pinEvents();
});
