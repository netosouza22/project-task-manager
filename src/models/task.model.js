

function Task(id, name, concluded){
    this.id  = id;
    this.name = name;
    this.concluded = concluded;
    
    return{
        id: id,
        name: name,
        concluded: concluded,
    };
}
export default Task;