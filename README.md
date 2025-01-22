# Broadcast grid

Customizable and responsive video conferencing grid. If you need to make your own [***video conference system***](https://en.wikipedia.org/wiki/Videotelephony), you can use it!

![Grid](https://github.com/dimacrossbowweb/broadcast-grid/blob/main/public/demo.jpg)

### Install

```
npm install broadcast-grid
```

### Using

***JavaScript***
```
import { useGrid } from 'broadcast-grid';

/* To register web-components in your project */
useGrid();

```
***HTML***

```
<!-- Simple using -->
<broadcast-grid>

	<broadcast-cell></broadcast-cell>
	<broadcast-cell></broadcast-cell>
	...
	<broadcast-cell></broadcast-cell>

</broadcast-grid>
```

***Components***

|component|caption|
|:-|:-|
|BroadcastGrid|Responsive video conference grid|
|BroadcastCell|Grid cell|
|BroadcastAvatar|Peer avatar|
|BroadcastLayer|Working layer on cell|
|BroadcastVideo|Video|
|BroadcastFrame|Active frame|
