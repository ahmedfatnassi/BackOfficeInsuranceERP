import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {KanbanService} from './kanban.service';
import {NgForm} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EventsService} from '../../events.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private kanbanBoard: KanbanService,
              private modal: NgbModal,
              private eventserviceService: EventsService) {
  }


  boardid: any ;
  id: any;
  columns: any;
  idOpenedTask: any;
  doctors
  color: any ;
  tasks: any[] ;
  fullcolumn: any ;
  fullBoard: any ;
  task : any ;
  columnsIds: any[] ;
  openedTask: any;
  openedNgModal: any;
  openedtaskAssignedUser: any;
  openedTaskIndex: any ;
  openedAct :any
  openedTaskResult: any ;
  openedTaskResultDescription: any ;
  openedTaskColumnIndex: any ;
  cannotExecuteWithoutAssignedUser: boolean ;
  openedTaskResultIsTrue : boolean ;
  employees: any[];
  ngOnInit() {

    this.fullBoard=[];
    this.cannotExecuteWithoutAssignedUser = false ;
    this.openedTaskResultIsTrue = false ;
    this.route.params.subscribe(params => {
      this.boardid = params['id'];
      this.kanbanBoard.getColumns(this.boardid).subscribe(data => {
        console.log('columns')
        console.log(data)
        this.columns = Object.keys(data).map(i => data[i]);
        console.log('columns ' + this.columns);
        this.columnsIds = []
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.columns.length; i++) {
        this.columnsIds.push(this.columns[i].id) ;
        }
        this.kanbanBoard.getTasksColumnsIds(this.columnsIds).subscribe(taskdata => {
          console.log('salem')
          console.log(taskdata)
          this.tasks = Object.keys(taskdata).map(i => taskdata[i]);

          for (let i = 0; i < this.columns.length ; i++) {
            this.fullBoard.push({
              id: this.columns[i].id ,
              name: this.columns[i].name ,
              boardId: this.columns[i].boardId ,
              tasks: []
            });
            for (let j = 0; j < this.tasks.length ; j++) {
          if (this.tasks[j].columnID === this.columns[i].id) {
              this.fullBoard[i].tasks.push(this.tasks[j])  ;
              continue;
          }
          }
        }
         for (let i = 0; i < this.fullBoard.length; i++) {
           this.fullBoard[i].tasks.sort((a, b) => a.position > b.position ? 1 : a.position < b.position ? -1 : 0 );

          }


        console.log(this.fullBoard) ;
        });
      } )

      this.eventserviceService.getDoctors().subscribe(data => {
        this.doctors = Object.keys(data).map(i => data[i]);
        console.log(this.doctors);

      });


    });



    this.kanbanBoard.getallEmployee().subscribe((data: any) => {
      this.employees = data ;
    })
  }
  //https://stackblitz.com/angular/dqglperyxxp?file=src%2Fapp%2Fcdk-drag-drop-disabled-sorting-example.html
  drop(event: CdkDragDrop<string[]>) {
    console.log(event);

   if (event.previousContainer === event.container) { // check is in same column and in another one
      //var indexcolumn  ;
     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex) ;

        var indexcolumn = +event.container.element.nativeElement.attributes.getNamedItem('id').value;

        console.log(indexcolumn) ;
        this.fullBoard[indexcolumn].tasks = [] ;
        console.log(event.container.data)
        for (let i = 0; i < event.container.data.length; i++) { // collect new distribution

          this.fullBoard[indexcolumn].tasks.push(event.container.data[i]);
          this.fullBoard[indexcolumn].tasks[i].position = i ;
        }
        console.log(this.fullBoard[indexcolumn].tasks)
        // perist it
        this.kanbanBoard.updateColumnAfterDeplacement(this.fullBoard[indexcolumn].tasks).subscribe((data :any) => {
          console.log(data);
        }) ;


    } else { // problem because we have same data array or column

      var indexcolumn = +  event.container.element.nativeElement.attributes.getNamedItem("id").value ;
      console.log(event);

      var indexperviouscolumn = +  event.previousContainer.element.nativeElement.attributes.getNamedItem("id").value ;
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        var alltasksneedToupdate = [];
     //event.container.data[event.currentIndex].columnID = this.fullBoard[indexcolumn].id ;
     console.log(event.container.data[event.currentIndex]);

     this.fullBoard[indexcolumn].tasks = [] ;
      // change to current column
     for (let i = 0; i < event.container.data.length; i++) { // collect new distribution
       this.fullBoard[indexcolumn].tasks.push(event.container.data[i]);
       this.fullBoard[indexcolumn].tasks[i].position = i ;
       alltasksneedToupdate.push(this.fullBoard[indexcolumn].tasks[i]);
       }
     this.fullBoard[indexcolumn].tasks[event.currentIndex].columnID = this.fullBoard[indexcolumn].id ;
      this.fullBoard[indexperviouscolumn].tasks = [] ;
      // change the previous column
      for (let i = 0; i < event.previousContainer.data.length; i++) { // collect new distribution
        this.fullBoard[indexperviouscolumn].tasks.push(event.previousContainer.data[i]);
        this.fullBoard[indexperviouscolumn].tasks[i].position = i ;

        alltasksneedToupdate.push(this.fullBoard[indexperviouscolumn].tasks[i]);

      }

      // persist everything
      this.kanbanBoard.updateColumnAfterDeplacement(alltasksneedToupdate).subscribe((data :any) =>{
      console.log(data);
      }) ;

    }



  }
  createColumn(form: NgForm) {
    const name = form.value.name ;
    this.kanbanBoard.createColumn({
      name: form.value.name,
      boardId: this.boardid
    }).subscribe((data:any) => {
      console.log(data)
      this.fullBoard.push({
        id : data.id ,
        name: name,
        boardId: this.boardid ,
        tasks : []
      });
    });

    this.modal.dismissAll();
  }

  OpenModalColumn(form) {
    this.modal.open(form);
  }

  OpenModalTask(form) {
    //this.idOpenedTask = id;
    this.modal.dismissAll();
    this.modal.open(form);
  }

  updateTask(form: NgForm) {
     let position ;
    for (let i = 0; i <this.fullBoard.length ; i++) {
    if(this.idOpenedTask === this.fullBoard[i].id){

      position = this.fullBoard[i].tasks.length
      break;
    }
    }
    this.task = {
      id : this.openedTask.id ,
      title: form.value.title,
      assignedUser : form.value.assignedUser.id,
      color: this.color,
      description: form.value.description ,
      columnID: this.openedTask.columnID ,
      boardID  : this.boardid ,
      position : this.openedTask.position,
      actId : this.openedTask.actId,
      activitiTaskId: this.openedTask.activitiTaskId
    }
    console.log(this.task);


    this.kanbanBoard.createtask(this.task).subscribe(data => {
      this.fullBoard[this.openedTaskColumnIndex].tasks[this.openedTaskIndex] = JSON.parse(JSON.stringify(this.task))
      this.modal.dismissAll();
    });

  }

  openTask(columnindex: any , taskIndex: any, modal) {
    this.cannotExecuteWithoutAssignedUser = false ;
    this.openedTaskResultIsTrue = false;
    /*console.log(columnindex + ' ' + taskId) ;
    console.log(this.fullBoard[columnindex].tasks[taskId]) ;*/
    this.openedNgModal= modal ;
    this.openedTaskIndex= taskIndex ;
    this.openedTaskColumnIndex = columnindex ;

    this.openedTask = this.fullBoard[columnindex].tasks[taskIndex] ;
    console.log(this.openedTask)
    if (this.openedTask.assignedUser) {
      console.log('not null');
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.employees.length ; i++) {
        if (this.employees[i].id === this.openedTask.assignedUser) {
            this.openedtaskAssignedUser = this.employees[i] ;
            break;
        }
      }


    } else {
      console.log('null');
      this.openedtaskAssignedUser = null ;
    }
    console.log(this.openedtaskAssignedUser)
    this.kanbanBoard.getActById(this.openedTask.actId).subscribe((data: any)=>{
      this.openedAct=data ;
      console.log(data)
      this.modal.open(modal);
    }) ;

  }


  assignUser(userId: any ){
    console.log(userId.value);
  }
  assignResult(result: any ){
    console.log(result.value);
    this.openedTaskResultIsTrue = true ;
    this.openedTaskResult = result.value ;

  }
execute(){
  /*  if (!this.openedTask.assignedUser){
      this.cannotExecuteWithoutAssignedUser = true ;
    } else {*/
    this.kanbanBoard.executeTask(this.openedTask, this.openedTaskResult, this.openedTaskResultDescription).subscribe((data : any)=>{

      const index = this.fullBoard[this.openedTaskColumnIndex].tasks.indexOf(data);
      if (index > -1) {
        this.fullBoard[this.openedTaskColumnIndex].splice(index, 1);
      }
      this.modal.dismissAll();
    }) ;
    //}
}
}
