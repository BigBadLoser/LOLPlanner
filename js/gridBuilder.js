const container = document.getElementById('container'),
    tiles_div = document.getElementById('tiles');

let row, col, tile_size = 30;
let map_num_rows = 30,
    map_num_cols = 55;
var tileOptions = {
  military: {
    keep: {
      src: "images/military/keep/keep.4.mp.png",
      height: 3
    },
    barrack: {
      src: "images/military/barrack/barrack.4.mp.png",
      height: 1
    },
    hwall: {
      src: "images/military/hwall/hwall.1.mp.png",
      height:2
    },
    vwall: {
      src: "images/military/vwall/vwall.1.mp.png",
      height:2
    },
    tower: {
      src: "images/military/tower/tower.2.mp.png",
      height: 2
    },
    vgate: {
      src: "images/military/vgate/vgate.1.mp.png",
      height: 2
    },
    hgate: {
      src: "images/military/hgate/hgate.1.mp.png",
      height: 2
    }
  },
  public: {
    market: {
      src: "images/public/market/market.1.mp.png",
      height: 1
    }
  },
  house: {
    house: {
      src: "images/house/house/house.8.mp.png",
      height: 1
    },
    vstreet: {
      src: "images/house/vstreet/vstreet.10.mp.png",
      height:1
    },
    crossing: {
      src: "images/house/crossing/crossing.8.mp.png",
      height: 1
    },
    hstreet: {
      src: "images/house/hstreet/hstreet.10.mp.png",
      height: 1
    },
    orstreet: {
      src: "images/house/orstreet/orstreet.10.mp.png",
      height:4
    },
    xcross: {
      src: "images/house/xcross/xcross.8.mp.png",
      height: 2
    },
    ostreet: {
      src: "images/house/ostreet/ostreet.10.mp.png",
      height: 4
    }
  },
  industrial: {
    bfurnace: {
      src: "images/industrial/bfurnace/bfurnace.4.mp.png",
      height: 2
    },
    byard: {
      src: "images/industrial/byard/byard.3.mp.png",
      height: 1
    },
    charcoal: {
      src: "images/industrial/charcoal/charcoal.1.mp.png",
      height: 1
    },
    distil: {
      src: "images/industrial/distil/distil.1.mp.png",
      height: 1
    },
    glass: {
      src: "images/industrial/glass/glass.1.mp.png",
      height: 1
    },
    limekiln: {
      src: "images/industrial/limekiln/limekiln.4.mp.png",
      height: 1
    },
    refinery: {
      src: "images/industrial/refinery/refinery.2.mp.png",
      height: 1
    },
    tannery: {
      src: "images/industrial/tannery/tannery.1.mp.png",
      height: 1
    },
    tarkiln: {
      src: "images/industrial/tarkiln/tarkiln.1.mp.png",
      height: 1
    },
    watmill: {
      src: "images/industrial/watmill/watmill.1.mp.png",
      height: 1
    },
    windmill: {
      src: "images/industrial/windmill/windmill.2.mp.png",
      height: 2
    },
  },
  castle: {
    palace: {
      src: "images/castle/palace/palace.3.mp.png",
      height: 2
    },
    pavilion: {
      src: "images/castle/pavilion/pavilion.3.mp.png",
      height: 2
    },
    vwing: {
      src: "images/castle/vwing/vwing.2.mp.png",
      height: 2
    },
    hwing: {
      src: "images/castle/hwing/hwing.2.mp.png",
      height: 2
    },
    chapel: {
      src: "images/castle/chapel/chapel.1.mp.png",
      height: 2
    },
    hall: {
      src: "images/castle/hall/hall.3.mp.png",
      height: 5
    },
    lodging: {
      src: "images/castle/lodging/lodging.2.mp.png",
      height: 2
    },
    garden: {
      src: "images/castle/garden/garden.0.mp.png",
      height: 1
    },
    pond: {
      src: "images/castle/pond/pond.1.mp.png",
      height: 1
    },
    square: {
      src: "images/castle/square/square.1.mp.png",
      height: 1
    },
  }
};
var active_tile = tileOptions.public.market;
function setActive(newValue){
  active_tile = newValue;
}

//GENERATE THE GRID.
(() => {
    for (let i = 0; i < map_num_rows; i++) {
        tiles_div.innerHTML += '<div id="row-'+ i +'" class="row" style="width: '+ tile_size * map_num_cols +'px; height: '+ tile_size +'px;"></div>';
        for (let j = 0; j < map_num_cols; j++) {
            document.getElementById('row-'+ i).innerHTML += '<div id="tile-x'+ j +'y'+ i +'" class="tile" style="display: inline-block; width: '+ tile_size +'px; height: '+ tile_size +'px; z-index: '+ (i + 1) +'" title="X: '+ j +'\nY: '+ i +'\nZ: '+ (i + 1) +'"></div>';
        }
    }
})();
//MAKE TILES CLICKABLE
let tiles = document.getElementsByClassName('tile');
for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener('click', function(e) {
        let tile_img = tiles[i].getElementsByTagName('img');
        if (active_tile.src != undefined && tiles[i].children.length <= 1) {
          if (active_tile.height == 1){
            tiles[i].innerHTML = '<img src="'+ active_tile.src +'" width="'+ tile_size * 2 + '">';
            }
            else if (active_tile.height == 2){
              tiles[i].innerHTML = '<img src="'+ active_tile.src +'" width="'+ tile_size * 2 +'"' + 'style="margin-top: -125%; margin-left: -50%"' + '>';
            }
            else if (active_tile.height == 3){
              tiles[i].innerHTML = '<img src="'+ active_tile.src +'" width="'+ tile_size * 2 +'"' + 'style="margin-top: -225%;"' + '>';
            }
            //No units are taller than 3. This is for special cases such as diag
            else if (active_tile.height == 4){
              tiles[i].innerHTML = '<img src="'+ active_tile.src +'" width="'+ tile_size * 2 +'"' + 'style="margin-top: -90%; margin-left: -60%"' + '>';
            }
            //FOR THE HALl
            else if(active_tile.height == 5){
              tiles[i].innerHTML = '<img src="'+ active_tile.src +'" width="'+ tile_size * 2 +'"' + 'style="margin-top: -150%; margin-left: -50%"' + '>';
            }
        }
    });
}
