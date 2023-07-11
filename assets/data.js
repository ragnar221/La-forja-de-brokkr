const ProductsData = [
    {
        id: 1,
        name:"Espada Templaria",
        type:"una mano",
        material:"acero 1045 SAE",
        tang:"full tang",
        price: "26.800",
        category:"espadas",
        cardImg:"./assets/images/templar-sword.jpg",
    },

    {
        id: 2,
        name:"Espada Vikinga",
        type:"una mano",
        material:"acero 1045 SAE",
        tang:"full tang",
        price: "30.200",
        category:"espadas",
        cardImg:"./assets/images/viking-sword.jpg",
    },

    {
        id:3,
        name:"Espada de batalla alemana",
        type:"dos manos",
        material:"acero 1045 SAE",
        tang:"full tang",
        price: "43.600",
        category:"espadas",
        cardImg:"./assets/images/german-battle-sword.jpg",
    },

    {
        id:4,
        name:"Espada cruzado",
        type:"una mano",
        material:"acero 1045 SAE",
        tang:"full tang",
        price: "29.500",
        category:"espadas",
        cardImg:"./assets/images/crusader-sword.jpg",
    },

    {
        id:5,
        name:"claymore escoces" ,
        type:"dos manos",
        material:"acero 1045 SAE",
        tang:"full tang",
        price: "40.800",
        category:"espadas",
        cardImg:"./assets/images/highland-claymore.jpg",
    },

    {
        id:6,
        name:"Espada bastarda",
        type:"mano y media",
        material:"acero 1045 SAE",
        tang:"full tang",
        price: "38.500",
        category:"espadas",
        cardImg:"./assets/images/bastard-sword.jpg",
    },

    {
        id:7,
        name:"Espada gladius romana",
        type:"una mano",
        material:"acero 1045 SAE",
        tang:"full tang",
        price: "33.000",
        category:"espadas",
        cardImg:"./assets/images/gladius-Hispaniensis-sword.jpg",
    },

    {
        id:8,
        name:"Espada Anduril LOTR",
        type:"dos manos",
        material:"acero inox. 440",
        tang:"mid tang",
        price: "44.000",
        category:"espadas",
        cardImg:"./assets/images/anduril-sword.jpg",
    },

    {
        id:9,
        name:"Espada frostmourne Warcraft",
        type:"mano y media",
        material:"acero inox. 440",
        tang:"mid tang",
        price: "55.900",
        category:"espadas",
        cardImg:"./assets/images/frostmourne-sword.jpg",
    },

    {
        id:10,
        name:"Escudo normando",
        type:"escudo",
        material:"roble, acero 1080 SAE",
        tang:"resistente a golpes",
        price: "24.600",
        category:"escudos",
        cardImg:"./assets/images/norman-shield.jpg",
    },

    {
        id:11,
        name:"escudo vikingo",
        type:"escudo",
        material:"roble, acero 1080 SAE",
        tang:"resistente a golpes",
        price: "23.000",
        category:"escudos",
        cardImg:"./assets/images/viking-shield.jpeg",
    },

    {
        id:12,
        name:"Escudo cruzado",
        type:"escudo",
        material:"roble, acero 1080 SAE",
        tang:"resistente a golpes",
        price: "25.500",
        category:"escudos",
        cardImg:"./assets/images/crusader-shield.jpg",
    },

    {
        id:13,
        name:"Alabarda",
        type:"dos manos",
        material:"roble, acero 1045 SAE",
        tang:"full tang",
        price: "36.000",
        category:"varias",
        cardImg:"./assets/images/halberd.jpg",
    },

    {
        id:14,
        name:"Hacha danesa",
        type:"dos manos",
        material:"roble, acero 1045 SAE",
        tang:"full tang",
        price: "38.000",
        category:"varias",
        cardImg:"./assets/images/dane-axe.jpg",
    },

    {
        id:15,
        name:"mangual",
        type:"una mano",
        material:"acero 1045 SAE",
        tang:"cadena fija",
        price: "32.400",
        category:"varias",
        cardImg:"./assets/images/flegel.jpg",
    },

    {
        id:16,
        name:"Casco templario",
        type:"casco",
        material:"acero 1060 SAE",
        tang:"decorativo",
        price: "33.700",
        category:"cascos",
        cardImg:"./assets/images/templar-helmet.webp",
    },

    {
        id:17,
        name:"casco vikingo",
        type:"casco",
        material:"acero 1060 SAE",
        tang:"decorativo",
        price: "35.400",
        category:"cascos",
        cardImg:"./assets/images/viking-helmet.jpg",
    },

    {
        id:18,
        name:"casco romano",
        type:"casco",
        material:"acero 1060 SAE",
        tang:"decorativo",
        price: "34.800",
        category:"cascos",
        cardImg:"./assets/images/roman-helmet.jpg",
    },
];

const divideProductsInParts = (size) => {
    let productsContainer = [];
    for (let i = 0; i < ProductsData.length; i += size) {
        productsContainer.push(ProductsData.slice(i, i + size));
    }
    return productsContainer;
    };


    const appState = {
        products: divideProductsInParts(3),
        currentProductsIndex: 0,
        productsLimit: divideProductsInParts(3).length,
        activeFilter: null,
    };

