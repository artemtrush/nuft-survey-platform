import { createPublicFile } from '../Utils/File';

export function init(tinymceId) {
    window.tinymce.remove();

    window.tinymce.init({
        selector: `#${tinymceId}`,
        theme: 'silver',
        height: 500,
        menubar: false,
        relative_urls: false,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code'
        ],
        toolbar: `
            bold underline italic | bullist numlist | alignleft aligncenter alignright alignjustify |
            link | image | code
        `,
        async images_upload_handler(blobInfo, success, failure) {
            const response = await createPublicFile({
                Name: blobInfo.filename(),
                File: blobInfo.blob()
            });

            if (response.Status) {
                success(response.File.PublicRelativeUrl);
            } else {
                failure(response.ErrorMessage);
            }
        }
    });
}

export function html(params) {
    const defaultParams = {
        Id: '',
        Text: '',
        Value: ''
    };
    params = {...defaultParams, ...params};

    return `
        <div class="form-group" id="helper_${params.Id}">
            <label for="${params.Id}">${params.Text}</label>
            <textarea class="tinymce-editor" id="${params.Id}">
                ${params.Value}
            </textarea>
            <span class="help-block"></span>
        </div>
    `;
}
