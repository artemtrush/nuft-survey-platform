import api                              from '../apiSingleton';
import Session                          from "../Module/Session";
import config                           from "../Utils/Config";
import isFunction                       from 'lodash/isFunction';
import Modal                            from "./Modal";
import Cache                            from "../Utils/Cache";
import Component                        from "../Component";
import * as MathUtils                   from "../Utils/Math";
import * as DateUtils                   from "../Utils/Date";
import * as PageUtils                   from "../Utils/Page";
import * as FormUtils                   from "../Utils/Form";
import * as FileUtils                   from "../Utils/File";
import * as CollectionUtils             from "../Utils/Collection";
import * as ValidatorUtils              from "../Utils/Validator";

export default class Base {

    ITEMS_PER_PAGE = 10;

    constructor(params) {
        if (typeof (params) === 'object') {
            for (const k in params) {
                this[k] = params[k];
            }
        }

        this.definePageModules();
        this.defineCustomFunctions();
    }

    definePageModules()    {
        this.api = api;
        this.cache = new Cache();
        this.component = Component();

        this.math = MathUtils;
        this.date = DateUtils;
        this.page = PageUtils;
        this.pathFor = PageUtils.pathFor;
        this.form = FormUtils;
        this.file = FileUtils;
        this.collection = CollectionUtils;
        this.validator = ValidatorUtils;
    }

    defineCustomFunctions()    {
        $.fn.offon = function (event, target, cb) {
            if (!target) {
                $(this).off(event).on(event, cb);
            } else {
                $(this).off(event, target).on(event, target, cb);
            }
            return $(this);
        };
    }

    loggedUser() {
        return Storage.get('User');
    }

    reload()    {
        window.location.reload();
    }

    redirect(url)    {
        window.location.hash = url;
    }

    async display() {
        const content = this.render();
        if (content === false) {
            return;
        }

        const header = this.header();
        $(".content-header").html(`<h1>${header}</h1>`);
        this.displayContent(content);

        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();

        await this.init();
        await this.bindEvents();
    }

    displayContent(content) {
        if (this instanceof Modal) {
            $('#modals').html(content);
        } else if ($('.main-content').length) {
            $(".main-content").html(content);
        } else {
            $("#content").html(content);
        }

        this.page.runContentOnLoadCallbacks();
    }

    async reset() {
        const content = this.render();
        if (content === false) {
            return;
        }

        this.displayContent(content);

        await this.init();
        await this.bindEvents();
    }

    header() {
        return '';
    }
    content() {
        return '';
    }

    async init() {}
    async bindEvents() {}
    async getState() {
        return {};
    }

    render() {
        this.page.startCollectingContentOnLoadCallbacks();

        const state = this.getState() || {};
        let content = this.content();

        for (const stateKey in state) {
            const stateValue = state[stateKey];

            content = content.replace(`{{${stateKey}}}`, stateValue);
        }

        return content;
    }
}
