# Layout Render Engine

This engine uses data from the backend to render a dynamic and interactive web scene, which provides user with better experience on searching and understanding space information.

## Viz.js
The main part of this engine, it prepare basic three.js elements (such as renderer, scene, camera, lights), and also includes all mouse events.

### Parameters
| param        | note                                                                    |
| ------------ | ----------------------------------------------------------------------- |
| mount        | it is used to link renderer to div                                      |
| floor_uuid   | passed from props                                                       |
| base_api     | api to get data                                                         |
| meshArray    | to collect mesh elements return from RoomGenerator                      |
| GroupBB3     | group bounding box, used to center layout                               |
| camera       |
| scene        |
| targetWidth  | DOM Element width, changed by resize                                    |
| targetHeight | DOM Element Height, changed by resize                                   |
| isButtonOn   | control button event                                                    |
| isDrag       | to avoid click while mouse drag                                         |
| mouse        | collect mouse position                                                  |
| raycaster    | used to transfer window mouse position to three.js 3D coordinate system |
| timmerHandle | to avoid click when mouse drag                                          |
| INTERSECTED  | collect intersected object                                              |
| isTouched    | control touch event                                                     |
| roomInfo     | collect room info                                                       |

### retriveData()
axios, a third party library, is provided to fetch data from REST API. recursive function used to get **pagination** backend results. 

#### Data Source
Get room infomation on a certain floor by using api below:
```javascript
const base_api = "http://127.0.0.1:8000/apis/v1/rooms/?level_id=";
const url = base_api + floor_uuid;
```

#### Data Types
| param               |            type             |                                           note |
| ------------------- | :-------------------------: | ---------------------------------------------: |
| level_id            |           string            |                                  uuid from PMR |
| room_revit_id       |           integer           |                                                |
| room_uuid           |           string            |           generated randomly, not from PMR now |
| room_name           |           string            |                                                |
| room_number         |           string            |                                                |
| area                |            float            |                                                |
| has_window          |           boolean           |                                                |
| deskcount           |           integer           |                                                |
| physical_desekcount |           integer           |                                                |
| program_type        |           string            |                                                |
| interal_room_count  |           integer           |                                                |
| has_av              |           boolean           |                                                |
| coordinates         | array(array(array(number))) | blocks(points(x,y)), z will be added in future |
| level_revit_id      |           integer           |                                                |

#### Data Example  <!-- omit in toc -->
``` javascript
{
    "level_id": "7d74d0c4-b2e6-4dca-81cd-b35cf25dddae",
    "room_revit_id": 10851278,
    "room_uuid": "26e7c87c-6a34-430a-8868-2d0572443a80",
    "room_name": "PRIVATE OFFICE",
    "room_number": "02-127",
    "area": 214.5251,
    "has_window": false,
    "deskcount": 7,
    "physical_deskcount": 7,
    "program_type": "WORK",
    "internal_room_count": 0,
    "has_av": false,
    "outline": {
        "type": "Polygon",
        "coordinates": [
            [
                [
                    -137.13910761155526,
                    87.26377952755884
                ],
                [
                    -137.1391076115553,
                    76.44356955380151
                ],
                [
                    -117.31277365155003,
                    76.44356955380145
                ],
                [
                    -117.31277365155002,
                    87.26377952755877
                ],
                [
                    -137.13910761155526,
                    87.26377952755884
                ]
            ]
        ]
    },
    "level_revit_id": 10707002
}
```

### showView()
#### Groups
three.js provides Group() function to gather same property objects into a group. In the render engine, three groups are currently used.
* primary group --> all the obejcts are collected under this group
* secondary_work group --> it contains room meshes with 'WORK' and 'MEET' program_type
* secondary_extra group --> it contains the rest of room meshes

Note: Currently, the goal of seperating objects into groups is to easily control the mouse event, limiting potential objects to be intersected. primary group is mained to creat whole bounding box for centering the scene.

#### handleResize()
It is a little tricky here. Primary group has a bounding box (rect) to center the scene. Camera has a rectangle area to capture all objects. Also, browser has a screen (rect) to show the camera area. Thus, aspect ratios of the bounding box, camera and browser should be same. Otherwise, the shape of the original object will be stretched.

### onButtonClick()
Mouse event for button click. The button is created by @material-ui/core.

## Camera.js
the reason why THREE.OrthographicCamera is used is that in this projection mode, an object's size in the rendered image stays constant regardless of its distance from the camera.

### parameters
| params        | note                                    |
| ------------- | --------------------------------------- |
| width         | width in the 3D coordinate system       |
| height        | height in the 3D coordinate system      |
| bb3           | bounding box of primary group           |
| targetWidth   | width of the browser DOM element        |
| targetHeight  | height of the browser DOM element       |
| offsetPixsels | offset a bit to avoid touching the edge |


## CameraControls.js
OrbitControls is used to control the camera actions including PAN, ZOOM, ROTATE.

### parameters
| params             | value     | note                                     |
| ------------------ | --------- | ---------------------------------------- |
| enableRotate       | true      |
| maxPolarAngle      | Math.PI/2 | limit camera rotation angle to 90 degree |
| screenSpacePanning | true      | camera pans in screen space.             |
| target             | (0,0,0)   |

## Mesh.js
The main purpose of this module is to transfer room data to three.js mesh object.

two main parts:

- objects like mesh can assign properties and funcitons just like folloing, which is very convienent create mesh with room attributes. 
```javascript
mesh.rooName = "PRIVATE OFFICE"
mesh.callback = function() {
    alert(room_name + " " + room_number)
}
```
- Text and edgeline can be added to mesh directly. Make sure that one mesh has one text and edge lines on that.
```javascript
const roomText = new TextGenerator(mesh);
mesh.add(roomText);

let roomFrameLines = new THREE.LineSegments(roomFrameEdges, edgeMtl);
mesh.add(roomFrameLines);
```

Note: lineWidth cannot be thinner or fatter because ANGLE limitation written in three.js docs.

## PoppperControl.js
A Popper (from @material-ui/core) can be used to display some content on top of another. When a object in the three.js renderer is touched, a popper will show the infomation about the object.

Note: why popper? Previously, canvas sprite was used, but it was not clear and the canvas will be resized when passed into THREE.CanvasTexture

info list (now):
- Room Name
- Room Number
- Desk Count
- Physical Desk Count

### Anchor Element
The purpose of this module is to create a popper following the cursor and not prevent three.js mouse event. 

Popper provides customised anchor element (by default, it should be DOM Element). Thus, the popper position can be changed with mouse movement dynamicaly. However, the mouse event will be blocked because the popper refreshed again and again at the top of the renderer. Thus, the anchor element fixed to the top left of the window.


## Text.js
A third party three.texttexture provides wrapped sprite text api. Basically, it gets the room Bounding Box to calculate the position of the Text, and uses roomNumber to put the words on the sprite.

Note: @19.0.0 is used in this project. Font width does not work well using the up-to-date version.

## helpers.js
it provides CameraHelper, LightHelper and AxesHepler for development uses.

