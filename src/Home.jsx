import { useEffect, useState } from "react"
import "./Home.css"

export default function(){

    const [fullData,setFullData]= useState([])
    const [completed, setCompleted]= useState([])
    const [newTask, setNewTask]= useState("") //for new task we're adding
    let completedCopy= [...completed]
    let fullDataCopy= [...fullData]
    const getData = async()=>{
        const response = await fetch('https://dummyjson.com/todos')
        const data= await response.json()
        console.log(data.todos)
        setFullData(data.todos)
    }

    useEffect(()=>{
        getData()
    },[])

    
    //adds to do items to completed and vice versa
    function complete(item, thisData, thisDataCopy,setthisData, setthatData, thatDataCopy){ 
        let deleteIndex= thisData.findIndex(obj=>obj.id == item)
        thatDataCopy.push(thisData[deleteIndex])
        if(deleteIndex === 0){
            thisDataCopy.shift()
        }else{
            const completedItem= thisDataCopy.splice(deleteIndex,1)
        }
        setthisData(thisDataCopy)
        setthatData(thatDataCopy);
    }   

    
    const todos = fullData.map((obj)=>{
        return <div key ={obj.id} className="todoItem">
            <input type = "checkbox" id={obj.id} name ={obj.todo} onClick={()=>complete(obj.id,fullData,fullDataCopy, setFullData, setCompleted, completedCopy)}/>
                <label className="todoItemLabel" htmlFor = {obj.id} >{obj.todo}</label>
            </div>
    })

    const completedItems = completed.map((obj)=>{
        return <div key ={obj.id+"d"} className="doneItem">
        <input type = "checkbox" id={obj.id} name ={obj.todo} onClick={()=>complete(obj.id, completed, completedCopy, setCompleted, setFullData, fullDataCopy)}/>
            <label className="doneItemLabel" htmlFor = {obj.id} >{obj.todo}</label>
            <button className="addBack" onClick={()=>complete(obj.id, completed, completedCopy, setCompleted, setFullData, fullDataCopy)}>Add Back</button>
        </div>
    })

    function addNewTask(){
        let newTaskObj = {}
        let max =0;
        fullData.map((obj)=>{
            if(obj.id > max){
                max= obj.id
            }
        })
        completed.map((obj)=>{
            if(obj.id>max){
                max=obj.id
            }
        })
        let newId= max+1
        newTaskObj.id= newId
        newTaskObj.todo = newTask
        newTaskObj.completed = false
        fullDataCopy.unshift(newTaskObj)
        setFullData(fullDataCopy)
        setNewTask("")
    }

    console.log(fullData)

    return(
        <div id="page">
            <section className="pageSection">
                <h2>To Do</h2>
                <div  className="todoItem" >
                   <input type="textArea" placeholder="Add New Task Here" className="addedTask" name ="addTask" onChange={e=>setNewTask(e.target.value)} onKeyDown={(e)=>{if(e.key==="Enter"){addNewTask();e.target.value=""}}}/>
                </div>
                {todos}
            </section>
            <section className="pageSection">
                <h2>Completed</h2>
                {completedItems}
            </section>

        </div>
    )
}