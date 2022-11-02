import ServerStore from '../src/lib/serverStore.ts';

describe('serverStore', () => {
    it('get data', () => {
        const wrappedParams = {
            req: 'req data',
            res: 'res data',
        };
        ServerStore.default.getInstance().saveData('req', wrappedParams);
        expect(ServerStore.default.getInstance().getData()).toEqual({req: wrappedParams});
    });
    it('should replace undefined', () => {
        const wrappedParams = {
            req: 'req data',
            res: undefined,
        };
        const resWrappedParams = {
            res: {
                data: {
                    req: 'req data',
                },
            },
        };
        ServerStore.default.getInstance().clear();
        ServerStore.default.getInstance().saveData(['res', 'data'], wrappedParams, {noUndefinedValue: true});
        expect(ServerStore.default.getInstance().getData()).toEqual(resWrappedParams);
    });
    it('should return {}', () => {
        const wrappedParams = {
            req: 'req data',
            res: 'res data',
        };
        ServerStore.default.getInstance().saveData('req', wrappedParams);
        ServerStore.default.getInstance().clear();
        expect(ServerStore.default.getInstance().getData()).toEqual({});
    });
    it('should return part of data', () => {
        const wrappedParams = {
            req: {
                path: 'path data',
                payload: {
                    data: 'payload data'
                }
            },
            res: 'res data'
        };

        const resWrappedParams = {
            path: 'path data',
            payload: {
                data: 'payload data'
            }
        };
        ServerStore.default.getInstance().saveData('params', wrappedParams);
        expect(ServerStore.default.getInstance().getData(['params', 'req'])).toEqual(resWrappedParams);
    });
});
