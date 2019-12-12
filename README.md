[//]: # (use this line to add comments)
# Palette Picker API

## Collaborators  
- Eric Meldrum - [github account](https://github.com/ericwm76)
- Kirk Veitch - [github account](https://github.com/KVeitch)

[//]: # (need to add project description)

## Technology / Libraries 

- Express.js
- Knex
- Enzyme/Jest
- Postgres
- JavaScript / Node.js

### Clone down the API

1. Clone down the repo [Palette Picker Back-end](https://github.com/KVeitch/palette-picker-back-end.git)
2. Switch to the cloned directory
3. In your terminal run  
                          ```npm install```
4. Then run   
              ```npm start```


## API Endpoints
### Base URL
All URLs referenced in the documentation have the following base:  
http://localhost:3000 for the local instance  
or  
https://******-api.herokuapp.com for the remote version.

<details><summary>GET <code>'/'</code></summary>  

  #### Response
  Link to API documentation  
</details>

#### PROJECTS Endpoints

<details><summary>GET <code>/api/v1/projects</code></summary>

<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Response</th>
    </tr>
  </thead>
  <tr>
    <th>
      200
    </th>
    <th>
      Returns an array containing all of the project objects
    </th>
  </tr>
</table>

<details> <summary>Example Response</summary>

```json
    [
      {
        "id": 1,
        "project_name": "Bob's House",
        "user_id": 1,
        "created_at": "2019-12-04T21:49:58.550Z",
        "updated_at": "2019-12-04T21:49:58.550Z"
      },
      {
        "id": 2,
        "project_name": "Susans's House",
        "user_id": 2,
        "created_at": "2019-12-04T21:49:58.554Z",
        "updated_at": "2019-12-04T21:49:58.554Z"
      },
      {
        "id": 3,
        "project_name": "Master Bath",
        "user_id": 1,
        "created_at": "2019-12-04T21:49:58.553Z",
        "updated_at": "2019-12-04T21:49:58.553Z"
      }
    ]
```

  </details>

---

</details>

<details><summary>POST <code>/api/v1/projects</code></summary>

<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Response</th>
    </tr>
  </thead>
  <tr>
    <th>
      201
    </th>
    <th>
      Returns the project object that was posted.
    </th>
  </tr>
    <tr>
    <th>
      422
    </th>
    <th>
      <code>{
        error: `Expected format: { project_name: <String>, user_id: <Integer> }. You're missing a "${requiredParameter}" property.`
      }</code> 
    </th>
  </tr>
</table>

  <details> <summary>Example Response</summary>

```json
{
    "project_name": "Bob's Bike Jersey",
    "user_id": 1,
    "id": 5
}

```

  </details>

  ---

</details>

<details><summary>GET <code>/api/v1/projects/:id</code></summary>
<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Response</th>
    </tr>
  </thead>
  <tr>
    <th>
      200
    </th>
    <th>
      Returns a specific project object. 
    </th>
  </tr>
    <tr>
    <th>
      404
    </th>
    <th>
      <code>{
    "error": "There is not a project with an id of 1000"
}</code> 
    </th>
  </tr>
</table>

  <details> <summary>Example Response</summary>

```json
[
    {
        "id": 2,
        "project_name": "Susans's House",
        "user_id": 2,
        "created_at": "2019-12-04T21:49:58.554Z",
        "updated_at": "2019-12-04T21:49:58.554Z"
    }
]

```

  </details>

  ---

</details>

<details><summary>PATCH <code>/api/v1/projects/:id</code></summary>

<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Response</th>
    </tr>
  </thead>
  <tr>
    <th>
      201
    </th>
    <th>
      Returns the name of the project updated. 
    </th>
  </tr>
    <tr>
    <th>
      404
    </th>
    <th>
      <code>{
    "error": `No project matching that id was found!`
}</code> 
    </th>
  </tr>
</table>

  <details> <summary>Example Response</summary>

```json
    "Susan's Bike Jersey"
```
  </details>

  ---

</details>

<details><summary>DELETE <code>/api/v1/projects/:id</code></summary>
<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Response</th>
    </tr>
  </thead>
  <tr>
    <th>
      202
    </th>
    <th>
      `Project ${id} was deleted`
    </th>
  </tr>
    <tr>
    <th>
      404
    </th>
    <th>
      <code>{
    "error": `No project with id of ${id} was found`
}</code> 
    </th>
  </tr>
</table>

  <details> <summary>Example Response</summary>

```json
  `Project ${id} was deleted`
```

  </details>

  ---

</details>

<details><summary>GET <code>/api/v1/users/:id/projects</code></summary> 

<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Response</th>
    </tr>
  </thead>
  <tr>
    <th>
      200
    </th>
    <th>
      Returns an array of all project objects associated with that user ID.
    </th>
  </tr>
    <tr>
    <th>
      404
    </th>
    <th>
      `No projects associated with that user ID were found`  
    </th>
  </tr>
</table>

  <details> <summary>Example Response</summary>

GET from /api/v1/users/1/projects
  
```json
    [
      {
        "id": 1,
        "project_name": "Bob's House",
        "user_id": 1,
        "created_at": "2019-12-04T21:49:58.550Z",
        "updated_at": "2019-12-04T21:49:58.550Z"
      },
      {
        "id": 3,
        "project_name": "Master Bath",
        "user_id": 1,
        "created_at": "2019-12-04T21:49:58.553Z",
        "updated_at": "2019-12-04T21:49:58.553Z"
      }
    ]

```

  </details>

  ---

</details>

#### PALETTES Endpoints

<details><summary>GET <code>/api/v1/palettes</code></summary>

<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Response</th>
    </tr>
  </thead>
  <tr>
    <th>
      200
    </th>
    <th>
      Returns an array containing all of the palette objects
    </th>
  </tr>
</table>

  <details> <summary>Example Response</summary>

```json
[
    {
        "id": 1,
        "palette_name": "Colors",
        "project_id": 1,
        "color0": "6320ee",
        "color1": "D5f2e3",
        "color2": "999950",
        "color3": "C7B446",
        "color4": "C2B078",
        "created_at": "2019-12-04T21:49:58.568Z",
        "updated_at": "2019-12-04T21:49:58.568Z"
    },
    {
        "id": 2,
        "palette_name": "Bright",
        "project_id": 1,
        "color0": "786fa6",
        "color1": "f19066",
        "color2": "FFFF00",
        "color3": "EDFF21",
        "color4": "A98307",
        "created_at": "2019-12-04T21:49:58.571Z",
        "updated_at": "2019-12-04T21:49:58.571Z"
    },
    {
        "id": 3,
        "palette_name": "Joker",
        "project_id": 1,
        "color0": "211a1d",
        "color1": "6320ee",
        "color2": "D5f2e3",
        "color3": "8075ff",
        "color4": "8fc93a",
        "created_at": "2019-12-04T21:49:58.572Z",
        "updated_at": "2019-12-04T21:49:58.572Z"
    },
    {
        "id": 4,
        "palette_name": "Russian Flat",
        "project_id": 1,
        "color0": "f19066",
        "color1": "786fa6",
        "color2": "f19066",
        "color3": "786fa6",
        "color4": "574b90",
        "created_at": "2019-12-04T21:49:58.572Z",
        "updated_at": "2019-12-04T21:49:58.572Z"
    }
]

```

  </details>

  ---

</details>

<details><summary>GET <code>/api/v1/palettes/:id</code></summary>

<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Response</th>
    </tr>
  </thead>
  <tr>
    <th>
      200
    </th>
    <th>
      Returns a specific palette object. 
    </th>
  </tr>
    <tr>
    <th>
      404
    </th>
    <th>
      <code>{
    "error": "There is not a palette with an id of 1000"
}</code> 
    </th>
  </tr>
</table>

  <details> <summary>Example Response</summary>

```json
[
    {
        "id": 8,
        "palette_name": "BeachHouse",
        "project_id": 2,
        "color0": "Cc2936",
        "color1": "0a2934",
        "color2": "Ebbab9",
        "color3": "388697",
        "color4": "B5ffe1",
        "created_at": "2019-12-04T21:49:58.579Z",
        "updated_at": "2019-12-04T21:49:58.579Z"
    }
]
```

  </details>

  ---

</details>

<details><summary>GET <code>/api/v1/palettes/search/:color</code></summary>
  :color must be a hex code, without the # symbol in front. 

<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Response</th>
    </tr>
  </thead>
  <tr>
    <th>
      200
    </th>
    <th>
      Returns an array of all palette objects containing that color.
    </th>
  </tr>
    <tr>
    <th>
      404
    </th>
    <th>
      <code>{
    `No palettes containing ${color} were found`
}</code> 
    </th>
  </tr>
</table>

  <details> <summary>Example Response</summary>

GET from /api/v1/palettes/search/786fa6
  
```json
[
    {
        "id": 2,
        "palette_name": "Bright",
        "project_id": 1,
        "color0": "786fa6",
        "color1": "f19066",
        "color2": "FFFF00",
        "color3": "EDFF21",
        "color4": "A98307",
        "created_at": "2019-12-04T21:49:58.571Z",
        "updated_at": "2019-12-04T21:49:58.571Z"
    },
    {
        "id": 4,
        "palette_name": "Russian Flat",
        "project_id": 1,
        "color0": "f19066",
        "color1": "786fa6",
        "color2": "f19066",
        "color3": "786fa6",
        "color4": "574b90",
        "created_at": "2019-12-04T21:49:58.572Z",
        "updated_at": "2019-12-04T21:49:58.572Z"
    }
]

```

  </details>

  ---

</details>

<details><summary>GET <code>/api/v1/projects/:id/palettes</code></summary> 

<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Response</th>
    </tr>
  </thead>
  <tr>
    <th>
      200
    </th>
    <th>
      Returns an array of all palette objects associated with that project ID.
    </th>
  </tr>
    <tr>
    <th>
      404
    </th>
    <th>
      Returns an array containing an empty string.  
    </th>
  </tr>
</table>

  <details> <summary>Example Response</summary>

GET from /api/v1/projects/1/palettes
  
```json
[
    {
        "id": 2,
        "palette_name": "Bright",
        "project_id": 1,
        "color0": "786fa6",
        "color1": "f19066",
        "color2": "FFFF00",
        "color3": "EDFF21",
        "color4": "A98307",
        "created_at": "2019-12-04T21:49:58.571Z",
        "updated_at": "2019-12-04T21:49:58.571Z"
    },
    {
        "id": 4,
        "palette_name": "Russian Flat",
        "project_id": 1,
        "color0": "f19066",
        "color1": "786fa6",
        "color2": "f19066",
        "color3": "786fa6",
        "color4": "574b90",
        "created_at": "2019-12-04T21:49:58.572Z",
        "updated_at": "2019-12-04T21:49:58.572Z"
    }
]

```

  </details>

  ---

</details>

<details><summary>POST <code>/api/v1/palettes</code></summary>

<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Response</th>
    </tr>
  </thead>
  <tr>
    <th>
      201
    </th>
    <th>
      Returns the palette object that was posted.
    </th>
  </tr>
    <tr>
    <th>
      422
    </th>
    <th>
      <code>{
        error: `Expected format: { 
        'project_id':<String>, 
        'palette_name':<String>, 
        'color0':<String>,
        'color1':<String>,
        'color2':<String>,
        'color3':<String>,
        'color4':<String>
        }. You're missing a "${requiredParameter}" property.`
      }</code> 
    </th>
  </tr>
</table>

  <details> <summary>Example Response</summary>

```json
    {
        "id": 4,
        "palette_name": "Russian Flat",
        "project_id": 1,
        "color0": "f19066",
        "color1": "786fa6",
        "color2": "f19066",
        "color3": "786fa6",
        "color4": "574b90"
    }

```

  </details>

  ---

</details>

#### LOGIN Endpoints

<details><summary>GET <code>/api/v1/login</code></summary>


  <details> <summary>Example Response</summary>

```json


```

  </details>

  ---

</details>

