class MyPromise {
    constructor(body) {
        this.body = body;
        this._resolve;
        this._reject;
        this._results = [];
        if (this.body) {
            this.firstTimeCall();
        }
    }

    static all(args) {
        let promise = new MyPromise(function () {
            let values = [];
            for (let prom in args) {
                args[prom].finally((res) => {
                    values[prom] = res;
                    dataCheching.call(this, 0, args.length);
                });
            }
            function dataCheching(delay, length) {
                setTimeout(() => {
                    let over = 0;
                    for (let value in values) {
                        if (value) {
                            over += 1;
                        }
                    }
                    if (over !== length) {
                        delay += 500;
                        dataCheching.call(this, delay, length);
                    } else {
                        this.resolve(values);
                    }
                }, delay);
            }
        });
        return promise;
    }

    resolve(result) {
        if (this._resolve === undefined && this._reject === undefined) {
            if (result === undefined) {
                result = true;
            }
            this._resolve = result;
            this._results[0] = result;
        }
    }

    reject(error) {
        if (this._resolve === undefined && this._reject === undefined) {
            if (error === undefined) {
                error = "Some Error";
            }
            this._reject = error;
            this._results[1] = error;
        }
    }

    then(resultFunc, errorFunc, newChaining = false, delay = 0) {
        setTimeout(() => {
            if (this._resolve === undefined && this._reject === undefined) {
                delay += 500;
                return this.then(resultFunc, errorFunc, newChaining, delay);
            }
            if (newChaining) {
                this._resolve = this._results[0];
                this._reject = this._results[1];
            }
            try {
                if (this._resolve) {
                    this.functionCaller(resultFunc, 0);
                } else {
                    this.functionCaller(errorFunc, 1);
                    if (errorFunc) {
                        this._resolve = true;
                    }
                }
            } catch (e) {
                e.message ? (this._reject = e.message) : (this._reject = e);
                this._resolve = undefined;
            }
        }, delay);
        return this;
    }

    catch(errorFunc, newChaining = false) {
        return this.then(null, errorFunc, newChaining);
    }

    finally(func, newChaining = false) {
        return this.then(func, func, newChaining);
    }

    functionCaller(func, resType) {
        // if restype = 0 => res | if restype = 1 => error
        let types = [this._resolve, this._reject];
        let res;
        if (func) {
            res = func(types[resType]);
            if (res) {
                switch (resType) {
                    case 0:
                        this._resolve = res;
                        break;
                    case 1:
                        this._reject = res;
                        break;
                }
            }
        }
    }

    firstTimeCall() {
        this.body.call(this);
        this.body = null;
    }
}
