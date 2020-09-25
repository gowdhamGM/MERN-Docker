import React from "react"

const Testing=()=>{

return(
    <div className="container">
       

<div>
  <p class="maintitle">Monthly Timesheet</p>
</div>


<section class="timesheet-buttons">

  <input type="date" id="theDate"/>

  <div class="today-timesheet">
    <button type="button" class="newmsgb">Today</button>
    <button type="button" class="add-task-timesheet" data-toggle="modal" data-target="#addtask">Add New Task</button>
  </div>
</section>

<section >

  <p class="picked-day">2016-12-30</p>

</section>

<section>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12 tab-title">
        <div class="row">
          <div class="col-md-2 col-sm-2 col-xs-1">
            <div class="statustitle">Project</div>
          </div>
          <div class="col-md-2 col-sm-2 col-xs-2">
            <div class="projectnametitle">Task</div>
          </div>
          <div class="col-md-2 col-sm-2 col-xs-2">
            <div class="completiontitle">Date</div>
          </div>
          <div class="col-md-2 col-sm-2 col-xs-2">
            <div class="detailstitle">Start Date/End Date</div>
          </div>
          <div class="col-md-1 col-sm-1 col-xs-1">
            <div class="detailstitle">Duration</div>
          </div>
          <div class="col-md-2 col-sm-2 col-xs-2">
            <div class="detailstitle">Description</div>
          </div>
          <div class="col-md-1 col-sm-1 col-xs-1">
            <div class="tsdelete-row"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="row timesheet-task-row">
          <div class="col-md-2 col-sm-2 col-xs-1">
            <div class="statustitle">Project 1</div>
          </div>
          <div class="col-md-2 col-sm-2 col-xs-2">
            <div class="projectnametitle">Task 1</div>
          </div>
          <div class="col-md-2 col-sm-2 col-xs-2">
            <div class="completiontitle">2016-12-12</div>
          </div>
          <div class="col-md-2 col-sm-2 col-xs-2">
            <div class="detailstitle">12:00/13:00</div>
          </div>
          <div class="col-md-1 col-sm-1 col-xs-1">
            <div class="detailstitle">1 Hr.</div>
          </div>
          <div class="col-md-2 col-sm-2 col-xs-2">
            <div class="detailstitle">Really hard work.</div>
          </div>
          <div class="col-md-1 col-sm-1 col-xs-1">
            <div class="tsdelete-row">x</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<div id="addtask" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <div class="modal-content timesheet">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Add Task</h4>
      </div>
      <div class="modal-body">

        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-3">
                
                <p>Project</p>
                
                 
                </div>
                <div class="col-md-9">

                  <select class="form-control">
                    <option>Project1</option>
                    <option>Project2</option>
                    <option>Project3</option>
                    <option>Project4</option>
                    <option>Project5</option>
                  </select>

                </div>
              </div>
              <div class="row">
                <div class="col-md-3">
                  <p>Task</p>
                </div>
                <div class="col-md-9">

                  <select class="form-control">
                    <option>Task1</option>
                    <option>Task2</option>
                    <option>Task3</option>
                    <option>Task4</option>
                    <option>Task5</option>
                  </select>

                </div>
              </div>
              <div class="row">
                <div class="col-md-3">
                  <p>Date</p>
                </div>
                <div class="col-md-9">
                  <input class="form-control" type="date"/>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">
                  <p>Start Time</p>
                </div>
                <div class="col-md-9">
                  <input class="form-control" type="time" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">
                  <p>End Time</p>
                </div>
                <div class="col-md-9">
                  <input class="form-control" type="time" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">
                  <p>Description</p>
                </div>
                <div class="col-md-9">
                <div class="form-group">
                <textarea class="form-control" rows="9" id="comment"></textarea>
                </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">
                </div>
                <div class="col-md-9">

                  <div clas="actionbutton">
                    <p class="button-container"><button className="btn btn-primary btn-block">Add Task</button></p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</div>
    )
}

export default Testing;