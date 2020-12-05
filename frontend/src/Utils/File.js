import api from '../apiSingleton';
import { convertParamsToFormData } from './Form';
import { translateErrorType } from './Validator';

export async function createPublicFile(params) {
    const defaultParams = {
        Name: '',
        File: null
    };
    params = {...defaultParams, ...params};

    const data = convertParamsToFormData(params);
    const response = await api.file.create(data);

    return handleFileResponse(response);
}

export function getFileResponseErrorType(fileError) {
    let errorType = 'FILE_UPLOAD_FAILED';
    if (fileError.size == 'TOO_HIGH') {
        errorType = 'FILE_SIZE_EXCEEDED';
    }
    return errorType;
}

function handleFileResponse(response) {
    if (!response.Status) {
        const error = response.Error;
        let errorType;

        if (error.Type && error.Type == 'FILE_WRONG_EXTENSION') {
            errorType = error.Type;
        } else {
            errorType = getFileResponseErrorType(error.Fields.File);
        }

        const errorText = translateErrorType(errorType);

        return {
            Status: 0,
            ErrorMessage: errorText
        };
    }

    return {
        Status: 1,
        File: response.File
    };
}

export function readFileStream(fileStream, openInNewTab = true) {
    if (!fileStream || !fileStream.body) {
        return;
    }

    let download = '';
    const disposition = String(fileStream.headers.get('Content-Disposition'));
    if (disposition && disposition.indexOf('attachment') == 0) {
        const matches = disposition.match(/filename="(.+)"/);
        const filename = (matches && matches.length > 1) ? matches[1] : 'attachment';
        download = `download="${filename}"`;
    }

    fileStream.blob().then(blob => {
        const objectUrl = window.URL.createObjectURL(blob);

        $('body').append(`
            <a
                ${openInNewTab ? 'target="_blank"' : ''}
                id="file-blob-stream"
                href="${objectUrl}"
                ${download}
            ></a>
        `);

        const link = document.getElementById('file-blob-stream');
        link.click();
        link.remove();
    });
}
