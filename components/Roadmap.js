import { Map, MapMarker, Roadview, MapTypeId } from "react-kakao-maps-sdk";
import React, { useState } from "react";
import { useRouter } from "next/router";
import data from "../utils/data";
import Layout from "../components/Layout";

export default function Roadmap() {
  const { query } = useRouter();
  const { REFINE_ZIPNO } = query;
  const restaurant = data.restaurants.find(
    (x) => x.REFINE_ZIPNO === REFINE_ZIPNO
  );

  const [isError, setIsError] = useState(false);
  const [center, setCenter] = useState({
    lat: restaurant.REFINE_WGS84_LAT,
    lng: restaurant.REFINE_WGS84_LOGT,
  });

  // if (!restaurant) {
  //   return <Layout title="Restaurant Not Found">Restaurant Not Found</Layout>;
  // }

  return (
    <div style={{ display: "flex" }}>
      {/* <MapTypeId type={kakao.maps.MapTypeId.ROADMAP} /> */}
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: restaurant.REFINE_WGS84_LAT,
          lng: restaurant.REFINE_WGS84_LOGT,
        }}
        style={{
          // 지도의 크기
          width: isError ? "100%" : "50%",
          height: "400px",
        }}
        level={5}
        onClick={(_, mouseEvent) => {
          setCenter({
            // @ts-ignore
            lat: mouseEvent.latLng.getLat(),
            // @ts-ignore
            lng: mouseEvent.latLng.getLng(),
          });
          setIsError(false);
        }}
      >
        <MapMarker
          position={center}
          draggable={true}
          onDragEnd={(marker) => {
            setCenter({
              // @ts-ignore
              lat: marker.getPosition().getLat(),
              // @ts-ignore
              lng: marker.getPosition().getLng(),
            });
            setIsError(false);
          }}
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png",
            size: { width: 26, height: 46 },
            options: {
              spriteSize: { width: 1666, height: 168 },
              spriteOrigin: { x: 705, y: 114 },
              offset: { x: 13, y: 46 },
            },
          }}
        />
      </Map>
      <Roadview // 로드뷰를 표시할 Container
        position={{ ...center, radius: 50 }}
        style={{
          // 지도의 크기
          width: isError ? "0" : "50%",
          height: "400px",
        }}
        onErrorGetNearestPanoId={() => setIsError(true)}
      ></Roadview>
    </div>
  );
}
