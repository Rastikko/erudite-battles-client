import $ from 'jquery';

export default function(url, data) {
    return $.ajax({
        type: 'POST',
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json'
    });
}
