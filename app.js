let input=document.querySelector(".todoInput");
let container=document.querySelector(".todoList");

function addTodo(){
    let value=input.value;
if(value.trim().length>0){
    container.innerHTML+=`<li class="todoLi">
   <div class="todoLiChecked">
   <input type="checkbox" class="isChecked" onchange="isChecked(this)">
   ${value} 
   </div>
    <div class="todoButton">
        <button class="todoDelete" onclick="deleteTodo(this,${value})">Delete</button>

    </div>
</li>`
input.value="";
let todos;
if(localStorage.getItem("todo") === null){
todos=[];
}else{
    todos=JSON.parse(localStorage.getItem("todo"));
}
todos.push({title:value, completed: false});
localStorage.setItem("todo", JSON.stringify(todos))
}
else{
    alert("boş geçilemez")
}
}
function deleteTodo(e,value){
    container.removeChild(e.parentNode.parentNode);
    let localTodos = JSON.parse(localStorage.getItem("todo"));
    let items = localTodos.filter(x=>x.title !== value);
    localStorage.setItem("todo", JSON.stringify(items))
    }
function isChecked(e){
    e.toggleAttribute("checked");
    e.parentNode.parentNode.classList.toggle("checked");
    let localTodos = JSON.parse(localStorage.getItem("todo"));
    let item = localTodos.find(x=>x.title === e.parentNode.innerText);
    item.completed = !item.completed
    localStorage.setItem("todo", JSON.stringify(localTodos))
}

let allStorageTodos = JSON.parse(localStorage.getItem("todo"));
allStorageTodos.map(x=>container.innerHTML+=`<li class="todoLi ${x.completed && "checked"}">
<div class="todoLiChecked">
<input type="checkbox" ${x.completed === true && "checked"} class="isChecked" onchange="isChecked(this)">
${x.title} 
</div>
 <div class="todoButton">
     <button class="todoDelete" onclick="deleteTodo(this,'${x.title}')">Delete</button>

 </div>
</li>` )
fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => addApiTodos(json));

      function addApiTodos(todos){
      todos.map(todo=>container.innerHTML+=`<li class="todoLi ${todo.completed && "checked"}">
        <div class="todoLiChecked">
        <input type="checkbox" ${todo.completed === true && "checked"} class="isChecked" onchange="isChecked(this)">
        ${todo.title} 
        </div>
         <div class="todoButton">
             <button class="todoDelete" onclick="deleteTodo(this,'${todo.title}')">Delete</button>
     
         </div>
     </li>`)
      }