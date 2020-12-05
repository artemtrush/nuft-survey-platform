export function openTabWithErrorField($field, minIdxOfTabWithErrorField) {
    const $tabContent = $field.parents('.js-nav-tab-content');
    if ($tabContent.length) {
        const tabIdx = $tabContent.attr('data-tab');
        if (tabIdx && (tabIdx < minIdxOfTabWithErrorField || minIdxOfTabWithErrorField === null)) {
            $(`.js-nav-tab-button[data-tab="${tabIdx}"]`).trigger('click');
            return tabIdx;
        }
    }

    return null;
}

export function NavigationTabs(tabs) {
    $(document).offon('click', '.js-nav-tab-button', e => {
        e.preventDefault();
        const tabIdx = $(e.target).closest('.js-nav-tab-button').attr('data-tab');

        $('.js-nav-tab-button').removeClass('active');
        $('.js-nav-tab-content').removeClass('active');

        $(`.js-nav-tab-button[data-tab="${tabIdx}"]`).addClass('active');
        $(`.js-nav-tab-content[data-tab="${tabIdx}"]`).addClass('active');
    });

    function getActiveTabClass(tabIdx) {
        return tabIdx === 0 ? 'active' : '';
    }

    return `
        <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
                ${
                    Object.values(tabs)
                        .map((tab, idx) => {
                            return `
                                <li class="js-nav-tab-button ${getActiveTabClass(idx)}" data-tab="${idx}">
                                    <a href="javascript:void(0)" data-toggle="tab" aria-expanded="true">
                                        ${tab.Title}
                                    </a>
                                </li>
                            `;
                        })
                        .join('')
                }
            </ul>
            <div class="tab-content">
                ${
                    Object.values(tabs)
                        .map((tab, idx) => {
                            return `
                                <div class="js-nav-tab-content ${getActiveTabClass(idx)} tab-pane" data-tab="${idx}">
                                    ${tab.Content}
                                </div>
                            `;
                        })
                        .join('')
                }
            </div>
        </div>
    `;
}
