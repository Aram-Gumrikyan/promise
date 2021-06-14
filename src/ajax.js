function ajax(url, config) {
    try {
        if (!config) {
            config = {};
        }
        configValidation();
        urlValidation(url);
    } catch (e) {
        return new MyPromise(function () {
            e.message ? this.reject(e.message) : this.reject(e);
        });
    }

    function configValidation() {
        let types = ["GET", "POST", "PUT", "PATCH", "DELETE"];
        let responseTypes = ["arraybuffer", "blob", "document", "json", "text"];
        let type = types.find((type) => type === config.type);
        let responseType = responseTypes.find((responseType) => responseType === config.responseType);
        if (config.type) {
            if (!type) throw "config type is wrong";
        } else {
            config.type = "GET";
        }

        if (config.responseType) {
            if (!responseType) throw "config type is wrong";
        } else {
            config.responseType = "json";
        }
    }

    function urlValidation(url) {
        url = new URL(url);
        if (url.protocol !== "https:" && url.protocol !== "http:") {
            throw "url is wrong";
        }
        let regex = /\.([a-z]{2,3})\/?$/g;
        if (!url.host.match(regex)) {
            throw "url is wrong";
        }
        if (config.type !== "GET") {
            if (url.pathname === "/") {
                throw "url is wrong";
            }
        }
    }

    return new MyPromise(function () {
        let xhr = new XMLHttpRequest();
        xhr.open(config.type, url);
        xhr.responseType = config.responseType;

        if (config.headers) {
            for (let name of Object.keys(config.headers)) {
                xhr.setRequestHeader(name, config.headers[name]);
            }
        }
        if (config.data) {
            xhr.send(JSON.stringify(config.data));
        } else {
            xhr.send();
        }

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                this.resolve(xhr.response);
            } else {
                this.reject(xhr.status);
            }
        };
        xhr.onerror = () => {
            this.reject("Network error");
        };
    });
}
