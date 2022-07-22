# moodel-project

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

You Need Change node_modules code

+ node_modules\diagram-js\lib\features\palette.js

```javascript
...

Palette.prototype._update = function () {
    ...
    if (entry.imageUrl) {
        control.appendChild(domify('<img src="' + entry.imageUrl + '">'));
    }
    // Add This Code
    if (entry.moduleName) {
        control.appendChild(domify('<p>' + entry.moduleName + '</p >'));
    }
    ...
    // open after update
    this.open();
};

...

// OldCode 
Palette.HTML_MARKUP =
    '<div class="djs-palette">' +
    '<div class="djs-palette-entries"></div>' +
    '<div class="djs-palette-toggle"></div>' +
    '</div>';
// You Need Open palette Overflow Add class `djs-scrollable` to dispalette
// Changed to
Palette.HTML_MARKUP =
    '<div class="djs-palette djs-scrollable">' +
    '<div class="djs-palette-entries"></div>' +
    '<div class="djs-palette-toggle"></div>' +
    '</div>';
```

yarn serve

```

### Compiles and minifies for production
```

yarn build

```

### Lints and fixes files
```

yarn lint

```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# menu
