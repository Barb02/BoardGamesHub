import { ResponsiveLine } from "@nivo/line";

function PricesGraph({ className,data }) {

  return (
    <div className={` h-1 ${className}`}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ format: "%b %d %Y", type: "time" }}
        xFormat="time:%b %d %Y"
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="stepAfter"
        axisTop={null}
        axisRight={null}
        theme={
            {"tooltip": {
                "container": {
                    "background": "#000"
                }
            },
             "axis":{
              "legend":{
                "text":{
                  "fill":"#ffffff"
                }
              },
              "ticks":{
                "text":{
                  "fill":"#ffffff"
                }
              }
             },
             "legends":{
                "text":{
                  "fill":"#ffffff"
                }
             }
          }
        }
        axisBottom={{
          //tickSize: 5,
          //tickPadding: 5,
          //tickRotation: 0,
          format: "%b %d",
          legend: "Date",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Price",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={{ scheme: "dark2" }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}

export default PricesGraph;
