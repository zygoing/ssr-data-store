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
});
