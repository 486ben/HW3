let io = {}

io.write_into_element = function(value, id){
  document.getElementById(id).innerHTML = value;

}