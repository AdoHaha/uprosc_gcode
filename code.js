function nl2br (str, is_xhtml) {   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}


function download(text, name, type) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}

function simplify_gcode(gcode_str)
	{
	var re1 = new RegExp("([.])([0-9]+)","g");
	//console.log(re1.exec(gcode_str));
	function replacer(match,p1,p2,offset,string)
		{
			//console.log(match);
			//return "zenon"
			var arrayLength = match.length;
			var uproszczony="";
			for(var i=0;i<arrayLength && i<=4;i++)
			{
			uproszczony=uproszczony+match[i];
			}
			return uproszczony;
		}
	//gcode_str=gcode_str.replace(re1,replacer);
	return gcode_str.replace(re1,replacer);
	





	}
  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    var output = [];
    var reader = new FileReader();
    
reader.onloadend = function(evt){
      if (evt.target.readyState == FileReader.DONE) {
console.log(this.f.name);
var simplified=simplify_gcode(evt.target.result);
console.log(evt.target);
document.getElementById('file_text').innerHTML='<a id="zapisz_plik" href=""><b>Zapisz plik</b></a></br>'+nl2br(simplified);

document.getElementById("zapisz_plik").onclick = function(event) {
event.preventDefault();
download(simplified,"uproszczony_plik.nc","application/x-netcdf");
}


}}



    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');

      reader.readAsText(f);
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  // Setup the dnd listeners.
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);

