# @simplystack/ui

## Documentation
Our documentation site lives at http://ui.hubgridcloud.com. You'll be able to find detailed documentation on getting started, all of the components, our theme, our principles, and more.

```sh
npm install --save @simplystack/ui
```

## Usage

### main.js
```js
import Vue from 'vue';
import ui from '@simplystackl/ui';
import '@simplystackl/ui/main.css';

Vue.use(ui);
```

### tailwind.config.js
```js
const theme = require('@simplystack/ui/tailwind.config');

module.exports = {
  theme: {
    extend: {
      ...theme,
    },
  },
};
```