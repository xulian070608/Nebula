import React from "react"
import TableRow01 from "./TableRow01"
// import wwFloors from "/Users/mynovmbr/code/django-todo-react/frontend/src/data/floor_stats.js"

function Table01() {

  return (
    <table className="card">
      <TableRow01 
        floorName="123"
        floorUSF="456"
        openDate="789"
      />
      <TableRow01 
        floorName="123"
        floorUSF="456"
        openDate="789"
      />
      <TableRow01 
        floorName="123"
        floorUSF="456"
        openDate="789"
      />
    </table>
  )
}

export default Table01;