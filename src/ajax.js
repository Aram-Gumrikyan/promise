function ajax(url, { type = "GET", responseType = "json", headers = {}, data } = {}) {
    try {
        configValidation();
        urlValidation(url);
    } catch (e) {
        return new MyPromise(function () {
            this.reject(e.message);
        });
    }

    function configValidation() {
        const types = ["GET", "POST", "PUT", "PATCH", "DELETE"];
        const responseTypes = ["arraybuffer", "blob", "document", "json", "text"];

        const typeLoc = types.find((typeLoc) => typeLoc === type);
        const responseTypeLoc = responseTypes.find((responseTypeLoc) => responseTypeLoc === responseType);

        if (!typeLoc || !responseTypeLoc) throw new Error("config is wrong");
    }

    function urlValidation(url) {
        url = new URL(url);
        if (url.protocol !== "https:" && url.protocol !== "http:") {
            throw new Error("url is wrong");
        }
        // check is in the end have country code
        const regex = /\.([a-z]{2,3})\/?$/g;
        if (!url.host.match(regex)) {
            throw new Error("url is wrong");
        }
        if (type !== "GET") {
            if (url.pathname === "/") {
                throw new Error("url is wrong");
            }
        }
    }

    return new MyPromise(function () {
        const xhr = new XMLHttpRequest();
        xhr.open(type, url);
        xhr.responseType = responseType;

        for (let name of Object.keys(headers)) {
            xhr.setRequestHeader(name, headers[name]);
        }

        if (data) {
            xhr.send(JSON.stringify(data));
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
