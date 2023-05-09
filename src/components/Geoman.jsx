import { useEffect, useState } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

const Geoman = () => {
  const [GeoData, setGeoData] = useState([]);
  const [Det, setDet] = useState([]);
  const context = useLeafletContext();

  useEffect(
    () => {
      const leafletContainer = context.layerContainer || context.map;

      leafletContainer.pm.addControls({});

      leafletContainer.pm.setGlobalOptions({ pmIgnore: false });

      leafletContainer.on("pm:create", (e) => {
        if (e.layer && e.layer.pm) {
          const shape = e;
          console.log(e);
          // enable editing of circle
          shape.layer.pm.enable();

          console.log(`object created: ${shape.layer.pm.getShape()}`);
          console.log(
            leafletContainer.pm.getGeomanLayers(true).toGeoJSON().features
          );

          setGeoData(() => result);

          let result = leafletContainer.pm
            .getGeomanLayers(true)
            .toGeoJSON()
            .features.map((details) => ({ text: details.geometry }));

          console.log(result);

          leafletContainer.pm
            .getGeomanLayers(true)
            .bindPopup("i am whole")
            .openPopup();

          const array = ["Rectangle", "Line", "Polygon"];

          if (array.includes(`${shape.layer.pm.getShape()}`) === true) {
            leafletContainer.pm.getGeomanLayers().map((layer, index) => {
              layer.bindPopup(
                `I am figure N° ${index} and ${shape.layer.pm.getShape()} and
                ${shape.layer._latlngs}`
              );
            });
          } else {
            leafletContainer.pm.getGeomanLayers().map((layer, index) => {
              layer.bindPopup(
                `I am figure N° ${index} and ${shape.layer.pm.getShape()}
                 and ${shape.layer._latlng}`
              );
            });
          }

          shape.layer.on("pm:edit", (e) => {
            const event = e;
            // console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
          });
        }
      });

      leafletContainer.on("pm:remove", (e) => {
        console.log("object removed");
        // console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
      });

      GeoData.map((item) => {
        let det = item.text.coordinates;
        const arr = det.join("");
        const splitarr = arr.split(",");
        console.log(splitarr);
        console.log(arr);
        setDet(() => splitarr);
        console.log(Det);
      });

      return () => {
        leafletContainer.pm.removeControls();
        leafletContainer.pm.setGlobalOptions({ pmIgnore: true });
      };
    },
    [GeoData],
    [Det]
  );

  console.log(GeoData);

  return (
    <>
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 500,
          top: "30px",
          right: 0,
          zIndex: 10000,
          backgroundColor: "white",
          overflow: "scroll",
          borderRadius: "20px",
          borderStyle: "solid",
        }}
      >
        <div>
          <div
            style={{
              backgroundColor: "white",
              width: "150px",
              height: "100px",
              position: "fixed",
              top: "30px",
              left: "1150px",
            }}
          >
            <h1
              style={{
                fontFamily: "B-Nazanin",
              }}
            >
              مشخصات جغرافیایی
            </h1>
          </div>
          <div style={{ marginTop: "50px" }}>
            {GeoData.map((layer, index) => (
              <>
                <p key={index}>{layer.text.type}</p>
                <p>{layer.text.coordinates}</p>
              </>
            ))}
          </div>
          <div>
            {Det.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  // return null;
};

export default Geoman;
