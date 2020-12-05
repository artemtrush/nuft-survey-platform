function getFileBasename(filename) {
    return filename.split('.').slice(0, -1).join('.');
}

function isImageUrl(url) {
    return (url.match(/\.(jpeg|jpg|png)$/) !== null);
}

function getFilePreviewHtml(file) {
    const fileUrl = file.PublicUrl;
    const fileName = file.FullName;
    if (!fileUrl) {
        return '';
    }

    if (isImageUrl(fileUrl)) {
        return `
            <img src="${fileUrl}">
        `;
    } else {
        return `
            Скачать:
            <a href="${fileUrl}" download="${fileName}">${fileName}</a>
        `;
    }
}

const fileParamsContainer = [];
export function getFileParams(componentId) {
    if (componentId in fileParamsContainer) {
        return fileParamsContainer[ componentId ];
    }
    return null;
}

export function init(params) {
    const defaultParams = {
        Id: '',
        Text: '',
        File: {}
    };
    const defaultFileParams = {
        FileMapId: 0,
        Name: '',
        FullName: '',
        PublicUrl: ''
    };

    params = {...defaultParams, ...params};
    params.File = {...defaultFileParams, ...params.File};

    const fileInputId = `file-${params.Id}`;
    const fileNameInputId = `file-name-${params.Id}`;
    const fileUploadBtnId = `file-upload-btn-${params.Id}`;
    const inputHelperId = `helper_${params.Id}`;

    const inputHtml = `
        <div class="upload-file-form-group" class="form-group" id="${inputHelperId}">
            <input type="file" class="file-input" id="${fileInputId}">

            <label for="${fileNameInputId}">${params.Text}</label>
            <input
                type="text"
                class="form-control file-name-input"
                id="${fileNameInputId}"
                placeholder="Имя файла"
                value="${params.File.Name}"
            >
            <i class="fa fa-cloud-upload fa-lg upload-file-button" aria-hidden="true" id="${fileUploadBtnId}"></i>
            <span class="help-block"></span>
            <div class="file-preview">
                ${getFilePreviewHtml(params.File)}
            </div>
        </div>
    `;

    function getFileObject() {
        const input = document.getElementById(fileInputId);
        if (!input) {
            return null;
        }
        return input.files[0];
    }
    function getFileInput() {
        return $(`#${fileInputId}`);
    }
    function getFileNameInput() {
        return $(`#${fileNameInputId}`);
    }
    function getFilePreview() {
        return $(`#${inputHelperId} .file-preview`);
    }

    function updateFileParams() {
        let fileParams;

        const file = getFileObject();
        if (file) {
            if (!getFileNameInput().val()) {
                getFileNameInput().val(getFileBasename(file.name));
            }

            fileParams = {
                File: file
            };

            getFilePreview().empty();
        } else {
            fileParams = {
                FileMapId: params.File.FileMapId
            };
        }

        fileParams.Name = getFileNameInput().val();

        fileParamsContainer[ params.Id ] = fileParams;
    }

    if (params.File.FileMapId) {
        fileParamsContainer[ params.Id ] = {
            FileMapId: params.File.FileMapId,
            Name: params.File.Name
        };
    }

    $(document).offon('change', `#${fileInputId}`, updateFileParams);
    $(document).offon('change', `#${fileNameInputId}`, updateFileParams);
    $(document).offon('click', `#${fileUploadBtnId}`, () => {
        getFileInput().trigger('click');
    });

    return inputHtml;
}
