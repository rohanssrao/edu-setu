import React from "react";
//convert a string to title casing
export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
// map list to a dictionary
export function getItems(data_list) {
  if (data_list) {
    return data_list.map((k, i) => ({
      id: `item-${i}`,
      content: k
    }));
  } else {
    return [];
  }
}

//ask db to create a new data
export async function send_data(user_id, type, data, add_to_display) {
  const json_data = [user_id, [type, data]];
  // Send data to the backend via POST
  fetch("http://127.0.0.1:5000/api/submit", {
    // Enter your IP address here

    method: "POST",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json",
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: JSON.stringify(json_data) // body data type must match "Content-Type" header
  }).then(() => {add_to_display()});
  
}

//ask db to delete data under the category with id
export function delete_data_entry(user_id, data_id, type) {
  const json_data = {data_id:data_id, type:type};
  // Send data to the backend via POST
  fetch("http://127.0.0.1:5000/api/delete", {
    // Enter your IP address here
    method: "POST",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json",
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: JSON.stringify(json_data) // body data type must match "Content-Type" header
  });
}


//ask db to delete data
//return content as list of <li> component or null
export function render_contents(contents) {
  if (contents) {
    return contents.map((data, index) => <li key={index}> {data} </li>);
  } else return null;
}

// a little function to help us with reordering the result
// recreate the index of the list
export function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  //also add comma to the end
  return result;
}

//extract keys from data and return a new dictionary
export function extract_value_by_keys(input,keys){
    let extraction = {}
    for(const key of keys)
    {
        extraction[key] = input[key]
    }
    return extraction
}
//use , to seperate list and add . at the end
export function format_list(input_list){
    let output=[]
    for(let i=0;i<input_list.length;i++)
    {   //at end
        if(i == input_list.length){
            if(input_list[i].includes(", ")){
                //do nothing
            }
        }
    //array logic
    }
}