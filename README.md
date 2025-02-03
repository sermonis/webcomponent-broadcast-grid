# Broadcast grid

Customizable and responsive video conferencing grid. If you need to make your own [***video conference system***](https://en.wikipedia.org/wiki/Videotelephony), you can use it!

![Grid demo](https://github.com/dimacrossbowweb/broadcast-grid/blob/main/public/demo.gif)

### Install

#### npm

```
npm install broadcast-grid
```

#### yarn

```
yarn add broadcast-grid
```

### Using

***JavaScript***
```
/**
* example using
*/
import 'broadcast-grid/dist/broadcast-grid.css';
import {

	BcGrid,  // grid
	BcCell,  // grid cell
	BcLayer, // layer of cell layout
	BcVideo, // video component
	BcAvatar // avatar

} from 'broadcast-grid';


```
***HTML***

```
<!-- Simple using -->
  <div style="width: 100vw; height: 100vh; border: 2px solid red; box-sizing: border-box">

    <bc-grid gap="10">

      <bc-cell>
      
        <bc-layer style="display: flex; justify-content: center; align-items: center">

          <bc-avatar

            name="Dmitry Volgapkin"
            color="#920381"

          ></bc-avatar>

        </bc-layer>
      
      </bc-cell>

      <bc-cell>
      
        <bc-layer style="display: flex; justify-content: center; align-items: center">

          <bc-avatar

            name="Lara Croft"
            color="#920381"

          ></bc-avatar>

        </bc-layer>
      
      </bc-cell>

    </bc-grid>

  </div>
```

***Components***

|component|caption|
|:-|:-|
|BcGrid|Responsive video conference grid|
|BcCell|Grid cell|
|BcAvatar|Peer avatar|
|BcLayer|Working layer on cell|
|BcVideo|Video|
|BcFrame|Active frame|
