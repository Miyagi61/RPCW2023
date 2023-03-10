exports.spa = function(info, extra){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>ToDo</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>New Task</h2>
                </header>
                <form class="w3-container" method="POST" >
                    <input class="w3-hide" type="text" name="op" value="add">
                    <label for="date">DateDued</label>
                    <input class="w3-input w3-round" type="date" name="date" value="${extra.date}" required>

                    <label for="person">Who</label>
                    <input class="w3-input w3-round" type="text" name="person" value="${extra.person ? extra.person : "" }" required>

                    <label for="task">What</label>
                    <input class="w3-input w3-round" type="text" name="task" value="${extra.task ? extra.task : ""}" required>
                    <input class="w3-hide" type="text" name="id" value="${extra.id ? extra.id : ""}">
                    <button class="w3-btn w3-light-grey w3-mb-2 w3-display-topright" style="margin-top:12px" type="submit">Add Task</button>
                </form>
            </div>
            <div class="w3-row">
                <div class="w3-container w3-half w3-rightbar">
                    <h2>ToDo</h2>
                        <table class="w3-table-all">
                            <tr>
                                <th>Task</th><th>Done</th><th>Delete</th><th>Edit</th>
                            </tr>
            `
    
    for(let i=0; i < info.length ; i++){
        console.dir(info[i])
        if(info[i].done == 0){
            pagHTML += `
                            <tr>
                                <td>${info[i].task} <p><small><i>By: ${info[i].person}, Until: ${info[i].date}</i><small></p></td>
                                <td>
                                    <form method="POST">
                                        <input class="w3-hide" type="text" name="op" value="done">
                                        <input class="w3-hide" type="text" name="id" value="${info[i].id}">
                                        <input class="w3-hide" type="text" name="person" value="${info[i].person}">
                                        <input class="w3-hide" type="text" name="date" value="${info[i].date}">
                                        <input class="w3-hide" type="text" name="task" value="${info[i].task}">
                                        <input class="w3-check" type="submit" name="_" value="X">
                                    </form>
                                </td>
                                <td>
                                    <form method="POST">
                                        <input class="w3-hide" type="text" name="op" value="delete">
                                        <input class="w3-hide" type="text" name="id" value="${info[i].id}">
                                        <input class="w3-check" type="submit" name="_" value="X">
                                    </form>
                                </td>
                                <td>
                                    <form method="POST">
                                        <input class="w3-hide" type="text" name="op" value="edit">
                                        <input class="w3-hide" type="text" name="id" value="${info[i].id}">
                                        <input class="w3-hide" type="text" name="person" value="${info[i].person}">
                                        <input class="w3-hide" type="text" name="date" value="${info[i].date}">
                                        <input class="w3-hide" type="text" name="task" value="${info[i].task}">
                                        <input class="w3-check" type="submit" name="_" value="X">
                                    </form>
                                </td>
                            </tr>
            `
        
        }
    }                        

    pagHTML += `
                        </table>
                    </form>
                </div>
                <div class="w3-container w3-half">
                    <h2>Done</h2>
                    <table class="w3-table-all">
                            <tr>
                                <th>Task</th><th>Undone</th><th>Delete</th><th>Edit</th>
                            </tr>
            `
    for(let i=0; i < info.length ; i++){
        console.dir(info[i])
        if(info[i].done == 1){
            pagHTML += `
                            <tr>
                                <td>${info[i].task} <p><small><i>By: ${info[i].person}</i><small></p></td>
                                <td>
                                    <form method="POST">
                                        <input class="w3-hide" type="text" name="op" value="undone">
                                        <input class="w3-hide" type="text" name="id" value="${info[i].id}">
                                        <input class="w3-hide" type="text" name="person" value="${info[i].person}">
                                        <input class="w3-hide" type="text" name="date" value="${info[i].date}">
                                        <input class="w3-hide" type="text" name="task" value="${info[i].task}">
                                        <input class="w3-check" type="submit" name="_" value="X">
                                    </form>
                                </td>
                                <td>
                                    <form method="POST">
                                        <input class="w3-hide" type="text" name="op" value="delete">
                                        <input class="w3-hide" type="text" name="id" value="${info[i].id}">
                                        <input class="w3-check" type="submit" name="_" value="X">
                                    </form>
                                </td>
                                <td>
                                    <form method="POST">
                                        <input class="w3-hide" type="text" name="op" value="edit">
                                        <input class="w3-hide" type="text" name="id" value="${info[i].id}">
                                        <input class="w3-hide" type="text" name="person" value="${info[i].person}">
                                        <input class="w3-hide" type="text" name="date" value="${info[i].date}">
                                        <input class="w3-hide" type="text" name="task" value="${info[i].task}">
                                        <input class="w3-check" type="submit" name="_" value="X">
                                    </form>
                                </td>
                            </tr>
            `
        }
    }
    pagHTML += `    
                        </table>
                </div>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

