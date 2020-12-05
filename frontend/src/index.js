import 'babel-polyfill';

import $ from 'jquery';
import _ from 'lodash'; // eslint-disable-line
import 'bootstrap';
import 'bootstrapCss';
import 'fontAwesome';
import 'admCss';
import 'admSkin';
import 'admin-lte';
import 'momentJs';

import './main.less';

import Main from './main';

$(document).ready(async () => {
    new Main().init();
});
