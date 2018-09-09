
function serialize(data) {
  var key, val, index = 0, aRet = [];

  for (key in data) {
    val = data[key];

    if (index > 0) {
      aRet.push('&');
    }

    aRet.push(key);
    aRet.push('=');
    aRet.push(encodeURIComponent(val));

    index++;
  }

  return aRet.join('');
};

function parseResponseText(text) {
  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text); 
  } catch (error) {
    return text;
  }
}

export class ApiBaseService {
  constructor(headerFactory, domain = '') {
    this.domain = domain;
    this.headerFactory = headerFactory || (() => null);
  }
  /**
   * Ajax를 수행하여 결과를 Promise를 반환 한다.
   * @param {string | 'GET' | 'POST' | 'PUT'} method 
   * @param {string} url 
   * @param {{[key: string]: any}} params 
   */
  send(method, url, params) {
    let xhr = new XMLHttpRequest(),
      sMethod = method.toUpperCase(),
      sParams = serialize(params),
      mParams,
      isPost = ((sMethod === 'POST') || (sMethod === 'PUT')),
      mHeader = this.headerFactory()
    ;

    xhr.open(sMethod.toUpperCase(),
      this.domain + url + (isPost ? '' : '?' + sParams),
      true);

    if (mHeader) {
      Object.keys(mHeader).forEach(key => xhr.setRequestHeader(key, mHeader[key]));
    }

    return new Promise(function (resolve, reject) {
      xhr.onreadystatechange = function (aEvt) {
        const status = xhr.status;
        let resText = '';
        let resObj = null;

        if (xhr.readyState == 4) {
          resText = xhr.responseText;
          resObj = parseResponseText(resText);

          if ((status >= 200) && (status < 400)) {
            resolve(resObj);
          }
          else if (status >= 400 && status < 500 ) {
            reject(resObj);
          } else {
            reject(aEvt, xhr);
          }
        }
      };

      try {
        if (isPost && params) {
          xhr.send(JSON.stringify(params));
        }
        else {
          xhr.send();
        }
      }
      catch (e) {
        reject(e);
      }
    });
  }
  /**
   * GET 요청을 수행.
   * @param {string} url 
   * @param {{[key: string]: any}} params 
   */
  get (url, params) {
    return this.send('GET', url, params);
  }
  /**
   * POST 요청을 수행.
   * @param {string} url 
   * @param {{[key: string]: any}} body 
   */
  post(url, body) {
    return this.send('POST', url, body);
  }
  /**
   * PUT 요청을 수행.
   * @param {string} url 
   * @param {{[key: string]: any}} body 
   */
  put(url, body) {
    return this.send('PUT', url, body);
  }
}

// export = function(headerFactory, domain) {
//   return new ApiBaseService(headerFactory, domain);
// }