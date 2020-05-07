const form=document.getElementById('task-form');
const task=document.getElementById('task');
const button=document.querySelector('button');
const filter=document.getElementById('filter');
const ol=document.querySelector('ol');
const clearTasks=document.querySelector('.clear-tasks');

eventListenerLoad();

function eventListenerLoad(){
    // DOM Load Event 
    document.addEventListener('DOMContentLoaded',getTasks);
    button.addEventListener('click',taskAdd);
    ol.addEventListener('click',removeTask);
    clearTasks.addEventListener("click",clearTask);
    filter.addEventListener('keyup', filterTasks);
}
//get Task From Local Storage 
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li=document.createElement('li');
        li.textContent=task;
        li.className="collection-item";
        const link=document.createElement('a');
        link.className="link-style";
        link.innerHTML='<i class="fa fa-trash-o delete-item" aria-hidden="true"></i>';
        li.appendChild(link);
        ol.appendChild(li);
       
    });
}
// Task Add 
function taskAdd(e){
    const li=document.createElement('li');
    li.textContent=task.value;
    li.className="collection-item";
    const link=document.createElement('a');
    link.className="link-style";
    if(task.value.length>0){
        link.innerHTML='<i class="fa fa-trash-o delete-item" aria-hidden="true"></i>';
        li.appendChild(link);
        ol.appendChild(li);
        // Store in Local Storage Function calling
        storeTaskInLocalStorage(task.value);
        task.value='';
    }
    e.preventDefault();
}
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
// Remove list 
function removeTask(e){
    let target=e.target;
    if(target.classList.contains('delete-item')){
        if(confirm("Are you sure ?")){
            target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(target.parentElement.parentElement);
        }
    };
    // console.log(target);
}
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent===task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTask(){
    // ol.innerText="";
    while(ol.firstChild){
        ol.removeChild(ol.firstChild);
    }
    clearLocalStorage();
}
function clearLocalStorage(){
    localStorage.clear();
}

// filter Task 
function filterTasks(e){
    const text=e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item =task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text)!=-1){
            task.style.display= 'block';
        }else{
            task.style.display = 'none';
        }
    });
}   