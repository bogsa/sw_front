import { ref } from "vue";

export default function use_httpRSC() {

const respuesta = ref(null);
 
    const searchCode = (code) => {
        switch (parseInt(code)) {
            case 100: respuesta.value = "Continue"; return respuesta.value;
            case 101: respuesta.value = "Switching Protocols"; return respuesta.value;
            case 102: respuesta.value = "Processing"; return respuesta.value;
            case 103: respuesta.value = "Early Hints"; return respuesta.value;
            case 200: respuesta.value = "OK"; return respuesta.value;
            case 201: respuesta.value = "Created"; return respuesta.value;
            case 202: respuesta.value = "Accepted"; return respuesta.value;
            case 203: respuesta.value = "Non-Authoritative Information"; return respuesta.value;
            case 204: respuesta.value = "No Content"; return respuesta.value;
            case 205: respuesta.value = "Reset Content"; return respuesta.value;
            case 206: respuesta.value = "Partial Content"; return respuesta.value;
            case 207: respuesta.value = "Multi-Status"; return respuesta.value;
            case 208: respuesta.value = "Already Reported"; return respuesta.value;
            case 226: respuesta.value = "IM Used"; return respuesta.value;
            case 300: respuesta.value = "Multiple Choices"; return respuesta.value;
            case 301: respuesta.value = "Moved Permanently"; return respuesta.value;
            case 302: respuesta.value = "Found"; return respuesta.value;
            case 303: respuesta.value = "See Other"; return respuesta.value;
            case 304: respuesta.value = "Not Modified"; return respuesta.value;
            case 307: respuesta.value = "Temporary Redirect"; return respuesta.value;
            case 308: respuesta.value = "Permanent Redirect"; return respuesta.value;
            case 400: respuesta.value = "Bad Request"; return respuesta.value;
            case 401: respuesta.value = "Unauthorized"; return respuesta.value;
            case 402: respuesta.value = "Payment Required"; return respuesta.value;
            case 403: respuesta.value = "Forbidden"; return respuesta.value;
            case 404: respuesta.value = "Not Found"; return respuesta.value;
            case 405: respuesta.value = "Method Not Allowed"; return respuesta.value;
            case 406: respuesta.value = "Not Acceptable"; return respuesta.value;
            case 407: respuesta.value = "Proxy Authentication Required"; return respuesta.value;
            case 408: respuesta.value = "Request Timeout"; return respuesta.value;
            case 409: respuesta.value = "Conflict"; return respuesta.value;
            case 410: respuesta.value = "Gone"; return respuesta.value;
            case 411: respuesta.value = "Length Required"; return respuesta.value;
            case 412: respuesta.value = "Precondition Failed"; return respuesta.value;
            case 413: respuesta.value = "Content Too Large"; return respuesta.value;
            case 414: respuesta.value = "URI Too Long"; return respuesta.value;
            case 415: respuesta.value = "Unsupported Media Type"; return respuesta.value;
            case 416: respuesta.value = "Range Not Satisfiable"; return respuesta.value;
            case 417: respuesta.value = "Expectation Failed"; return respuesta.value;
            case 418: respuesta.value = "I'm a teapot"; return respuesta.value;
            case 421: respuesta.value = "Misdirected Request"; return respuesta.value;
            case 422: respuesta.value = "Unprocessable Content"; return respuesta.value;
            case 423: respuesta.value = "Locked"; return respuesta.value;
            case 424: respuesta.value = "Failed Dependency"; return respuesta.value;
            case 425: respuesta.value = "Too Early"; return respuesta.value;
            case 426: respuesta.value = "Upgrade Required"; return respuesta.value;
            case 428: respuesta.value = "Precondition Required"; return respuesta.value;
            case 429: respuesta.value = "Too Many Requests"; return respuesta.value;
            case 431: respuesta.value = "Request Header Fields Too Large"; return respuesta.value;
            case 451: respuesta.value = "Unavailable For Legal Reasons"; return respuesta.value;
            case 500: respuesta.value = "Internal Server Error"; return respuesta.value;
            case 501: respuesta.value = "Not Implemented"; return respuesta.value;
            case 502: respuesta.value = "Bad Gateway"; return respuesta.value;
            case 503: respuesta.value = "Service Unavailable"; return respuesta.value;
            case 504: respuesta.value = "Gateway Timeout"; return respuesta.value;
            case 505: respuesta.value = "HTTP Version Not Supported"; return respuesta.value;
            case 506: respuesta.value = "Variant Also Negotiates"; return respuesta.value;
            case 507: respuesta.value = "Insufficient Storage"; return respuesta.value;
            case 508: respuesta.value = "Loop Detected"; return respuesta.value;
            case 510: respuesta.value = "Not Extended"; return respuesta.value;
            case 511: respuesta.value = "Network Authentication Required"; return respuesta.value; 

        }
    }


    return { 
        respuesta,
        searchCode,
    }



}