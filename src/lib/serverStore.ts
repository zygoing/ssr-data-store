interface ConfigOption {
    noUndefinedValue?: boolean;
}

interface DataStorType {
    [key: string]: any;
}

class ServerStore {
    static instance: any = null;
    dataStoreForNext: DataStorType = {};

    constructor() {
        this.dataStoreForNext = {};
    }

    static getInstance() {
        if (!ServerStore.instance) {
            ServerStore.instance = ServerStore.createInstance();
        }

        return ServerStore.instance;
    }

    private static createInstance() {
        return new ServerStore();
    }

    saveData = (keys: string | string[], data: object, config?: ConfigOption) => {
        // 存在undefined会在ssr页面生成时报错，因此替换成null
        let formatData = data;
        if (config?.noUndefinedValue) {
            formatData = JSON.parse(JSON.stringify(data).replace('undefined', 'null'));
        }
        if (typeof keys === 'string') {
            this.dataStoreForNext[keys] = formatData;
        } else if (keys instanceof Array) {
            let tempStore: DataStorType = this.dataStoreForNext;
            keys.map((key, index) => {
                if (index === (keys.length - 1)) {
                    tempStore[key] = formatData;
                } else {
                    if (typeof tempStore[key] === 'undefined') {
                        tempStore[key] = {};
                    }
                    tempStore = tempStore[key];
                }
                return true;
            });
        }
    };

    // 清除数据
    clear = () => {
        this.dataStoreForNext = {};
    };

    // 获取数据
    getData = (keys: string | string[] | undefined) => {
        let result = this.dataStoreForNext;
        if (typeof keys === 'string') {
            result = this.dataStoreForNext[keys];
        } else if (keys instanceof Array) {
            let tempStore: DataStorType = this.dataStoreForNext;
            keys.map((key, index) => {
                if (index === (keys.length - 1)) {
                    result = tempStore[key];
                } else {
                    tempStore = tempStore[key];
                }

                return true;
            });
        }

        return result;
    };
}

export default ServerStore;
