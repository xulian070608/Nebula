import React, { Component } from "react";
import FloorMapGL from "@wework/floormap.gl";
import { createRenderObjects, applyInstancing } from "@wework/floormap-utils";
import get from "lodash/get";
import { stringArrayToPoints } from "./floormap-utils";
import axios from "axios";

class FloorMap extends Component {
  constructor(props) {
    super(props);
    this.target = React.createRef(); // used for domElement reference
    this.colorSchema = {
      WORK: "rgb(171,221,231)",
      MEET: "rgb(183,240,217)",
      OPERATE: "rgb(226,226,226)",
      SERVE: "rgb(253,235,236)", // ideally, the color should be as WE
      WE: "rgb(255,210,106)",
      CIRCULATE: "rgb(255,247,223)",
      WASH: "rgb(195,195,195)"
    };
    this.roomInfoList = []; // collection of all rooms from restful api
    // this.base_api = "http://100.94.29.214:8000/apis/v1/rooms/?level_id=";
    this.base_api = "http://127.0.0.1:8000/apis/v1/rooms/?level_id=";
    this.url = this.base_api + this.props.level_uuid;
  }

  componentDidMount() {
    const target = this.target.current;
    this.renderer = new FloorMapGL({
      target: target,
      size: {
        width: 900,
        height: 600
      },
      backgroundColor: "rgb(248,248,248)",
      antialias: true,
      pixelRatio: 2
    });

    this.renderEngine(this.url);

    this.renderer.addEventListener(
      FloorMapGL.Events.ONMOUSEOVER,
      this.handleMouseOver
    );

    this.renderer.addEventListener(
      FloorMapGL.Events.ONMOUSEOUT,
      this.handleMouseOut
    );

    this.renderer.addEventListener(
      FloorMapGL.Events.ONCLICK,
      this.handleOnClick
    );

    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    this.renderer.removeAll();
    this.renderer.dispose();
    this.renderer = null;
  }

  updateDimensions = () => {
    this.renderer.updateWindowDimension({
      width: this.target.current.offsetWidth,
      height: this.target.current.offsetHeight
    });
  };

  renderEngine(url) {
    axios.get(url).then(res => {
      res.data.results.map(info => {
        info["type"] = "room"; // hard coded all room type info
        this.roomInfoList.push(info);
      });
      if (res.data.next !== null) {
        this.renderEngine(res.data.next);
      } else {
        this.renderRooms(this.roomInfoList);
        this.renderer.fitContent({
          padding: 50
        }); // center layout
      }
    });
  }

  renderRooms = data => {
    let renderObjs = [];
    data.forEach(room => {
      const objs = this.getRenderObjects(room);
      objs.forEach(o => {
        renderObjs.push(o);
      });
    });

    applyInstancing(renderObjs, this.renderer);
    this.renderer.draw(renderObjs);
  };

  getRenderObjects = room => {
    let shapes = [];
    const boundaries = get(room, "outline.coordinates");
    boundaries.forEach((boundary, idx) => {
      const points = stringArrayToPoints(boundary);
      shapes.push(points);
    });
    const roomType = get(room, "room_name");
    const objectType = get(room, "object_type");
    // if (objectType === "TABLE" || objectType === "CHAIR") {
    //   shapes = [];
    // }
    // let centroid;
    // const c = get(room, "attributes.centroid");
    // if (c) {
    //   centroid = convertBounds(c);
    // }
    const params = {
      id: room.room_uuid,
      shapes: shapes,
      type: get(room, "type"),
      subType: objectType ? objectType : roomType,
      programType: get(room, "program_type"),
      roomNumber: get(room, "room_number"),
      hasWindow: get(room, "has_window")
    };
    // console.log(params);

    let objs = createRenderObjects(params);
    return objs;
  };

  handleMouseOver = evt => {
    // console.log(evt.payload.id);
    var pointId = evt.payload.id;
    var obj = this.roomInfoList.find(function(obj) {
      return obj.room_uuid === pointId;
    });
    var type = obj.type;
    if (type === "room") {
      this.renderer.draw({
        id: pointId,
        style: {
          color: "rgb(255,255,255)"
        }
      });
    }
  };

  handleMouseOut = evt => {
    var pointId = evt.payload.id;
    var obj = this.roomInfoList.find(function(obj) {
      return obj.room_uuid === pointId;
    });
    var type = obj.type;
    if (type === "room") {
      var programType = obj.program_type;
      var hasWindow = obj.has_window;
      if (programType === "WORK" && hasWindow === true) {
        this.renderer.draw({
          id: pointId,
          style: {
            color: "rgb(228,243,247)"
          }
        });
      } else {
        this.renderer.draw({
          id: pointId,
          style: {
            color: this.colorSchema[programType]
          }
        });
      }
    }
    // } else if (type === "object") {
    //   var subType = obj.attributes.objectType;
    //   if (subType === "CHAIR") {
    //     this.renderer.draw({
    //       id: pointId,
    //       style: {
    //         color: "rgb(206,206,206)"
    //       }
    //     });
    //   } else if (subType === "TABLE") {
    //     this.renderer.draw({
    //       id: pointId,
    //       style: {
    //         color: "rgb(246,241,241)",
    //       }
    //     });
    //   }
    // }
  };

  handleOnClick = evt => {
    var pointId = evt.payload.id;
    var obj = this.roomInfoList.find(function(obj) {
      return obj.room_uuid === pointId;
    });
    if (obj.type === "room") {
      var roomNumber = obj.room_number;
      // var hasWindow = obj.has_window;
      // var programType = obj.program_type;
      alert(roomNumber);
    }
  };

  render() {
    return <div ref={this.target} />;
  }
}

export default FloorMap;
