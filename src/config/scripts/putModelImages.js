const { pool } = require("../configPg");

const images = [
  {
    name: "ILX",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/13357/2020-Acura-ILX-front_13357_032_2400x1800_WX.png",
  },
  {
    name: "1",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/44028/2021-Polestar-1-front_44028_032_2400x1800_729.png",
  },
  {
    name: "124 Spider",
    imageUrl:
      "https://www.carscoops.com/wp-content/uploads/2015/11/2016-Abarth-124-Spider-1.jpg",
  },
  {
    name: "2 Series",
    imageUrl:
      "https://65e81151f52e248c552b-fe74cd567ea2f1228f846834bd67571e.ssl.cf1.rackcdn.com/ldm-images/2020-BMW-2-Series-Gran-Coupe-Hero.png",
  },
  {
    name: "2 Series Gran Coupe",
    imageUrl:
      "https://imgd.aeplcdn.com/1200x900/n/cw/ec/48034/2-series-gran-coupe-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
  },
  {
    name: "200",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2017/04/2017-chrysler-200-limited-platinum-sedan-angular-front.png",
  },
  {
    name: "1500",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/52704/2023-Ram-1500%20Classic%20Regular%20Cab-front_52704_032_2400x1800_PW7.png",
  },
  {
    name: "1500 Classic",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/43942/2023-Ram-1500%20Classic%20Quad%20Cab-front_43942_032_1821x797_PB8_cropped.png",
  },
  {
    name: "2500",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/52136/2023-Ram-2500%20Regular%20Cab-front_52136_032_2400x1800_P49_nologo.png",
  },
  {
    name: "3",
    imageUrl:
      "https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/cr/car-versions/13604-2019-mazda-3-select",
  },
  {
    name: "3 Series",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/52683/2024-BMW-3%20Series-front_52683_032_2400x1800_300_nologo.png",
  },
  {
    name: "3 Series Gran Turismo",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/9289/2014-BMW-3%20Series-front_9289_032_2400x1800_300.png",
  },
  {
    name: "300",
    imageUrl:
      "https://www.cars.com/i/large/in/v2/stock_photos/0c6dc193-f734-410d-b087-7f96f381dcfe/b4ce9648-f278-464c-8d79-f034bd0ae5ca.png",
  },
  {
    name: "3500",
    imageUrl:
      "https://di-uploads-pod38.dealerinspire.com/chryslerdodgejeepramfiatcrestview/uploads/2022/06/3500hero.png",
  },
  {
    name: "370Z",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/b8eed31d-8e57-47e0-a694-925915c7271e/a82168f3-2c60-4388-8281-e5236e8fa51a.png",
  },
  {
    name: "4 Series",
    imageUrl:
      "https://assets.local-car-finder.com/images/_2023/bmw/4-series/main.png",
  },
  {
    name: "4 Series Gran Coupe",
    imageUrl:
      "https://cache.bmwusa.com/cosy.arox?pov=walkaround&brand=WBBM&vehicle=244R&client=byoc&paint=P0300&fabric=FKHSW&sa=S01CB,S0255,S02TB,S0302,S0319,S0322,S03AG,S03F4,S03MB,S0403,S0430,S0431,S0459,S0493,S04KA,S04UR,S0508,S0534,S0544,S05AC,S05AS,S0676,S06AC,S06AK,S06C4,S06U2,S06WC,S0775&angle=30",
  },
  {
    name: "458 Italia",
    imageUrl:
      "https://platform.cstatic-images.com/in/v2/stock_photos/3283d91a-9156-4de4-be22-de3b61ea1858/320a6e7d-d593-4df5-8b3d-32f194793e48.png",
  },
  {
    name: "488 GTB",
    imageUrl:
      "https://cdn.ferrari.com/cms/network/media/img/resize/5ea6d0b901a4636006b497c9-22_ferrari-400_superamericapinin_farina_coup%C3%A3%C2%A9_488_gtb_esterni?width=750&height=550",
  },
  {
    name: "488 Spider",
    imageUrl:
      "https://cdn.ferrari.com/cms/network/media/img/resize/5ea97d2ec5219c37796367f0-05_ferrari-195_inter_touring_coup_488_spider_esterni?width=750&height=550",
  },
  {
    name: "4C",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2020/02/2020-alfa-romeo-4c-spider-convertible-angular-front.png",
  },
  {
    name: "4Runner",
    imageUrl:
      "https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2024/4runner/trdpro/8674/040/36/5.png?fmt=png&w=930&qlt=90",
  },
  {
    name: "5",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2015/11/2010-mazda-mazda5-sport-wagon-angular-front.png",
  },
  {
    name: "5 Series",
    imageUrl:
      "https://cache.bmwusa.com/cosy.arox?pov=walkaround&brand=WBBM&vehicle=245A&client=byo&paint=P0300&fabric=FKSSW&sa=S01CE,S02TE,S0302,S0316,S0319,S0322,S03G2,S0403,S043L,S0459,S04FL,S05AS,S05DM,S0674,S06AC,S06AK,S06C4,S06NX,S0775&quality=70&bkgnd=transparent&resp=png&angle=40&w=9800&h=8000&x=100&y=1100",
  },
  {
    name: "5 Series Gran Turismo",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/5/2013/05/2014-BMW-5-Series-Gran-Turismo-front-three-quarter.jpg",
  },
  {
    name: "5 Series Gran Turismo",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/5/2013/05/2014-BMW-5-Series-Gran-Turismo-front-three-quarter.jpg",
  },
  {
    name: "500",
    imageUrl:
      "https://cars.usnews.com/static/images/Auto/izmo/i159613977/2018_fiat_500_0_angularfront.jpg",
  },
  {
    name: "500e",
    imageUrl:
      "https://cdn.motor1.com/images/mgl/P4joL/s1/mopar-accessories-for-fiat-500e.jpg",
  },
  {
    name: "500L",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/8883/2016-FIAT-500L-front_8883_032_2400x1800_PW3.png",
  },
  {
    name: "500X",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/ft023-022fh-6571230980434.jpg",
  },
  {
    name: "570GT",
    imageUrl:
      "https://platform.cstatic-images.com/in/v2/stock_photos/6e0b24df-cd3d-49b9-8d45-fda16616b2cc/f6a57527-cfda-4454-8761-c8ac0ed50b28.png",
  },
  {
    name: "570S",
    imageUrl:
      "https://bringatrailer.com/wp-content/uploads/2023/10/2017_mclaren_570s_20230921_094929-28220.jpg",
  },
  {
    name: "570S Spider",
    imageUrl:
      "https://static0.carbuzzimages.com/wordpress/wp-content/uploads/2024/03/542218-2.jpg",
  },
  {
    name: "6",
    imageUrl:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_low/v1/editorial/mazda-6-my19-index-1.png",
  },
  {
    name: "6 Series",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2015/11/2010-bmw-6-series-650i-coupe-angular-front.png",
  },
  {
    name: "6 Series Gran Coupe",
    imageUrl:
      "https://imgd.aeplcdn.com/664x374/ec/C4/2F/9769/img/m/BMW-6-Series-Right-Front-Three-Quarter-52292_ol.jpg?v=201711021421&q=80",
  },
  {
    name: "6 Series Gran Turismo",
    imageUrl:
      "https://www.bmw.in/content/dam/bmw/common/all-models/6-series/gran-turismo/2020/models-equipment/bmw-6-series-gran-turismo-models-equipment-mc-design-hero-desktop.jpg.asset.1624957333930.jpg",
  },
  {
    name: "600LT",
    imageUrl:
      "https://cdn.motor1.com/images/mgl/j1QVR/s3/mclaren-600lt-mclaren-orange.jpg",
  },
  {
    name: "600LT Spider",
    imageUrl:
      "https://i0.wp.com/asphalt9.info/wp-content/uploads/2023/05/Asphalt-9-McLaren-600LT-Spider.jpg?fit=1200%2C672&ssl=1",
  },
  {
    name: "650S Coupe",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/050019E030F65A0C6010E0E5C9211EF17ADB6C77A141952B04FE6A51C24F34AB/autoblog/resizefill_w640_h400;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/O5MLGEA1.jpg",
  },
  {
    name: "650S Spider",
    imageUrl:
      "https://cdn.dealeraccelerate.com/ecpch/2/783/38298/790x1024/w/2016-mclaren-650s-spider",
  },
  {
    name: "675LT Coupe",
    imageUrl:
      "https://www.edmunds.com/assets/m/for-sale/81-sbm11raa1gw675304/img-1-600x400.jpg",
  },
  {
    name: "675LT Spider",
    imageUrl:
      "https://www.mclarenscottsdale.com/imagetag/207/main/f/Used-2016-McLaren-675LT-Spider-1687551960.jpg",
  },
  {
    name: "7 Series",
    imageUrl:
      "https://cache.bmwusa.com/cosy.arox?pov=walkaround&brand=WBBM&vehicle=247F&client=byoc&paint=P0300&fabric=FKVSW&sa=S01CB,S01FB,S02TB,S0302,S0319,S0337,S03DZ,S0416,S043D,S0465,S04A2,S04FL,S04FM,S04NR,S05AS,S05DM,S06AC,S06AK,S06C4,S06NX,S06U3,S06U7,S0710,S0760,S0775,S09T1,S09T2&angle=30",
  },
  {
    name: "718 Boxster",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/8ba7fc15-1600-49da-b484-88aedbfa460d/17bb3e9e-3be8-4b00-ad88-7470647091fd.png",
  },
  {
    name: "718 Cayman",
    imageUrl:
      "https://www.cars.com/i/large/in/v2/stock_photos/1f7af121-842e-402e-969e-758d21c13013/20a5e08e-071c-49d6-bda6-036393e99f41.png",
  },
  {
    name: "720S",
    imageUrl:
      "https://elitetraveler.com/wp-content/uploads/sites/8/2022/11/12098-720SLeMansMcLarenOrangeFront3_4-1038x778.jpg",
  },
  {
    name: "720S Spider",
    imageUrl:
      "https://di-uploads-pod43.dealerinspire.com/mclarensanfrancisco/uploads/2022/04/720s-Spider.jpg",
  },
  {
    name: "8 Series",
    imageUrl:
      "https://vehicle-images.dealerinspire.com/9030-110006846/thumbnails/large/WBABC4C07RCR20025/322c9a5b9df9fe214c8ec02ddceb9df2.jpg",
  },
  {
    name: "8 Series Gran Coupe",
    imageUrl:
      "https://cache.bmwusa.com/cosy.arox?pov=walkaround&brand=WBBM&vehicle=258J&client=byo&paint=P0C4W&fabric=FVASW&sa=S01E4,S02VW,S0302,S0319,S0322,S03AG,S03DZ,S0402,S0415,S0416,S0453,S04FM,S04HB,S04L8,S04NB,S05AC,S05AZ,S06AC,S06AK,S06C4,S06NW,S06U3,S06WD,S0710,S0715,S0760,S0775&date=20220302&quality=70&bkgnd=transparent&resp=png&angle=40",
  },
  {
    name: "812 Superfast",
    imageUrl:
      "https://media.wired.com/photos/5926764eaf95806129f4f85d/master/pass/ferrari_812-Superfast_TA.jpg",
  },
  {
    name: "86",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2019/11/2020-toyota-86-automatic-coupe-angular-front.png",
  },
  {
    name: "911",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/C0D6C1DEF7A746F748253FC7C242EAA5CDF6A2BC557574ABF99F13DA44087BBF/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USD10PRC011A021001.jpg",
  },
  {
    name: "918 Spyder",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/C87C855CC6A275FA9817D87FE8F15C6FBD6B7408EF3029F06621DFC2DC5F9C99/autoblog/resizefill_w640_h400;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USC50PRC141A021001.jpg",
  },
  {
    name: "A-Class",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2020/12/2021-mercedes-benz-a-class-220-sedan-angular-front.png",
  },
  {
    name: "A3",
    imageUrl:
      "https://platform.cstatic-images.com/in/v2/stock_photos/8396f22a-1fd0-4599-b136-30a04d73058a/e15c4bd7-3467-4c03-ae51-ce527e36841c.png",
  },
  {
    name: "A3 Sportback e-tron",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/11748/2018-Audi-A3%20Sportback%20e-tron-front_11748_032_2400x1800_T9.png",
  },
  {
    name: "A4",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/c4359896-c20e-46da-87a2-a7b2734561b3/c0535e58-31b9-488d-b5b7-55818402e3e6.png",
  },
  {
    name: "A4 allroad",
    imageUrl:
      "https://platform.cstatic-images.com/in/v2/stock_photos/fbf67c93-5812-494e-8761-374777fc5901/e9ba8459-bf7a-4d0f-8f4c-af439ee296ff.png",
  },
  {
    name: "A5",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/C7C1459F04849B0BBECA9E981685B3598B36EA72686E6F9D116D47B86C93DA1D/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USC30AUC191A121001_2.jpg",
  },
  {
    name: "A6",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/house/2020/2020-Audi-A6-FrontSide_AUA62001_640x480.jpg?downsize=382:*",
  },
  {
    name: "A6 allroad",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2024/Audi/A6%20allroad/Wagon/color/Firmament%20Blue%20Metallic-5U5U-24,32,45-640-en_US.jpg",
  },
  {
    name: "A7",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2016/08/2017-audi-a7-premium-plus-hatchback-angular-front.png",
  },
  {
    name: "A8",
    imageUrl:
      "https://platform.cstatic-images.com/in/v2/color_matched_stock_photos/3a446d37-a367-4ebf-9e1b-cbadc66e6bb8/a9af0399-216b-404e-b716-181b67e3aab5.jpg",
  },
  {
    name: "Acadia",
    imageUrl:
      "https://di-uploads-pod16.dealerinspire.com/rickhendrickbuickgmcduluth/uploads/2022/09/2022-GMC-Acadia-SLE-grey-left-fuel-1.jpg",
  },
  {
    name: "Accent",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2015/11/2013-hyundai-accent-gls-sedan-angular-front.png",
  },
  {
    name: "Accord",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/AF25B7072E88C1BDC54C1073AB0ED6F7A8AB9C5C71560A602BE5B33F130581C0/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USD10HOC011B021001.jpg",
  },
  {
    name: "Accord Hybrid",
    imageUrl:
      "https://mystrongad.com/HEH_HendrickHondaCharlotte/Interactive/Accord/2024/Hybrid/2024-Honda-Accord-Hybrid-Black.webp",
  },
  {
    name: "ActiveHybrid 5",
    imageUrl:
      "https://mediapool.bmwgroup.com/cache/P9/201108/P90081503/P90081503-bmw-activehybrid-5-09-2011-600px.jpg",
  },
  {
    name: "ActiveHybrid 7",
    imageUrl:
      "https://www.cars.com/i/large/in/v2/stock_photos/3be796ba-446e-4378-8763-3c5794cae8dc/f471df13-7d77-484a-b069-aaa1ea80e782.png",
  },
  {
    name: "allroad",
    imageUrl:
      "https://cars.usnews.com/static/images/Auto/izmo/i108385758/2019_audi_a4_allroad_angularfront.jpg",
  },
  {
    name: "ALPINA B6 Gran Coupe",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/5c7636a0-1121-4b26-bc82-11fbd343ddf7/34e0edba-d2a7-4c04-a20b-9e98222d6298.png",
  },
  {
    name: "ALPINA B7",
    imageUrl:
      "https://platform.cstatic-images.com/in/v2/stock_photos/c33bcf02-f6f7-4b9f-acb0-da9ba1ff32b5/056083e2-8a4a-4f60-a984-23f6b19f1dde.png",
  },
  {
    name: "Altima",
    imageUrl:
      "https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/chrome/white/2023NIC040001_1280_01",
  },
  {
    name: "AMG GT",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/20c0379-005-1600807182.jpg",
  },
  {
    name: "Armada",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2021/05/2021-nissan-armada-sl-suv-angular-front.png",
  },
  {
    name: "Arteon",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/5/2020/06/2021-Volkswagen-Arteon-front-three-quarter-studio.jpg",
  },
  {
    name: "Ascent",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2024/Subaru/Ascent/SUV/trim_Onyx_Edition_9c0eca/color/Crystal%20White%20Pearl-W2C-239%2C239%2C232-640-en_US.jpg?impolicy=resize&w=640",
  },
  {
    name: "Atlas",
    imageUrl:
      "https://di-uploads-pod7.dealerinspire.com/auburnvolkswagen/uploads/2023/04/2024-Volkswagen-Atlas-SEL-Premium-R-Line-Model-Left-2.jpg",
  },
  {
    name: "Atlas Cross Sport",
    imageUrl:
      "https://images.carprices.com/pricebooks_data/usa/colorized/2024/Volkswagen/View2/Atlas_Cross_Sport/SEL_Premium_R-Line/CMD5PR_2T2T.png",
  },
  {
    name: "ATS",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2015/11/2015-cadillac-ats-base-2wd-sedan-angular-front.png?fit=around%7C875:492",
  },
  {
    name: "ATS-V",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/14q4/638373/2016-cadillac-ats-v-dissected-chassis-powertrain-design-and-more-feature-car-and-driver-photo-650785-s-original.jpg?fill=2:1&resize=1200:*",
  },
  {
    name: "ATS Coupe",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/10756/2016-Cadillac-ATS-front_10756_032_2400x1800_G1W.png",
  },
  {
    name: "Avalon",
    imageUrl:
      "https://www.cars.com/i/large/in/v2/stock_photos/b36f4def-e3ee-4d77-a244-001cb5b809e8/ba119405-f40d-4d4c-89a9-8e63ce521039.png",
  },
  {
    name: "Avalon Hybrid",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2022/Toyota/Avalon%20Hybrid/Sedan/color/Blueprint-8X8-25,28,42-640-en_US.jpg",
  },
  {
    name: "Aventador",
    imageUrl:
      "https://cdn.motor1.com/images/mgl/4JyZA/s3/lamborghini-aventador-lp-780-4-ultimae.jpg",
  },
  {
    name: "Aviator",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/528b2124-901f-4f17-919c-8c88f5dc7add/cf090232-ffe7-4b77-8a51-276e2f474c8c.png",
  },
  {
    name: "Azera",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/11018/2017-Hyundai-Azera-front_11018_032_1820x755_NN7_cropped.png",
  },
  {
    name: "B-Class Electric Drive",
    imageUrl:
      "https://www.cars.com/i/large/in/v2/stock_photos/136fa71e-527c-4c85-8ea2-1d813d717d81/0d82cee1-4124-4118-b79f-e1344b41cb46.png",
  },
  {
    name: "Beetle",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/D780B23AA74F8CFFF848A77919FF76674C6131AB6E631410CEAB043D49336E4A/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USC60VWC251J021001.jpg",
  },
  {
    name: "Beetle Convertible",
    imageUrl:
      "https://s1.cdn.autoevolution.com/images/gallery/VOLKSWAGEN-Beetle-Cabrio-1522_24.jpg",
  },
  {
    name: "Bentayga",
    imageUrl:
      "https://media.ed.edmunds-media.com/bentley/bentayga/2023/oem/2023_bentley_bentayga_4dr-suv_azure-hybrid_fq_oem_1_1600.jpg",
  },
  {
    name: "Blazer",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/52591/2024-Chevrolet-Blazer-front_52591_032_1845x830_GBA_cropped.png",
  },
  {
    name: "Bolt EV",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/52286/2023-Chevrolet-Bolt%20EV-front_52286_032_2400x1800_GAZ.png",
  },
  {
    name: "Boxster",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2015/11/2014-porsche-boxster-s-convertible-angular-front.png",
  },
  {
    name: "BRZ",
    imageUrl:
      "https://s7d1.scene7.com/is/image/scom/RZR_K7X_360e_030?$750p$",
  },
  {
    name: "C-Class",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2023/Mercedes-Benz/C-Class/Sedan/trim_Base_778c59/color/Black-040-10%2C10%2C12-640-en_US.jpg",
  },
  {
    name: "C-HR",
    imageUrl:
      "https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/3037/",
  },
  {
    name: "C-Max Energi",
    imageUrl:
      "https://di-uploads-pod41.dealerinspire.com/riverviewford2/uploads/2015/11/2016-Ford-C-Max-Energi.png",
  },
  {
    name: "C-Max Hybrid",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/8471/2013-Ford-C-MAX%20Hybrid-front_8471_032_2400x1800_YZ.png",
  },
  {
    name: "C/V",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/9852/2015-Ram-C/V%20Tradesman-front_9852_032_2400x1800_PRM.png",
  },
  {
    name: "Cadenza",
    imageUrl:
      "https://www.cars.com/i/large/in/v2/stock_photos/0aa010b5-aacc-4814-8581-257882723909/1d57e011-56bc-4e81-9974-be1403a1360a.png",
  },
  {
    name: "California T",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2017/02/2016-ferrari-california-t-base-convertible-angular-front.png",
  },
  {
    name: "Camaro",
    imageUrl:
      "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2024/performance/camaro/design/v2/2024-camaro-collector-ed-4v2.png?imwidth=960",
  },
  {
    name: "Camry",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/5FF5A313B0D5156F8F42400D5A998A3CD10C94502B02D96E1594D69E20A00DFC/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USC80TOC021A021001.jpg",
  },
  {
    name: "Camry Hybrid",
    imageUrl:
      "https://www.toyotahawaii.com/on/demandware.static/-/Sites-Servco_master/default/dwb7f020bc/images/model/Camry/360/cavalry-blue/23_Camry-Hybrid_XSE_CavalryBlue_1.png",
  },
  {
    name: "Canyon",
    imageUrl:
      "https://images.hgmsites.net/med/2024-gmc-canyon-2wd-crew-cab-elevation-angular-front-exterior-view_100916462_m.webp",
  },
  {
    name: "Captiva Sport",
    imageUrl:
      "https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/cr/model-years/7241-2015-chevrolet-captiva-sport",
  },
  {
    name: "Cascada",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2018/08/2019-buick-cascada-premium-convertible-angular-front.png",
  },
  {
    name: "Cayenne",
    imageUrl:
      "https://di-uploads-pod15.dealerinspire.com/porscheminneapolis/uploads/2023/04/New-Porsche-Cayenne-Turbo-GT.png",
  },
  {
    name: "Cayenne Coupe",
    imageUrl:
      "https://pictures.dealer.com/p/porscheofthemainlinenewtownsquare/1140/0738be5246a0eaeaffe1b0a30a742fb6x.jpg",
  },
  {
    name: "Cayman",
    imageUrl:
      "https://di-uploads-pod15.dealerinspire.com/bluegrassmotorsport/uploads/2023/08/2308-Porsche-718-Cayman-S-Trim.jpg",
  },
  {
    name: "CC",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/fdb98def-1c9e-4934-9d11-2ada4afca622/476f64d0-5b37-481c-b78b-b884c58eadc4.png",
  },
  {
    name: "Challenger",
    imageUrl:
      "https://assets-clean.local-car-finder.com/images/14836/14836_st1280_089.png",
  },
  {
    name: "Charger",
    imageUrl:
      "https://cars.usnews.com/static/images/Auto/izmo/i159615601/2023_dodge_charger_angularfront.jpg",
  },
  {
    name: "Cherokee",
    imageUrl:
      "https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/chrome/white/2022JES040016_1280_01",
  },
  {
    name: "City Express",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/BC7883D55FC3A3938FF5E68A455E243196107AAC3BD2F8B4D8C41641052A01F8/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USC80CHV351A021001.jpg",
  },
  {
    name: "Civic",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2016/11/2016-honda-civic-lx-cvt-sedan-angular-front.png?fit=around%7C875:492",
  },
  {
    name: "CLA-Class",
    imageUrl:
      "https://images.hgmsites.net/lrg/2019-mercedes-benz-cla-class-amg-cla-45-4matic-coupe-angular-front-exterior-view_100721880_l.jpg",
  },
  {
    name: "Clarity",
    imageUrl:
      "https://imageio.forbes.com/blogs-images/peterlyon/files/2017/04/4170413_001H-1200x644.jpg?height=381&width=711&fit=bounds",
  },
  {
    name: "CLS-Class",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/41645a14-1bad-4296-a1e0-774101ea138f/8587e16b-09b8-4036-b1a5-327a7c3b772f.png",
  },
  {
    name: "Clubman",
    imageUrl:
      "https://platform.cstatic-images.com/in/v2/stock_photos/7b2bbac8-d9ae-4e0e-8ab9-bc7ef6656f17/1f717693-66f9-48d6-90f3-6f29f008959d.png",
  },
  {
    name: "Colorado",
    imageUrl:
      "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/vdc-collections/2024/trucks/colorado/01-images/2024-colorado-14g43-4z7-gxd-trimselector.png?imwidth=960",
  },
  {
    name: "Compass",
    imageUrl:
      "https://di-uploads-pod28.dealerinspire.com/findlaychryslerdodgejeepram/uploads/2020/06/2020-Jeep-Compass-Findlay-OH-Overview.jpg",
  },
  {
    name: "Continental",
    imageUrl:
      "https://www.autotrader.com/wp-content/uploads/2020/02/2020-Lincoln-Continental-.1..jpg",
  },
  {
    name: "Continental GT",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2017/05/2017-bentley-continental-gt-coupe-angular-front.png",
  },
  {
    name: "Continental GT3-R",
    imageUrl:
      "https://www.gintani.com/cdn/shop/products/bentley-continental-gt3-r-01-1024x683_20c6e0af-91d3-4366-a903-812d51055bbf_1024x.jpg?v=1640290428",
  },
  {
    name: "Convertible",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/12856/2019-MINI-Convertible-front_12856_032_2400x1800_850.png",
  },
  {
    name: "Cooper",
    imageUrl:
      "https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/cr/car-versions/12566-2019-mini-cooper-s",
  },
  {
    name: "Cooper Clubman",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/2023-mini-cooper-clubman-special-edition-101-1644270349.jpg?crop=1.00xw:0.336xh;0,0.314xh&resize=1200:*",
  },
  {
    name: "Cooper Countryman",
    imageUrl:
      "https://cache.miniusa.com/cosy.arox?resp=png&WIDTH=1200&height=574&VEHICLE=83BR&PAINT=p0C4L&FABRIC=fnymj&SA=4AA,329,383,27N,4E8,2XD,2TC,7GG,6AC,6AE,6AK,6AP,6FP,6NM,6NP,3AG,402,423,4V9,4VA,521,544,550,563,5A2,5A4,5AS,6FP,6WB,507,3CA,3L2,420,386,494,534&CLIENT=NVCO&BRAND=WBMI&pov=walkaround&angle=330&bkgnd=transparent&quality=50&sharp=99&resp=png&cut=3",
  },
  {
    name: "Cooper Coupe",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/8611/2013-MINI-Coupe-front_8611_032_1887x891_850_cropped.png",
  },
  {
    name: "Cooper Paceman",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2015/11/2013-mini-paceman-hatchback-angular-front.png",
  },
  {
    name: "Cooper Roadster",
    imageUrl:
      "https://cars.usnews.com/static/images/Auto/izmo/354325/2013_mini_cooper_roadster_angularfront.jpg",
  },
  {
    name: "Corolla",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2018/07/2019-toyota-corolla-l-sedan-angular-front.png?fit=around%7C875:492",
  },
  {
    name: "Corolla Hatchback",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/53492/2024-Toyota-Corolla%20Hatchback-front_53492_032_2400x1800_4Y8_nologo.png",
  },
  {
    name: "Corolla Hybrid",
    imageUrl:
      "https://di-uploads-pod11.dealerinspire.com/germaintoyotaofcolumbus/uploads/2023/10/2310-Toyota-Corolla-Hybrid-Nightshade-Trim.jpg",
  },
  {
    name: "Corolla iM",
    imageUrl:
      "https://carfax-vrs.imgix.net/2018-Toyota-Corolla-iM-EX-400898060-28.png",
  },
  {
    name: "Corsair",
    imageUrl:
      "https://www.cars.com/i/large/in/v2/stock_photos/3a2ab2d3-9020-4183-b11b-31434df0a43f/26afc6b1-d921-4546-8802-0233a0cddd88.png",
  },
  {
    name: "Corvette",
    imageUrl:
      "https://inv.assets.ansira.net/RTT/Chevrolet/2024/6091153/default/ext_G8G_deg01.jpg",
  },
  {
    name: "Countryman",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/fa26e9cd-babd-444f-bc10-f5afbe0c1886/13e10a58-4cb0-4cf8-a967-efb1448ceac3.png",
  },
  {
    name: "CR-V",
    imageUrl:
      "https://cars.usnews.com/static/images/Auto/izmo/i159614072/2020_honda_cr_v_angularfront.jpg",
  },
  {
    name: "CR-V Hybrid",
    imageUrl:
      "https://vehicle-images.dealerinspire.com/f2ec-18003406/2HKRS6H97RH813567/bc015f6fc10304cdd77bb4ea06b209b1.png",
  },
  {
    name: "CR-Z",
    imageUrl:
      "https://global.honda/content/dam/site/global-en/newsroom/cq_img/news/2010/4100225-cr-z/01.jpg",
  },
  {
    name: "Crosstour",
    imageUrl:
      "https://cars.usnews.com/static/images/Auto/izmo/337586/2012_honda_crosstour_angularfront.jpg",
  },
  {
    name: "Crosstrek",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/13791853F775A6E4836CF5DC2583BC5F84D3B988E21785BF5F051B22EF65D85B/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USD40SUS091D021001.jpg",
  },
  {
    name: "Cruze",
    imageUrl:
      "https://img2.carmax.com/assets/mmy-chevrolet-cruze-2014/image/1.jpg?width=800&height=600",
  },
  {
    name: "Cruze Limited",
    imageUrl:
      "https://cdn.jdpower.com/Models/640x480/2016-Chevrolet-CruzeLimited-LT.jpg",
  },
  {
    name: "CT",
    imageUrl:
      "https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/chrome/white/2017LEC240001_1280_01",
  },
  {
    name: "CT4",
    imageUrl:
      "https://inv.assets.ansira.net/GM_VIVP/deg02/2024/6DB69/6DB69__1SB/G1W_0ST_1NF_1SB_1SZ_2NF_2ST_4JO_5A7_5FC_6X1_719_7X1_8X2_9L3_9X2_A2X_A69_A7J_AEF_AEQ_AJC_AJW_AL0_AL9_AM9_AQ9_AT8_ATH_AVN_AXG_AXJ_AYG_B34_B35_B56_B6K_BTV_BYO_C59_CF5_CJ2_D31_D7A_DEG_DLL_E22_E28_EF7_F_F46_FE2_FJW_HMC_HRD_HS1_IOT_IVN_J24_J77_JE5_JJ2_JM8_K12_K34_K4C_KA1_KBC_KD4_KI3_KL9_KPA_KRV_LAL_LSY_MAH_MCR_MHA_N37_NE1_NE8_NP5_NUG_PCM_PPW_PRF_Q5O_R6W_R9N_RID_RSR_SLM_T4L_T8Z_TDM_TFK_TQ5_U2K_U2L_U80_UC3_UD7_UDD_UE1_UE4_UEU_UFG_UGE_UHX_UHY_UIT_UJN_UKC_UKJ_UMN_UQS_UVB_V76_V8D_VH9_VHM_VRF_VRG_VRH_VRJ_VRK_VRL_VRM_VRN_VRR_VT7_VV4_WMY_XL8_Y19_Y26_Y5Xgmds10.jpg",
  },
  {
    name: "CT5",
    imageUrl:
      "https://cgi.cadillac.com/mmgprod-us/dynres/prove/image.gen?i=2024/6DF79/6DF79__1SV/GBA_0ST_1NF_1SV_1SZ_2NF_2ST_4AA_5A7_5FC_6X1_719_7X1_8X2_9L3_9X2_A2X_A45_A7K_AEF_AER_AF6_AHC_AHE_AHF_AHH_AHP_AJW_AKE_AKP_AL0_AM9_AQJ_AT8_ATH_AVK_AVN_AVU_AX7_AXG_AXJ_AYG_B4Z_B53_B7G_B9I_BTH_BYO_C3U_C70_C73_CDI_CE1_CJ2_CWM_D52_D75_DD8_DEG_DXR_E22_E28_EF7_F_F55_FE4_FJW_G96_GT4_HD7_HEA_HME_HS1_IOT_IVN_IWE_J24_J6H_J6O_J77_JE2_JF5_K12_K34_K4C_KA1_KD4_KI3_KNR_KPA_KRV_KTI_KU9_LAL_LT4_MAH_MCR_MDB_MJK_N06_N08_N38_NE1_NE8_NK4_NUF_NWM_PB4_PDH_PPW_PRF_Q63_R6M_R8E_R8R_R9N_ROF_RSR_RWL_SLM_T4L_T87_TDM_TFK_TQ5_TTW_U2K_U2L_U80_UD5_UDV_UE1_UE4_UEC_UEU_UFG_UG1_UGC_UGE_UHX_UHY_UJN_UKC_UKJ_UKK_UMN_UQS_UQT_USS_UTR_UTU_UTV_UV2_UV6_V76_V8D_VAV_VGC_VH9_VHM_VK3_VLI_VP1_VRF_VRG_VRH_VRJ_VRK_VRL_VRM_VRN_VRR_VT7_VV4_WMY_XL8_XLC_XVR_Y26_Y5V_Y5W_Y5X_Y61_Y6F_YM8gmds2.jpg&v=deg02&std=true&country=US",
  },
  {
    name: "CT6",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2019/05/2019-cadillac-ct6-platinum-sedan-angular-front.png",
  },
  {
    name: "CT6-V",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/D136B920D87C9DE2605BC469A03B2E55F953A365ACB19759F50FF9A4CF6B57F9/autoblog/resizefill_w1200_h675;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USD00CAC251A021001.jpg",
  },
  {
    name: "CTS",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/dc4e7731-8bc6-4548-bd00-3d5cfe2928eb/6afad186-728f-4080-bfa2-9e5529ddccaf.png",
  },
  {
    name: "CTS-V",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/46268D8D4AFF6C91176F78316975D2B44DC1E17742511DB4713C8ED9A80BD68E/autoblog/resizefill_w330_h186;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USC60CAC131A021001.jpg",
  },
  {
    name: "CTS-V Coupe",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2015/11/2015-cadillac-cts-v-coupe-angular-front.png?fit=around%7C875:492",
  },
  {
    name: "Cullinan",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/2025-rolls-royce-cullinan-black-badge-107-663a56d913506.jpg?crop=0.834xw:0.740xh;0.0799xw,0.178xh&resize=1200:*",
  },
  {
    name: "CX-3",
    imageUrl:
      "https://di-uploads-pod38.dealerinspire.com/theautobarnmazdaofevanston/uploads/2021/11/New-2020-Mazda-CX-3.jpg",
  },
  {
    name: "CX-30",
    imageUrl:
      "https://dealerinspire-image-library-prod.s3.us-east-1.amazonaws.com/images/XgQUyOg8DWqaQy9a3Fwu06HDmJQHHNOTL5ffiYOZ.png",
  },
  {
    name: "CX-5",
    imageUrl:
      "https://dealerimages.dealereprocess.com/image/upload/v1692292374/1/mazda/2024_CX5/2024_cx5_2_5_s_Premium_SoulRedCrystal_Car_0000.png",
  },
  {
    name: "CX-9",
    imageUrl:
      "https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/2813/",
  },
  {
    name: "Dart",
    imageUrl:
      "https://images.hgmsites.net/lrg/2016-dodge-dart-4-door-sedan-gt-angular-front-exterior-view_100523052_l.jpg",
  },
  {
    name: "Dawn",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2021/Rolls-Royce/Dawn/Convertible/color/Sapphire%20Gunmetal-WW11-151,150,156-640-en_US.jpg",
  },
  {
    name: "DB11",
    imageUrl:
      "https://cdn.motor1.com/images/mgl/NROq2/s3/2020-aston-martin-db11.jpg",
  },
  {
    name: "DB9",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/b79ac593-dd35-48df-b6e8-938726d13501/ed721bc4-2448-4dc8-9456-96f0ef7b342a.png",
  },
  {
    name: "DB9 GT",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/5/2015/06/2016-Aston-Martin-DB9-GT-front-three-quarter.jpg",
  },
  {
    name: "DBS Superleggera",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/5/2018/07/2019-Aston-Martin-DBS-Superleggera-White-Stone-80.jpg",
  },
  {
    name: "Defender",
    imageUrl:
      "https://di-uploads-development.dealerinspire.com/landroversouthdade/uploads/2022/01/RR-BOND.png",
  },
  {
    name: "Discovery",
    imageUrl:
      "https://mystrongad.com/LRR_LandRoverRoanoke/Interactive/Discovery/2023/CAR%20CUT/23-Land-Rover-Discovery-Eiger-Grey.png",
  },
  {
    name: "Discovery Sport",
    imageUrl:
      "https://inv.assets.ansira.net/ChromeColorMatch/us/TRANSPARENT_cc_2024LRS110002_01_1280_1AA.png",
  },
  {
    name: "Durango",
    imageUrl:
      "https://medias.fcacanada.ca/jellies/renditions/2024/800x510/CC24_WDEP75_2TP_PDN_APA_XXX_XXX_XXX.f5110e7670a28b084925c3b262b98257.png",
  },
  {
    name: "E-Class",
    imageUrl:
      "https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/e-class/sedan/gallery/series/gallery-class/2024-E-SEDAN-GAL-013-D-WP.jpg",
  },
  {
    name: "e-Golf",
    imageUrl:
      "https://platform.cstatic-images.com/in/v2/stock_photos/c178ee74-6148-40a7-ac50-e4e926f86413/bd23fbdc-e518-4a52-acec-f62de79d8c50.png",
  },
  {
    name: "E-PACE",
    imageUrl:
      "https://pictures.dealer.com/i/imperialmotorsjaguaroflakebluffjag/1879/da345b1d92e046fa304b462af04e78f9x.jpg?impolicy=downsize&w=568",
  },
  {
    name: "e-tron",
    imageUrl:
      "https://uploads.audi-mediacenter.com/system/production/media/71164/images/a41672e1a01de586f023e4491da3f88548b52984/A1814539_web_2880.jpg?1698345785",
  },
  {
    name: "e-tron Sportback",
    imageUrl:
      "https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/3058/",
  },
  {
    name: "Eclipse Cross",
    imageUrl:
      "https://di-uploads-pod1.dealerinspire.com/countrysidemitsubishi/uploads/2023/09/24Mitsubishi-EclipseCross-LE-RedDiamond-Jellybeans.png",
  },
  {
    name: "EcoSport",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2019/12/2020-ford-ecosport-se-suv-angular-front.png",
  },
  {
    name: "Edge",
    imageUrl:
      "https://build.ford.com/dig/Ford/Edge/2024/HD-TILE/Image%5B%7CFord%7CEdge%7C2024%7C1%7C1.%7C400A.K4A..PM7..886.89E.~3DM00_BCMAG.61P.HFS.53G.85W.644.TDU.AWD.99P.ST.61B.76L.59P.91B.SSR.58B.SYC.44F.~VS-DK.LMI.STT.%5D/EXT/1/vehicle.png",
  },
  {
    name: "Elantra",
    imageUrl:
      "https://s7d1.scene7.com/is/image/hyundai/2024-elantra-limited-ultimate-red-vehicle-browse-hero:16-9?wid=640&hei=360&fmt=webp-alpha",
  },
  {
    name: "Elantra GT",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/12220/2019-Hyundai-Elantra%20GT-front_12220_032_2400x1800_WAW.png",
  },
  {
    name: "ELR",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/e4ca79f4-87e0-4c2e-ad82-373ecc97c18f/ae823757-8e6b-4b43-8188-74e1feb87fab.png",
  },
  {
    name: "Enclave",
    imageUrl:
      "https://cgi.buick.com/mmgprod-us/dynres/prove/image.gen?i=2024/4ND56/4ND56__1SP/G6Ngmds1.jpg&v=deg01&std=true&country=US&removeCat=&background=ffffff",
  },
  {
    name: "Encore",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2018/07/2019-buick-encore-essence-suv-angular-front.png?fit=around%7C875:492",
  },
  {
    name: "Encore GX",
    imageUrl:
      "https://mystrongad.com/BKG_BarkerBuickGMC/Interactive/Encore%20GX/2024/24-Encore-GX-white.jpg",
  },
  {
    name: "Envision",
    imageUrl:
      "https://www.buick.com/content/dam/buick/na/us/en/vdc-collections/2023/suvs/envision/envision/01-images/2023-envision-essence-trim-sapphire-metallic-2000x1000.jpg?imwidth=960",
  },
  {
    name: "Eos",
    imageUrl:
      "https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/2155/",
  },
  {
    name: "EQ fortwo",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/07819593-5067-469a-92dc-8cf9435e2783/e04b1466-651b-486a-b298-7c836b1f1b1b.png",
  },
  {
    name: "Equinox",
    imageUrl:
      "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/vdc-collections/2024/suvs/equinox/trim-walk/jpg/2024-equinox-1xp26-1ls-gaz-trimselector.jpg?imwidth=960",
  },
  {
    name: "Equus",
    imageUrl:
      "https://img2.carmax.com/assets/mmy-hyundai-equus-2016/image/1.jpg?width=800&height=600",
  },
  {
    name: "ES",
    imageUrl:
      "https://tmna.aemassets.toyota.com/is/image/toyota/lexus/images/models/es/2022/styles/Lexus-ES-250-AWD-visualizer-styles-750x471-LEX-ESG-MY22-0026-04.png?wid=750&hei=471&fmt=png-alpha",
  },
  {
    name: "Escalade",
    imageUrl:
      "https://platform.cstatic-images.com/in/v2/stock_photos/e09e8fa4-e974-4a06-9a28-7afadcd86456/9fbe1011-8284-43dc-a992-03f83e7555a9.png",
  },
  {
    name: "Escalade ESV",
    imageUrl:
      "https://media.assets.ansira.net/websites/content/gmps-mclaughlin-il/generics/49e2a89ba1d24218867fec65f6bff356_c2x0-765x432.png",
  },
  {
    name: "Escape",
    imageUrl:
      "https://pictures.dealer.com/fd-DIG_IMAGES/8a8e6dc345f9c2552556b2f7ae250c12.png?w=640&impolicy=downsize_bkpt&imdensity=1",
  },
  {
    name: "Evora 400",
    imageUrl:
      "https://media.ed.edmunds-media.com/lotus/evora-400/2017/oem/2017_lotus_evora-400_coupe_2plus2_fq_oem_1_1600.jpg",
  },
  {
    name: "Evora GT",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/house/2021/2021-Lotus-Evora%20GT-FrontSide_LOEVGT2101_640x480.jpg",
  },
  {
    name: "Expedition",
    imageUrl:
      "https://build.ford.com/dig/Ford/Expedition/2024/HD-TILE/Image%5B%7CFord%7CExpedition%7C2024%7C1%7C1.%7C600A...PUM..88S.89H.77P.RBP.21D.BS2.43V.64P.4x2.998.96L.59N.%5D/EXT/1/vehicle.png",
  },
  {
    name: "Explorer",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/EBC64911420B7C82DAB9F35730A35D9593CB7E408081F34A52D6ADEFF3332C10/autoblog/resizefill_w1200_h675;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USD00FOS101A021001.jpg",
  },
  {
    name: "Express",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2017/05/2017-chevrolet-express-2500-work-van-hd-cargo-van-angular-front.png",
  },
  {
    name: "Express Cargo",
    imageUrl:
      "https://inv.assets.ansira.net/RTT/Chevrolet/2024/6090823/default/ext_GAZ_deg02.jpg",
  },
  {
    name: "F-150",
    imageUrl:
      "https://www.ford.com/is/image/content/dam/vdm_ford/live/en_us/ford/nameplate/f-150f-150/2023/collections/dm/22_F150_R7A7574_Tremor_CAN.tif?croppathe=1_21x9&wid=1440",
  },
  {
    name: "F-250 Super Duty",
    imageUrl:
      "https://build.ford.com/dig/Ford/SuperDuty/2024/HD-TILE/Image%5B%7CFord%7CSuperDuty%7C2024%7C1%7C1.%7C603A.F2B.142.PUM.LSC.883.89S.A7AAK.CBC.XLT.~AASBA.924.BBHAB.BLDAE.54K.91X.66B.REC.CLFAE.SRW.648.TCH.4X4.99N.FBFAB.91Z.GTDAB.67D.43C.585.IEVAR.595.250.44G.X37.CLO.%5D/EXT/1/vehicle.png",
  },
  {
    name: "F-350 Super Duty",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/50928/2022-Ford-F350%20Super%20Duty%20Crew%20Cab-front_50928_032_1806x788_HX_cropped.png",
  },
  {
    name: "F-450 Super Duty",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2015/11/2016-ford-f450-super-duty-crew-cab-truck-angular-front.png",
  },
  {
    name: "F-PACE",
    imageUrl:
      "https://vehicle-images.dealerinspire.com/555f-18003921/SADCZ2EEXRA722266/1c98f5abe08c8cda37e6d2a08c10b7e9.jpg",
  },
  {
    name: "F-TYPE",
    imageUrl:
      "https://pictures.dealer.com/i/imperialmotorsjaguaroflakebluffjag/1659/7eb9a5dd30a5ed1c9b9fe7c9dce3c25ex.jpg?impolicy=downsize&w=568",
  },
  {
    name: "F12 Berlinetta",
    imageUrl:
      "https://www.experienceferrari.com/wp-content/uploads/2024/04/OD-AS781_RUMBLE_P_20120801120829.jpg",
  },
  {
    name: "FF",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/11q1/379496/2012-ferrari-ff-drive-review-car-and-driver-photo-394020-s-original.jpg?fill=4:3&resize=1200:*",
  },
  {
    name: "Fiesta",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/F3A8DE8A7B087397A82CCFA54C5AA050C0B578489CC804539DA01AE03F650DAB/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USC70FOC221A021001.jpg",
  },
  {
    name: "Fit",
    imageUrl:
      "https://www.fmdt.info/vehicle/honda/2019/fit-lx-32-white.png",
  },
  {
    name: "Flex",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2017/02/2017-ford-flex-sel-suv-angular-front.png",
  },
  {
    name: "Flying Spur",
    imageUrl:
      "https://vehicle-photos-published.vauto.com/0f/89/e4/b8-b7f8-4452-8cae-8243237cc9d3/image-1.jpg",
  },
  {
    name: "Focus",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2017/10/2018-ford-focus-se-sedan-angular-front.png",
  },
  {
    name: "Forester",
    imageUrl:
      "https://s7d1.scene7.com/is/image/scom/RFF_D4S_frontwheelturned?$900p$",
  },
  {
    name: "Forte",
    imageUrl:
      "https://di-uploads-pod9.dealerinspire.com/capitolkia/uploads/2021/11/2022-forte-deep-sea-blue.jpg",
  },
  {
    name: "fortwo",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2017/06/2017-smart-fortwo-prime-micro-car-angular-front.png",
  },
  {
    name: "FR-S",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2015/11/2016-scion-frs-coupe-angular-front.png?fit=around%7C875:492",
  },
  {
    name: "Frontier",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/43825/2021-Nissan-Frontier%20Crew%20Cab-front_43825_032_1873x820_G41_cropped.png",
  },
  {
    name: "Fusion",
    imageUrl:
      "https://content-images.carmax.com/stockimages/2020/ford/fusion/st2400-089-evoxwebmedium.png",
  },
  {
    name: "Fusion Energi",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/712bdf71-ac34-4882-b675-0a87175571cf/9848e232-54a3-44dc-b4de-3e2377f7d371.png",
  },
  {
    name: "Fusion Hybrid",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/3b081463-cf95-495f-9aad-d0ab8f97484f/687b006b-592e-41aa-b3aa-5508a60d1487.png",
  },
  {
    name: "G-Class",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2019/04/2019-mercedes-benz-g-class-550-suv-angular-front.png",
  },
  {
    name: "G70",
    imageUrl:
      "https://di-uploads-pod1.dealerinspire.com/genesisofmentor/uploads/2024/03/2024-Genesis-G70.jpg",
  },
  {
    name: "G80",
    imageUrl:
      "https://vehicle-images.dealerinspire.com/9937-110005802/KMTGB4SD4RU213864/ca2e17a2e299ba6c6805f89a882e83d1.jpg",
  },
  {
    name: "G90",
    imageUrl:
      "https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/2651/",
  },
  {
    name: "Genesis",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2017/11/2016-hyundai-genesis-3.8-sedan-angular-front.png",
  },
  {
    name: "Genesis Coupe",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/8117/2013-Hyundai-Genesis%20Coupe-front_8117_032_2400x1800_YAC.png",
  },
  {
    name: "Ghibli",
    imageUrl:
      "https://di-uploads-pod42.dealerinspire.com/maseratipensacola/uploads/2023/01/mlp-img-top-2023-ghibli-temp.png",
  },
  {
    name: "Ghost",
    imageUrl:
      "https://pictures.dealer.com/r/rollsroyceofaustin/0941/c4f9acde16c7b4b24b5a5b932cfcbccbx.jpg?impolicy=downsize&w=568",
  },
  {
    name: "Giulia",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/cf943eb2-d2ef-4065-afe3-a39920ccb07b/40e8736f-4b1c-4e82-97f6-d515c5f3581f.png",
  },
  {
    name: "GL-Class",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/10572/2016-Mercedes-Benz-GL-Class-front_10572_032_2400x1800_799.png",
  },
  {
    name: "GLA-Class",
    imageUrl:
      "https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/gla-class/class-page/series/2024-GLA-SUV-CT-1-5-2-DR.jpg",
  },
  {
    name: "Gladiator",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2019/12/2020-jeep-gladiator-rubicon-4wd-pick-up-angular-front.png?fit=around%7C875:492",
  },
  {
    name: "GLB-Class",
    imageUrl:
      "https://cimg2.ibsrv.net/ibimg/hgm/1920x1080-1/100/726/2020-mercedes-benz-glb-class_100726538.jpg",
  },
  {
    name: "GLC-Class",
    imageUrl:
      "https://images.hgmsites.net/lrg/2021-mercedes-benz-glc-class-glc-300-4matic-coupe-angular-front-exterior-view_100785184_l.jpg",
  },
  {
    name: "GLC-Class Coupe",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2020/12/2021-mercedes-benz-glc-coupe-300-4wd-suv-angular-front.png?fit=around%7C875:492",
  },
  {
    name: "GLE-Class",
    imageUrl:
      "https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/2966/",
  },
  {
    name: "GLE-Class Coupe",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2020/12/2021-mercedes-benz-gle-coupe-amg-53-4wd-suv-angular-front.png?fit=around%7C875:492.1875",
  },
  {
    name: "GLK-Class",
    imageUrl:
      "https://img2.carmax.com/assets/mmy-mercedes-benz-glk350-2015/image/1.jpg?width=800&height=450",
  },
  {
    name: "GLS-Class",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/2024-mercedes-benz-gls-class-101-642b77729761e.jpg",
  },
  {
    name: "Golf",
    imageUrl:
      "https://uploads.vw-mms.de/system/production/images/vwn/080/882/images/2e3b58f75abcbedd61fe45f93fd1283e148760b8/DB2024AU00138_web_1600.jpg?1706001756",
  },
  {
    name: "Golf Alltrack",
    imageUrl:
      "https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/2905/",
  },
  {
    name: "Golf GTI",
    imageUrl:
      "https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/3170/",
  },
  {
    name: "Golf R",
    imageUrl:
      "https://cdn.motor1.com/images/mgl/3KVg1/s1/2022-volkswagen-golf-r-exterior.jpg",
  },
  {
    name: "Golf SportWagen",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/13463/2019-Volkswagen-Golf%20SportWagen-front_13463_032_1804x799_2R2R_cropped.png",
  },
  {
    name: "GR Supra",
    imageUrl:
      "https://www.buyatoyota.com/assets/img/vehicle-info/Supra/2024/hero-image.png",
  },
  {
    name: "Grand Caravan",
    imageUrl:
      "https://www.portlavacadodge.com/assets/d2353/img/2018-dodge-grand-carvan.png",
  },
  {
    name: "Grand Cherokee",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/52312/2024-Jeep-Grand%20Cherokee-front_52312_032_2400x1800_PXJ_nologo.png",
  },
  {
    name: "GranTurismo",
    imageUrl:
      "https://static0.carbuzzimages.com/wordpress/wp-content/uploads/2024/03/1044215.jpg",
  },
  {
    name: "GranTurismo Convertible",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/3BC6EDE9F1B64848B61B6864A0D8BBB4D8F5B713DF6DEC2972BA126C544FD98E/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USC80MSC052B021001.jpg",
  },
  {
    name: "GS",
    imageUrl:
      "https://cdn.motor1.com/images/mgl/3oJNY/s1/4x3/lexus-gs.webp",
  },
  {
    name: "GT",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/5/2020/02/2020-Ford-GT-Liquid-Carbon-Edition-6.jpg",
  },
  {
    name: "GT",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/612f4f7e00611a662fb50b92/1695586290231-QV30D99Q73NIMXECWPWZ/02_P22_MSO_Front_Left_Top_Cerulean_Blue.jpg",
  },
  {
    name: "GT-R",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2024/Nissan/GT-R/Coupe/color/Solid%20Red-A54-98,1,16-640-en_US.jpg",
  },
  {
    name: "GTC4Lusso",
    imageUrl:
      "https://cdn.ferrari.com/cms/network/media/img/resize/5eb16841bcb51d0a391d6e8a-11_ferrari-212_inter_vignale_gtc4lusso_esterni?width=750&height=550",
  },
  {
    name: "GX",
    imageUrl:
      "https://tmna.aemassets.toyota.com/is/image/toyota/lexus/images/models/gx/2024/styles/Lexus-GX-PremiumJelly-Styles-750x471-LEX-GXG-MY24-1000.03.png?wid=750&hei=471&fmt=png-alpha",
  },
  {
    name: "Hardtop 2 Door",
    imageUrl:
      "https://di-uploads-pod10.dealerinspire.com/miniofallentown/uploads/2020/02/coopers_classic_850.png",
  },
  {
    name: "Hardtop 4 Door",
    imageUrl:
      "https://di-uploads-pod24.dealerinspire.com/patrickmini/uploads/2020/08/2021-mini-hardtop-4-door-1024x576.jpg",
  },
  {
    name: "Highlander",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/E315A2C4ED9841DD9A0FD1207E29AAE950350AE5E372E3638F82F621CA4EFA14/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USD30TOS141A021001.jpg",
  },
  {
    name: "Highlander Hybrid",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/7b22cd72-bc00-42a4-b75b-e22b5e766a68/a482a280-13b1-45d7-8886-e69cc3bb5aff.png",
  },
  {
    name: "HR-V",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2024/Honda/HR-V/SUV/color/Crystal%20Black%20Pearl-BK-29,29,29-640-en_US.jpg",
  },
  {
    name: "Huracan",
    imageUrl:
      "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_gw/huracan/2023/model_chooser/huracan_evo_spyder_m.jpg",
  },
  {
    name: "i-MiEV",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2017/11/2017-mitsubishi-i-es-hatchback-angular-front.png",
  },
  {
    name: "I-PACE",
    imageUrl:
      "https://www.goodcarbadcar.net/wp-content/uploads/2023/05/Jaguar-I-Pace.jpeg",
  },
  {
    name: "i3",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2021/01/2021-bmw-i3-s-5door-hatchback-angular-front.png",
  },
  {
    name: "i8",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/f192227d-4e54-4e00-b02c-519c5734f632/67dd0247-330a-45bb-b420-9a7427ab537b.png",
  },
  {
    name: "iA",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/10675/2016-Scion-iA-front_10675_032_1817x825_41W_cropped.png",
  },
  {
    name: "iM",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/6ae845da-90af-4a22-a37d-1ec9b077a37d/1cdb0779-1d1e-4ffc-a32c-e09e669ee173.png",
  },
  {
    name: "Impala",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2019/11/2020-chevrolet-impala-1lt-sedan-angular-front.png?fit=around%7C875:492",
  },
  {
    name: "Impala Limited",
    imageUrl:
      "https://img2.carmax.com/assets/mmy-chevrolet-impala-limited-2016/image/1.jpg?width=800&height=600",
  },
  {
    name: "Impreza",
    imageUrl:
      "https://s7d1.scene7.com/is/image/scom/RLA_P8Y_frontwheelturned?$900p$",
  },
  {
    name: "Insight",
    imageUrl:
      "https://www.cars.com/i/large/in/v2/stock_photos/64d90366-0bd6-48d5-be3e-140fa99ea2c1/42ef3a8e-71e0-4351-b592-0d028c21416c.png",
  },
  {
    name: "Ioniq Electric",
    imageUrl:
      "https://platform.cstatic-images.com/in/v2/stock_photos/92fc56f2-1599-4b53-8e15-bf91c8663768/7558c158-7824-4fea-a752-42c17c336620.png",
  },
  {
    name: "Ioniq Hybrid",
    imageUrl:
      "https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/2774/",
  },
  {
    name: "Ioniq Plug-In Hybrid",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/9b813312-1121-4080-957e-e7115e0649b2/9bcd1202-4cb3-4274-8bcf-362814d534dc.png",
  },
  {
    name: "iQ",
    imageUrl:
      "https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/2339/",
  },
  {
    name: "IS",
    imageUrl:
      "https://www.lexus.com/content/dam/lexus/images/models/is/2024/visualizer/300/exterior/18-inch-split-five-spoke-alloy-wheels/eminent-white-pearl/small-1.jpg",
  },
  {
    name: "Jetta",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2024/Volkswagen/Jetta/Sedan/color/Deep%20Black%20Pearl-2T2T-18,18,20-640-en_US.jpg",
  },
  {
    name: "Jetta GLI",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/118ba02b-e659-458e-95b5-0dcb1f3942ef/747fb5b6-506e-4c43-83aa-e66fadef853c.png",
  },
  {
    name: "Journey",
    imageUrl:
      "https://platform.cstatic-images.com/in/v2/stock_photos/fdfd4fa3-760a-4147-bcd8-7a17687afab7/6a9da783-3a87-4e56-a29c-da0a9b058751.png",
  },
  {
    name: "Juke",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2016/12/2017-nissan-juke-sl-suv-angular-front.png",
  },
  {
    name: "K900",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2020/02/2020-kia-k900-luxury-sedan-angular-front.png",
  },
  {
    name: "Kicks",
    imageUrl:
      "https://di-uploads-pod35.dealerinspire.com/newtonnissanofgallatin/uploads/2022/06/2022-Nissan-Kicks-SR-Model-Left.jpg",
  },
  {
    name: "Kona",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/9C35620A03BC87F11049BD180659F4024FED97DFBCB4E205E5E4789B910C5D46/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USD30HYS061C021001.jpg",
  },
  {
    name: "Kona Electric",
    imageUrl:
      "https://s7d1.scene7.com/is/image/hyundai/2024-kona-ev-limited-meta-blue-pearl-013:16-9?wid=640&hei=360&fmt=webp-alpha",
  },
  {
    name: "LaCrosse",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2017/11/2018-buick-lacrosse-essence-sedan-angular-front.png?fit=around%7C551:374",
  },
  {
    name: "Lancer",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/1CD0B90AD76EFABE9A82C9E0E3132EF8AC8638F32A414507B1CBF2A42A93C285/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/CAC60MIC103B021001.jpg",
  },
  {
    name: "Lancer Evolution",
    imageUrl:
      "https://www.cars.com/i/large/in/v2/stock_photos/c0059894-d41a-4775-a30c-f5504cb1373e/731cfc7e-b95e-40b4-9c92-1c49a31b9466.png",
  },
  {
    name: "Land Cruiser",
    imageUrl:
      "https://global.toyota/pages/news/images/2021/08/02/1330/001.jpg",
  },
  {
    name: "LC",
    imageUrl:
      "https://www.edmunds.com/assets/m/cs/blt0b417403d340acc4/64de6ca1bea67cb1b0b1a16e/2024_Lexus_LC_Inspiration_001-1500x707_500.jpg",
  },
  {
    name: "LEAF",
    imageUrl:
      "https://ev-database.org/img/auto/Nissan_Leaf_2018/Nissan_Leaf_2018-01@2x.jpg",
  },
  {
    name: "Legacy",
    imageUrl:
      "https://s7d1.scene7.com/is/image/scom/RAF_default_pass_scaled?$900p$",
  },
  {
    name: "Levante",
    imageUrl:
      "https://cdn.motor1.com/images/mgl/2g68p/s1/maserati-levante-hybrid-2021.jpg",
  },
  {
    name: "LR2",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2017/11/2015-land-rover-lr-2-awd-suv-angular-front.png",
  },
  {
    name: "LR4",
    imageUrl:
      "https://di-uploads-pod7.dealerinspire.com/landrovergulfcoast/uploads/2016/11/2016-Land-Rover-LR4.png",
  },
  {
    name: "LS",
    imageUrl:
      "https://tmna.aemassets.toyota.com/is/image/toyota/lexus/images/models/ls/2024/styles/Lexus-LS-BASE-500-visualizer-styles-750x471-LEX-LSG-MY24-0002.02.png?wid=750&hei=471&fmt=png-alpha",
  },
  {
    name: "LX",
    imageUrl:
      "https://tmna.aemassets.toyota.com/is/image/toyota/lexus/images/models/lx/2022/styles/Lexus-LX-600-style-selector-nori-green-pearl-visualizer-750x471-LEX-LXG-MY22-0081.04.png?wid=750&hei=471&fmt=png-alpha",
  },
  {
    name: "M-Class",
    imageUrl:
      "https://di-uploads-pod3.s3.amazonaws.com/rbmofalpharettamercedesbenz/uploads/2015/07/2015-Merceds-Benz-M250-Bluetec-wt.jpg",
  },
  {
    name: "Macan",
    imageUrl:
      "https://cdn.motor1.com/images/mgl/Vz8VzM/s1/2022-porsche-macan-t.jpg",
  },
  {
    name: "Malibu",
    imageUrl:
      "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/vdc-collections/2024/cars/malibu/trims/01-images/2024-malibu-1zs69-1sp-gnt-trimselector.jpg?imwidth=960",
  },
  {
    name: "Malibu Limited",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/10543/2016-Chevrolet-Malibu%20Limited-front_10543_032_2400x1800_GAZ.png",
  },
  {
    name: "Maxima",
    imageUrl:
      "https://di-uploads-pod19.dealerinspire.com/firstteamnissanofnewrivervalley/uploads/2022/07/STAM-Nissan-2022-Nissan-Maxima-White-Exterior.png",
  },
  {
    name: "Maybach",
    imageUrl:
      "https://images.dealer.com/autodata/us/640/color/2023/USD30MBCCR1A0/056.jpg",
  },
  {
    name: "MDX",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/2025-acura-mdx-type-s-exterior-102-6613f35e449c3.jpg?crop=0.893xw:1.00xh;0.0609xw,0&resize=768:*",
  },
  {
    name: "Metris",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/1549960f-06ac-40ef-a345-dbe95915208e/8fedf827-a53c-42be-9798-160f43849869.png",
  },
  {
    name: "Mirage",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2023/01/2023-mitsubishi-mirage-es-5door-hatchback-angular-front.png",
  },
  {
    name: "Mirage G4",
    imageUrl:
      "https://www.mountaineermitsubishiwv.com/static/dealer-21550/24Mitsubishi-MirageG4-BE-InfraredMetallicWithBlackRoof-Jellybean.png",
  },
  {
    name: "Mirai",
    imageUrl:
      "https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2024/mirai/limited/3003/3u5/36/5.png?fmt=png&w=930&qlt=90",
  },
  {
    name: "MKC",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2018/09/2019-lincoln-mkc-base-suv-angular-front.png",
  },
  {
    name: "MKS",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2015/11/2014-lincoln-mks-fwd-sedan-angular-front.png",
  },
  {
    name: "MKT",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2017/12/2018-lincoln-mkt-reserve-suv-angular-front.png",
  },
  {
    name: "MKX",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2017/05/2017-lincoln-mkx-blacklabel-suv-angular-front.png",
  },
  {
    name: "MKZ",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/14FF6C1CADFE1586BA5C659CF161E3E00DF3079918D1B69098785589384ABBAC/autoblog/resizefill_w1200_h720;quality_85;format_webp;cc_31536000;/https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/800x450/format/jpg/quality/85/https://s.aolcdn.com/os/ab/_cms/2020/03/10085219/2020_lincoln_mkz.jpg",
  },
  {
    name: "Model 3",
    imageUrl:
      "https://cdn-www.pod-point.com/model-3-21-white-background.jpg?v=1611831804",
  },
  {
    name: "Model S",
    imageUrl:
      "https://media.ed.edmunds-media.com/tesla/model-s/2024/oem/2024_tesla_model-s_sedan_plaid_fq_oem_1_1600.jpg",
  },
  {
    name: "Model X",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/909cd004-1eb1-46a3-b3d5-f7eca4175d23/a4e9535e-20e5-4838-a1ff-790f651a37b8.png",
  },
  {
    name: "Model Y",
    imageUrl:
      "https://www.tesla.com/sites/default/files/images/support/Meet-Your-Tesla-Model-Y.png",
  },
  {
    name: "Mulsanne",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/11/2018/07/Mulsanne-WO-Edition-hero.jpg",
  },
  {
    name: "Murano",
    imageUrl:
      "https://vehicle-images.dealerinspire.com/stock-images/chrome/2b0e9d5e2feb9b7149c37d270394c657.png",
  },
  {
    name: "Mustang",
    imageUrl:
      "https://platform.cstatic-images.com/in/v2/stock_photos/90884105-7fd5-4da9-8479-27e482a4e479/2b678835-3279-4de7-8047-36484d4e2900.png",
  },
  {
    name: "MX-5 Miata",
    imageUrl:
      "https://cdn.motor1.com/images/mgl/qkMqGG/s3/2024-mazda-mx-5-miata-jdm.jpg",
  },
  {
    name: "MX-5 Miata RF",
    imageUrl:
      "https://di-enrollment-api.s3.amazonaws.com/mazda/models/2023/mx-5-miata-rf/Trims/Large/Club.png",
  },
  {
    name: "Nautilus",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/3D1B0CF22F2A35C1E2B9DED4932DE234D4A9C232617E7D2FD5BDF31D985DC323/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USD40LIS072C021001.jpg",
  },
  {
    name: "Navigator",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/53502/2024-Lincoln-Navigator-front_53502_032_1837x885_XF_cropped.png",
  },
  {
    name: "NEXO",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2020/03/2020-hyundai-nexo-limited-suv-angular-front.png",
  },
  {
    name: "Niro",
    imageUrl:
      "https://www.kia.com/content/dam/kwcms/kme/global/en/assets/360vr/niro-ev-sx-my24/ud-clear-white/17_alloy_wheel/kia-niro-ev-sx-my23-udclearwhite-17_0000.jpg",
  },
  {
    name: "Niro EV",
    imageUrl:
      "https://vehicle-images.dealerinspire.com/stock-images/thumbnails/large/chrome/da9bc7afc4ef9ead082468970e849d9f.png",
  },
  {
    name: "Niro Plug-In Hybrid",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/50650/2024-Kia-Niro%20Plug-in%20Hybrid-front_50650_032_1860x851_CR5_cropped.png",
  },
  {
    name: "NSX",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/60ccb5ec-5288-41e2-9fac-3308ebaf5ee2/f7e76264-9cb5-4e99-b3ad-504007963bbb.png",
  },
  {
    name: "NV Cargo",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/5ddc7e2f-cf07-44bd-b22e-9a7dc55ed366/b95c1c5b-9419-4586-bf3d-8ad07f1d433d.png",
  },
  {
    name: "NV Passenger",
    imageUrl:
      "https://wieck-nissanao-production.s3.amazonaws.com/photos/7d6216b01849b78eb5e340bcba6178161e555a44/preview-928x522.jpg",
  },
  {
    name: "NV200",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2021/01/2021-nissan-nv200-s-cargo-van-angular-front.png?fit=around%7C875:492",
  },
  {
    name: "NX",
    imageUrl:
      "https://www.lexus.com/content/dam/lexus/images/models/nx/2025/visualizer/350/exterior/18-inch-15-spoke-alloy-wheels-dark-gray-machined-finish/eminent-white-pearl/small-1.jpg",
  },
  {
    name: "Odyssey",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/62F773E581E55C6CD8C752BC6AC2DB93E9D060933057BB23892F35AAE6D2B2EF/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USD10HOV011C021001.jpg",
  },
  {
    name: "Optima",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2020/01/2020-kia-optima-lx-sedan-angular-front.png",
  },
  {
    name: "Optima Hybrid",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2018/01/2018-kia-optima-ex-hybrid-sedan-angular-front.png",
  },
  {
    name: "Optima Plug-In Hybrid",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/96a9676b-0730-40f4-b437-b8d613172947/93ee4d0d-e454-4219-acc4-fed1980dbb65.png",
  },
  {
    name: "Outback",
    imageUrl:
      "https://prod.cdn.secureoffersites.com/images/oem/subaru/2023-subaru-outback-launch/MY23_OBK_OnyxEditionXT_m_PDH_OP22_Autumn-Green-Metallic.png",
  },
  {
    name: "Outlander",
    imageUrl:
      "https://images.hgmsites.net/lrg/2024-mitsubishi-outlander-se-fwd-angular-front-exterior-view_100901239_l.webp",
  },
  {
    name: "Outlander PHEV",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2024/Mitsubishi/Outlander%20PHEV/SUV/color/White%20Diamond-W85-226,229,229-640-en_US.jpg",
  },
  {
    name: "Outlander Sport",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2024/Mitsubishi/Outlander%20Sport/SUV/color/Alloy%20Silver%20Metallic-U25-191,194,195-640-en_US.jpg",
  },
  {
    name: "Pacifica",
    imageUrl:
      "https://www.chrysler.com/content/dam/fca-brands/na/chrysler/en_us/2024/pacifica/vlp/desktop/MY24-Chrysler-Pacifica-Gas-Overview-Slider-1-Desktop.jpg",
  },
  {
    name: "Pacifica Hybrid",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/618e12e1-9561-49b6-bf8c-0b96fb40d0db/dc30e6c4-eec3-40ab-b2ba-2e118e508892.png",
  },
  {
    name: "Palisade",
    imageUrl:
      "https://di-uploads-pod27.dealerinspire.com/fairfaxhyundai/uploads/2023/08/ked202306020011.700x.0.jpg",
  },
  {
    name: "Panamera",
    imageUrl:
      "https://cdn.motor1.com/images/mgl/eoRmyE/1043:0:5428:5428/porsche-panamera-2024.webp",
  },
  {
    name: "Passat",
    imageUrl:
      "https://www.cars.com/i/large/in/v2/stock_photos/4f2f4b7f-5b04-4a7a-bafe-fe7570bbb852/342fe41b-49c6-4a07-85e8-e725702626f8.png",
  },
  {
    name: "Passport",
    imageUrl:
      "https://dealerimages.dealereprocess.com/image/upload/c_limit,f_auto,fl_lossy/v1/svp/dep/22hondapassportelite/honda_22passportelite_angularfront_platinumwhitepearl",
  },
  {
    name: "Pathfinder",
    imageUrl:
      "https://inv.assets.ansira.net/ChromeMultiView/us/WHITE_2024NIS070046_1280_01.jpg",
  },
  {
    name: "Patriot",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/7ea1196a-09f7-42ad-864b-40c0ad6ee83f/7e24723d-a674-43cf-996a-70d9ec6a40be.png",
  },
  {
    name: "Phantom",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2023/Rolls-Royce/Phantom/Sedan/color/Adriatic%20Blue-EXAB-11,69,76-640-en_US.jpg",
  },
  {
    name: "Phantom Coupe",
    imageUrl:
      "https://www.edmunds.com/assets/m/rolls-royce/phantom-coupe/2016/oem/2016_rolls-royce_phantom-coupe_coupe_base_fq_oem_1_600.jpg",
  },
  {
    name: "Phantom Drophead Coupe",
    imageUrl:
      "https://res.cloudinary.com/motortrak/image/upload/t_base_vehicle_transformation/v1706183273/ims2/vehicle-media/15d638bb2441f516c53a5e4c2cc8dbc1/rolls-royce-Phantom%20VII%20Drophead%20Coupe-2008-1/eqowc91eaxizigo133ng.webp",
  },
  {
    name: "Pilot",
    imageUrl:
      "https://platform.cstatic-images.com/in/v2/stock_photos/e7b87aba-7aca-4cb5-9bd6-1cba21bf571f/ed0a13ca-29e8-4df7-8039-d1f9b78b717b.png",
  },
  {
    name: "Portofino",
    imageUrl:
      "https://pictures.dealer.com/f/ferraripalmbeachnewcountry/0261/22eb2179dc6bedc9f79f5942cc055568x.jpg",
  },
  {
    name: "Prius",
    imageUrl:
      "https://www.buyatoyota.com/config/pub/3d/toyota/1009284/1000859/Exterior/2/680_383_PNG/93900921a9ff4d913a3e09a268395a916e92926f0295349d679c0e234a57368f.png",
  },
  {
    name: "Prius c",
    imageUrl:
      "https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/2461/",
  },
  {
    name: "Prius Plug-in",
    imageUrl:
      "https://electrek.co/wp-content/uploads/sites/3/2022/11/Toyota-Prius-Hero.jpg?quality=82&strip=all",
  },
  {
    name: "Prius Prime",
    imageUrl:
      "https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/chrome/white/2022TOC320001_1280_01",
  },
  {
    name: "Prius v",
    imageUrl:
      "https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/2499/",
  },
  {
    name: "Promaster Cargo Van",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/13298/2019-Ram-ProMaster%20Cargo%20Van-front_13298_032_2400x1800_PW7.png",
  },
  {
    name: "Promaster City",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/15417/2021-Ram-ProMaster%20City-front_15417_032_2051x941_PRS_cropped.png",
  },
  {
    name: "Promaster Window Van",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/51386/2023-Ram-ProMaster%20Window%20Van-front_51386_032_2400x1800_PFS.png",
  },
  {
    name: "Q3",
    imageUrl:
      "https://pictures.dealer.com/generic-aoa-OEM_VIN_STOCK_PHOTOS/abd90d3245d119f2ee865ece9dc53fc5.jpg?impolicy=downsize_bkpt&imdensity=1&w=520",
  },
  {
    name: "Q40",
    imageUrl:
      "https://img.autobytel.com/chrome/colormatched_01/white/640/cc_2015inf005b_01_640/cc_2015inf005b_01_640_kh3.jpg",
  },
  {
    name: "Q5",
    imageUrl:
      "https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/chrome/white/2023AUS020033_1280_01",
  },
  {
    name: "Q50",
    imageUrl:
      "https://media.ed.edmunds-media.com/infiniti/q50/2024/oem/2024_infiniti_q50_sedan_luxe_fq_oem_1_600.jpg",
  },
  {
    name: "Q60",
    imageUrl:
      "https://www.westhoustoninfiniti.com/static/dealer-16081/WHInfiniti-Q60-Colors-ext-L1.jpg",
  },
  {
    name: "Q60 Convertible",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/10048/2015-INFINITI-Q60-front_10048_032_2400x1800_QAB.png",
  },
  {
    name: "Q60 Coupe",
    imageUrl:
      "https://www.digitaltrends.com/wp-content/uploads/2016/07/2017-Infiniti-Q60.png?fit=720%2C720&p=1",
  },
  {
    name: "Q7",
    imageUrl:
      "https://pictures.dealer.com/generic-aoa-OEM_VIN_STOCK_PHOTOS/9404c810efb2f20ae25192f1bb9f5614.jpg?impolicy=resize&w=640",
  },
  {
    name: "Q70",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/a6aeacb5-31b1-476a-b98b-a2905f11bf4a/06131f3f-5dd1-4195-8e2b-3aec454e6e33.png",
  },
  {
    name: "Q8",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/7737d0e4-6afa-4cec-82ed-4e9a24d5d739/c1d5fe85-8cb3-48c9-978a-21c39bfd6943.png",
  },
  {
    name: "Quattroporte",
    imageUrl:
      "https://vehicle-images.dealerinspire.com/6af6-110009636/thumbnails/large/ZAM56ZPTXPX420502/434b3f67ee260adf032cc4efa7a91c4f.jpg",
  },
  {
    name: "Quest",
    imageUrl:
      "https://www.nissanusa.com/content/dam/Nissan/us/vehicles/discontinuedvehicles/quest/Nissan-Pathfinder-2024.png.ximg.l_8_m.smart.png",
  },
  {
    name: "QX30",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2018/12/2019-infiniti-qx30-sport-suv-angular-front.png",
  },
  {
    name: "QX50",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/F328210AE1F5E7CEBBE772963F0355EA8F369E2F3A105C23F1282D9324420D1A/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USC90INS141C021001.jpg",
  },
  {
    name: "QX60",
    imageUrl:
      "https://www.infinitiusa.com/content/dam/Infiniti/US/vehicles/QX60/2024/vehicle-profile-assets/model-2024-infiniti-qx60-autograph-awd-2-tone-moonbow-blue-black-obsidian.png",
  },
  {
    name: "QX70",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2016/10/2017-infiniti-qx70-base-suv-angular-front.png",
  },
  {
    name: "QX80",
    imageUrl:
      "https://www.infiniti-cdn.net/content/dam/Infiniti/entryway/vehicles/jellybeans/2023/new-vi/infiniti-2023-qx80-nav.png",
  },
  {
    name: "R8",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2023/Audi/R8/Convertible/trim_52_V10_performance_695d77/color/Ara%20Blue%20Crystal%20Effect-K6PA-38,74,126-640-en_CA.jpg",
  },
  {
    name: "Range Rover",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2024/Land%20Rover/Range%20Rover/SUV/color/Amethyst%20Gray%20Purple%20SV%20Bespoke%20Ultra%20Met%20Gloss-1FN-66,69,79-640-en_US.jpg",
  },
  {
    name: "Range Rover Evoque",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2024/Land%20Rover/Range%20Rover%20Evoque/SUV/color/Ostuni%20Pearl%20White%20Metallic-1EJ-222,224,221-640-en_US.jpg",
  },
  {
    name: "Range Rover Sport",
    imageUrl:
      "https://vehicle-images.dealerinspire.com/stock-images/chrome/83b5587f1a7031029c90580663ffcd32.png",
  },
  {
    name: "Range Rover Velar",
    imageUrl:
      "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/153319/2023-range-rover-velar-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80&q=80",
  },
  {
    name: "Ranger",
    imageUrl:
      "https://build.ford.com/dig/Ford/Ranger/2024/HD-TILE/Image%5B%7CFord%7CRanger%7C2024%7C1%7C1.%7C500A...PM7..88T.89H.76E.CAB.64C.RWD.99H.DCS.LAR.%5D/EXT/1/vehicle.png",
  },
  {
    name: "Rapide AMR",
    imageUrl:
      "https://cimg2.ibsrv.net/gimg/www.6speedonline.com-vbulletin/960x720/aston1_34da2b989519386ddc4aeda97a9264960f58658a.jpg",
  },
  {
    name: "Rapide S",
    imageUrl:
      "https://www.edmunds.com/assets/m/for-sale/53-scfhmdbsxhgf05726/img-1-600x400.jpg",
  },
  {
    name: "RAV4",
    imageUrl:
      "https://content-images.carmax.com/qeontfmijmzv/3skAFTmSdJw8JQhc1ssBpK/b714684a2cd874ca4f371351eedd0b56/2023_Toyota_RAV4_XLE_Premium.png?w=2100&fm=webp",
  },
  {
    name: "RAV4 Hybrid",
    imageUrl:
      "https://platform.cstatic-images.com/in/v2/stock_photos/587d6507-e36a-4c07-aad6-51b7b0acf0cb/2447a10c-0676-4fce-86f9-2c5b895d287b.png",
  },
  {
    name: "RC",
    imageUrl:
      "https://tmna.aemassets.toyota.com/is/image/toyota/lexus/images/models/rc/2024/styles/Lexus-RC-styles-rc300-selector-750x471-LEX-RCG-MY23-0049.03.png?wid=750&hei=471&fmt=png-alpha",
  },
  {
    name: "RDX",
    imageUrl:
      "https://di-uploads-pod7.dealerinspire.com/acuraofavon/uploads/2018/09/2019-Acura-RDX-A-SPEC-Package.jpg",
  },
  {
    name: "Regal",
    imageUrl:
      "https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/chrome/white/2020BUC190001_1280_01",
  },
  {
    name: "Regal Sportback",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2019/11/2020-buick-regal-sportback-essence-5door-hatchback-angular-front.png?fit=around%7C875:492",
  },
  {
    name: "Regal TourX",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/705a7b05-7448-4cd4-9d48-8ed352511a1b/b8162e1b-643a-4129-81d1-2804c01b4fb0.png",
  },
  {
    name: "Renegade",
    imageUrl:
      "https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/3097/",
  },
  {
    name: "Ridgeline",
    imageUrl:
      "https://di-uploads-pod23.dealerinspire.com/rairdonshondaofburien/uploads/2021/11/2022-Honda-Ridgeline-leader-e1635925851810.png",
  },
  {
    name: "Rio",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/51493/2023-Kia-Rio-front_51493_032_2400x1800_UD_nologo.png",
  },
  {
    name: "RLX",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/313bcd6b-9204-42ea-a269-80bd68a2318d/6020df93-7a3f-43d0-a790-a8966e1918bc.png",
  },
  {
    name: "Rogue",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/D8E9542845DB2E0AF01493563EF790D2525B13A1B4EDE296F2DFF51ED3E393D2/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USD00NIS111A021001.jpg",
  },
  {
    name: "Rogue Select",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2015/11/2015-nissan-rogue-select-fwd-suv-angular-front.png?fit=around%7C875:492",
  },
  {
    name: "Rogue Sport",
    imageUrl:
      "https://di-uploads-pod9.dealerinspire.com/coylenissan1/uploads/2021/06/2021-Nissan-Rogue-Sport-grey-left-1.jpg",
  },
  {
    name: "RS 3",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/25127383E7119C9DA24A0425F28639E227CA4D861BC0CDE46CF5615C7D8B97A2/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USD20AUC341A021001.jpg",
  },
  {
    name: "RS 5",
    imageUrl:
      "https://images.dealer.com/autodata/us/640/color/2024/USD40AUC292A0/T3T3.jpg",
  },
  {
    name: "RS 7",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/72330740-8105-498b-987c-46354017d84c/c6452ec9-9a91-4b72-b6c9-63858634519f.png",
  },
  {
    name: "RS Q8",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2024/Audi/RS%20Q8/SUV/color/Daytona%20Gray%20Pearl%20Effect-6Y6Y-70,72,69-640-en_US.jpg",
  },
  {
    name: "RX",
    imageUrl:
      "https://tmna.aemassets.toyota.com/is/image/toyota/lexus/images/models/rx/2024/styles/Lexus-RX-350-visualizer-styles-750x471-LEX-RXG-MY24-0001.03.png?wid=750&hei=471&fmt=png-alpha",
  },
  {
    name: "S-Class",
    imageUrl:
      "https://images.hgmsites.net/lrg/2024-mercedes-benz-s-class-maybach-s-580-4matic-sedan-angular-front-exterior-view_100915802_l.webp",
  },
  {
    name: "S3",
    imageUrl:
      "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/audi-s3-my22-index-1.png",
  },
  {
    name: "S4",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/C00FC08A02E7324636DD1B5103A52D11C643FF45956FD6F589A456BA2B27C039/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USD00AUC084A021001.jpg",
  },
  {
    name: "S5",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2021/08/2021-audi-s5-sportback-premium-plus-4wd-5door-hatchback-angular-front.png",
  },
  {
    name: "S6",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2024/Audi/S6/Sedan/perspective/front-left/2024_24.png",
  },
  {
    name: "S60",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/13429/2021-Volvo-S60-front_13429_032_2400x1800_707.png",
  },
  {
    name: "S60 Cross Country",
    imageUrl:
      "https://platform.cstatic-images.com/in/v2/stock_photos/2db3649c-6c96-429a-9af9-dae5a297b005/6bbd83e6-01e9-44b5-9789-88c25343c4cc.png",
  },
  {
    name: "S7",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2024/Audi/S7/Hatchback/color/Ascari%20Blue%20Metallic-6I6I-11,26,135-640-en_US.jpg",
  },
  {
    name: "S8",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2024/Audi/S8/Sedan/color/Daytona%20Gray%20Pearl%20Effect-6Y6Y-70,72,69-640-en_US.jpg",
  },
  {
    name: "S80",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/31f06371-e6b7-4218-89ef-8f6d1a18c052/780595de-d9ec-4c8b-93c8-b32aa6474f28.png",
  },
  {
    name: "S90",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/B8DE5B34CC107A0A7774537CDDF2F578D45B2A42E6E448AED02B6AF5ED92294D/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USD10VOC092C021001.jpg",
  },
  {
    name: "Santa Fe",
    imageUrl:
      "https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/cr/model-years/17098-2024-hyundai-santa-fe",
  },
  {
    name: "Santa Fe Sport",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2017/08/2018-hyundai-santa-fe-sport-suv-angular-front.png",
  },
  {
    name: "Santa Fe XL",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2018/11/2019-hyundai-santa-fe-xl-limited-ultimate-suv-angular-front.png",
  },
  {
    name: "Savana",
    imageUrl:
      "https://media.ed.edmunds-media.com/gmc/savana/2023/oem/2023_gmc_savana_passenger-van_lt-3500_fq_oem_1_1600.jpg",
  },
  {
    name: "Savana Cargo",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/B1C647C6983FBBD3EA1D2501457E16B5CE3943C14F2A0468421125F44B25E517/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USD30GMV133A021001.jpg",
  },
  {
    name: "Sedona",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2020/12/2021-kia-sedona-ex-minivan-angular-front.png?fit=around%7C875:492",
  },
  {
    name: "Senna",
    imageUrl:
      "https://media.wired.com/photos/5a946d5d52430e4b5eb947d5/16:9/w_2123,h_1194,c_limit/McLarenSenna-Gallery1.jpg",
  },
  {
    name: "Sentra",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2019/01/2019-nissan-sentra-s-cvt-sedan-angular-front.png",
  },
  {
    name: "Sequoia",
    imageUrl:
      "https://www.toyotausvi.com/dynamic/900x383/img/vehicles/images/mlp/colorizer/2024/sequoia/Sequoia-2024-0218.jpg",
  },
  {
    name: "Shelby GT350",
    imageUrl:
      "https://www.vdm.ford.com/content/dam/brand_ford/en_us/brand/performance/gt350/2019/hotspots/3-2/19_FRD_MST_200078_350_169.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg",
  },
  {
    name: "Shelby GT500",
    imageUrl:
      "https://vehicle-images.dealerinspire.com/stock-images/ford/bf650efeed8a7a885154eccabf32cda1.png",
  },
  {
    name: "Sienna",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/0DD6B17FD63C1EAEC2A0A6F525A8CDB856CA04952FE546F6D23954561AD8E783/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USD10TOV111A021001.jpg",
  },
  {
    name: "Sierra 1500",
    imageUrl:
      "https://cgi.gmc.com/mmgprod-us/dynres/prove/image.gen?i=2024/TK10543/TK10543__4SG/GBA_09Y_0ST_1SZ_2ST_3ST_4B4_4SG_4ST_57R_5FC_5ST_65C_6FR_7FR_8HM_9HM_A2X_A45_A48_A50_A7K_AEF_AEQ_AF6_AHE_AHH_AKE_AKO_AL0_AQN_AQS_ASV_AU3_AVI_AVJ_AVK_AVU_AXG_AXK_AY0_B1J_B30_BKE_BKF_BTM_BTV_BWN_C32_C49_C59_C6A_CE1_CF5_CGN_CJ2_CTT_D07_D75_DEZ_DH6_DNS_DP6_DRZ_E35_E63_EF7_ENL_EPH_F_F48_FHX_G93_G94_GA4_GU5_H9J_HS1_IOK_IVN_J24_J61_JBP_JHD_JL1_K05_K47_K4C_KA1_KA6_KC9_KI3_KI4_KL9_KQV_KSG_KW5_LZ0_MAH_MQC_MSL_N06_N10_N38_NP5_NQH_NUB_NZZ_PDI_PPW_PRF_PTT_PZ8_QFL_QK2_QT5_RFQ_RHF_RSR_S1U_SAF_SAX_SLM_SNR_SU4_SU7_T3U_T8Z_TDM_TQ5_TRG_U12_U2K_U73_UBC_UBD_UBI_UD5_UDV_UE1_UE4_UET_UEU_UF2_UFB_UG1_UH5_UHX_UHY_UJN_UK3_UKJ_UKK_UKV_UMN_UQS_URC_URD_UTJ_UV2_UV6_UVN_V8D_VHU_VK3_VRF_VRG_VRH_VRK_VRL_VRM_VRN_VRR_VSX_VT5_VT7_VTI_VV4_WMY_YF5_YM8_Z82_Z88_ZRXgmds1.jpg&v=deg01&std=true&country=US",
  },
  {
    name: "Sierra 1500 Limited",
    imageUrl:
      "https://di-uploads-pod16.dealerinspire.com/rickhendrickbuickgmcduluth/uploads/2022/02/2022-GMC-Sierra-1500-Limited-SLT-Red.jpg",
  },
  {
    name: "Sierra 2500HD",
    imageUrl:
      "https://cgi.gmc.com/mmgprod-us/dynres/prove/image.gen?i=2024/TC20743/TC20743__1SA/GAZgmds1.jpg&v=deg01&std=true&country=US&removeCat=&background=ffffff",
  },
  {
    name: "Sierra 3500HD",
    imageUrl:
      "https://inv.assets.ansira.net/RTT/GMC/2024/5996483/default/ext_GAZ_deg02.jpg",
  },
  {
    name: "Silverado 1500",
    imageUrl:
      "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/vdc-collections/2024/trucks/1500/jellies/2024-silverado1500-ck10543-3lt-glt-trimselector.jpg?imwidth=960",
  },
  {
    name: "Silverado 1500 LD",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/BCE78385944AD739E85154E979C60C268293B769228CE49FE85A4EDE9BF73F70/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USC60CHT277E021001_2.jpg",
  },
  {
    name: "Silverado 2500HD",
    imageUrl:
      "https://images.hgmsites.net/lrg/2023-chevrolet-silverado-2500hd-4wd-crew-cab-159-high-country-angular-front-exterior-view_100858645_l.jpg",
  },
  {
    name: "Silverado 3500HD",
    imageUrl:
      "https://di-uploads-pod9.dealerinspire.com/blossomchevy/uploads/2022/12/2023-Chevy-Silverado-3500-HD-Model-Left.jpg",
  },
  {
    name: "SL-Class",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2022/09/2022-mercedes-benz-sl-63-amg-roadster-angular-front.png?fit=around%7C875:492",
  },
  {
    name: "SLC-Class",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2020/02/2020-mercedes-benz-slc-roadster-300-convertible-angular-front.png",
  },
  {
    name: "SLK-Class",
    imageUrl:
      "https://platform.cstatic-images.com/in/v2/stock_photos/510b6c88-873b-435e-9b25-d1e7d95b84ae/55c854de-ef0e-4c08-a4b2-9e5b8530f80b.png",
  },
  {
    name: "SLS AMG GT Final Edition",
    imageUrl:
      "https://luxurypulse.com/img/pictures/600206cdd4badGrau-1.jpg",
  },
  {
    name: "Sonata",
    imageUrl:
      "https://inv.assets.ansira.net/ChromeColorMatch/us/TRANSPARENT_cc_2023HYC030095_01_1280_T2G.png",
  },
  {
    name: "Sonata Hybrid",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/53926/2024-Hyundai-Sonata%20Hybrid-front_53926_032_1836x732_XB9_cropped.png",
  },
  {
    name: "Sonata Plug-in Hybrid",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/B3EFACC437AA69BC9581BFFDE9FFD8BB60EC389DE1B6F0B8A47AE8E92B6BA636/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USC60HYC311B021001.jpg",
  },
  {
    name: "Sonic",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2019/09/2020-chevrolet-sonic-lt-automatic-sedan-angular-front.png",
  },
  {
    name: "Sorento",
    imageUrl:
      "https://www.kia.com/content/dam/kwcms/kme/global/en/assets/vehicles/sorento-pe-my25/discover/kia-sorento-my25-phev-clearcut-34front.png",
  },
  {
    name: "Soul",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/5111D1321E836C1E09E43EF113F32A519595494D29F525D86C625C45CD470758/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USD30KIC101A021001.jpg",
  },
  {
    name: "Soul EV",
    imageUrl:
      "https://www.cars.com/i/large/in/v2/stock_photos/9703ebaa-6b81-4178-9285-bf02a1ecc5c6/53328f01-301f-4e21-a3d8-8d8b9d786286.png",
  },
  {
    name: "Spark",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2018/11/2019-chevrolet-spark-ls-5door-hatchback-angular-front.png",
  },
  {
    name: "Spark EV",
    imageUrl:
      "https://www.cars.com/i/large/in/v2/stock_photos/9bd84262-837b-4368-ba5f-98354ce3ab31/13b7f413-1dca-4827-9fee-1743043b4112.png",
  },
  {
    name: "Sportage",
    imageUrl:
      "https://www.kia.com/content/dam/kwcms/kme/uk/en/assets/static/nav22/Explore_range/Sportage_ICE_512x288.png",
  },
  {
    name: "Sprinter",
    imageUrl:
      "https://platform.cstatic-images.com/in/v2/stock_photos/d09244d3-a6cd-4458-b7d7-e3d0a8f030f8/2771a890-3226-4a99-87e5-939dd7cb5bb7.png",
  },
  {
    name: "Sprinter Worker",
    imageUrl:
      "https://di-uploads-pod3.s3.amazonaws.com/fletcherjonesmotorcarsoffremont/uploads/2016/04/MB_2016_Worker_Cargo.jpg",
  },
  {
    name: "SQ5",
    imageUrl:
      "https://pictures.dealer.com/generic-aoa-OEM_VIN_STOCK_PHOTOS/f38ee091f986de718b6ecb873d5f8e52.jpg",
  },
  {
    name: "SQ7",
    imageUrl:
      "https://cdn.jdpower.com/Models/640x480/2023-Audi-SQ7-Prestige.jpg",
  },
  {
    name: "SQ8",
    imageUrl:
      "https://pictures.dealer.com/generic-aoa-OEM_VIN_STOCK_PHOTOS/692ff31c19df7d3bbb366206889d9d1e.jpg?impolicy=downsize_bkpt&imdensity=1&w=520",
  },
  {
    name: "SRX",
    imageUrl:
      "https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/chrome/white/2016CAS040001_1280_01",
  },
  {
    name: "SS",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/D13BDACC68698DF9F5B194C0AACBBB1020D38E0AF0B36359F32D6C425A7618CE/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USC60CHC361A021001.jpg",
  },
  {
    name: "Stelvio",
    imageUrl:
      "https://medias.fcacanada.ca/mediaserver/iris?pov=E04&client=FCAUS&market=U&brand=Y&vehicle=2024_GU&paint=PRR&fabric=XX&bkgnd=transparent&width=1352&height=760&w=6700&h=3500&x=1500&y=3500&resp=png&sa=GUGL74,22M,2DM,PRR,TU2,WBB,XX,D7,RAN,22M,Z1B,EC2,DFW,STDAX,APA,PRR_02,XX_03,TU2,WBB,D7,RAN,MWG,GWJ",
  },
  {
    name: "Stinger",
    imageUrl:
      "https://platform.cstatic-images.com/in/v2/stock_photos/1be69813-85eb-4365-b38e-771b927f328e/cb19dd32-2633-46bf-bf37-376c5a4b6f21.png",
  },
  {
    name: "Suburban",
    imageUrl:
      "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2024/suvs/suburban/trims/2023-suburban-ck10906-3lz-glu-trimselector.jpg?imwidth=960",
  },
  {
    name: "Tacoma",
    imageUrl:
      "https://alcf.s3.us-west-1.amazonaws.com/_custom/2024/toyota/tacoma/TAC_MY24_0032_V001_jzTzdzsEY1EiT_vA5kD0moF1R4wliwg.png",
  },
  {
    name: "Tahoe",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/E20A7DA417C3871A7A601EDB9DDF38D6DB325968FB022F9056D3DC03B40E9A92/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USC80CHS111A021001.jpg",
  },
  {
    name: "Taurus",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2017/02/2017-ford-taurus-sho-sedan-angular-front.png",
  },
  {
    name: "Taycan",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2024/Porsche/Taycan/Sedan/color/Black-A1-18,18,20-640-en_US.jpg",
  },
  {
    name: "tC",
    imageUrl:
      "https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/chrome/white/2016SCC030001_1280_01",
  },
  {
    name: "Telluride",
    imageUrl:
      "https://images.dealer.com/autodata/us/color/2024/USD40KIS062C0/KDG.jpg?impolicy=downsize_bkpt&imdensity=1&w=520",
  },
  {
    name: "Terrain",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2019/09/2020-gmc-terrain-sle-suv-angular-front.png?fit=around%7C875:492",
  },
  {
    name: "Tiguan",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2024/Volkswagen/Tiguan/SUV/still/front-left/front-left-640-en_US.jpg",
  },
  {
    name: "Tiguan Limited",
    imageUrl:
      "https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/2788/",
  },
  {
    name: "Titan",
    imageUrl:
      "https://mystrongad.com/TNN_TomNaquinNissan/Titan/2020/20-Nissan-Titan-Silver.png",
  },
  {
    name: "Titan XD",
    imageUrl:
      "https://di-uploads-pod27.dealerinspire.com/newtonnissansouth/uploads/2023/12/2024-Nissan-Titan-XD-Angled-left.jpg",
  },
  {
    name: "TLX",
    imageUrl:
      "https://www.acura.com/-/media/Acura-Platform/miscellaneous-pages/global-navigation/nav-flyout-vehicles/2024/TLX/Vehicle_drop_down.png",
  },
  {
    name: "Touareg",
    imageUrl:
      "https://hips.hearstapps.com/autoweek/assets/s3fs-public/t-1_10.jpg",
  },
  {
    name: "Town and Country",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2015/11/2016-chrysler-town-and-country-limited-minivan-angular-front.png",
  },
  {
    name: "Transit Cargo Van",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/50331/2024-Ford-Transit%20350%20Cargo%20Van-front_50331_032_2400x1800_YZ.png",
  },
  {
    name: "Transit Connect",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/50694/2023-Ford-Transit%20Connect%20Cargo%20Van-front_50694_032_2400x1800_TY.png",
  },
  {
    name: "Transit Crew Van",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/50315/2023-Ford-Transit%20250%20Crew%20Van-front_50315_032_2400x1800_YZ.png",
  },
  {
    name: "Transit Passenger Van",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/14322/2021-Ford-Transit%20150%20Passenger%20Van-front_14322_032_1864x957_N1_cropped.png",
  },
  {
    name: "Transit Van",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/10702/2018-Ford-Transit%20250%20Van-front_10702_032_1849x1018_J7_cropped.png",
  },
  {
    name: "Transit Wagon",
    imageUrl:
      "https://build.ford.com/dig/Ford/Transit%20VanWagon/2024/HD-TILE/Image%5B%7CFord%7CTransit%20VanWagon%7C2024%7C1%7C1.%7C302A.X2Y.148.PYZ..88C.89K.LRL.18P.XLT.20G.18D.B2GAB.67E.16H.85C.41B.90B.21L.96K.CS2.~CA%23KA_SE%23B8.53G.51D.SRW.64H.TC8.RWD.998.57G.FLE.60C.65A.43R.59B.94A.SAA.58B.61E.62D.91B.55D.18A.15F.BS4.44U.17F.X73.96X.DPM.CLO.WAL.%5D/EXT/1/vehicle.png",
  },
  {
    name: "Traverse",
    imageUrl:
      "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/vdc-collections/2024/suvs/traverse/trims/02-images/2024-traverse-1ld56-2rs-gnt-trimselector.jpg?imwidth=960",
  },
  {
    name: "Trax",
    imageUrl:
      "https://di-uploads-pod47.dealerinspire.com/jimellischevroletofatlanta/uploads/2023/07/2024-Chevy-Trax-2RS-Model-Left.jpg",
  },
  {
    name: "TT",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2023/Audi/TT/Convertible/trim_45_0bb6f5/color/Chronos%20Grey%20Metallic-Z7PA-89,88,86-640-en_CA.jpg",
  },
  {
    name: "TT RS",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/b10856b3-afbb-44c5-a087-d2605502c455/f95f76f6-9c0f-4708-976e-596c2e6d0a6b.png",
  },
  {
    name: "TTS",
    imageUrl:
      "https://edgecast-img.yahoo.net/mysterio/api/351065660F8C702DED699C5D17D4959026526BC4DD37914DF477731BB99454B0/autoblog/resizefill_w660_h372;quality_80;format_webp;cc_31536000;/https://s.aolcdn.com/commerce/autodata/images/USC90AUC252A021001.jpg",
  },
  {
    name: "Tucson",
    imageUrl:
      "https://s7d1.scene7.com/is/image/hyundai/2024-tucson-phev-limited-awd-amazon-gray-vehicle-browse-hero:Browse?fmt=webp-alpha",
  },
  {
    name: "Tundra",
    imageUrl:
      "https://alcf.s3.us-west-1.amazonaws.com/_custom/2024/toyota/tundra/2024%20toyota%20tundra%20%281%29.png",
  },
  {
    name: "Urus",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/2021-lamborghini-urus-mmp-1-1592423712.jpg?crop=0.894xw:1.00xh;0.0561xw,0&resize=768:*",
  },
  {
    name: "UX",
    imageUrl:
      "https://www.motortrend.com/uploads/2023/04/2024-Lexus-UXh-001.jpg?fit=around%7C875:492",
  },
  {
    name: "V12 Vantage S",
    imageUrl:
      "https://images.jazelc.com/uploads/galpin/images-2015-aston-martina-v12-vantage-s-roadster.jpg",
  },
  {
    name: "V60",
    imageUrl:
      "https://cas.volvocars.com/image/dynamic/MY24_2317/225/exterior-v2/P5/1/72800/RG0R00/R16B/TC06/2G03/TP05/_/_/GR09/T101/TJ06/NP02/TM04/JG02/CB03/EV02/JB0B/T201/LF05/VP07/FH01/_/_/_/_/_/default.jpg?market=us&client=gox-graph%7Cpdps&angle=4&w=1920&bg=descriptive-studio",
  },
  {
    name: "V60 Cross Country",
    imageUrl:
      "https://www.volvocars.com/images/v/-/media/applications/pdpspecificationpage/my24/v60-cc/specifications/v60-cc-my24-og.jpg?h=630&iar=0&w=1200",
  },
  {
    name: "V8 Vantage",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/2007-aston-martin-v8-vantage-032-1619806862.jpg?crop=0.798xw:0.870xh;0.0374xw,0.130xh&resize=640:*",
  },
  {
    name: "V90",
    imageUrl:
      "https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/3087/",
  },
  {
    name: "V90 Cross Country",
    imageUrl:
      "https://www.volvocars.com/images/v/-/media/applications/pdpspecificationpage/my24/v90-cc/specifications/v90-cc-my24-hero-21x9.jpg?h=1098&iar=0&w=2560",
  },
  {
    name: "Vanquish",
    imageUrl:
      "https://www.cars.com/i/large/in/v2/stock_photos/47122322-c5bc-4e3c-af06-d3befa43c90a/48a6a595-5708-498a-881f-25cf3762137f.png",
  },
  {
    name: "Vanquish S",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/house/2018/2018-Aston%20Martin-Vanquish%20S-FrontSide_ARVANQS1801_640x480.jpg",
  },
  {
    name: "Vantage",
    imageUrl:
      "https://cdn.motor1.com/images/mgl/Akg9l6/s3/aston-martin-vantage-gt4.jpg",
  },
  {
    name: "Veloster",
    imageUrl:
      "https://platform.cstatic-images.com/in/v2/stock_photos/ce268628-0d0e-4796-8601-744c41a2675f/7f107690-c7f5-4e46-89d3-6d0529a5380d.png",
  },
  {
    name: "Venue",
    imageUrl:
      "https://s7d1.scene7.com/is/image/hyundai/2024-venue-sel-green-apple-vehicle-browse-hero:Browse?fmt=webp-alpha",
  },
  {
    name: "Venza",
    imageUrl:
      "https://www.cars.com/i/large/in/v2/stock_photos/a9d82472-18d8-47bf-8efd-1074891f641d/a2ad0690-2a06-447d-b875-93934b14787b.png",
  },
  {
    name: "Verano",
    imageUrl:
      "https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/2508/",
  },
  {
    name: "Versa",
    imageUrl:
      "https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/2754/",
  },
  {
    name: "Versa Note",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2017/02/2017-nissan-versa-note-s-plus-hatchback-angular-front.png",
  },
  {
    name: "Viper",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2017/11/2017-dodge-viper-srt-coupe-angular-front.png?fit=around%7C875:492",
  },
  {
    name: "Volt",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2016/10/2017-chevrolet-volt-lt-hatchback-angular-front.png",
  },
  {
    name: "Voyager",
    imageUrl:
      "https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/cr/model-years/14302-2022-chrysler-voyager",
  },
  {
    name: "Wraith",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/5/2020/06/2020-rolls-royce-wraith.png?fit=around%7C875:492.1875",
  },
  {
    name: "Wrangler",
    imageUrl:
      "https://content-images.carmax.com/qeontfmijmzv/1a1CkerVZwJk22RDJxIaqk/a1c9aabdb2f6bb65806359f0eea3594d/wrangler-gen-b.png?w=2100&fm=webp",
  },
  {
    name: "Wrangler JK",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2017/05/2017-jeep-wrangler-unlimited-sahara-suv-angular-front.png",
  },
  {
    name: "WRX",
    imageUrl:
      "https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/chrome/white/2023SUC170064_1280_01",
  },
  {
    name: "X1",
    imageUrl:
      "https://cache.bmwusa.com/cosy.arox?pov=walkaround&brand=WBBM&vehicle=24XB&client=byo&paint=P0668&fabric=FKUSW&sa=S01ED,S02TF,S0302,S03AT,S03MB,S0420,S0459,S04AT,S04NW,S05A4,S05AC,S05AS,S05DM,S06AC,S06AK,S0775,S07HW,S09T5&bkgnd=1&quality=70&resp=jpeg&angle=40",
  },
  {
    name: "X2",
    imageUrl:
      "https://vehicle-images.dealerinspire.com/10f9-11002413/WBX63GM01R5Z10683/68c3ca7d8fbe9f3b4d4aabff97eeec0e.jpg",
  },
  {
    name: "X3",
    imageUrl:
      "https://cache.bmwusa.com/cosy.arox?pov=walkaround&brand=WBBM&vehicle=24XQ&client=byoc&paint=P0300&fabric=FKHSW&sa=S01X8,S0255,S02TB,S0302,S0319,S03AG,S0420,S0423,S0430,S0431,S0459,S0481,S0493,S04K1,S04U0,S04UR,S0508,S0534,S0552,S05AC,S05AS,S05AV,S0676,S06AC,S06AK,S06C4,S06U2,S0775&angle=30",
  },
  {
    name: "X4",
    imageUrl:
      "https://cdn.bmwblog.com/wp-content/uploads/2022/04/BMW-X4-M40i-M-Sport-Edition-1-scaled.jpg",
  },
  {
    name: "X5",
    imageUrl:
      "https://cache.bmwusa.com/cosy.arox?pov=walkaround&brand=WBBM&vehicle=25XO&client=byo&paint=P0300&fabric=FKPSW&sa=S01CE,S01SF,S0255,S02TB,S0302,S0319,S0322,S03AT,S03MB,S0402,S0420,S0423,S0459,S0481,S0494,S04FL,S04KR,S04T8,S04UR,S0552,S05AC,S05AS,S05DM,S0676,S06AC,S06AK,S06C4,S06CP,S06NX,S06U2,S0775&quality=70&bkgnd=transparent&resp=png&angle=40&w=9800&h=8000&x=100&y=1100",
  },
  {
    name: "X6",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/54513/2025-BMW-X6-front_54513_032_2400x1800_A96.png",
  },
  {
    name: "X7",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/52824/2025-BMW-X7-front_52824_032_1838x859_C36_cropped.png",
  },
  {
    name: "xB",
    imageUrl:
      "https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/chrome/white/2015SCI002a_1280_01",
  },
  {
    name: "XC40",
    imageUrl:
      "https://cas.volvocars.com/image/dynamic/MY24_2317/536/exterior-v4/48/62600/RD0000/R152/FN01/TC06/2G03/_/TP02/LR02/JT02/GR03/T102/TJ01/NP02/TM02/_/_/EV02/JB11/T21C/LF01/_/VP07/FH02/_/_/_/_/_/_/default.jpg?market=us&client=gox-graph%7Cpdps&angle=4&w=1920&bg=descriptive-studio",
  },
  {
    name: "XC60",
    imageUrl:
      "https://cas.volvocars.com/image/dynamic/MY24_2317/246/exterior-v3/P5/71700/RG0R00/R16A/TC05/_/2G03/TP05/LR02/_/GR09/T101/TJ06/NP02/TM04/JG02/CB03/EV02/JB0B/T201/LF05/_/VP07/UF08/FH01/T006/_/_/_/default.jpg?market=us&client=gox-graph%7Cpdps&angle=4&w=1920&bg=descriptive-studio",
  },
  {
    name: "XC70",
    imageUrl:
      "https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/cr/model-years/7448-2016-volvo-xc70",
  },
  {
    name: "XC90",
    imageUrl:
      "https://pictures.dealer.com/v/volvoofcaryvcna/1626/0fdc18f2f76a524605d172594d57dae4x.jpg?impolicy=downsize&w=568",
  },
  {
    name: "XE",
    imageUrl:
      "https://www.daytondailynews.com/resizer/A3mX8ftOGUkR4RIBdOXydkXqjPA=/814x458/cloudfront-us-east-1.images.arcpublishing.com/coxohio/XLKITG7F7C7BXIGMXT22ND34AA.jpg",
  },
  {
    name: "XF",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2024/Jaguar/XF/Sedan/color/British%20Racing%20Green%20Metallic-1DQ-18,41,35-640-en_US.jpg",
  },
  {
    name: "XJ-Series",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2015/11/2015-jaguar-xjseries-xjl-supercharged-sedan-angular-front.png?fit=around%7C875:492",
  },
  {
    name: "XK-Series",
    imageUrl:
      "https://www.motortrend.com/uploads/sites/10/2015/11/2014-jaguar-xk-rs-coupe-angular-front.png",
  },
  {
    name: "XT4",
    imageUrl:
      "https://images.dealer.com/ddc/vehicles/2024/CADILLAC/XT4/SUV/perspective/front-left/2024_76.png",
  },
  {
    name: "XT5",
    imageUrl:
      "https://di-sitebuilder-assets.s3.amazonaws.com/GMimages/cadillacInterior/DareToCompare/XT5/2023/hero.png",
  },
  {
    name: "XT6",
    imageUrl:
      "https://di-uploads-pod12.dealerinspire.com/teamcadillacvallejo/uploads/2022/01/2022-cadillac-xt6-crystal-white-tricoat-1024x576.jpg",
  },
  {
    name: "Xterra",
    imageUrl:
      "https://www-europe.nissan-cdn.net/content/dam/Nissan/nissan_middle_east/vehicles/X-TERRA/grades/2022/2022%20%20X-TERRA-SE-4WD-SE-2.5L-I4-165-HP.jpg",
  },
  {
    name: "XTS",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/12939/2019-Cadillac-XTS-front_12939_032_1801x735_GB8_cropped.png",
  },
  {
    name: "XV Crosstrek",
    imageUrl:
      "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/58f23ecf-0d76-42b7-8330-12c97db82126/fa15db2d-4f69-4309-bce9-bac1669932ec.png",
  },
  {
    name: "Yaris",
    imageUrl:
      "https://www.cars.com/i/large/in/v2/stock_photos/ac2648b6-decd-4ef5-9c41-bfd50a0b0f92/7bea3165-3476-44fb-b45c-763f9f132335.png",
  },
  {
    name: "Yaris Hatchback",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/13979/2020-Toyota-Yaris%20Hatchback-front_13979_032_2400x1800_47A.png",
  },
  {
    name: "Yaris iA",
    imageUrl:
      "https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/2654/",
  },
  {
    name: "Yukon",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/53069/2024-GMC-Yukon-front_53069_032_1829x904_GNT_cropped.png",
  },
  {
    name: "Yukon XL",
    imageUrl:
      "https://file.kelleybluebookimages.com/kbb/base/evox/CP/52656/2024-GMC-Yukon%20XL-front_52656_032_1809x858_GLU_cropped.png",
  },
  {
    name: "Z4",
    imageUrl:
      "https://cdni.autocarindia.com/utils/ImageResizerV2.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Z4ModelImage.jpg",
  },
];

const insertModelImageQuery = `
  UPDATE make_models
  SET imageurl = data.imageurl 
  FROM (
    VALUES
      ${images
        .map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`)
        .join(", ")}
  ) AS data(name, imageurl)
  WHERE make_models.name = data.name;
`;

async function insertImages() {
  const client = await pool.connect();

  try {
    const params = images.reduce(
      (acc, item) => [...acc, item.name, item.imageUrl],
      []
    );

    await client.query(insertModelImageQuery, params);
    console.log("Image URLs successfully inserted");
  } catch (err) {
    console.error("Error inserting image URLs:", err);
  } finally {
    client.release();
  }
}

insertImages();
