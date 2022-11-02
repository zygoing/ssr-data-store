# ssr-store

##用于ssr项目server端临时存取数据的工具

##安装：
```bash
npm install ssr-data-store
```

##使用：
```bash
import ServerStore from 'ssr-data-store';
```

##简单存储key和data
```bash
ServerStore.getInstance().saveData('key', data);
```

##嵌套存储
```bash
ServerStore.getInstance().saveData(['key1', 'key2'], data);
```

##获取全部数据
```bash
ServerStore.getInstance().getData();
```

##获取某条数据
```bash
ServerStore.getInstance().getData(['key1', 'key2']);
```

##清除数据
```bash
ServerStore.getInstance().clear();
```

##支持替换数据中的undefined
```bash
ServerStore.getInstance().saveData('key', data, {noUndefinedValue: true});
```

